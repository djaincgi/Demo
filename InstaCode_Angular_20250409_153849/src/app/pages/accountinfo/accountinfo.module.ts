import { NgModule } from '@angular/core';
                    import { SharedModule } from '../../shared/shared.module';
                    import { AccountinfoRoutingModule } from './accountinfo.routing';
                    import { AccountinfoComponent } from './accountinfo.component';

                    @NgModule({
                    imports: [
                        SharedModule,
                        AccountinfoRoutingModule,
                        AccountinfoComponent
                    ],
                    providers: [],
                    })
                    export class AccountinfoModule {}
                    