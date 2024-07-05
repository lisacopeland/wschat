import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { messagesReducer } from './+state/messages.reducer';
import { UserMessagesEffects } from './+state/messages.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SignupComponent } from './signup/signup.component';
import { userReducer } from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { authReducer } from './+state/auth.reducers';
import { AuthEffects } from './+state/auth.effects';
import { ErrorInterceptor } from './service/http.interceptor';
@NgModule({
  declarations: [AppComponent, SignupComponent, ChatComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    PanelModule,
    ScrollPanelModule,
    StoreModule.forRoot({
      messages: messagesReducer,
      users: userReducer,
      auth: authReducer,
    }),
    EffectsModule.forRoot([UserMessagesEffects, UserEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
