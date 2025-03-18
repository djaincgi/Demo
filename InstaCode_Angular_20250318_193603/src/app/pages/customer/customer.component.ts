import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

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
    this.initializeDropdowns();
  }

  async initializeDropdowns(): Promise<void> {
    try {
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'type');
    } catch (error) {
      console.error('Error initializing dropdowns:', error);
    }
  }

  async populate_dropdown_from_json(jsonPath: string, controlName: string): Promise<void> {
    // Initialize dropdown state if it doesn't exist
    if (!this.dropdownState[controlName]) {
      this.dropdownState[controlName] = {
        options: [],
        data: [],
        loading: true,
        error: null
      };
    }

    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch dropdown data: ${response.statusText}`);
      }

      const data = await response.json();
      const options = data.map((item: DropdownData) => item.name);

      this.dropdownState[controlName] = {
        options: options,
        data: data,
        loading: false,
        error: null
      };
    } catch (error) {
      this.dropdownState[controlName] = {
        options: [],
        data: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error loading dropdown data'
      };
      console.error(`Error loading dropdown data for ${controlName}:`, error);
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState[controlName]?.options || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState[controlName]?.data || [];
  }

  isLoading(controlName: string): boolean {
    return this.dropdownState[controlName]?.loading || false;
  }

  hasError(controlName: string): boolean {
    return !!this.dropdownState[controlName]?.error;
  }

  getError(controlName: string): string | null {
    return this.dropdownState[controlName]?.error || null;
  }
}