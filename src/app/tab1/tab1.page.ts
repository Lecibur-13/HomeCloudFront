import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';
import {ImgComponent} from '../_modals/img/img.component';
import {ModalController} from '@ionic/angular';
import {PdfComponent} from "../_modals/pdf/pdf.component";
import {environment} from "../../environments/environment";
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {Tab2Page} from "../tab2/tab2.page";
import {Tab3Page} from "../tab3/tab3.page";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  title = 'HomeCloud';
  url: any;
  link: any;
  imgs: any;
  files: any;
  pdfs: any;
  file: any;
  names: any;

  constructor(
    private uploadService: UploadService,
    private modal: ModalController,
    private downloader: Downloader,
    private tab2: Tab2Page,
    private tab3: Tab3Page,
  ) {
    this.url = environment.URL
  }

  ngOnInit(): void {
    this.link = this.url + '/api/get/';
    this.getImgs();
    this.getFiles();
    this.getPdf();
  }

  //input fuctions
  data(e) {
    this.file = e.target;
    if (e.target.files) {
      this.names = this.file.files;
      console.log(this.names)
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.file) {
      for (let i = 0; i < this.file.files.length; i++) {
        formData.append('archivo', this.file.files[i]);
        this.tab2.getImgs();
        this.tab3.getPdf();
        this.tab3.getFiles();
      }
    }
    this.uploadService.uploadFile(formData).subscribe(response => {
      this.getImgs();
      this.getFiles();
      this.getPdf();
    });
  }

  // get info from API
  getImgs() {
    this.uploadService.getImg().subscribe(response => {
      this.imgs = response;
    });
  }

  getFiles() {
    this.uploadService.getFile().subscribe(response => {
      this.files = response;
    });
  }

  getPdf() {
    this.uploadService.getPdf().subscribe(response => {
      this.pdfs = response;
    });
  }

  //Modal
  async openPreview(img) {
    const Moodal = await this.modal.create({
      component: ImgComponent,
      cssClass: "modal-fullscreen",
      componentProps: {
        img: img.name
      }
    })

    await Moodal.present();
    await Moodal.onDidDismiss();
    this.getImgs();
  }

  async openPdf(pdf) {
    const Modal = await this.modal.create({
      component: PdfComponent,
      cssClass: "modal-fullscreen",
      componentProps: {
        pdf: pdf.name
      }
    })

    await Modal.present();
    await Modal.onDidDismiss();
    this.getPdf();
  }


  //Buttons
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
    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
  }

  delete(path){
    this.uploadService.delete(path).subscribe(response => {
      this.getImgs();
      this.getFiles();
      this.getPdf();
    });
  }

}
