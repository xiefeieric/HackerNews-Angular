import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news.component';


const routes: Routes = [
  {path: 'news', component: NewsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'news'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
