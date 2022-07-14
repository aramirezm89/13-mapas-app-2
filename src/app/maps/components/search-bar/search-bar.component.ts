import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout; //"NodeJS debe ser igresado en el archivo tsconfig.app.json es el apartado de types[]"
  constructor(private placesService : PlacesService) {}



  onQueryChanged(query : string = ''){

    if(this.debounceTimer){
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() =>{
      this.placesService.getPlacesByQuery(query)

    },1000)

  }
}
