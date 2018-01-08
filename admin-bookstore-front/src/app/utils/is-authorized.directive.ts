import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';

@Directive({
    selector: '[appIsAuthorized]',
    providers: [LoginService]
})
export class IsAuthorizedDirective implements OnInit {
    @Input() role: string;
    constructor(private _elementRef: ElementRef, private loginService: LoginService) {

    }

    ngOnInit(): void {
/*        if(this.role && this.role.trim() !== '' && !this.loginService.isAuthorized([this.role])) {
            let el : HTMLElement = this._elementRef.nativeElement;
            el.parentNode.removeChild(el);
        }*/
    }
}
