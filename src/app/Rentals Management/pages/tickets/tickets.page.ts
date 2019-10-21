import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { TicketFilterPage } from '../../pages/ticket-filter/ticket-filter.page';
import { AlertServiceService } from 'src/app/common-services/alert-service.service';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { translateService } from 'src/app/common-services/translate /translate-service.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  tickets: any[] = [];
  disableInfiniteScroll = false;
  public noTicket: boolean = false;
  filterData: any = {
    skip: 0,
    status: ['open', 'in-progress'],
    ticketBelongsTo: 'all',
    type: 'on-demand',
    priority: 'all'
  };

  dataFromFilterPage: any;
  public status = ''
  constructor(
    private ticketService: TicketService,
    private ref: ChangeDetectorRef,
    private loading: LoadingController,
    private modalController: ModalController,
    private alertService: AlertServiceService,
    private popOverCtrl: PopoverController,
    public transService: translateService
  ) {
    this.searchTicket('');
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loading.create({
      spinner: "lines"
    });
    await loading.present();
  }

  async openTicketFilterModal() {

    const modal = await this.modalController.create({
      component: TicketFilterPage,
      componentProps: {
        data: this.dataFromFilterPage
      }
    });

    modal.onDidDismiss().then((ticketFilter: any) => {
      if (ticketFilter !== null && ticketFilter.data) {

        this.dataFromFilterPage = ticketFilter.data;

        console.log(ticketFilter);

        ticketFilter.data.agent ? this.filterData.agent = ticketFilter.data.agent : this.filterData.agent = '';
        ticketFilter.data.startDate ? this.filterData.startDate = ticketFilter.data.startDate : this.filterData.startDate = '';
        ticketFilter.data.endDate ? this.filterData.endDate = ticketFilter.data.endDate : this.filterData.endDate = '';
        ticketFilter.data.ticketBelongsToRefId ? this.filterData.projects = ticketFilter.data.ticketBelongsToRefId : this.filterData.projects = '';
        ticketFilter.data.agent ? this.filterData.agent = ticketFilter.data.agent : this.filterData.agent = '';
        ticketFilter.data.contactPoint ? this.filterData.contactPoint = ticketFilter.data.contactPoint : this.filterData.contactPoint = '';

        if (ticketFilter.data.ticketBelongsTo) {
          ticketFilter.data.ticketBelongsTo.length > 1 ? this.filterData.ticketBelongsTo = 'all' : this.filterData.ticketBelongsTo = ticketFilter.data.ticketBelongsTo[0];
        }

        if (ticketFilter.data.type) {
          ticketFilter.data.type.length > 1 ? this.filterData.type = 'all' : this.filterData.type = ticketFilter.data.type[0];
        }

        if (ticketFilter.data.priority) {
          ticketFilter.data.priority.length > 1 ? this.filterData.priority = 'all' : this.filterData.priority = ticketFilter.data.priority[0];
        }

        if (ticketFilter.data.status) {
          this.filterData.status = ticketFilter.data.status;
        }

        if (this.filterData.startDate) {
          this.filterData.startDate = new Date(this.filterData.startDate);
          this.filterData.startDate = new Date(this.filterData.startDate.setHours(0, 0, 0, 0))
          this.filterData.startDate = (this.filterData.startDate.toJSON()).substr(0, 10)
        }

        if (this.filterData.startDate && !this.filterData.endDate) {
          const d = new Date(this.filterData.startDate);
          const year = d.getFullYear();
          const month = d.getMonth();
          const day = d.getDate();
          const end = new Date(year + 1, month, day);
          this.filterData.endDate = end.toJSON().substr(0, 10);
        }

        if (this.filterData.endDate) {
          this.filterData.endDate = new Date(this.filterData.endDate);
          this.filterData.endDate = new Date(this.filterData.endDate.setHours(0, 0, 0, 0));
          this.filterData.endDate = (this.filterData.endDate.toJSON()).substr(0, 10);
        }

        this.tickets = [];
        this.filterData.skip = 0;
        this.searchTicket('');
        console.log(this.filterData);

      }
    });

    return await modal.present();
  }

  // skip,
  // status,
  // ticketBelongsTo,
  // type,
  // projects,
  // priority,
  // startDate,
  // endDate,
  // contactPoint,
  // agent,
  // asset

  async searchTicket(event) {

    if (!event) {
      await this.presentLoading();
    }

    await this.filterData.status.forEach(element => {
      this.status = status + `&status=${element}`;
    });

    this.ticketService.getTickets(
      this.filterData.skip || '',
      this.status || '',
      this.filterData.ticketBelongsTo || '',
      this.filterData.type || '',
      this.filterData.projects || '',
      this.filterData.priority || '',
      this.filterData.startDate || '',
      this.filterData.endDate || '',
      this.filterData.contactPoint || '',
      this.filterData.agent || '',
      this.filterData.asset || '')
      .subscribe((data: any) => {

        this.tickets = this.tickets.concat(data.data.data);
        this.filterData.skip = data.data.query.skip + 10;
        this.noTicket = true;

        event ? event.target.complete() : this.loading.dismiss();

        if (data.data.query.current >= data.data.query.total) {
          this.disableInfiniteScroll = true;
        }
      },
        err => {
          this.loading.dismiss();
          this.alertService.presentAlert(this.transService.getTranslatedData('alert-title'),
            err.error.error);
        }
      );
  }

  async popOverOption() {
    let popOver = await this.popOverCtrl.create({
      component: TicketComponent,
      event: event,
      mode: 'ios'
    })
    return await popOver.present()
  }

}
