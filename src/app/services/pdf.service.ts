import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
    async loadPdf(file: File): Promise<pdfjsLib.PDFDocumentProxy> {
        const arrayBuffer = await file.arrayBuffer();
        return pdfjsLib.getDocument(arrayBuffer).promise;
    }

    async loadPdfbyBuffer(fileBuffer: ArrayBuffer): Promise<pdfjsLib.PDFDocumentProxy> {
        return pdfjsLib.getDocument(fileBuffer).promise;
    }
    
    async renderPage(pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement): Promise<void> {
        console.log(pageNumber)
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
    }
}