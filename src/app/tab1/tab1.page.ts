import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';
import {ImgComponent} from '../_modals/img/img.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  title = 'HomeCloud';
  url = 'http://192.168.2.50:5000';
  link: any;
  imgs: any;
  files: any;
  pdfs: any;
  file: any;
  name: any;
  constructor(
    private uploadService: UploadService,
    private modal: ModalController
  ) {}

  ngOnInit(): void {
    this.link = this.url + '/api/get/';
    this.getImgs();
    this.getFiles();
    this.getPdf();
  }

  // @ts-ignore
  dataPdf(e) {
    this.file = e.target;
    if (e.target.files && e.target.files) {
      const file = e.target.files;
      this.name = file.name;
    }
  }
  onSubmit() {
    const formData = new FormData();
    if (this.file) {
      for(let i = 0; i < this.file.files.length; i++ ){
        formData.append('archivo', this.file.files[i]);
      }
    }
    this.uploadService.uploadFile(formData).subscribe(response => {
      this.getImgs();
      this.getFiles();
      this.getPdf();
    });
  }
 getImgs(){
    this.uploadService.getImg().subscribe(response => {
      this.imgs = response;
    });
  }
  getFiles(){
    this.uploadService.getFile().subscribe(response => {
      this.files = response;
    });
  }
   getPdf(){
    this.uploadService.getPdf().subscribe(response => {
      this.pdfs = response;
    });
  }
    openPreview(img){
    this.modal.create({
      component: ImgComponent,
      componentProps: {
        img: img.name
      }
    }).then(modal => modal.present());
  }
}
