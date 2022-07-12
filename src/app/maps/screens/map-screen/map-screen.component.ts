import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  get isUserLocationReady(){
    return this.placeService.isUserLocationReady;
  }

  constructor(private placeService : PlacesService) { }

  ngOnInit(): void {
  }

}
