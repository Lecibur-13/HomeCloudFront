import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {environment} from "../../../environments/environment";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {UploadService} from "../../_services/upload.service";
import {Tab1Page} from "../../tab1/tab1.page";
import {Tab2Page} from "../../tab2/tab2.page";
import {Tab3Page} from "../../tab3/tab3.page";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  img: string;
  link: string | undefined;
  imgs = [];
  type: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('slider', {read: ElementRef})slider: ElementRef;
  url: any;
  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };
  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private uploadService: UploadService,

    private tab1: Tab1Page,
    private tab2: Tab2Page,
    private tab3: Tab3Page,
  ) {
    this.url = environment.URL
  }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.type= this.navParams.get('imgtype');
    this.link = this.url + '/api/get/';
  }

    async download() {
      const response = await fetch(this.link + this.img);
      const blob = await response.blob();
      const base64Data = await this.convertBlobToBase64(blob) as string;
      this.write(base64Data);
  }

  delete(){
    this.uploadService.delete(this.img).subscribe(response => {
      this.close()
    });
  }
  // helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async write(base64Data){
    await Filesystem.writeFile({
          path: this.img,
          data: base64Data,
          directory: Directory.Documents
        } );
  }



  close(){
      this.modal.dismiss();
    }
}
