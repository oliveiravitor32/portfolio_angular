import {
	AfterViewChecked,
	Component,
	ElementRef,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
	IActivityImage,
	IActivityItem,
} from 'src/app/interfaces/activities/activity-item.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-activity-post',
	templateUrl: './activity-post.component.html',
	styleUrls: ['./activity-post.component.css'],
})
export class ActivityPostComponent
	implements OnInit, AfterViewChecked, OnDestroy
{
	/* id fixo da seção de pessoas, que entra no sumário depois das seções do texto */
	readonly peopleSectionId = 'quem-fez-parte';

	activeSectionId: string = '';

	activity: IActivityItem | null = null;
	imageSources: string[] = [];

	/* como no LinkedIn: a grade mostra até 5 fotos e a última indica quantas faltam */
	private readonly maxVisibleImages = 5;

	get visibleImages(): IActivityImage[] {
		return (this.activity?.images ?? []).slice(0, this.maxVisibleImages);
	}

	get hiddenImagesCount(): number {
		return (this.activity?.images?.length ?? 0) - this.visibleImages.length;
	}

	galleryOpen: boolean = false;
	galleryStartIndex: number = 0;

	private readonly originalTitle: string;
	private routeSubscription?: Subscription;
	private sectionObserver?: IntersectionObserver;
	private observedSlug: string = '';

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _dataService: DataService,
		private readonly _title: Title,
		private readonly _elementRef: ElementRef<HTMLElement>,
		private readonly _zone: NgZone,
	) {
		this.originalTitle = this._title.getTitle();
	}

	ngOnInit(): void {
		this.routeSubscription = this._route.paramMap.subscribe((params) =>
			this.loadActivity(params.get('slug') ?? ''),
		);
	}

	get tocItems(): { id: string; title: string }[] {
		if (!this.activity) return [];
		const items = this.activity.sections.map(({ id, title }) => ({ id, title }));
		return this.activity.people?.length
			? [...items, { id: this.peopleSectionId, title: 'Quem fez parte' }]
			: items;
	}

	/* observa as seções depois que o texto da atividade é renderizado */
	ngAfterViewChecked(): void {
		if (this.activity && this.observedSlug !== this.activity.slug) {
			this.observedSlug = this.activity.slug;
			this.observeSections();
		}
	}

	scrollToSection(event: Event, id: string): void {
		event.preventDefault();
		const target = document.getElementById(id);
		if (!target) return;
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		this.activeSectionId = id;
		history.replaceState(null, '', `${location.pathname}#${id}`);
	}

	ngOnDestroy(): void {
		this.sectionObserver?.disconnect();
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

	private loadActivity(slug: string): void {
		const activity = this._dataService.getActivity(slug);

		if (!activity) {
			this._router.navigate(['/atividades']);
			return;
		}

		this.activity = activity;
		this.imageSources = (activity.images ?? []).map((image) => image.src);
		this._title.setTitle(`${activity.title} · Atividades | Vitor Oliveira`);
	}

	/* marca no sumário a seção que está no topo da área de leitura */
	private observeSections(): void {
		this.sectionObserver?.disconnect();
		const sections = this._elementRef.nativeElement.querySelectorAll<HTMLElement>(
			'.post__section',
		);

		this.sectionObserver = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length) {
					this._zone.run(() => (this.activeSectionId = visible[0].target.id));
				}
			},
			{ rootMargin: '-15% 0px -70% 0px' },
		);

		sections.forEach((section) => this.sectionObserver?.observe(section));
		/* fora do ciclo atual de detecção, para não alterar o template já checado */
		setTimeout(() => (this.activeSectionId = sections[0]?.id ?? ''));
	}
}
