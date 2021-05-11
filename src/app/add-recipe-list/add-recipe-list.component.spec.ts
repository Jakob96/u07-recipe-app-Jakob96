import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeListComponent } from './add-recipe-list.component';

describe('AddRecipeListComponent', () => {
  let component: AddRecipeListComponent;
  let fixture: ComponentFixture<AddRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
