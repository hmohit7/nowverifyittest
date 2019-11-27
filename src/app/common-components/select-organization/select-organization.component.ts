import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrls: ['./select-organization.component.scss'],
})
export class SelectOrganizationComponent implements OnInit {


  @Input() data


  constructor(
    private popOver: PopoverController
  ) { }

  ngOnInit() {
    console.log('====================================');
    console.log(this.data);
    console.log('====================================');
  }
  async close(data?: any) {
    if (data) {
      const orgData: any = {
        type: data
      }
      await data == 'bm' ? orgData.bm = this.data.bm : data == 'rm' ? orgData.rm = this.data.rm : ''
      this.popOver.dismiss(orgData, data)

    } else {
      this.popOver.dismiss()
    }
  }

}
