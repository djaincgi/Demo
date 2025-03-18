import { NgModule } from '@angular/core';
                    import { SharedModule } from '../../shared/shared.module';
                    import { AccountinfoRoutingModule } from './accountinfo.routing';
                    import { AccountinfoComponent } from './accountinfo.component';

                    @NgModule({
                    imports: [
                        SharedModule,
                        AccountinfoRoutingModule
                    ],
                    providers: [],
                    declarations: [AccountinfoComponent]
                    })
                    export class AccountinfoModule {}
                    