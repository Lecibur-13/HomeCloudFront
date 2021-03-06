import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {Tab2Page} from './tab2/tab2.page';
import {CommonModule} from '@angular/common';
import {ImgComponent} from './_modals/img/img.component';
import {PdfComponent} from './_modals/pdf/pdf.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {Downloader} from '@ionic-native/downloader/ngx';
import {Tab1Page} from "./tab1/tab1.page";
import {Tab3Page} from "./tab3/tab3.page";

@NgModule({
  declarations: [AppComponent, ImgComponent, PdfComponent],
  entryComponents: [],
  imports: [BrowserModule, PdfJsViewerModule, CommonModule , IonicModule.forRoot({mode: 'ios'}), AppRoutingModule, HttpClientModule],
  providers: [Tab1Page,Tab2Page,Tab3Page, Downloader,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
