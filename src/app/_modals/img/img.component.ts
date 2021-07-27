import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {UploadService} from '../../_services/upload.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  img: NavParams;
  link: string | undefined;
  imgs = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('slider', {read: ElementRef})slider: ElementRef;
  url = 'http://192.168.2.50:5000';
  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };
  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    // this.getImgs();
    this.img = this.navParams.get('img');
    this.link = this.url + '/api/get/';

  }
  // getImgs(){
  //   this.uploadService.getImg().subscribe(response => {
  //     this.imgs = response;
  //   });
  // }
  close(){
      this.modal.dismiss();
    }
}
