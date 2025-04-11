import * as moment from 'moment';
import { Component, HostBinding } from '@angular/core';
import { ThemingService } from '@michelin/theme';

import { environment } from '../../environments/environment';

const darkClassName = 'dark-mode';

@Component({
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent {
  @HostBinding('class') private className = this.themingService.theme.className;

  year = moment.utc().format('YYYY');
  version = environment.version;
  title = 'Customer Management';
  darkMode = this.className === darkClassName;

  constructor(private themingService: ThemingService) {}
  /**
   * Toggle theme
   * Light or dark
   */
  setTheme() {
    this.darkMode = !this.darkMode;
    this.className = this.themingService.display(this.darkMode ? darkClassName : '', this.darkMode);
  }
}
