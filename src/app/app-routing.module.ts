import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'coffee-store', pathMatch: 'full'},
  {path: 'coffee-store', component: ProductListComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '**', redirectTo: 'coffee-store'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
