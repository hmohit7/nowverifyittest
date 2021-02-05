import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../services/notice.service';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { ProjectSearchPage } from '../../pages/project-search/project-search.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { translateService } from 'src/app/common-services/translate /translate-service.service';
import { Utils } from '../../services/utils.service';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NailaService } from '../../services/naila.service';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
// import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-tellusifyoubuyit',
  templateUrl: './tellusifyoubuyit.component.html',
  styleUrls: ['./tellusifyoubuyit.component.scss'],
})
export class TellUsifyouBuyitComponent implements OnInit {
  title = 'Nowverifyit';
  NFCsuccessmsg
  hidebutton = true
  canNFC = false;
  elementType = 'elementType';
  value = 'QR code not generated successfully';
  flag: boolean = false;
  public images: any[] = [];


  constructor(
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    private noticeService: NoticeService,
    private router: Router,
    private alertService: AlertServiceService,
    private route: ActivatedRoute,
    public webView: WebView,
    private utils: Utils,
    public transService: translateService,
    private actionSheet: ActionSheetController,
    private screenshot: Screenshot,
    private apiSvc: NailaService,
    // private nfc: NFC,
    // private ndef: Ndef,
    // private ngZone: NgZone,
  ) {
    // this.ionViewDidLoad()

    // this.ionViewDidLoad()
  }
  usercontactNumber
  ngOnInit() {
    // this.value = this.utils.storage

    // this.takescreenshot()
    //     this.utils.LoadPage.subscribe(data=>{
    // // this.ionViewDidLoad()
    //      })



    if (window.localStorage.getItem('mobile')) {
      this.usercontactNumber = window.localStorage.getItem('mobile')
    } else {
      this.usercontactNumber = ''

    }

  }

  hasLoading = false


  hidenfc = true;

  ionViewWillEnter() {
    // this.alertService.presentAlert("",'dgdsgd'+)
    if (this.utils.NFCsuccessmsg) {
      this.hidenfc = false
    } else {
      this.hidenfc = true

    }
  }

  async presentLoading() {
    this.loadingCtrl.create({
      spinner: "lines"

    }).then(loading => {
      loading.present();
    });
  }
  async closeModal() {
    await this.modalController.dismiss();
  }




  takescreenshot() {
    this.hidebutton = false


    setTimeout(() => {

      this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(onSuccess => {
        this.hidebutton = true

        this.alertService.presentAlert("", 'Screenshot done successfully')
      }, onError => {
        this.alertService.presentAlert("", 'error')
      });

    }, 900);



  }

  generateOTP() {
    this.showOTP = false;
    this.apiSvc.genetateOTP(this.usercontactNumber).subscribe((res) => {
      // this.showOTP = true
    }, err => {

    });
  }

  mobileOTP = '';
  showOTP = true;







  submitOTP() {
    let otpData = {
      otp: Number(this.mobileOTP),
      tagId: window.localStorage.getItem('tagId')
    }

    this.apiSvc.submitOTP(otpData).subscribe((res) => {


      if (res.error == 1) {
        this.alertService.presentAlert('', res.description)
      } else {

        // this.showOTP = false;
        this.alertService.presentAlert('', 'Thank you so much for letting us know about your purchase. We wish you a great buying experience.')

        this.modalController.dismiss();
        this.router.navigateByUrl('/');
      }





    });
  }

}
