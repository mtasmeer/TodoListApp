import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog';

describe('ConfirmationDialogComponent', () => {
	let component: ConfirmationDialogComponent;
	let fixture: ComponentFixture<ConfirmationDialogComponent>;
	let closedWith: boolean | undefined;

	beforeEach(async () => {
		closedWith = undefined;

		await TestBed.configureTestingModule({
			imports: [ConfirmationDialogComponent],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: {
						title: 'Confirm',
						message: 'Continue?'
					}
				},
				{
					provide: MatDialogRef,
					useValue: {
						close: (result?: boolean) => {
							closedWith = result;
						}
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmationDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return the confirmation result', () => {
		component.close(true);

		expect(closedWith).toBe(true);
	});
});
