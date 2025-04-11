import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DropdownData {
  name: string;
  [key: string]: any;
}

interface DropdownState {
  options: string[];
  data: DropdownData[];
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  dropdownState: { [key: string]: DropdownState } = {};

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      postalCode: ['', [
        Validators.pattern('^[0-9]{6}$')
      ]],
      use: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.populate_dropdown_from_json('assets/data/Customer_Please_select_use.json', 'use');
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    try {
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${jsonPath}: ${response.status} ${response.statusText}`);
      }
      
      const data: DropdownData[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error(`Invalid data format for ${controlName} dropdown`);
      }
      
      const options = data.map(item => item.name);
      
      this.dropdownState[controlName] = {
        options: options,
        data: data
      };
      
    } catch (error) {
      console.error(`Error loading dropdown data for ${controlName}:`, error);
      this.dropdownState[controlName] = {
        options: [],
        data: []
      };
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState[controlName]?.options || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState[controlName]?.data || [];
  }

  get postalCodeControl() {
    return this.customerForm.get('postalCode');
  }

  get useControl() {
    return this.customerForm.get('use');
  }
}