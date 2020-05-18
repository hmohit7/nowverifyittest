import { ApplicationPageModule } from '../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NailaoffersListingPage } from './nailaofferslisting';


const routes: Routes = [
  {
    path: '',
    component: NailaoffersListingPage
  }
];

@NgModule({
  entryComponents: [CreateNoticeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BarcodeScanner
  ],
  declarations: [NailaoffersListingPage]
})
export class NailaoffersListingPageModule { }
