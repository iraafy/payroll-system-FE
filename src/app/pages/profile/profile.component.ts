import { Component, OnInit } from "@angular/core";
import { RoleType } from "../../constants/role-type";
import { AuthService } from "../../services/auth.service";
import { LoginResDto } from "../../dto/user/login.res.dto";
import { BaseService } from "../../services/base.service";
import { BASE_URL } from "../../constants/global";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ChangeProfilePicReqDto } from "../../dto/user/change-profile-pic.req.dto";
import { firstValueFrom } from "rxjs";
import { UserService } from "../../services/user.service";
import { MessageService } from "primeng/api";

@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html'
})

export class Profile implements OnInit {
    loginData: LoginResDto | undefined = this.authService.getLoginData();
    photoProfile: string | undefined = ''

    changeProfilePicReqDtoFg = this.fb.group({
        fileContent: ['', Validators.required],
        fileExt: ['', Validators.required]
    })

    changeNameFb = this.fb.group({
        newName: ['', Validators.required]
    })

    constructor(
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        if (this.loginData?.imageProfile != null) {
            this.photoProfile = `${BASE_URL}/files/file/${this.loginData.imageProfile}`
        } else {
            this.photoProfile = 'https://cdn-icons-png.flaticon.com/512/5987/5987424.png'
        }
    }

    name = this.loginData?.fullName;
    company = this.loginData?.companyName;
    role = this.loginData?.roleCode;
    file = this.loginData?.imageProfile
    roleName = this.checkRole();

    checkRole() {
        if (RoleType.PS === this.role) {
            return 'Payroll Service'
        } else if (RoleType.CLIENT === this.role) {
            return 'Client'
        } else {
            return 'Super Admin'
        }
    }

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

                this.changeProfilePicReqDtoFg.get('fileContent')?.patchValue(resultBase64);
                this.changeProfilePicReqDtoFg.get('fileExt')?.patchValue(resultExtension);
            });
        }
    }

    OnSubmitChangeName() {
        const changeName = this.changeNameFb.getRawValue()
        firstValueFrom(this.userService.changeUserName(changeName.newName))
    }

    OnSubmitProfile() {
        const changeProfilePicReqDto: ChangeProfilePicReqDto = this.changeProfilePicReqDtoFg.getRawValue();
        firstValueFrom(this.userService.changeProfilePic(changeProfilePicReqDto)).then(
            res => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
        )
    }
}