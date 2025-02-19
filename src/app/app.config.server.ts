// app.config.server.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(),         // If you want SSR features
    importProvidersFrom(HttpClientModule),  // Provide HttpClient on the server
    provideRouter(routes)
  ]
};
