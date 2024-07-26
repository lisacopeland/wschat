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

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { SignupComponent } from './signup/signup.component';
import { userReducer } from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { authReducer } from './+state/auth.reducers';
import { AuthEffects } from './+state/auth.effects';
import { ErrorInterceptor } from './service/http.interceptor';
import { UserlistComponent } from './userlist/userlist.component';
import { InitialPipe } from './service/inital.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ChatComponent,
    LoginComponent,
    UserlistComponent,
    InitialPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    DialogModule,
    EditorModule,
    FloatLabelModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    PanelModule,
    ScrollPanelModule,
    SidebarModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
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
