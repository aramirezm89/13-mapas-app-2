import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { Popup, Marker, LngLat } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapdiv') mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService) {

  }


  ngAfterViewInit(): void {
    if (!this.placesService.getUseLocation) {
      throw new Error('No hay placeService.useLocation');
    }

    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.getUseLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      projection: { name: 'globe' }, // display the map as a 3D globe
    });
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });




    const popup = new Popup().setHTML(`
    <h6>Aqui estoy</h6>
    <span>Estoy en este lugar del mundo</span>
    `);

    new Marker({
      color: 'red',
    })
      .setLngLat(this.placesService.getUseLocation)
      .setPopup(popup)
      .addTo(map);


       map.on('dblclick', (ev) => {
         const { lng, lat } = ev.lngLat;
         this.placesService.setUseLocation = [lng, lat];
         new Marker({
           color: 'red',
         })
           .setLngLat(this.placesService.getUseLocation)
           .setPopup(popup)
           .addTo(map);
       });
  }
}
