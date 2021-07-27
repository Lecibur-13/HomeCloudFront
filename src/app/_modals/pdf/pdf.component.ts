import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
title = 'Files';
pdfs: NavParams;
url: any;
link: any;
document: any;
@ViewChild('pdfJsViewerComponent') pdfJsViewerComponent;
  constructor(
    private navParams: NavParams,
    private modal: ModalController,
  ) {
    this.url = environment.URL
    this.link = this.url + '/api/get/';
    this.pdfs = this.navParams.get('pdf');
  }

  ngOnInit() {}

    onDocumentLoad() {
    const iframDoc = this.pdfJsViewerComponent.iframe.nativeElement.contentWindow.document;
    let content = iframDoc.getElementById('mainContainer');
    if (content && !this.canCopyText()) {
      content.classList.add('no-select-text');
    }
  }

    canCopyText(): boolean {
    return this.document.canCopyText == true;
  }

  close(){
      this.modal.dismiss();
    }

}
