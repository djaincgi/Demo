import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  dropdownState: { [key: string]: DropdownState } = {};

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      customerType: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initializeDropdownStates();
    this.loadDropdowns();
  }

  initializeDropdownStates(): void {
    this.dropdownState = {
      customerType: {
        options: [],
        data: [],
        loading: false,
        error: null
      }
    };
  }

  async loadDropdowns(): Promise<void> {
    try {
      await this.populate_dropdown_from_json('assets/data/Customer_Please_select_type.json', 'customerType');
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
        throw new Error(`Failed to load dropdown data: ${response.statusText}`);
      }
      
      const data: DropdownData[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid dropdown data format: expected an array');
      }
      
      this.dropdownState[controlName].data = data;
      this.dropdownState[controlName].options = data.map(item => item.name);
      this.dropdownState[controlName].loading = false;
    } catch (error) {
      this.dropdownState[controlName].loading = false;
      this.dropdownState[controlName].error = error instanceof Error ? error.message : 'Unknown error loading dropdown';
      console.error(`Error loading ${controlName} dropdown:`, error);
    }
  }

  getDropdownOptions(controlName: string): string[] {
    return this.dropdownState[controlName]?.options || [];
  }

  getDropdownData(controlName: string): DropdownData[] {
    return this.dropdownState[controlName]?.data || [];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}