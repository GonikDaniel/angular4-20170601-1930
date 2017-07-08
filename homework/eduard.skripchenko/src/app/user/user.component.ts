import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';

import { DataService } from 'app/services/data.service';
import { User } from 'app/models/user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ DataService ]
})
export class UserComponent implements OnInit, OnDestroy {
    private userId: number;
    private user: User;
    private subscription: Subscription;

    private userDetailsFormGroup: FormGroup;

    private uniqueEmail(control: FormControl): Observable<any> {
        const email = control.value;

        return new Observable(observer => {
            if (this.dataService.getUserByEmail(email, this.user.id)) {
                observer.next({ validEmail: false });
            } else {
                observer.next(null);
            }
        })
        .debounceTime(500)
        .distinctUntilChanged()
        .first();
    }

    constructor(private route: ActivatedRoute, private dataService: DataService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.userDetailsFormGroup = this.formBuilder.group({
            name: [ '', Validators.required ],
            gender: [ '', Validators.required ],
            birthDate: [ '', Validators.required ],
            address: [ '', Validators.required ],
            email: [ '', [ Validators.required, Validators.email ], this.uniqueEmail.bind(this) ]
        });

        this.subscription = this.route.params.subscribe(params => {
            this.userId = +params['id'];
            this.user = this.dataService.getUser(this.userId);

            this.userDetailsFormGroup.setValue({
                name: this.user.name,
                gender: this.user.gender,
                birthDate: this.user.birthDate,
                address: this.user.address,
                email: this.user.email
            });
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
