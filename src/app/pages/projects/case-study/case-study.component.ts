import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICaseStudy } from 'src/app/interfaces/projects/case-study.interface';
import { IProjectItem } from 'src/app/interfaces/projects/project-item.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-case-study',
	templateUrl: './case-study.component.html',
	styleUrls: ['./case-study.component.css'],
})
export class CaseStudyComponent implements OnInit, OnDestroy {
	project: IProjectItem | null = null;
	caseStudy: ICaseStudy | null = null;

	galleryOpen: boolean = false;
	galleryStartIndex: number = 0;

	private readonly originalTitle: string;
	private routeSubscription?: Subscription;

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _dataService: DataService,
		private readonly _title: Title,
	) {
		this.originalTitle = this._title.getTitle();
	}

	ngOnInit(): void {
		this.routeSubscription = this._route.paramMap.subscribe((params) =>
			this.loadCaseStudy(params.get('slug') ?? ''),
		);
	}

	ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
		this._title.setTitle(this.originalTitle);
	}

	openGallery(index: number): void {
		this.galleryStartIndex = index;
		this.galleryOpen = true;
	}

	closeGallery(): void {
		this.galleryOpen = false;
	}

	private loadCaseStudy(slug: string): void {
		/* a rota usa o slug do projeto; o estudo de caso tem o seu próprio slug */
		const caseStudySlug = this._dataService.getProject(slug)?.case_study_slug;
		const result = caseStudySlug
			? this._dataService.getCaseStudy(caseStudySlug)
			: null;

		if (!result) {
			this._router.navigate(['/projetos']);
			return;
		}

		this.project = result.project;
		this.caseStudy = result.caseStudy;
		this._title.setTitle(
			`${result.project.title} · Estudo de caso | Vitor Oliveira`,
		);
	}
}
