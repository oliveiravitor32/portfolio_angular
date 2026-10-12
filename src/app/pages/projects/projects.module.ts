import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { CaseStudyComponent } from './case-study/case-study.component';
import { ProjectPostComponent } from './project-post/project-post.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
	{ path: '', component: ProjectsComponent },
	{ path: ':slug', component: ProjectPostComponent },
	{ path: ':slug/estudo-de-caso', component: CaseStudyComponent },
];

@NgModule({
	declarations: [ProjectsComponent, CaseStudyComponent, ProjectPostComponent],
	imports: [SharedComponentsModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
