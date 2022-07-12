import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';

const routes: Routes = [
  {path:'mapas',component:MapScreenComponent},
  {path:'**',redirectTo:'mapas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
