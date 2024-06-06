import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { LoginReqDto } from "../../dto/user/login.req.dto";
import { MessageService } from "primeng/api";


@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    
})

export class Login implements OnInit {

    loginReqDtoFg = this.fb.group({
        email: ['', [
            Validators.required, 
            Validators.email
        ]],
        password: ['', [
            Validators.required
        ]]
    })

    constructor(
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.init()
    }

    onSubmit() {
        if (this.loginReqDtoFg.valid) {
            const loginReqDto: LoginReqDto = this.loginReqDtoFg.getRawValue()

            firstValueFrom(this.authService.login(loginReqDto)).then(
                (res) => {
                    this.authService.saveLoginData(res)
                    this.router.navigateByUrl('/homepage')
                },
                (err) => {
                    if (err['status']) {
                        err['status'] === 403 && this.messageService.add({severity: 'warn', summary:'Peringatan', detail: 'Email atau password salah'})
                    }
                }
            )

        }
    }

    init(){
        if(this.authService.getLoginData()){
            this.router.navigateByUrl("/homepage")
        }
    }


}