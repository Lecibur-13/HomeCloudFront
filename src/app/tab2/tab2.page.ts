import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';
import Masonry from 'masonry-layout';
import {ModalController} from '@ionic/angular';
import {ImgComponent} from '../_modals/img/img.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  title = 'Images';
  url = 'http://192.168.2.50:5000';
  link: string | undefined;
  imgs: any;
  file: any;
  name: any;
  // @ts-ignore
  constructor(
    private uploadService: UploadService,
    private modal: ModalController
  ) {}

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
    let index = 0;
    if (index === 0){
      index += 1;
      this.ngOnInit();
    }
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
