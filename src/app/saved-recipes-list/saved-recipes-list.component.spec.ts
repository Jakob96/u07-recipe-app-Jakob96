import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipesListComponent } from './saved-recipes-list.component';

describe('SavedRecipesListComponent', () => {
  let component: SavedRecipesListComponent;
  let fixture: ComponentFixture<SavedRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedRecipesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
