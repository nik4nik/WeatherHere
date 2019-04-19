import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { LocalStorageService } from './localStorage.service';

import { StorageServiceModule } from 'ngx-webstorage-service';//

import { AppComponent } from './app.component';
import { MomentPipe } from './moment.pipe';

@NgModule({
    declarations: [
        AppComponent,
        MomentPipe
    ],
    imports: [
        BrowserModule,
		FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
		StorageServiceModule//
    ],
    providers: [LocalStorageService],//
    bootstrap: [AppComponent]
})
export class AppModule { }
