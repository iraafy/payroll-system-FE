import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { CompanyService } from "../../../services/company.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
    selector: 'company-add',
    templateUrl: './company-add.component.html',
})

export class CompanyAdd implements OnInit {

    companyReqDtoFg = this.fb.group({
        companyName: ['', [Validators.required, this.noWhitespaceValidator]],
        defaultPaymentDay: [Validators.required],
        address : ['', [Validators.required]],
        phone: ['', [Validators.required]],
        fileContent: [''],
        fileExtension: ['']
    });

    displayModal: boolean = false;

    constructor(
        private fb: NonNullableFormBuilder,
        private companyService: CompanyService,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit(): void { }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result);
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length);
                const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);

                this.companyReqDtoFg.get('fileContent')?.patchValue(resultBase64);
                this.companyReqDtoFg.get('fileExtension')?.patchValue(resultExtension);
            });
        }
    }

    onSubmit() {
        if (this.companyReqDtoFg.valid) {
            const newCompany = this.companyReqDtoFg.getRawValue() as any;
            firstValueFrom(this.companyService.createNewCompany(newCompany)).then(
                res => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company berhasil terbuat' });
                    this.router.navigate(['/companies'])
                }
            )
        }
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}
