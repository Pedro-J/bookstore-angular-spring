import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-img-button',
    templateUrl: './img-button.component.html'
})
export class ImgButtonComponent implements OnInit{
    @Input() extraClasses = '';
    @Input() directoryValue = '';
    @Input() title = '';
    @Input() alt = 'image not loaded';
    @Input() confirmed = false;

    @Output() eventAction = new EventEmitter();

    ngOnInit() {

    }

    processAction() {
        if ( this.confirmed ) {
            if ( confirm('Are you sure?') ) {
                this.eventAction.emit(null);
            }
            return;
        }
        this.eventAction.emit(null);

    }
}
