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
import { UploadEvent } from "primeng/fileupload";
import { UserResDto } from "../../dto/user/user.res.dto";

@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html'
})

export class Profile implements OnInit {
    loginData: LoginResDto | undefined = this.authService.getLoginData();
    profileData: UserResDto | undefined;
    fullName: string = this.loginData?.fullName || ''
    photoProfile: string | undefined = ''
    displayModal = false;
    spin = false;

    changeProfilePicReqDtoFg = this.fb.group({
        fileContent: ['', Validators.required],
        fileExt: ['', Validators.required]
    })

    changeNameFb = this.fb.group({
        newName: [this.fullName, Validators.required]
    })

    constructor(
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        if (this.loginData != null) {
            firstValueFrom(this.userService.getUserByid(this.loginData.id)).then(
                res => {
                    this.profileData = res;
                }
            )
        }

        this.name = this.profileData?.fullName;
        if (this.profileData?.id != null) {
            this.photoProfile = `${BASE_URL}/files/file/${this.profileData.fileId}`;
        } else {
            this.photoProfile = 'assets/images/icon/user.svg';
        }
    }

    name = this.loginData?.fullName;
    company = this.loginData?.companyName;
    role = this.loginData?.roleCode;
    file = this.loginData?.imageProfile
    email = this.loginData?.email;
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

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1);
                const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

                this.changeProfilePicReqDtoFg.get('fileContent')?.patchValue(resultBase64);
                this.changeProfilePicReqDtoFg.get('fileExt')?.patchValue(resultExtension);
            })
        }
        this.spin = true
    }

    OnSubmitChangeName() {
        const changeName = this.changeNameFb.getRawValue()
        firstValueFrom(this.userService.changeUserName(changeName.newName)).then(
            res => {
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message });
                this.displayModal = false
                this.setLocalStorage()
            }
        )
    }

    onBasicUploadAuto() {
        const changeProfilePicReqDto = this.changeProfilePicReqDtoFg.getRawValue();
        firstValueFrom(this.userService.changeProfilePic(changeProfilePicReqDto)).then(
            res => {
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message });
                this.setLocalStorage();
                this.spin = false
            }
        )
    }

    setLocalStorage() {
        if (this.loginData != null) {
            firstValueFrom(this.userService.getUserByid(this.loginData.id)).then(
                res => {
                    this.authService.updateLoginData(res.fileId, res.fullName);
                    this.loginData = this.authService.getLoginData();
                    this.init();
                    if (this.photoProfile != undefined) {
                        this.userService.changeProfileImage(this.photoProfile);
                    }
                }
            )
        }
    }
}