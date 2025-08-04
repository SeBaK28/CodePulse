import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const bootstrap = () => bootstrapApplication(AppComponent,{providers: 
    [provideHttpClient(),appConfig.providers]});

export default bootstrap;

// export const appClient: ApplicationConfig = {
//   providers: [provideHttpClient(), provideRouter(routes), provideClientHydration()]
// };
