import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoTarefa } from './cartao-tarefa';

describe('CartaoTarefa', () => {
  let component: CartaoTarefa;
  let fixture: ComponentFixture<CartaoTarefa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoTarefa],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoTarefa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
