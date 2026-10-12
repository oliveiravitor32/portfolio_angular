import { Component, Input, OnInit } from '@angular/core';
import { IProjectItem } from 'src/app/interfaces/projects/project-item.interface';
import { IProjectsData } from 'src/app/interfaces/projects/projects-data.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-my-projects',
	templateUrl: './my-projects.component.html',
	styleUrls: ['./my-projects.component.css'],
})
export class MyProjectsComponent implements OnInit {
	@Input() limit: number = 0;
	projectsData: IProjectsData = {} as IProjectsData;

	visibleProjects: IProjectItem[] = [];
	activeImageIndexes: number[] = [];

	galleryProject: IProjectItem | null = null;
	galleryStartIndex: number = 0;
	private galleryProjectIndex: number = -1;

	constructor(private readonly _dataService: DataService) {}

	ngOnInit(): void {
		this.fetchProjectsData();
	}

	previousImage(projectIndex: number): void {
		this.goToImage(projectIndex, this.activeImageIndexes[projectIndex] - 1);
	}

	nextImage(projectIndex: number): void {
		this.goToImage(projectIndex, this.activeImageIndexes[projectIndex] + 1);
	}

	goToImage(projectIndex: number, imageIndex: number): void {
		const total = this.visibleProjects[projectIndex]?.img_urls.length ?? 0;
		if (total === 0) {
			return;
		}
		this.activeImageIndexes[projectIndex] = (imageIndex + total) % total;
	}

	openGallery(projectIndex: number): void {
		this.galleryProjectIndex = projectIndex;
		this.galleryStartIndex = this.activeImageIndexes[projectIndex] ?? 0;
		this.galleryProject = this.visibleProjects[projectIndex];
	}

	closeGallery(): void {
		this.galleryProject = null;
		this.galleryProjectIndex = -1;
	}

	onGalleryIndexChanged(imageIndex: number): void {
		if (this.galleryProjectIndex >= 0) {
			this.activeImageIndexes[this.galleryProjectIndex] = imageIndex;
		}
	}

	projectSlug(project: IProjectItem): string {
		return this._dataService.getProjectSlug(project);
	}

	trackByIndex(index: number): number {
		return index;
	}

	private fetchProjectsData(): void {
		this.projectsData = this._dataService.getProjectsData();
		if (this.limit === 0) {
			this.limit = this.projectsData.projects.length;
		}
		this.visibleProjects = this.projectsData.projects.slice(0, this.limit);
		this.activeImageIndexes = this.visibleProjects.map(() => 0);
	}
}
