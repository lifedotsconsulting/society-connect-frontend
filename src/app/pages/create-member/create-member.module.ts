import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateMemberPageRoutingModule } from './create-member-routing.module';
import { CreateMemberPage } from './create-member.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        CreateMemberPageRoutingModule
    ],
    declarations: [CreateMemberPage]
})
export class CreateMemberPageModule { }
