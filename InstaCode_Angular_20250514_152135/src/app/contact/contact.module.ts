import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact.routing';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [SharedModule, ContactRoutingModule],
  providers: [],
  declarations: [ContactComponent]
})
export class ContactModule {}
