import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'homepage-app',
    templateUrl: './homepage.component.html',
})

export class Homepage {
    loginData = this.authService.getLoginData();
    
    constructor(private authService : AuthService) { }
}