import { NgModule } from '@angular/core';
                    import { RouterModule, Routes } from '@angular/router';
                    import { AccountinfoComponent } from './accountinfo.component';

                    const routes: Routes = [
                    {
                        path: '',
                        component: AccountinfoComponent
                    }
                    ];

                    @NgModule({
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                    })
                    export class AccountinfoRoutingModule { }
                    