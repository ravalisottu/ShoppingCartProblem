import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let list = [
    {
      'imageUrl': 'assets/images/circles-1605645460.svg',
      'name': 'Circle',
      'cost': 444
  },
  {
      'imageUrl': 'assets/images/squiggles-1605645292.svg',
      'name': 'Squiggles',
      'cost': 144
  }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.list = list;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
