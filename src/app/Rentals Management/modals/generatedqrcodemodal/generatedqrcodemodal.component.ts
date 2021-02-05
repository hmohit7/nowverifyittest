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
  selector: 'app-generatedqrcodemodal',
  templateUrl: './generatedqrcodemodal.component.html',
  styleUrls: ['./generatedqrcodemodal.component.scss'],
})
export class GeneratedQRcodeModalComponent implements OnInit {
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
    private nviservice: NailaService,
    // private nfc: NFC,
    // private ndef: Ndef,
    // private ngZone: NgZone,
  ) {
    // this.ionViewDidLoad()

    // this.ionViewDidLoad()
  }

  ngOnInit() {
    this.value=this.utils.storage

    // this.takescreenshot()
//     this.utils.LoadPage.subscribe(data=>{
// // this.ionViewDidLoad()
//      })

  }

hasLoading=false


hidenfc=true;

  ionViewWillEnter() {
    // this.alertService.presentAlert("",'dgdsgd'+)
    if(this.utils.NFCsuccessmsg){
      this.hidenfc = false
    }else{
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

        this.alertService.presentAlert("",'Screenshot done successfully')
      }, onError => {
        this.alertService.presentAlert("",'error')
      });

    }, 900);



  }
  


}
