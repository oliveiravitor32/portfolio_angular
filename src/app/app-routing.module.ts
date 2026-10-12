import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'projetos',
		loadChildren: () =>
			import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
	},
	{
		path: 'atividades',
		loadChildren: () =>
			import('./pages/activities/activities.module').then(
				(m) => m.ActivitiesModule,
			),
	},
	{
		path: '**',
		loadChildren: () =>
			import('./pages/page-not-found/page-not-found.module').then(
				(m) => m.PageNotFoundModule,
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
