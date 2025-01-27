import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

// Registrar la localización de Chile
registerLocaleData(localeEsCL);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
