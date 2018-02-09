import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TimerService } from '../providers/timer/timer.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComingSoonComponent implements OnInit, OnDestroy {

  constructor(
    public _countdownTimer: TimerService
  ) { }

  ngOnDestroy() {
    this._countdownTimer.destroy()
  }

  ngOnInit() {
    this._countdownTimer.start();
  }

}
