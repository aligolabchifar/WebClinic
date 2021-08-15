import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit, OnDestroy {

  public fundStock: number;
  public subscription: Subscription;
  constructor() {
  }

  ngOnInit() {
    // this.getFundsStock();
    // this.subscription = this.accountingServie.subject.subscribe(fundStock => {
    //   this.fundStock = fundStock;
    // });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getFundsStock() {
    // this.makeResponse(this.accountingServie.getFundsStock(), true, resultObject => {
    //   if (resultObject != null && resultObject.result != null) {
    //     this.fundStock = resultObject.result;
    //   }
    // });
  }
}
