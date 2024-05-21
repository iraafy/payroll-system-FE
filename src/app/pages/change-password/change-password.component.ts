import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserUpdateReqDto } from "../../dto/user/user-update.req.dto";
import { MessageService } from "primeng/api";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
})

export class ChangePassword {

    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private messageService: MessageService
    ) { }

    userUpdateReqDtoFg = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    });

    onSubmit() {
        if(this.userUpdateReqDtoFg.valid) {
            const oldPassword = this.userUpdateReqDtoFg.value.oldPassword;
            const newPassword = this.userUpdateReqDtoFg.value.newPassword;
            
            if (oldPassword && newPassword) {
                if (this.userUpdateReqDtoFg.value.newPassword === this.userUpdateReqDtoFg.value.confirmPassword) {
                    const userData: UserUpdateReqDto = {
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    };
                    firstValueFrom(this.userService.changePassword(userData)).then(res => {
                        if (res.message === 'Gagal mengubah kata sandi :(') {
                            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Kata Sandi Lama Tidak Sesuai' });
                        } else {
                            localStorage.clear();
                            this.router.navigateByUrl('/login');
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Kata Sandi Berhasil Diubah' });
                        }
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Konfirmasi Kata Sandi Tidak Sesuai' });
                }
            }
        }
    }
}