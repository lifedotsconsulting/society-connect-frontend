import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole, OccupancyStatus } from '../../models';

@Component({
    selector: 'app-create-member',
    templateUrl: './create-member.page.html',
    styleUrls: ['./create-member.page.scss'],
    standalone: false,
})
export class CreateMemberPage implements OnInit {
    memberForm!: FormGroup;
    roles = Object.values(UserRole);
    occupancyStatuses = [
        { value: OccupancyStatus.Empty, label: 'Empty' },
        { value: OccupancyStatus.Owned, label: 'Owned' },
        { value: OccupancyStatus.OwnerLiving, label: 'Owner Living' },
        { value: OccupancyStatus.Rented, label: 'Rented' }
    ];

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.memberForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            role: [UserRole.FlatOwner, Validators.required],
            block: ['', Validators.required],
            floor: ['', Validators.required],
            flatNumber: ['', Validators.required],
            size: [''],
            parking_slots: [''],
            occupancy_status: [OccupancyStatus.Owned, Validators.required],
            current_resident: [''],
            description: ['']
        });
    }

    onSubmit() {
        if (this.memberForm.valid) {
            console.log('Form Submitted', this.memberForm.value);
            // Backend integration will go here, for now navigate back
            this.router.navigate(['/folder/members']);
        } else {
            console.log('Form is invalid');
            this.memberForm.markAllAsTouched();
        }
    }
}
