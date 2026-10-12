import { Component } from '@angular/core';
import {
	ActivityCategory,
	IActivityItem,
} from 'src/app/interfaces/activities/activity-item.interface';
import { DataService } from 'src/app/services/data.service';

type ActivityFilter = 'Todos' | ActivityCategory;

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent {
	readonly activities: IActivityItem[];
	readonly filters: ActivityFilter[];

	activeFilter: ActivityFilter = 'Todos';

	constructor(private readonly _dataService: DataService) {
		this.activities = [...this._dataService.getActivities()].sort((a, b) =>
			b.date.localeCompare(a.date),
		);
		const categories = new Set(this.activities.map((item) => item.category));
		this.filters = ['Todos', ...categories];
	}

	get visibleActivities(): IActivityItem[] {
		return this.activeFilter === 'Todos'
			? this.activities
			: this.activities.filter((item) => item.category === this.activeFilter);
	}

	selectFilter(filter: ActivityFilter): void {
		this.activeFilter = filter;
	}
}
