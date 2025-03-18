import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  customerForm: FormGroup;
  dropdownState: { [key: string]: DropdownState } = {};

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeDropdownState();
    this.loadDropdowns();
  }

  initializeDropdownState(): void {
    this.dropdownState = {
      type: {
        options: [],
        data: [],
        loading: false,
        error: null
      }
    };
  }

  async loadDropdowns(): Promise<void> {
    try {
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'type');
    } catch (error) {
      console.error('Error loading dropdowns:', error);
    }
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    if (!this.dropdownState[controlName]) {
      this.dropdownState[controlName] = {
        options: [],
        data: [],
        loading: false,
        error: null
      };
    }

    this.dropdownState[controlName].loading = true;
    this.dropdownState[controlName].error = null;

    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch dropdown data: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        this.dropdownState[controlName].data = data;
        this.dropdownState[controlName].options = data.map(item => item.name);
      } else {
        throw new Error('Invalid dropdown data format');
      }
    } catch (error) {
      console.error(`Error loading dropdown ${controlName}:`, error);
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

  getFormControl(name: string): FormControl {
    return this.customerForm.get(name) as FormControl;
  }
}