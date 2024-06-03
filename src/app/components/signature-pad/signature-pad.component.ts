import { CommonModule } from '@angular/common'
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import SignaturePad from 'signature_pad'

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export class SignaturePadComponent implements OnInit {
    signatureNeeded!: boolean
    signaturePad!: SignaturePad
    @ViewChild('canvas') canvasEl!: ElementRef
    signatureImg!: string
    @Output() signature = new EventEmitter<FormGroup>()
    
    constructor(
        private fb : NonNullableFormBuilder,
        ) { }

    signatureForm = this.fb.group({
        signatureContent: ['', [Validators.required]],
        signatureExt: ['png', [Validators.required]] 
    })
    
    ngOnInit(): void {}

    ngAfterViewInit() {
        this.signaturePad = new SignaturePad(this.canvasEl.nativeElement)
    }

    startDrawing(event: Event) {
        // works in device not in browser
    }

    moved(event: Event) {
        // works in device not in browser
    }

    clearPad() {
        this.signaturePad.clear()
        this.signatureForm.get('signatureContent')?.patchValue('')
    }

    savePad() {
        const base64Data = this.signaturePad.toDataURL()
        this.signatureImg = base64Data
        this.signatureNeeded = this.signaturePad.isEmpty()
        if (!this.signatureNeeded) {
            this.signatureNeeded = false
        }
        this.signatureForm.get('signatureContent')?.patchValue(this.signatureImg.split(',')[1])
        this.signature.emit(this.signatureForm)
    }
}