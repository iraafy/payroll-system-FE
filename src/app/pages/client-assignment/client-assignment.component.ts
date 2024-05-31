import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResDto } from "../../dto/user/user.res.dto";
import { ClientDropdownResDto } from "../../dto/user/client-dropdown.res.dto";
import { ConfirmationService, MessageService } from "primeng/api";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ClientAssignmentReqDto } from "../../dto/client-assignment/client-assignment.req.dto";
import { ClientAssignmentService } from "../../services/client-assignment.service";
import { AllAssignmentResDto } from "../../dto/client-assignment/all-assignment.res.dto";
import { FileService } from "../../services/file.service";
import { BASE_URL } from "../../constants/global";

@Component({
    selector: 'client-assignment',
    templateUrl: './client-assignment.component.html',
})

export class ClientAssignment implements OnInit {
    payrollServices: UserResDto[] = []
    clients: ClientDropdownResDto[] = []
    assignments: AllAssignmentResDto[] = []
    displayModal: boolean = false
    confirmationModal: boolean = false
    companyLogos: string[] = [];
    clientsByPsId: UserResDto[][] = []

    constructor(
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private fb: NonNullableFormBuilder,
        private clientAssignmentService: ClientAssignmentService,
        private fileService: FileService
    ) { }

    ngOnInit(): void {
        this.init()
    }

    init(): void {
        firstValueFrom(this.userService.getAllPs()).then(
            res => {
                this.payrollServices = res

                res.forEach(ps => {
                    firstValueFrom(this.userService.getClientsByPsId(ps.id)).then(
                        res => {
                            this.clientsByPsId.push(res)
                        })
                })
            }
        )
        firstValueFrom(this.userService.getAllClient()).then(
            res => {
                this.clients = res
            }
        )
        firstValueFrom(this.clientAssignmentService.getAssignmentList()).then(
            res => {
                this.assignments = res;
                res.forEach((assignment, i) => {
                    this.companyLogos[i] = assignment.clients.map((client: { companyLogo: any; }) => 
                        `${BASE_URL}/files/file/${client.companyLogo}`);
                });
            }
        )
    }

    clientAssignmentReqDtoFormGroup = this.fb.group({
        psId: ['', [Validators.required]],
        clientId: ['', [Validators.required]]
    })

    onSubmit() {
        if (this.clientAssignmentReqDtoFormGroup.valid) {
            const clientAssignmentReqDto: ClientAssignmentReqDto = this.clientAssignmentReqDtoFormGroup.getRawValue()
            firstValueFrom(this.clientAssignmentService.save(clientAssignmentReqDto)).then(
                res => {
                    this.clientAssignmentReqDtoFormGroup.reset(),
                        this.displayModal = false,
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Penugasan berhasil terbuat' });
                    this.confirmationModal = false;
                    this.init()
                }
            )
        }
    }
}