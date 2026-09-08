import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
	});

	it('should create the application shell', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
