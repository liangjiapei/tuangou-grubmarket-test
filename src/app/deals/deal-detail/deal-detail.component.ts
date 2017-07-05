import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { DealService } from '../deal.service';
import { TimeService } from '../../shared/time.service';

import { Deal } from '../deal.model';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {

  subscription: Subscription;
  timeleft: number;
  deal: Deal;
  id: string;
  isAddressExpand: boolean = false;

  categories: string[] = [];

  category: string;

  constructor(
    private dealService: DealService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.timeleft = this.deal ? Date.now() - this.deal.endTime : 0;
    let countdown = Observable.interval(1000);
    countdown.subscribe(
      (timestamp: number) => {
        this.timeleft -= 1000;
      }
    )
    this.subscription = this.dealService.dealChanged.subscribe(
      (deal: Deal) => {
        this.deal = deal;
        console.log("Succesffuly got deals: ", this.deal);

        for (let dealItem of deal.dealItems) {
          if (!this.categories.includes(dealItem.category.name)) {
            this.categories.push(dealItem.category.name);
          }
        }
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.dealService.fetchDeal(this.id);
      }
    )

    
  }

  onGetTime() {
    let timeleft = this.deal.endTime - Date.now();
    let days = this.timeService.millsecondsToDay(timeleft);
    let hours = this.timeService.millsecondsToHour(timeleft);
    let minutes = this.timeService.millsecondsToMinute(timeleft);
    let seconds = this.timeService.millsecondsToSecond(timeleft);

    return this.formatNumber(days) + " 天 " + this.formatNumber(hours) + " 时 " + this.formatNumber(minutes) + " 分 " + this.formatNumber(seconds) + " 秒";
  }

  getPickupMonth() {
    return this.timeService.timestampToMonth(this.deal.pickupTime);
  }

  getPickupDay() {
    return this.timeService.timestampToDay(this.deal.pickupTime);
  }

  formatNumber(num: number) {
    return num < 10 ? "0" + num : num;
  }

  toggleAddress() {
    console.log(this.isAddressExpand);
    this.isAddressExpand = !this.isAddressExpand;
  }

  onFilterChange(selectedCategory: string) {
    this.category = selectedCategory;
    console.log("Change category to ", selectedCategory);
  }

}
