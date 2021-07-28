import {Component, OnInit} from '@angular/core';
import {UploadService} from "../_services/upload.service";
import {ModalController} from "@ionic/angular";
import {PdfComponent} from "../_modals/pdf/pdf.component";
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader/ngx";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
title = 'Files';
pdfs: any;
url:any;
hideother = false
hidepdf = false
files: any;
link: any;
  constructor(
    private uploadService: UploadService,
    private modal: ModalController
  ) {
    this.url = environment.URL
  }

  ngOnInit(): void{
    this.getPdf();
    this.getFiles();
    this.link = this.url + '/api/get/';
  }

   getPdf(){
    this.uploadService.getPdf().subscribe(response => {
      this.pdfs = response;
    });
  }
    getFiles(){
    this.uploadService.getFile().subscribe(response => {
      this.files = response;
    });
  }
  openPdf(pdf){
    this.modal.create({
      component: PdfComponent,
      cssClass: "modal-fullscreen",
      componentProps: {
        pdf: pdf.name
      }
    }).then(modal => modal.present());
  }
  hideOther(){
    this.hideother = !this.hideother
  }
  hidePDF(){
    this.hidepdf = !this.hidepdf
  }
    download(file) {
      console.log(file)
      const request: DownloadRequest = {
        uri: this.link + file,
        title: file,
        description: '',
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: file
        }
      };
    }
}
