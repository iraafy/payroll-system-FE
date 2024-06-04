import { AfterViewInit, Component, OnInit } from "@angular/core"
import { AuthService } from "../../services/auth.service"
import { RoleType } from "../../constants/role-type"
import { ActivatedRoute, Route, Router } from "@angular/router"
import { Observable, firstValueFrom, tap } from "rxjs"
import { PayrollService } from "../../services/payroll.service"
import { PayrollDetailResDto } from "../../dto/payroll-detail/payroll-detail.res.dto"
import { DatePipe } from "@angular/common"
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms"
import { ReschduleService } from "../../services/reschedule.service"
import { MessageService } from "primeng/api"
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto"
import { NotificationReqDto } from "../../dto/notification/notification.req.dto"
import { NotificationService } from "../../services/notification.service"
import { FileService } from "../../services/file.service"
import SignaturePad from "signature_pad"
import { HttpResponse } from "@angular/common/http"
import { PDFDocumentProxy } from "pdfjs-dist"
import { PdfService } from "../../services/pdf.service"
import { SignatureReqDto } from "../../dto/payroll-detail/signature.req.dto"

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll-detail.component.html',
})

export class PayrollDetail implements OnInit {
    confirmSignVisible : boolean = false
    signatureVisible: boolean = false
    rescheduleVisible: boolean = false
    pingVisible: boolean = false
    downloadVisible: boolean = false
    spin : boolean = false
    payrollId: string | null = ''
    clientId: string | null = ''
    payrollDetails?: Observable<PayrollDetailResDto[]>
    payrolls?: PayrollResDto
    payrollLoop = [1]
    companyLogos: string[] = []
    data: NotificationReqDto | null = null
    visible: boolean = false
    images: string[] = []
    pages : number[] = []
    uploadedFile? : HttpResponse<HttpResponse<Blob>>
    pickedDetailId? : string
    signature : SignatureReqDto = {
        signatureBase64 : ''
    }

    tempTest: PayrollDetailResDto[] = []

    ftpReqDtoFg = this.fb.group({
        fileContent: ['', Validators.required],
        fileExt: ['', Validators.required],
        detailId: ['', Validators.required]
    })

    rescheduleReqDtoFg = this.fb.group({
        newScheduleDate: ['', Validators.required],
        payrollDetailId: ['', Validators.required]
    })

    constructor(
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private payrollService: PayrollService,
        private datePipe: DatePipe,
        private fb: NonNullableFormBuilder,
        private reschduleService: ReschduleService,
        private messageService: MessageService,
        private notificationService: NotificationService,
        private router: Router,
        private fileService: FileService,
        private pdfService : PdfService
    ) { }

    ngOnInit(): void {
        this.init()
    }

    init(): void {
        this.payrollId = this.activeRoute.snapshot.paramMap.get('id')
        if (this.payrollId != null) {

            firstValueFrom(this.payrollService.getPayrollById(this.payrollId)).then(
                res => {
                    this.payrolls = res
                    this.clientId = res.clientId
                }
            )
            this.payrollDetails = this.payrollService.getAllPayrollDetailByPayrollId(this.payrollId)
                .pipe(
                    tap((items: PayrollDetailResDto[]) => {
                        items.forEach((item) => {
                            const formattedDate = this.datePipe.transform(item.maxUploadDate, 'yyyy-MM-dd')!;
                            item.maxUploadDate = formattedDate;
                        });
                    })
                )
        }
    }

    ngAfterViewInit(){
        const canvas : HTMLCanvasElement | null= document.querySelector("canvas")
        if(canvas != null){
            const signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: 'rgb(0, 0, 0)'
            })
        }
    }
    
    loginData = this.authService.getLoginData()

    get isPS() {
        return this.loginData?.roleCode == RoleType.PS
    }

    get isClient() {
        return this.loginData?.roleCode == RoleType.CLIENT
    }

    showDialogSignature(id : string) {
        this.signatureVisible = true
        this.pickedDetailId = id
    }

    showDialogReschedule(id: string) {
        this.rescheduleVisible = true
        this.rescheduleReqDtoFg.get('payrollDetailId')?.patchValue(id)
    }

    showDialogPing() {
        this.pingVisible = true
    }

    onSubmitCreateReschdule() {
        if (this.rescheduleReqDtoFg.valid) {
            const rescheduleDto = this.rescheduleReqDtoFg.getRawValue()

            firstValueFrom(this.reschduleService.createNewReschdule(rescheduleDto)).then(
                res => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
                    this.init()
                },
                err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'harap cek tanggal reschedule dan approval reschedule' })
                }
            )
            this.rescheduleVisible = false
        }
    }

    pingSubmit() {
        if (this.clientId != null) {
            this.data = {
                notificationContent: 'Anda belum mengisi bagian ini',
                contextUrl: `/payrolls/${this.payrollId}`,
                contextId: 'PING',
                userId: this.clientId
            }
            firstValueFrom(this.notificationService.sendPing(this.data)).then(
                res => {
                    this.messageService.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil mengirimkan ping ke klien' })
                    this.pingVisible = false
                })
        }
    }

    fileUpload(event: any, id: string) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })

        const files: File[] = event.files

        for (let file of files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

                this.ftpReqDtoFg.get('fileContent')?.patchValue(resultBase64)
                this.ftpReqDtoFg.get('fileExt')?.patchValue(resultExtension)
                this.ftpReqDtoFg.get('detailId')?.patchValue(id)

                if (this.ftpReqDtoFg.valid) {
                    const newFile = this.ftpReqDtoFg.getRawValue()
                    firstValueFrom(this.fileService.uploadFileFtp(newFile)).then(
                        res => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
                            firstValueFrom(this.payrollService.setPayrollDetailFile(id, res.id))
                            this.init()
                        }

                    )
                }
            })
        }
    }

    downloadFileSubmit(fileName: string) {
        window.location.href = `http://localhost:8080/files/ftp/${fileName}`
        this.downloadVisible = false
    }

    async onPreview(id: string) {
        this.showDialog()
        this.spin = true
        this.pages = []

        this.uploadedFile = await firstValueFrom(this.fileService.previewFileFtp(`files/ftp/preview/${id}`))
        const blobFile = this.uploadedFile.body
        const uFIle = new File([blobFile as any], 'file', {
            type: "application/pdf"
        })

        if(uFIle){
            const pdf = await this.pdfService.loadPdf(uFIle)
            this.pages = Array(pdf.numPages).fill(0).map((x, i) => i)
            this.canvasLoad(pdf)
            this.spin = false
        }
    }

    canvasLoad(pdf : PDFDocumentProxy) {
        setTimeout( async () => {
            for(let i = 0; i < this.pages?.length; i++){
                const canvass = document.getElementById(`pdfCanvas-${i+1}`) as HTMLCanvasElement
                await this.pdfService.renderPage(pdf, i+1, canvass)
            }
        }, 1)
    }

    showDialog() {
        this.visible = true
    }

    sign(data : FormGroup) {
        this.signature.signatureBase64 = data.get('signatureContent')?.getRawValue()
        this.confirmSignVisible = true
    }

    submitSign() {
        if(this.pickedDetailId){
            firstValueFrom(this.payrollService.setSignatureOnPayrollDetail(this.pickedDetailId, this.signature)).then(
                res => {
                    if(res.ver) {
                        this.messageService.add({severity: 'success', summary:'success', detail: res.message})
                        this.init()
                    }
                },
                err => {

                }
            )
        }
    }

    exportFinalReport(){
        // window.location.href = `http://localhost:8080/reports/ftp/${fileName}`;
    }
}