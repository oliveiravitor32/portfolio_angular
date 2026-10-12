import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProjectItem } from 'src/app/interfaces/projects/project-item.interface';
import { DataService } from 'src/app/services/data.service';
import {
	IReadme,
	IReadmeHeading,
	ReadmeService,
} from 'src/app/services/readme.service';

type ReadmeState = 'loading' | 'ready' | 'error';

const IMAGE_WAIT_LIMIT_MS = 10000;

@Component({
	selector: 'app-project-post',
	templateUrl: './project-post.component.html',
	styleUrls: ['./project-post.component.css'],
})
export class ProjectPostComponent implements OnInit, OnDestroy {
	project: IProjectItem | null = null;
	repositoryName: string = '';

	readme: IReadme | null = null;
	readmeState: ReadmeState = 'loading';
	activeHeadingId: string = '';

	galleryOpen: boolean = false;

	private readonly originalTitle: string;
	private routeSubscription?: Subscription;
	private readmeSubscription?: Subscription;
	private readonly onScroll = () => this.scheduleActiveHeadingUpdate();
	private frameRequested = false;
	/* ignora a resposta de um projeto anterior se a rota mudar no meio */
	private readmeRequestId = 0;

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _dataService: DataService,
		private readonly _readmeService: ReadmeService,
		private readonly _title: Title,
		private readonly _elementRef: ElementRef<HTMLElement>,
		private readonly _zone: NgZone,
	) {
		this.originalTitle = this._title.getTitle();
	}

	get headings(): IReadmeHeading[] {
		return this.readme?.headings ?? [];
	}

	ngOnInit(): void {
		this.routeSubscription = this._route.paramMap.subscribe((params) =>
			this.loadProject(params.get('slug') ?? ''),
		);
		/* a rolagem não precisa disparar a detecção de mudanças a cada evento */
		this._zone.runOutsideAngular(() =>
			window.addEventListener('scroll', this.onScroll, { passive: true }),
		);
	}

	ngOnDestroy(): void {
		window.removeEventListener('scroll', this.onScroll);
		this.routeSubscription?.unsubscribe();
		this.readmeSubscription?.unsubscribe();
		this._title.setTitle(this.originalTitle);
	}

	scrollToHeading(event: Event, id: string): void {
		event.preventDefault();
		const target = document.getElementById(id);
		if (!target) return;
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		this.activeHeadingId = id;
		history.replaceState(null, '', `${location.pathname}#${id}`);
	}

	/* âncoras internas do README (#secao) rolam na página em vez de ir para a home */
	onReadmeClick(event: MouseEvent): void {
		const link = (event.target as HTMLElement).closest('a');
		const href = link?.getAttribute('href');
		if (href?.startsWith('#')) {
			this.scrollToHeading(event, decodeURIComponent(href.slice(1)));
		}
	}

	openGallery(): void {
		this.galleryOpen = true;
	}

	closeGallery(): void {
		this.galleryOpen = false;
	}

	private loadProject(slug: string): void {
		const project = this._dataService.getProject(slug);

		if (!project) {
			this._router.navigate(['/projetos']);
			return;
		}

		this.project = project;
		this.repositoryName = slug;
		this._title.setTitle(`${project.title} · Projetos | Vitor Oliveira`);
		this.loadReadme(project.code_url);
	}

	private loadReadme(repositoryUrl: string): void {
		this.readme = null;
		this.readmeState = 'loading';
		this.readmeRequestId++;
		this.readmeSubscription?.unsubscribe();

		this.readmeSubscription = this._readmeService
			.getReadme(repositoryUrl)
			.subscribe({
				next: (readme) => this.showWhenImagesLoad(readme),
				error: () => (this.readmeState = 'error'),
			});
	}

	/* Só mostra o README quando as imagens já estão no cache do navegador:
	   assim o texto não aparece solto e a página não "pula" quando elas chegam.
	   Um limite de tempo evita que uma imagem lenta trave a página. */
	private showWhenImagesLoad(readme: IReadme): void {
		const requestId = this.readmeRequestId;
		const imageLoads = [...new Set(readme.imageUrls)].map(
			(src) =>
				new Promise<void>((resolve) => {
					const image = new Image();
					image.onload = image.onerror = () => resolve();
					image.src = src;
				}),
		);
		const timeout = new Promise<void>((resolve) =>
			setTimeout(resolve, IMAGE_WAIT_LIMIT_MS),
		);

		Promise.race([Promise.all(imageLoads), timeout]).then(() => {
			if (this.readmeRequestId !== requestId) return;
			this._zone.run(() => {
				this.readme = readme;
				this.readmeState = 'ready';
				this.activeHeadingId = readme.headings[0]?.id ?? '';
				/* espera o HTML entrar na tela para marcar e medir os títulos */
				setTimeout(() => {
					this.applyHeadingIds(readme.headingIds);
					this.updateActiveHeading();
				});
			});
		});
	}

	private applyHeadingIds(ids: string[]): void {
		const headings = this._elementRef.nativeElement.querySelectorAll(
			'.readme h1, .readme h2, .readme h3, .readme h4, .readme h5, .readme h6',
		);
		headings.forEach((heading, index) => {
			if (ids[index]) heading.id = ids[index];
		});
	}

	private scheduleActiveHeadingUpdate(): void {
		if (this.frameRequested) return;
		this.frameRequested = true;
		requestAnimationFrame(() => {
			this.frameRequested = false;
			this.updateActiveHeading();
		});
	}

	/* ativo é o último título que já passou do topo da área de leitura */
	private updateActiveHeading(): void {
		const ids = this.headings.map((heading) => heading.id);
		if (!ids.length) return;

		const readingLine = window.innerHeight * 0.25;
		let active = ids[0];
		for (const id of ids) {
			const element = this._elementRef.nativeElement.querySelector(
				`[id="${CSS.escape(id)}"]`,
			);
			if (element && element.getBoundingClientRect().top <= readingLine) {
				active = id;
			}
		}

		/* no fim da página, o último título fica ativo mesmo sem chegar ao topo */
		const atBottom =
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 4;
		if (atBottom) active = ids[ids.length - 1];

		if (active !== this.activeHeadingId) {
			this._zone.run(() => (this.activeHeadingId = active));
		}
	}
}
