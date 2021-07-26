import {Component, OnInit} from '@angular/core';
import {UploadService} from '../_services/upload.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  title = 'HomeCloud';
  url = 'http://192.168.1.245:5000';
  link: string | undefined;
  imgs: any;
  file: any;
  name: any;
  imgType: any;
  isIMG = false;
  format: any;
  // eslint-disable-next-line max-len
  // if = '\'img.name.split(\'.\')[1] == \'gif\' || img.name.split(\'.\')[1] == \'jpg\' || img.name.split(\'.\')[1] == \'jpeg\' || img.name.split(\'.\')[1] == \'png\''
  // if = img.name.split('.')[1] == gif || img.name.split('.')[1] == jpg || img.name.split(.)[1] == jpeg || img.name.split(.)[1] == png ;
  constructor(
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.link = this.url + '/api/get/';
    this.getImgs();
  }

  // @ts-ignore
  dataPdf(e) {
    console.log(e);
    this.file = e.target;

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.name = file.name;
    }
  }
  onSubmit() {
    const formData = new FormData();
    if (this.file) {
      formData.append('archivo', this.file.files[0]);
    }
    this.uploadService.uploadFile(formData).subscribe(response => {
      this.getImgs();
    });
  }
  getImgs(){
    this.uploadService.getFile().subscribe(response => {
      this.imgs = response;
    });
  }
}
