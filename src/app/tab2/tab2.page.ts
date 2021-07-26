import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  title = 'HomeCloud';
  url = 'http://192.168.1.245:5000';
  link: string | undefined;
  imgs: any;
  file: any;
  name: any;

  constructor(
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.link = this.url + '/api/get/';
    this.getImgs();
  }
  getImgs(){
    this.uploadService.getFile().subscribe(response => {
      this.imgs = response;
      // this.type = this.imgs[1].name.split('.')[(this.imgs[1].name.split('.').length)-1];
    });
  }
}
