import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { CaseStudyComponent } from './case-study/case-study.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
	{ path: '', component: ProjectsComponent },
	{ path: ':slug', component: CaseStudyComponent },
];

@NgModule({
	declarations: [ProjectsComponent, CaseStudyComponent],
	imports: [SharedComponentsModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
