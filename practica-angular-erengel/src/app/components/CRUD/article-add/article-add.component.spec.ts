import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAddComponent } from './article-add.component';

describe('ArticleAddComponent', () => {
  let component: ArticleAddComponent;
  let fixture: ComponentFixture<ArticleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
