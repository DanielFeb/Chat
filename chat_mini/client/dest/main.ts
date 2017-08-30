///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './team/ziz/chat/app.module';
import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
