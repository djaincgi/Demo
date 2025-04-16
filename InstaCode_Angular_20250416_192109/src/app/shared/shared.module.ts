import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BreadcrumbModule,
  CarouselModule,
  ContentTableModule,
  DropdownModule,
  EmptyStateModule,
  FooterModule,
  HeaderModule,
  IconModule,
  LinkModule,
  LoaderModule,
  LogoModule,
  MainContentModule,
  ModalModule,
  NavbarModule,
  PaginatorModule,
  PhoneNumberModule,
  SidebarModule,
  StatusModule,
  TableModule,
  TimelineModule,
  TimepickerModule,
  TooltipModule,
  UploadModule
} from '@michelin/theme';

import { NgPipesModule } from 'ngx-pipes';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  BreadcrumbModule,
  DropdownModule,
  ModalModule,
  SidebarModule,
  NavbarModule,
  LogoModule,
  LinkModule,
  TimelineModule,
  TableModule,
  LoaderModule,
  PaginatorModule,
  IconModule,
  EmptyStateModule,
  UploadModule,
  NgPipesModule,
  StatusModule,
  ContentTableModule,
  CarouselModule,
  HeaderModule,
  FooterModule,
  MainContentModule,
  TimepickerModule,
  PhoneNumberModule,
  TooltipModule
];

@NgModule({
  imports: [...modules],
  declarations: [],
  exports: [...modules],
  providers: []
})
export class SharedModule {}
