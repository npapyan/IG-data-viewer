import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IgMainComponent } from './ig-main/ig-main.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: 'view', component: IgMainComponent },
  { path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
