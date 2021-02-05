import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform, ModalController, LoadingController } from "@ionic/angular";
import { NailaService } from "../../services/naila.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Utils } from "../../services/utils.service";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { Router } from "@angular/router";
import { GeneratedQRcodeModalComponent } from "../../modals/generatedqrcodemodal/generatedqrcodemodal.component";

@Component({
  selector: "app-verifyitstoreproductinfo",
  templateUrl: "./verifyitstoreproductinfo.page.html",
  styleUrls: ["./verifyitstoreproductinfo.page.scss"]
})
export class VerifyitStoreProductInfoPage implements OnInit {
  NFCsuccessmsg;
  NFCListener;
  productdetail;
  canNFC = false;

  disableButton=true
  subscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
    private utilservice: Utils,
    private alertservice: AlertServiceService,
    private router: Router,
    private platform:Platform,
    private modalController: ModalController,
    private apiSvc: NailaService,
    private nfc: NFC,
    private ndef: Ndef,
    private ngZone: NgZone,
    private loading: LoadingController
  ) {
    this.productdetail = {};
    // this.openGeneratedQRcodeModal()
  }
  ngOnInit() { }
  async presentLoading(message) {
    const loading = await this.loading.create({
      message: message,
      // duration: 2000
    });
    await loading.present();
  }

  async openGeneratedQRcodeModal(role) {

    this.utilservice.LoadPageOnrouteChange();

    if (role == "qr") {
      this.utilservice.hidenfc = true;
      this.generateqrcode(role);
    } else {
      this.generateqrcode(role);

      this.utilservice.hidenfc = false;
    }

    // this.utilservice.storage=this.productdetail;
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.NFCListener.unsubscribe();
  }

  generateqrcode(role) {
    this.disableButton=false
    this.presentLoading('Place your NFC Tag on the top of your mobile phone.')
    this.apiSvc.writeNFCQRcodedata(this.productdetail).subscribe(
      async res => {
        console.log(res,'======================')
        this.loading.dismiss();
        this.disableButton=true;
        if (role == "qr") {
          // this.presentLoading();
          this.utilservice.NFCsuccessmsg = false
          // this.value = JSON.stringify(res.id)
          this.utilservice.storage = JSON.stringify(res.id);

          let modal = await this.modalController.create({
            component: GeneratedQRcodeModalComponent
          });
          // this.loading.dismiss();
          return await modal.present();
        } else {
          // this.loading.dismiss();

          // this.writingNFC(JSON.stringify(res.id));
          this.tagListenerSuccess(JSON.stringify(res.id));

          
        }

        // alert('write record success')
        // this.loading.dismiss();

      },
      err => {
        this.disableButton=true;
        this.loading.dismiss()
        this.loading.dismiss();
        // alert("write record scan went wrong");
        this.alertservice.presentAlert("", "write record scan went wrong");
      }
    );
  }
  res: any = {};

  statusMessage;
  // setStatus(message) {
  //   this.alertservice.presentAlert("", message);
  //   this.ngZone.run(() => {
  //     this.statusMessage = message;
  //   });
  // }

  readTag() {
    if (this.canNFC) {
      setTimeout(() => {
        // alert("Please place your mobile near NFC tag.");
        this.alertservice.presentAlert(
          "",
          "Please place your mobile near NFC tag."
        );
        // this.readingTag = true;
        // this.tagListenerSuccess();
      }, 100);
    } else {
      this.alertservice.presentAlert("NFC is not supported by your Device", "");
    }
  }


  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.nfc.enabled().then((resolve) => {
        this.canNFC = true;
        this.setStatus('NFC Compatable.');
      }).catch((reject) => {
        this.canNFC = false;
        // this.helperSvc.showResponseAlert(JSON.stringify("NFC is not supported by your Device"));
        this.setStatus('NFC Not Compatable.');
      });

    });
  }

  // writingNFC(productData) {






















    
  //   // this.presentLoading()
  //   this.nfc
  //     .enabled()
  //     .then(resolve => {
  //       this.canNFC = true;
  //       this.readTag();
  //       // this.setStatus("NFC Compatable.");
  //       // this.tagListenerSuccess();
  //     })
  //     .catch(reject => {
  //       this.canNFC = false;
  //       // this.loading.dismiss()
  //       // this.alertservice.presentAlert("", JSON.stringify("NFC is not supported by your Device"));
  //       // this.setStatus("NFC Not Compatable.");
  //     });
  //   // this.NFCListener =
  //     this.nfc.addNdefListener(
  //       () => {
  //         // this.alertservice.presentAlert("", "Successfully attached NDEF listener.");
  //       },
  //       (err: any) => {
  //         this.loading.dismiss()
  //         this.alertservice.presentAlert("", "error attaching ndef listener.");
  //       }
  //     )
  //       .subscribe(event => {
  //         // this.alertservice.presentAlert("", "received NDF message.");

  //         if (this.canNFC) {
  //           const a = this.ndef.textRecord(productData);
  //           this.nfc
  //             .write([a])
  //             .then(() => {
  //               this.loading.dismiss()
  //               this.router.navigateByUrl('/verifyit-message')
  //               // this.alertservice.presentAlert("", "We wrote to the tag successfully.");
  //               // this.utilservice.NFCsuccessmsg = true
  //             })
  //             .catch((err: any) => {
  //               this.loading.dismiss()
  //               this.alertservice.presentAlert("", "We could not write to the tag.something went wrong");
  //               // this.NFCsuccessmsg =
  //               //   "Product info not written successfully on NFC tag.";
  //             });

  //         }

  //       });

  // }


  tagListenerSuccess(data) {

if(this.platform.is('android')){

  
  
  this.subscriptions.push(this.nfc.addNdefListener()
  .subscribe((tagEvent: any) => {
    // if (this.writingTag) {
      // if (!this.isWriting) {
        // this.isWriting = true;
        const a = this.ndef.textRecord(data);
        
        this.nfc.write([a])
        .then(() => {
          // this.cred.name = '';
          // this.cred.place = '';
          setTimeout(() => {
            // this.helperSvc.showResponseAlert(JSON.stringify('NFC Updated'));
            // this.helperSvc.hideLoading();
            // console.log("written");
            // this.writingTag = false;
            this.router.navigateByUrl('/verifyit-message')
            
            // this.isWriting = false;
          }, 100);
          
        })
        .catch(err => {
          // this.writingTag = false;
          // this.isWriting = false;
          // this.cred.name = '';
          // this.cred.place = '';
          alert('NFC not Connected.');
          // this.helperSvc.hideLoading();
        });
        // }
        
      },
      err => {
        
      })
      );
    }else{

this.readAndWriteNFCIos(data)

      
    }
    }
    
    setStatus(message) {
      console.log(message);
      this.ngZone.run(() => {
        this.statusMessage = message;
      });
    }
    
    // writeTag(writeText: string) {
      
  //   if (this.canNFC) {
  //     this.tagListenerSuccess();
  //     if (this.cred.name && this.cred.place) {
  //       // this.helperSvc.showLoading('Processing. Plese wait.');
  //       this.apiSvc.callPostTag(this.cred.name, this.cred.place).subscribe((res) => {
  //         console.log(res);
  //         // this.helperSvc.hideLoading();
  //         setTimeout(() => {
  //           this.helperSvc.showLoading('Place NFC Tag Near device to write.');
  //           this.writingTag = true;
  //           this.ndefMsg = this.ndef.textRecord(res.id);
  //         }, 100);
  //       });
  //     } else {
  //       // this.helperSvc.showErrorAlert('Name and Place is Required.');
  //     }
  //   } else {
  //     // this.helperSvc.showErrorAlert('NFC is not supported by your Device');
  //   }
  // }
  async readAndWriteNFCIos(data){

    try {
      let tag = await this.nfc.scanNdef({ keepSessionOpen: true});
      // let payload = tag.ndefMessage[0].payload;
      // let tagId = this.nfc.bytesToString(payload).substring(3);
      // // you can read tag data here
      // // alert(tagId);
      // this.nfc.cancelScan();
      // this.getProductInfo(tagId)
      
      // this example writes a new message with a timestamp
      // var message = [
      //     this.ndef.textRecord(data)
      // ];

      // this.nfc.write([message],
    
      //     success => console.log('wrote data to tag'),
      //     error => console.log(error)
      // );

      

      // if (this.writingTag) {
      // if (!this.isWriting) {
        // this.isWriting = true;
        const a = this.ndef.textRecord(data);
        
        this.nfc.write([a])
        .then(() => {
          // this.cred.name = '';
          // this.cred.place = '';
          setTimeout(() => {
            // this.helperSvc.showResponseAlert(JSON.stringify('NFC Updated'));
            // this.helperSvc.hideLoading();
            // console.log("written");
            // this.writingTag = false;
            
            this.router.navigateByUrl('/verifyit-message')
            
            // this.isWriting = false;
          }, 100);
          
        })
        .catch(err => {
          // this.writingTag = false;
          // this.isWriting = false;
          // this.cred.name = '';
          // this.cred.place = '';
          alert('NFC not Connected.');
          // this.helperSvc.hideLoading();
        });
        // }




  } catch (err) {
      console.log(err);
  }
  }

  async presentModal() {
    let modal = await this.modalController.create({
      component: GeneratedQRcodeModalComponent
    });
    return await modal.present();
  }

}
