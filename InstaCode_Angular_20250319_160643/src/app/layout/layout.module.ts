import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  HeaderModule,
  FooterModule,
  MainContentModule,
  AlertModule,
  LinkModule,
  LogoModule,
  NavbarModule,
  ScrollbarModule,
  SidebarModule,
  ThemingModule,
  MATERIAL_ICONS_DEFAULT_FONT,
  MaterialIconFonts
} from '@michelin/theme';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    MainContentModule,
    AlertModule,
    LinkModule,
    LogoModule,
    NavbarModule,
    ScrollbarModule,
    SidebarModule,
    ThemingModule
  ],
  providers: [{ provide: MATERIAL_ICONS_DEFAULT_FONT, useValue: MaterialIconFonts.filled }],
  declarations: [LayoutComponent]
})
export class LayoutModule {}
