import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloggedPageComponent } from './unlogged-page.component';

describe('UnloggedPageComponent', () => {
  let component: UnloggedPageComponent;
  let fixture: ComponentFixture<UnloggedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnloggedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnloggedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
