import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx'
import * as moment from 'moment';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { CreateNoticeComponent } from '../../modals/create-notice/create-notice.component';
import { translateService } from 'src/app/common-services/translate /translate-service.service';
import { Storage } from '@ionic/storage';
import { RentalsUserService } from '../../services/rentals-user.service';
import { Device } from '@ionic-native/device/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ViewChild } from '@angular/core';
import { NailaService } from '../../services/naila.service';
import { Utils } from '../../services/utils.service';
// import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-verifyitproductcatalog',
  templateUrl: './verifyitproductcatalog.html',
  styleUrls: ['./verifyitproductcatalog.scss'],
})


export class VerifyitProductCatalogPage {



  constructor(private nailaservice: NailaService,private utils:Utils, private router:Router) {

  }
  searchTerm
  listbanner:any;


  ngOnInit() {
    
    this.nailaservice.listRelatedProducts(this.utils.productId).subscribe(data => {
    this.listbanner=data;
    this.items=this.listbanner.data
      this.listbanner.data.forEach(element => {
        element.name= element.product_name
      });
    console.log(this.listbanner);
    })



  }
  items
  setFilteredItems() {
    this.items = this.listbanner.data;
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  showProductInfo(item){
    this.utils.productCatalogInfo=item;
    this.router.navigateByUrl('/verifyit-product-catalog-info')
  }
}
