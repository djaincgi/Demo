import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbModule } from '@michelin/theme';
import { StatusModule } from '@michelin/theme';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    BreadcrumbModule,
    StatusModule
  ]
})
export class CustomerComponent implements OnInit {
  customerForm = new FormGroup({
    customerCode: new FormControl(''),
    customerName: new FormControl(''),
    type: new FormControl(''),
    active: new FormControl(true),
    btmFlag: new FormControl(true),
    rfidFlag: new FormControl(true),
    address1: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    stateProvince: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl(''),
    contact: new FormControl(''),
    emailAddress: new FormControl(''),
    phoneNumber: new FormControl(''),
    faxNumber: new FormControl(''),
    salesId: new FormControl(''),
    routeId: new FormControl(''),
    enterpriseId: new FormControl('')
  });

  selectedTabIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }

  saveCustomer(): void {
    console.log('Customer data saved:', this.customerForm.value);
  }
}