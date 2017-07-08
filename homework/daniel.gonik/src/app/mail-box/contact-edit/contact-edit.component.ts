import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { ContactsService } from '../_services/contacts.service';
import { User } from '../../_models/user';

@Component({
  selector: 'dg-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  public contact;
  public contactModel: FormGroup;
  public isLoading: Boolean = true;
  public countries;
  public filteredCountries: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    public snackBar: MdSnackBar
  ) {
    this.contact = new User();
    this.countries = this.contactsService.getCountries();
  }

  ngOnInit() {
    this.route.params.pluck('contactId').subscribe(contactId => {
      const id = +contactId;
      this.contactsService.getUserById(id)
        .subscribe(contact => {
          this.contact = contact;
          this.initFormGroup();
          this.isLoading = false;
        });
    });
  }

  public onSave() {
    this.contactModel.value.id = this.contact.id;
    if (this.contactModel.valid) {
      this.contactsService.saveContact(this.contactModel.value)
        .subscribe(
          () => {
            this.router.navigate(['/app/contacts']);
            // TODO: 'Undo' - action
            this.snackBar.open('Contact changes has been saved!', '', {
              duration: 2000
            });
          },
          (error) => this.snackBar.open(error)
        );
    }
  }

  public undo() {
    console.log('undo');
  }

  private initFormGroup() {
    this.contactModel = this.formBuilder.group({
      firstName: [this.contact.firstName, [Validators.required, Validators.minLength(2)]],
      surname: [this.contact.surname, [Validators.required]],
      country: [this.contact.country, null, this.countryAsyncValidator.bind(this)],
      email: [this.contact.email, Validators.email, this.uniqueEmail.bind(this)]
    });

    // this.contactModel.valueChanges.subscribe(console.log);
    this.contactModel.statusChanges.subscribe(() => console.log(this.contactModel.errors))
    this.filteredCountries = this.contactModel.valueChanges
      .pluck('country')
      .startWith(null)
      .map(search => this.filterCountries(search));
  }

  filterCountries(val) {
    return val
      ? this.countries.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.countries;
  }

  private countryAsyncValidator(formControl: FormControl) {
    if(!formControl.value){
      return Observable.of({ country: { error: 'Country field cannot be empty!' } });
    }
    return Observable.of(null);
  }

  private uniqueEmail(formControl: FormControl) {
    if(this.contactsService && !this.contactsService.isEmailUnique(formControl.value, this.contact.id)) {
      return Observable.of({ uniqueEmail: { error: 'Email has to be unique!' } });
    }
    return Observable.of(null);
  }


}
