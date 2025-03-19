import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

interface DropdownData {
  name: string;
  value: string;
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
      contact: ['', [
        Validators.pattern('^[0-9]{10}$')
      ]],
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
        throw new Error(`Failed to fetch ${jsonPath}: ${response.status} ${response.statusText}`);
      }
      
      const data: DropdownData[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error(`Invalid data format for ${controlName}`);
      }
      
      this.dropdownState.data[controlName] = data;
      this.dropdownState.options[controlName] = data.map(item => item.name);
      this.dropdownState.loading[controlName] = false;
    } catch (error) {
      console.error(`Error loading ${controlName} dropdown:`, error);
      this.dropdownState.error[controlName] = error instanceof Error ? error.message : 'Unknown error';
      this.dropdownState.loading[controlName] = false;
    }
  }
  
  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState.options[controlName] || [];
  }
  
  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState.data[controlName] || [];
  }
  
  isDropdownLoading(controlName: string): boolean {
    return !!this.dropdownState.loading[controlName];
  }
  
  getDropdownError(controlName: string): string | null {
    return this.dropdownState.error[controlName] || null;
  }
  
  get contactControl(): AbstractControl | null {
    return this.customerForm.get('contact');
  }
  
  get countryControl(): AbstractControl | null {
    return this.customerForm.get('country');
  }
  
  get typeControl(): AbstractControl | null {
    return this.customerForm.get('type');
  }
}