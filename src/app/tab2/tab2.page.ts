import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';
import Masonry from 'masonry-layout';
import {ModalController} from '@ionic/angular';
import {ImgComponent} from '../_modals/img/img.component';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  title = 'Images';
  url: any;
  link: string | undefined;
  imgs: any;
  file: any;
  name: any;
  index = true;
  // @ts-ignore
  constructor(
    private uploadService: UploadService,
    private modal: ModalController
  ) {
    this.url = environment.URL

    this.link = this.url + '/api/get/';
    this.getImgs();
    setTimeout(() => {
      this.masonry();
    }, 200);
  }

  ngOnInit(){
    this.link = this.url + '/api/get/';
    this.getImgs();
    setTimeout(() => {
      this.masonry();
    }, 200);
  }
  init(){
    this.link = this.url + '/api/get/';
    setTimeout(() => {
      this.masonry();
    }, 520);
  }
  getImgs(){
    this.uploadService.getImg().subscribe(response => {
      this.imgs = response;
    });
  }
  masonry(){
    const elem = document.querySelector('.grid-container');
      const msnry = new Masonry(elem, {
        itemSelector: '.grid-item',
        columnWidth: 10,
        fitWidth: true
      });
  }
  doRefresh(event) {
      this.getImgs();
      this.masonry();
    setTimeout(() => {
      this.masonry();
      event.target.complete();
    }, 1500);
  }

  openPreview(img){
    console.log(img.type)
    this.modal.create({
      component: ImgComponent,
      cssClass: "modal-fullscreen",
      componentProps: {
        img: img.name,
        imgtype: img.type
      }
    }).then(modal => modal.present());
  }
}
