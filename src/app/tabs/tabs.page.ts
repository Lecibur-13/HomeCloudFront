import {Component, ViewChild} from '@angular/core';
import {Tab2Page} from "../tab2/tab2.page";
import {IonTabs} from "@ionic/angular";
import {Tab3Page} from "../tab3/tab3.page";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
@ViewChild('tabs', { static: false }) tabs: IonTabs;
  constructor(
    public tab2: Tab2Page,
    public tab3: Tab3Page
  ) {}

  setCurrentTab() {
    this.tab2.getImgs();
    this.tab2.masonry();

    this.tab3.getPdf();
    this.tab3.getFiles();
  }
}
