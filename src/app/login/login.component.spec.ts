import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DogResponse, DogsService } from '../dogs.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const mockDogResponse: DogResponse = {
    message: 'test',
    status: 'success'
  }
  let mockDogService: jasmine.SpyObj<DogsService>;
  mockDogService = jasmine.createSpyObj('DogService', ['get']);      
  mockDogService.get.and.returnValue(of(mockDogResponse));
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formElement: HTMLElement;
  let usernameInput;
  let passwordInput;
  let submitButton;
  let loginForm;
  let usernameControl;
  let passwordControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: DogsService, useValue: mockDogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    formElement =
      fixture.debugElement.nativeElement.querySelector('#loginForm');
    usernameInput = formElement.querySelector('#username');
    passwordInput = formElement.querySelector('#password');
    submitButton = formElement.querySelector('#submit');
    loginForm = component.loginForm;
    usernameControl = loginForm.get('username');
    passwordControl = loginForm.get('password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct inputs', () => {
    const inputs = formElement.querySelectorAll('input');
    expect(inputs.length).toEqual(2);
  });
  it('should have the correct initial values and state', () => {
    usernameControl = loginForm.get('username');
    passwordControl = loginForm.get('password');
    const loginFormValues = {
      username: '',
      password: '',
    };
    expect(loginForm.value).toEqual(loginFormValues);
    expect(loginForm.valid).toBeFalsy();
    expect(usernameControl.errors['required']).toBeTruthy();
    expect(passwordControl.errors['required']).toBeTruthy();
    expect(submitButton.disabled).toBeTruthy;
  });

  it('should accept valid input', () => {
    const loginFormValues = {
      username: 'sample@msn.com',
      password: 'testing',
    };
    usernameControl = loginForm.get('username') as FormControl;
    passwordControl = loginForm.get('password') as FormControl;
    usernameInput.value = 'sample@msn.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testing';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginForm.value).toEqual(loginFormValues);
    expect(loginForm.valid).toBeTruthy();
    expect(usernameControl.errors).toBeNull();
    expect(passwordControl.errors).toBeNull();
    expect(submitButton.disabled).toBeFalsy;
  });

  it('should submit the form data when the submit button is clicked', () => {
    usernameInput.value = 'sample@msn.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testing';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy;
    submitButton.click();
    expect(mockDogService.get).toHaveBeenCalled();
    expect(component.dogImgUrl).toBe('test');
  });
});
