import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ExperienceComponent } from './experience.component';

const routes: Routes = [{ path: '', component: ExperienceComponent }];

@NgModule({
  declarations: [ExperienceComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ExperienceModule {}
