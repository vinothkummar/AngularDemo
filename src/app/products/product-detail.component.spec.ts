import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';

describe(`App Component`, () => {
  let component: AppComponent;
  beforeEach(() =>{
     component = new AppComponent();
  });

  it(`should have a component`,() =>{    
    expect(component).toBeTruthy();
  })
  
  it(`should have a title of 'app'`, () => {    
      expect(component.pageTitle).toEqual('Samsung: Product Management')
  });
});