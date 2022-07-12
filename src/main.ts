import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJhbWlyZXptIiwiYSI6ImNsNG9uZHZwNTAyYnczY21qMHlhNjE5cGsifQ.zzqVLt7oKnsSRwGzX6K5NA';

if(!navigator.geolocation){
  throw new Error('Navegador no soparta la Geolocalización');
}


if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
