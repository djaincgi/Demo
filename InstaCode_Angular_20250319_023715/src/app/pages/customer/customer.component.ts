import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

interface DropdownData {
  name: string;
  [key: string]: any;
}

interface DropdownState {
  options: { [key: string]: string[] };
  data: { [key: string]: DropdownData[] };
  loading: { [key: string]: boolean };
  error: { [key: string]: string | null };
}

@Component({
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  dropdownState: DropdownState = {
    options: {},
    data: {},
    loading: {},
    error: {}
  };

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      contact: ['', [Validators.pattern(/^\d{10}$/)]],
      country: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  async loadDropdownData(): Promise<void> {
    try {
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_your_country.json', 'country');
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'type');
    } catch (error) {
      console.error('Error loading dropdown data:', error);
    }
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    this.dropdownState.loading[controlName] = true;
    this.dropdownState.error[controlName] = null;

    try {
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${jsonPath}: ${response.statusText}`);
      }
      
      const data: DropdownData[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error(`Invalid data format for ${controlName}`);
      }
      
      this.dropdownState.data[controlName] = data;
      this.dropdownState.options[controlName] = data.map(item => item.name);
      
    } catch (error) {
      console.error(`Error loading ${controlName} dropdown:`, error);
      this.dropdownState.error[controlName] = `Failed to load ${controlName} options`;
    } finally {
      this.dropdownState.loading[controlName] = false;
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState.options[controlName] || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState.data[controlName] || [];
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (!field) return '';
    
    if (field.errors) {
      if (fieldName === 'contact' && field.errors['pattern']) {
        return 'Invalid Please enter contact here';
      }
      if (fieldName === 'country' && field.errors['required']) {
        return 'Invalid Please select your country';
      }
      if (fieldName === 'type' && field.errors['required']) {
        return 'Invalid Please select type';
      }
    }
    return '';
  }
}