import { Component, OnInit } from '@angular/core';
import { ITimelineItem } from 'src/app/interfaces/timeline/timeline-item.interface';
import { DataService } from 'src/app/services/data.service';

type TabId = 'experience' | 'education';

@Component({
	selector: 'app-experience-tabs',
	templateUrl: './experience-tabs.component.html',
	styleUrls: ['./experience-tabs.component.css'],
})
export class ExperienceTabsComponent implements OnInit {
	readonly tabs: { id: TabId; label: string }[] = [
		{ id: 'experience', label: 'Experiência' },
		{ id: 'education', label: 'Educação' },
	];

	activeTab: TabId = 'experience';

	experienceItems!: ITimelineItem[];
	educationItems!: ITimelineItem[];

	constructor(private _dataService: DataService) {}

	ngOnInit(): void {
		this.fetchTimelineData();
	}

	selectTab(tabId: TabId): void {
		this.activeTab = tabId;
	}

	get activeItems(): ITimelineItem[] {
		switch (this.activeTab) {
			case 'education':
				return this.educationItems;
			default:
				return this.experienceItems;
		}
	}

	private fetchTimelineData(): void {
		this.experienceItems = this._dataService.getExperienceTimeline();
		this.educationItems = this._dataService.getEducationTimeline();
	}
}
