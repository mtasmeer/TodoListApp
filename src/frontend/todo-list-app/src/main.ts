/*import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));*/
//import 'zone.js';
import {
  bootstrapApplication
} from '@angular/platform-browser';
import {
  AppComponent
} from './app/app';

import {
  appConfig
} from './app/app.config';

bootstrapApplication(
  AppComponent,
  appConfig
).catch(error =>
  console.error(error)
);
