import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		ToastModule,
        RippleModule
	],
	providers: [
		MessageService
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})

export class AppComponent {
	title = 'Payroll System';
}
