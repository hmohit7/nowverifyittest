import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { NailaService } from '../../services/naila.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Utils } from '../../services/utils.service';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TellUsifyouBuyitComponent } from '../../modals/tellusifyoubuyit/tellusifyoubuyit.component';
@Component({
  selector: 'app-verifyitProductinfo',
  templateUrl: './verifyitProductinfo.page.html',
  styleUrls: ['./verifyitProductinfo.page.scss'],
})
export class VerifyitProductInfoPage {

  cred = {
    "tagId": null, "verified": null,
    "product_name": null, "manufactured": null, "model_number": null, "serial_number": null, "brand": null, "img": {
      "default":

      {
        "main": null,


      }

    }, "product_details": { "water_resistant": null, "display_type": null, "series": null, "occassion": null, "strap": null }, "how_to_use_it": { "english": null, "spanish": null, "portugues": null }
  };
  credKeys = { "key12": null, "key1": null, "key2": null, "key3": null, "key4": null, "key5": null, "key6": null, "key7": null, "key8": null, "key9": null, "key10": null, "key11": null, "key13": null };





  canNFC = false;
  statusMessage: string;
  tag: any;
  decodedTagId: string;
  readedMsg: string;
  jsonToBeUsed = [];
  // trying
  callgettagresult={}
  readingTag: boolean = false;
  writingTag: boolean = false;
  isWriting: boolean = false;
  writtenInput = '';
  ndefMsg: any;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    private ngZone: NgZone,
    private qrScanner: QRScanner,
    private utilservice: Utils,
    private alertService: AlertServiceService,
    private router: Router,
    public alertController: AlertController,
    private apiSvc: NailaService,
    private modalController:ModalController
  ) {
    // this.ionViewDidLoad()
    this.callgettagresult  =  ( this.utilservice.callgettagresult)

    // this.callgettagresult  =  JSON.parse(this.callgettagresult)
    console.log(this.callgettagresult)

    if(this.utilservice.callgettagresult.meta_data){

      // this.callgettagresult= this.callgettagresult
      Object.keys(this.utilservice.callgettagresult.meta_data).forEach(e=> this.jsonToBeUsed.push({key:e , value: this.utilservice.callgettagresult.meta_data[e]}))
    }else{
      
    }
  

  //   for (var type in this.callgettagresult) {
  //    let item = {
  //     key: '',
  //     value: ''
  //    };
  //     item.key = type;
  //     item.value = this.callgettagresult[type];
  //     this.jsonToBeUsed.push(item);
  // }
  console.log(this.jsonToBeUsed)
    this.credKeys.key1 = "Product Name";
    this.credKeys.key2 = "Model Number";
    this.credKeys.key3 = "Serial Number";
    this.credKeys.key4 = "Brand";


    
    this.credKeys.key5 = "Water Resistant";
    this.credKeys.key6 = "Display Type";
    this.credKeys.key7 = "Series";
    this.credKeys.key8 = "Occassion";
    this.credKeys.key9 = "Strap";
    this.credKeys.key10 = "Manufactured";
    this.credKeys.key11 = "Instructions";
    this.credKeys.key12 = "Wine Information";
    this.credKeys.key13 = "Verified";

  }

  // ionViewDidLoad() {
  //   debugger

  //   this.platform.ready().then(() => {
  //     this.nfc.enabled().then((resolve) => {
  //       this.canNFC = true;
  //       this.setStatus('NFC Compatable.');
  //       this.tagListenerSuccess();
  //     }).catch((reject) => {
  //       this.canNFC = false;
  //       this.alertService.presentAlert('',JSON.stringify("NFC is not supported by your Device"));
  //       this.setStatus('NFC Not Compatable.');
  //     });

  //   });
  // }
  res: any = {
  }
  // tagListenerSuccess() {
  //   this.subscriptions.push(this.nfc.addNdefListener()
  //     .subscribe(data => {
  //       if (this.readingTag) {
  //         let payload = data.tag.ndefMessage[0].payload;
  //         let tagId = this.nfc.bytesToString(payload).substring(3);
  //         this.readingTag = false;
  //         this.apiSvc.callGetTag(tagId).subscribe((res) => {
  //           this.res = res
  //           this.cred.product_name = this.res.product_name;
  //           this.alertService.presentAlert('',this.cred.product_name)
  //           this.cred.verified = this.res.verified;
  //           this.cred.tagId = tagId;
  //           // this.apiSvc.callRecordScan(tagId).subscribe((res) => {
  //           // });
  //           this.cred.model_number = this.res.model_number;
  //           this.cred.serial_number = this.res.serial_number;
  //           this.cred.brand = this.res.brand;
  //           this.cred.img = this.res.img;
  //           this.cred.product_details = this.res.product_details;
  //           this.cred.how_to_use_it = this.res.how_to_use_it;
  //           this.cred.manufactured = this.res.manufactured;
  //           this.credKeys.key1 = "Product Name";
  //           this.credKeys.key2 = "Model Number";
  //           this.credKeys.key3 = "Serial Number";
  //           this.credKeys.key4 = "Brand";
  //           this.credKeys.key5 = "Water Resistant";
  //           this.credKeys.key6 = "Display Type";
  //           this.credKeys.key7 = "Series";
  //           this.credKeys.key8 = "Occassion";
  //           this.credKeys.key9 = "Strap";
  //           this.credKeys.key10 = "Manufactured";
  //           this.credKeys.key11 = "Instructions";
  //           this.credKeys.key12 = "Wine Information";
  //           this.credKeys.key13 = "Verified";
  //           // this.helperSvc.hideLoading();
  //         });
  //       }
  //     },
  //       err => {

  //       })
  //   );
  // }

  setStatus(message) {
    this.alertService.presentAlert('', message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  async presentAlertBoughtIt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'Mobile',
          type: 'tel',
          min: -5,
          max: 10
        },
      
      ],    
       buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: (alertData) => { //takes the data 
                console.log(alertData.Mobile);
            }
            }
          ]
  });
  await alert.present();
  }


  showCatalog(id){
    this.utilservice.productId=id;
    this.router.navigateByUrl('/verifyit-product-catalog')
  }
  // readTag() {
  //   if (this.canNFC) {
  //     setTimeout(() => {
  //       this.alertService.presentAlert('','Connecting with Server.....');
  //       this.readingTag = true;
  //       this.tagListenerSuccess();
  //     }, 100);

  //   } else {
  //     this.alertService.presentAlert('','NFC is not supported by your Device');
  //   }
  // }

  // boughtIt(tagId){
  //       this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
  //         this.alertService.presentAlert('',res);
  //         // this.helperSvc.hideLoading();
  //   });
  //   // this.navCtrl.push(ThankyouPage,{})
  //   this.alertService.presentAlert('','thank you')

  // }


  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }



  // scanqrcode() {
  //   var context = this;
  //   // Optionally request the permission early
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {

  //       if (status.authorized) {
  //         // camera permission was granted
  //         this.alertService.presentAlert('',"scanning");
  //         var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
  //         // start scanning
  //         let scanSub = this.qrScanner.scan().subscribe((scannedAddress: string) => {
  //           this.alertService.presentAlert('',scannedAddress);
  //           // this.friendAddress = scannedAddress;
  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //           ionApp.style.display = "block";
  //           // this.friendAddressInput.setFocus();
  //         });

  //         // show camera preview
  //         ionApp.style.display = "none";
  //         context.qrScanner.show();
  //         // setTimeout(() => {
  //         //   ionApp.style.display = "block";
  //         //   scanSub.unsubscribe(); // stop scanning
  //         //   // context.friendAddressInput.setFocus();
  //         //   context.qrScanner.hide();
  //         // }, 500000);
  //         // wait for user to scan something, then the observable callback will be called

  //       } else if (status.denied) {
  //         this.alertService.presentAlert('',"Denied permission to access camera");
  //       } else {
  //         this.alertService.presentAlert('',"Something else is happening with the camera");
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));


  // }
  async boughtIt(tagId) {
    this.apiSvc.callPostBoughtIt(tagId).subscribe((res) => {
      console.log(res);
      this.alertService.presentAlert('', 'Thank you so much for letting us know about your purchase. We wish you a great buying experience.')
      this.router.navigateByUrl('/');
      // this.helperSvc.hideLoading();
    });
    // this.navCtrl.push(ThankyouPage,{})

  }


  async presentModal() {
    let modal = await this.modalController.create({
      component: TellUsifyouBuyitComponent
    });
    return await modal.present();
  }
}
