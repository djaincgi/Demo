import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

interface DropdownData {
  name: string;
  code?: string;
  id?: string;
  [key: string]: any;
}

interface DropdownState {
  options: string[];
  fullData: DropdownData[];
  loading: boolean;
  error: string | null;
}

@Component({
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  
  dropdownState: { [key: string]: DropdownState } = {
    country: {
      options: [],
      fullData: [],
      loading: false,
      error: null
    },
    type: {
      options: [],
      fullData: [],
      loading: false,
      error: null
    }
  };

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      contact: ['', [Validators.pattern(/^\d{10}$/)]],
      country: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    try {
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_your_country.json', 'country');
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'type');
    } catch (error) {
      console.error('Error loading dropdown data:', error);
    }
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    this.dropdownState[controlName].loading = true;
    this.dropdownState[controlName].error = null;
    
    try {
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${controlName} data. Status: ${response.status}`);
      }
      
      const data: DropdownData[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error(`Invalid ${controlName} data format`);
      }
      
      this.dropdownState[controlName].fullData = data;
      this.dropdownState[controlName].options = data.map(item => item.name);
      this.dropdownState[controlName].loading = false;
    } catch (error) {
      this.dropdownState[controlName].error = error instanceof Error ? error.message : 'Unknown error';
      this.dropdownState[controlName].loading = false;
      console.error(`Error loading ${controlName} dropdown data:`, error);
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState[controlName]?.options || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState[controlName]?.fullData || [];
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.customerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.customerForm.get(controlName);
    if (!control) return '';
    
    if (controlName === 'contact' && control.hasError('pattern')) {
      return 'Invalid Please enter contact here';
    } else if (controlName === 'country' && control.hasError('required')) {
      return 'Invalid Please select your country';
    } else if (controlName === 'type' && control.hasError('required')) {
      return 'Invalid Please select type';
    }
    
    return '';
  }
}