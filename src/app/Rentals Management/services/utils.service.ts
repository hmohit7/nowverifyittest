import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';

@Injectable({
  providedIn: 'root'
})
export class Utils {
    storage:any;
    cartdata:any
    bookingdata:any;
    NFCsuccessmsg:any;
    menuTitle
    callgettagresult:any;
    callrecordscanresult:any
    cartitem:any;
    userrole:any;
    productId;
    productCatalogInfo;
    hidenfc
    userType:any;
    LoadPage:EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private appSettings: MainAppSetting
  ) { 
    this.cartitem=[];
    this.cartdata=0;
  }

  

  LoadPageOnrouteChange(){
    console.log('ios working and verifyit')
    this.LoadPage.next(true)
  }


}
