import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ActivitiesComponent } from './activities.component';
import { ActivityPostComponent } from './activity-post/activity-post.component';

const routes: Routes = [
	{ path: '', component: ActivitiesComponent },
	{ path: ':slug', component: ActivityPostComponent },
];

@NgModule({
	declarations: [ActivitiesComponent, ActivityPostComponent],
	imports: [SharedComponentsModule, RouterModule.forChild(routes)],
})
export class ActivitiesModule {}
