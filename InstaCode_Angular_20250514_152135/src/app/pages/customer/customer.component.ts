import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbModule } from '@michelin/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDividerModule,
    BreadcrumbModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customerForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      customerCode: [''],
      customerName: [''],
      customerType: [''],
      active: [false],
      btmFlag: [false],
      rfidFlag: [false],
      address1: [''],
      address2: [''],
      city: [''],
      stateProvince: [''],
      postalCode: [''],
      country: [''],
      contact: [''],
      emailAddress: [''],
      phoneNumber: [''],
      faxNumber: [''],
      salesId: [''],
      routeId: [''],
      enterpriseId: ['']
    });
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      console.log('Form submitted:', this.customerForm.value);
    }
  }
}