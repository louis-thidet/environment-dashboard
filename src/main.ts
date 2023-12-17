import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

//bootstrapApplication(AppComponent, appConfig)
  //.catch((err) => console.error(err));
  
  bootstrapApplication(AppComponent, {providers: [
    provideHttpClient(),
    provideAnimations()
]});