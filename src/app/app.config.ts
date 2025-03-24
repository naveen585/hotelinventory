import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './errorhandler.service';

// function initFactory(initService: InitService){
//   return ()=>initService.init();
// }

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    }, provideHttpClient(withFetch()),{
      provide: HTTP_INTERCEPTORS,
      useValue: requestInterceptor,
      multi: true
    },
    FormsModule,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    }
    // {
    //   provide: APP_INITIALIZER, // why it os depricated and need additional info
    //   useFactory: initFactory,
    //   deps: [InitService],
    //   multi:true
    // }
  ]
};
