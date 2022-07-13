import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnLocationComponent } from './components/btn-location/btn-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';


@NgModule({
  declarations: [
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BtnLocationComponent,
    AngularLogoComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
