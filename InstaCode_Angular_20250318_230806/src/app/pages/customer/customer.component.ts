import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface DropdownData {
  name: string;
  [key: string]: any;
}

interface DropdownState {
  options: string[];
  data: DropdownData[];
  loading: boolean;
  error: string | null;
}

@Component({
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  
  dropdownState: { [key: string]: DropdownState } = {
    customerType: {
      options: [],
      data: [],
      loading: false,
      error: null
    }
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.loadDropdownData();
  }

  initForm() {
    this.customerForm = this.fb.group({
      customerType: ['', [Validators.required]]
    });
  }

  async loadDropdownData() {
    await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'customerType');
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    try {
      this.dropdownState[controlName].loading = true;
      this.dropdownState[controlName].error = null;

      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        this.dropdownState[controlName].data = data;
        this.dropdownState[controlName].options = data.map(item => item.name || '');
      } else {
        throw new Error('Invalid data format: expected an array');
      }
    } catch (error) {
      console.error(`Error loading dropdown data for ${controlName}:`, error);
      this.dropdownState[controlName].error = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      this.dropdownState[controlName].loading = false;
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState[controlName]?.options || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState[controlName]?.data || [];
  }

  get customerType() {
    return this.customerForm.get('customerType');
  }
}