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
  }

  ngOnInit(){
    this.link = this.url + '/api/get/';
    this.getImgs();
    setTimeout(() => {
      this.masonry();
    }, 120);
  }
  init(){
    this.link = this.url + '/api/get/';
    this.getImgs();
    setTimeout(() => {
      this.masonry();
    }, 120);
  }
  getImgs(){
    this.uploadService.getImg().subscribe(response => {
      this.imgs = response;
    });
  }
  masonry(){
    const elem = document.querySelector('.grid-container');
      const msnry = new Masonry(elem, {
        // options...
        itemSelector: '.grid-item',
        fitWidth: true,
      });
  }
  initt(){

    if (this.index ){
      this.index = false;
      this.ngOnInit();
    }
  }

  openPreview(img){
    this.modal.create({
      component: ImgComponent,
      cssClass: "modal-fullscreen",
      componentProps: {
        img: img.name
      }
    }).then(modal => modal.present());
  }
}
