import { Component, OnInit } from "@angular/core";

import { Platform, NavController, LoadingController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "./common-services/storage-service.service";
import { Storage } from "@ionic/storage";
import { RentalsUserService } from "./Rentals Management/services/rentals-user.service";
import { AlertServiceService } from "./common-services/alert-service.service";
import { BuildingUserService } from "./Building-Management/services/building-user.service";
import { Utils } from "./Rentals Management/services/utils.service";
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
declare var wkWebView: any;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  userrole;



  public appPages = {
    name: "",

    phoneNumber: localStorage.getItem("phoneNumber"),
    pages: [
      //     {
      //   title: "Home",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/home.svg",
      //   userrole: 'default'
      // },
      {
        title: "Read NFC/QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whitenfc.png",
        userrole: 'default'
      },
      {
        title: "Write NFC/QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whitenfc.png",
        userrole: '2'
      },
      // {
      //   title: "Read QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      // {
      //   title: "Write QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      {
        title: "Account",
        url: `verifyit-account`,
        src: "assets/imgs/profile1.svg",
        userrole: "default"
      }
      // {
      //   title: 'Tickets',
      // url: `rentals-naila-ticket-page`,
      //   src: '/assets/imgs/business.svg'
      // },
      // {
      //   title: 'app-component.contact-us',
      // url: `-contact-us`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Project ',
      // url: `-my-data-project`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Bookings',
      //   url: `rentals-naila-beaut-booking-page`,
      //   src: '/assets/imgs/bookings.svg',
      //   userrole:'Beautician'
      // },
      // {
      //   title: 'Attendance',
      //   url: `rentals-naila-beaut-attendance-page`,
      //   src: '/assets/imgs/business.svg',
      //   userrole:'Beautician'

      // },
      // {
      //   title: 'Log Out',
      //   // url: `rentals-naila-cart-page`,
      //   src: '/assets/imgs/logoutsearch.svg'
      // }
    ]
  };


  public appPages2 = {
    name: "",

    phoneNumber: localStorage.getItem("phoneNumber"),
    pages: [
      //     {
      //   title: "Home",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/home.svg",
      //   userrole: 'default'
      // },
      {
        title: "Read QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whiteqrcode.png",
        userrole: 'default'
      },
      {
        title: "Write QR",
        url: `verifyit-dashboard`,
        src: "/assets/imgs/whiteqrcode.png",
        userrole: '2'
      },
      // {
      //   title: "Read QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      // {
      //   title: "Write QR",
      //   url: `verifyit-dashboard`,
      //   src: "/assets/imgs/whiteqrcode.jpg",
      //   userrole: window.localStorage.getItem("userType")
      // },
      {
        title: "Account",
        url: `verifyit-account`,
        src: "assets/imgs/profile1.svg",
        userrole: "default"
      }
      // {
      //   title: 'Tickets',
      // url: `rentals-naila-ticket-page`,
      //   src: '/assets/imgs/business.svg'
      // },
      // {
      //   title: 'app-component.contact-us',
      // url: `-contact-us`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Project ',
      // url: `-my-data-project`,
      //   src: '/assets/icon/phone.png'
      // },
      // {
      //   title: 'Bookings',
      //   url: `rentals-naila-beaut-booking-page`,
      //   src: '/assets/imgs/bookings.svg',
      //   userrole:'Beautician'
      // },
      // {
      //   title: 'Attendance',
      //   url: `rentals-naila-beaut-attendance-page`,
      //   src: '/assets/imgs/business.svg',
      //   userrole:'Beautician'

      // },
      // {
      //   title: 'Log Out',
      //   // url: `rentals-naila-cart-page`,
      //   src: '/assets/imgs/logoutsearch.svg'
      // }
    ]
  };

  username = '';
  showMenulist;

  ngOnInit() {
    this.utils.LoadPage.subscribe(data => {
      if (window.localStorage.getItem("userType")) {
        this.userrole = window.localStorage.getItem("userType");
        this.username = window.localStorage.getItem("name");
        this.showMenulist = true;
        this.ionViewDidLoad()
      } else {
        this.showMenulist = false;
        this.ionViewDidLoad();
      }
    });

    if (!window.localStorage.getItem("userType")) {
      this.userrole = window.localStorage.setItem("userType", "1");
    }
    this.username = window.localStorage.getItem("name");
    this.userrole = window.localStorage.getItem("userType");
    this.initializeApp();
  }


  public appSrc;
  // options: PushOptions = {
  //   android: {},
  //   ios: {
  //   },
  // }
  // pushObject: PushObject = this.push.init(this.options);

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController,
    public translate: TranslateService,
    private storageService: StorageService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private rentalsUserService: RentalsUserService,
    private alertService: AlertServiceService,
    private buildingUserService: BuildingUserService,
    private utils: Utils
  ) // private push: Push
  { }

  // ionViewWillEnter(){
  //   this.toggleRole('');
  // }
  populatemenu = true;
  p = {
    userrole: ""
  };
  toggleRole(role, title) {
    // this.populatemenu=!this.populatemenu

    if (role == "2") {
      this.p.userrole = "1";
    } else if (role == "1") {
      this.p.userrole = "2";
    }
    // if (title != "Account") {

    //   this.utils.LoadPageOnrouteChange();
    // }else
    if (title == 'Read NFC/QR') {
      debugger
      this.utils.menuTitle = 'Read NFC/QR'
      this.utils.LoadPageOnrouteChange();

    } else if (title == 'Write NFC/QR') {
      this.utils.menuTitle = 'Write NFC/QR'
      this.utils.LoadPageOnrouteChange();
    } else if (title == 'Write QR') {
      this.utils.menuTitle = 'Write NFC/QR'
      this.utils.LoadPageOnrouteChange();
    } else if (title == 'Read QR') {
      debugger
      this.utils.menuTitle = 'Read NFC/QR'
      this.utils.LoadPageOnrouteChange();

    }


  }

  firstname;
  async ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.nfc
        .enabled()
        .then(resolve => {
          this.canNFC = true;

        })
        .catch(reject => {
          this.canNFC = false;

        });
    });



  }

  async presentLoading() {
    await this.loadingCtrl
      .create({
        spinner: "lines"
      })
      .then(loading => {
        loading.present();
      });
  }

  async routeForword(url) {
    await this.storageService.getDatafromIonicStorage("appSrc").then(val => {
      this.appSrc = val;
      console.log("-----------------", val);
      this.router.navigateByUrl(`${url}`);
      // this.router.navigateByUrl(`${this.appSrc}${url}`)
    });
  }
  canNFC = false;
  async initializeApp() {
    await this.ionViewDidLoad()
    let isLoggedIn: string;
    this.platform.ready().then(async () => {




      if (this.platform.is('ios')) {


        console.log('trueeeeeeeeeeeeeee====================================')
        wkWebView.injectCookie('http://www.nowverifyit.com/');
        console.log('trueeeeeeeeeeeeeee====================================')

      }
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString("#ffffff");
      this._initTranslate();
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.redirectToHomeOrLogin(isLoggedIn);

      
      // await this.storageService.getDatafromIonicStorage('isLoggedIn').then(val => {
      //   isLoggedIn = val;
      //   console.log(typeof val);

      // })
      // await this.storageService.getDatafromIonicStorage('appSrc').then(val => {
      //   this.appSrc = val;
      // })
      // await isLoggedIn == 'true' ? this.navCtrl.navigateRoot('/rentals-naila-search-page') : this.navCtrl.navigateRoot('/login');
      // await isLoggedIn == 'true' ? this.navCtrl.navigateRoot(`/${this.appSrc}-naila-search-page`) : this.navCtrl.navigateRoot('/login');
      // if(isLoggedIn){

      //   // this.redirectToHomeOrLogin(isLoggedIn);
      // }
    });
  }
  redirectToHomeOrLogin(isLoggedIn) {
    window.localStorage.getItem("uid");
    const registereduser = window.localStorage.getItem("registereduser");
    if (window.localStorage.getItem("user_type") == "Beautician") {
      registereduser == "true"
        ? this.navCtrl.navigateRoot("/rentals-naila-beaut-booking-page")
        : this.navCtrl.navigateRoot("/login");
    } else if (window.localStorage.getItem("user_type") == "Customer") {
      registereduser == "true"
        ? this.navCtrl.navigateRoot("/rentals-naila-search-page")
        : this.navCtrl.navigateRoot("/login");
    }

    if (
      window.localStorage.getItem("cartitem") &&
      window.localStorage.getItem("cartitemcount")
    ) {
      this.utils.cartitem = JSON.parse(window.localStorage.getItem("cartitem"));
      this.utils.cartdata = window.localStorage.getItem("cartitemcount");
    }
  }
  // logout() {
  //   window.localStorage.clear()
  //   this.storage.clear()
  //   this.router.navigateByUrl('/login')
  // }

  async logOut() {
    await this.presentLoading();

    window.localStorage.clear();
    this.router.navigateByUrl("/login");
    await this.loadingCtrl.dismiss();

    //   this.storage.clear()
    //   this.router.navigateByUrl('/login')
    // let userId;
    // await this.storageService.getDatafromIonicStorage('user_id').then(val => {
    //   userId = val;
    // })
    // this.storageService.getDatafromIonicStorage('appSrc').then(val => {
    //   if (val == 'rentals') {
    //     this.rentalsUserService.getUserById(userId).subscribe(async data => {
    //       if (data.businessAppDevice.pushToken) {
    //         delete data.businessAppDevice
    //         console.log(data);
    //         this.updateUser(val, data)
    //       } else {
    //         await this.loadingCtrl.dismiss()
    //         window.localStorage.clear();
    //         await this.storageService.emptyStorage()
    //         this.navCtrl.navigateRoot('/login');
    //       }

    //     })
    //   } else if (val == 'building-management') {
    //     this.buildingUserService.getUserById(userId).subscribe(async data => {
    //       if (data.businessAppDevice.pushToken) {
    //         delete data.businessAppDevice
    //         console.log(data);
    //         this.updateUser(val, data)
    //       } else {
    //         await this.loadingCtrl.dismiss()
    //         window.localStorage.clear();
    //         await this.storageService.emptyStorage()
    //         this.navCtrl.navigateRoot('/login');
    //       }
    //     })
    //   }

    // })
    // window.localStorage.clear();
    // await this.storage.clear()
    // this.navCtrl.navigateRoot('/login');
  }

  async updateUser(val, data) {
    if (val == "rentals") {
      this.rentalsUserService.updateUser(data).subscribe(
        async (data: any) => {
          await this.loadingCtrl.dismiss();
          window.localStorage.clear();
          await this.storage.clear();
          this.navCtrl.navigateRoot("/login");
        },
        async err => {
          await this.loadingCtrl.dismiss();
          this.alertService.presentAlert("", "Error while logging out");
        }
      );
    } else if (val == "building-management") {
      this.buildingUserService.updateUser(data).subscribe(
        async (data: any) => {
          await this.loadingCtrl.dismiss();
          window.localStorage.clear();
          await this.storage.clear();
          this.navCtrl.navigateRoot("/login");
        },
        async err => {
          await this.loadingCtrl.dismiss();
          this.alertService.presentAlert("", "Error while logging out");
        }
      );
    }
  }

  private _initTranslate() {
    this.translate.setDefaultLang("en");
    this.translate.use("en"); // Set your language here
  }

  navigatetologinpage() {
    this.router.navigateByUrl("/login");
  }
}
