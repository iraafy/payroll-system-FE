import { CanMatchFn, Route, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { MessageService } from "primeng/api";

export const roleValidation : CanMatchFn = (route : Route) => {
    const roleData : string[] = route.data as any;

    const authService = inject(AuthService)
    const router = inject(Router)
    // const messageService = inject(MessageService)

    const dataLogin = authService.getLoginData();
    if (dataLogin) {
        if(roleData.includes(dataLogin.roleCode)) {
            return true;
        }
        // messageService.add({severity: 'warning', summary:'Warning', detail: 'Akses Ditolak!'})
        return router.navigateByUrl('/homepage')
    }
    return router.navigateByUrl('/login')
}