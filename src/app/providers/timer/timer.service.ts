import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimerService {

  private endDate = moment('2017-10-20 14:00:00').utc();
  private startDate = moment().utc();

  private seconds = this.endDate.diff(this.startDate, 'seconds');

  public interval: any;
  public days: any;
  public hours: any;
  public mins: any;
  public secs: any;

  constructor() {
    this.interval = null;
    this.days = this.pad(0, 'Day');
    this.hours = this.pad(0, 'Hour');
    this.mins = this.pad(0, 'Minute');
    this.secs = this.pad(0, 'Second');
  }

  private pad(_val: number, _cap: string) {
    let val = (_val < 10) ? '0' + _val : _val;
    let cap = (_val > 1) ? _cap + 's' : _cap;
    return {
      value: val,
      caption: cap
    };
  }

  end() {
    console.log('timer ends');
  }

  destroy() {
    if(this.interval)
      clearInterval(this.interval);
  }

  public start() {
    let secMin = 60 * 1;
    let minHour = 60 * 60;
    let hourDay = 24;

    this.interval = setInterval(() => {
      if (this.seconds <= 0){
        clearInterval(this.interval);
        this.end();
      }

      let secondsLeft = this.seconds;
      let days = Math.floor(secondsLeft / (minHour*hourDay));
      secondsLeft -= days * (minHour*hourDay);

      let hours = Math.floor(secondsLeft / minHour) % hourDay;
      secondsLeft -= hours * minHour;

      let mins = Math.floor(secondsLeft / secMin) % secMin;
      secondsLeft -= mins * secMin;

      let secs = secondsLeft % secMin;

      this.days = this.pad(days, 'Day');
      this.hours = this.pad(hours, 'Hour');
      this.mins = this.pad(mins, 'Minute');
      this.secs = this.pad(secs, 'Second');
      this.seconds -= 1;
    }, 1000);
  }

}
