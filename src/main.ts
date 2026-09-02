import { provideZoneChangeDetection } from "@angular/core";
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppConfig } from './app/app.config';


bootstrapApplication(AppComponent, {...AppConfig, providers: [provideZoneChangeDetection(), ...AppConfig.providers]}).catch((err) => console.error(err));