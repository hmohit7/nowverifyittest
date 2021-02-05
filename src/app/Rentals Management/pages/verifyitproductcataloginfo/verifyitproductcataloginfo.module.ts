import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
// import { VerifyitProductInfoPage } from './verifyitProductinfo.page';
// import { TellUsifyouBuyitComponent } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';
import { VerifyitProductCatalogInfoPage } from './verifyitproductcataloginfo.page';
// import { VerifyitProductCatalogInfoPage } from './verifyitproductcatalog.page';



const routes: Routes = [
  {
    path: '',
    component: VerifyitProductCatalogInfoPage
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
    // BarcodeScanner
    // TellUsifyouBuyitComponent
  ],
  declarations: [VerifyitProductCatalogInfoPage]
})
export class VerifyitProductCatalogInfoPageModule { }
