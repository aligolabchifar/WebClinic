import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from '../../../controller/general/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {

  isShowing: boolean;
  subscription: Subscription;
  constructor(private loadingService: LoadingService) {

    console.log('مقدار منوووووووووووووو');
    this.subscription = this.loadingService.get().subscribe(value => {
      if (value.show) {
        // this.loader.show = true;
        this.isShowing = true;
      } else {
        this.isShowing = false;
        // this.loader.show = false;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
