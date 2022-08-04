import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErorComponent } from './core/test-eror/test-eror.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'test-error',component:TestErorComponent,data:{breadcrumb:'Test-Error'}},
  {path:'internal-server-error',component:ServerErrorComponent,data:{breadcrumb:'Internal-Server-Error'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'Not-Found'}},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(mod => mod.ShopModule),data:{breadcrumb:'Shop'}},
  {path:'**',redirectTo:'not-found',pathMatch:'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
