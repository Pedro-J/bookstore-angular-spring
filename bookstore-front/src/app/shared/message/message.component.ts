import {Component, Input, OnInit} from '@angular/core';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: AppMessage;

  constructor() { }

  ngOnInit() {
/*    setTimeout(() => {
      this.message.show = false;
    }, 10000); // 10 seconds*/
  }

  public onClose() {
    this.message.show = false;
  }

}
