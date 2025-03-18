import { NgModule } from '@angular/core';
                    import { SharedModule } from '../../shared/shared.module';
                    import { CustomerRoutingModule } from './customer.routing';
                    import { CustomerComponent } from './customer.component';

                    @NgModule({
                    imports: [
                        SharedModule,
                        CustomerRoutingModule
                    ],
                    providers: [],
                    declarations: [CustomerComponent]
                    })
                    export class CustomerModule {}
                    