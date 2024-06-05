import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { RolesService } from "../../../services/roles.service";
import { CompanyService } from "../../../services/company.service";
import { RoleResDto } from "../../../dto/role/role.res.dto";
import { MessageService } from "primeng/api";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { UserReqDto } from "../../../dto/user/user.req.dto";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'user-add',
    templateUrl: './user-add.component.html',
})

export class UserAdd implements OnInit {
    userForm: FormGroup = this.fb.group({
        email: ['', [
            Validators.required,
            Validators.email
        ]],
        fullName: ['', [Validators.required, this.noWhitespaceValidator]],
        phone: ['', [Validators.required]],
        roleId: ['', [Validators.required]],
        companyId: ['', [Validators.required]],
        fileContent: [''],
        fileExt: ['']
    })

    displayModal: boolean = false;

    companies: CompanyResDto[] = [];

    roles: RoleResDto[] = [];

    constructor(
        private fb: NonNullableFormBuilder,
        private userService: UserService,
        private rolesService: RolesService,
        private companyService: CompanyService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.getCompanies()
        this.getRoles()
    }

    getCompanies() {
        firstValueFrom(this.companyService.getAllCompany()).then(
            res => {
                this.companies = res
            }
        )
    }

    getRoles() {
        firstValueFrom(this.rolesService.getAllRoles()).then(
            res => {
                this.roles = res
            }
        )
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

                this.userForm.get('fileContent')?.patchValue(resultBase64)
                this.userForm.get('fileExt')?.patchValue(resultExtension)
            })
        }
    }

    createUser() {
        const userReq: UserReqDto = this.userForm.getRawValue()
        console.log(this.userForm.get('phone')?.getRawValue())
        firstValueFrom(this.userService.saveUser(userReq)).then(
            res => {
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menambahkan user' })
                this.router.navigateByUrl('/users')
            },
            err => {
                this.messageService.add({ severity: 'error', summary: 'Gagal', detail: err['message'] })
            }
        )
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}