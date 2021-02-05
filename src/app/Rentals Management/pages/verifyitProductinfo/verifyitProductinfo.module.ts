import { ApplicationPageModule } from './../../ApplicationPageModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { VerifyitProductInfoPage } from './verifyitProductinfo.page';
import { TellUsifyouBuyitComponent } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';



const routes: Routes = [
  {
    path: '',
    component: VerifyitProductInfoPage
  }
];

@NgModule({
  entryComponents: [CreateNoticeComponent,TellUsifyouBuyitComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPageModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // BarcodeScanner
    TellUsifyouBuyitComponent
  ],
  declarations: [VerifyitProductInfoPage,TellUsifyouBuyitComponent]
})
export class VerifyitProductInfoPageModule { }
