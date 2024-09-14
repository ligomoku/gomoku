import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {UserplayService} from "./userplay.service";

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BoardComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [UserplayService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    tick();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Gomoku'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    tick();
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Gomoku');
  }));

  it('should render title in a h1 tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Gomoku!');
  }));
});
