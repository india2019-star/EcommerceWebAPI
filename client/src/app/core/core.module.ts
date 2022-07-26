import { BasketModule } from './../basket/basket.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestErorComponent } from './test-eror/test-eror.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';





@NgModule({
  declarations: [NavBarComponent, TestErorComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    BasketModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      preventDuplicates:true
    })
    
  ],
  exports:[NavBarComponent,SectionHeaderComponent]
})
export class CoreModule { }
