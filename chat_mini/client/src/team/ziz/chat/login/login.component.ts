import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { SignService }      from '../service/sign.service';

@Component({
    selector: 'login',
    styleUrls: [ './login.component.css' ],
    templateUrl: './login.component.html'

})
export class LoginComponent {
    public username: string;
    public password: string;

    constructor (private signService: SignService,
                 private router: Router) {

    }

    public clearForm() {
        this.username = '';
        this.password = '';
    }

    public login() {
        this.signService.tryLogin(this.username, this.password).then(
            loggedin => {
                if (loggedin) {
                    this.clearForm();
                    this.router.navigate(['/friends']);
                }
                console.log(loggedin);
            });
    }
}
