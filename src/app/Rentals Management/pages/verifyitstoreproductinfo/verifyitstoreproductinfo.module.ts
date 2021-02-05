import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitStoreProductInfoPage } from './verifyitstoreproductinfo.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { GeneratedQRcodeModalComponent } from '../../modals/generatedqrcodemodal/generatedqrcodemodal.component';
// import { VerifyitStoreProductInfoPage } from '../verifyitProductinfo/verifyitProductinfo.page';
// import { VerifyitStoreProductInfoPage } from './verifyitProductinfo.page';



const routes: Routes = [
  {
    path: '',
    component: VerifyitStoreProductInfoPage
  }
];

@NgModule({
  entryComponents: [CreateNoticeComponent,GeneratedQRcodeModalComponent],
  imports: [
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner
    GeneratedQRcodeModalComponent

  ],
  declarations: [VerifyitStoreProductInfoPage,GeneratedQRcodeModalComponent]
})
export class VerifyitStoreProductInfoPageModule { }
