import { Component } from '@angular/core';
import {Tab2Page} from "../tab2/tab2.page";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private tab2: Tab2Page
  ) {}
  active(){
    this.tab2.getImgs();
  }
}
