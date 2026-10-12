import { Injectable } from '@angular/core';
import { ActivitiesData } from '../data/activities-data';
import { CaseStudiesData } from '../data/case-studies-data';
import { EducationData } from '../data/education-data';
import { ExperienceData } from '../data/experience-data';
import { ProjectsData } from '../data/projects-data';
import { IActivityItem } from '../interfaces/activities/activity-item.interface';
import { IEducationData } from '../interfaces/education/education-data.interface';
import { IEducationItem } from '../interfaces/education/education-item.interface';
import { IExperienceItem } from '../interfaces/experience/experience-item.interface';
import { ICaseStudy } from '../interfaces/projects/case-study.interface';
import { IProjectItem } from '../interfaces/projects/project-item.interface';
import { ITimelineItem } from '../interfaces/timeline/timeline-item.interface';
import { buildExperiencePeriod } from '../utils/experience-period.util';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private readonly educationData = EducationData;
	private readonly experienceData = ExperienceData;
	private readonly projectsData = ProjectsData;
	private readonly caseStudiesData = CaseStudiesData;
	private readonly activitiesData = ActivitiesData;

	constructor() {}

	getEducationData(): IEducationData {
		return this.educationData;
	}

	getEducationTimeline(): ITimelineItem[] {
		return [
			this.educationData.degree,
			...this.educationData.certifications,
		].map((item) => this.toTimelineItem(item));
	}

	getExperienceTimeline(): ITimelineItem[] {
		return this.experienceData.map((item) =>
			this.toExperienceTimelineItem(item),
		);
	}

	getActivities(): IActivityItem[] {
		return this.activitiesData;
	}

	getActivity(slug: string): IActivityItem | null {
		return this.activitiesData.find((item) => item.slug === slug) ?? null;
	}

	getProjectsData() {
		return this.projectsData;
	}

	/* o slug da página do projeto é o nome do repositório no GitHub */
	getProjectSlug(project: IProjectItem): string {
		return project.code_url.replace(/\/+$/, '').split('/').pop() ?? '';
	}

	getProject(slug: string): IProjectItem | null {
		return (
			this.projectsData.projects.find(
				(project) => this.getProjectSlug(project) === slug,
			) ?? null
		);
	}

	getCaseStudy(
		slug: string,
	): { project: IProjectItem; caseStudy: ICaseStudy } | null {
		const caseStudy = this.caseStudiesData.find((item) => item.slug === slug);
		const project = this.projectsData.projects.find(
			(item) => item.case_study_slug === slug,
		);

		return caseStudy && project ? { project, caseStudy } : null;
	}

	private toTimelineItem(item: IEducationItem): ITimelineItem {
		return {
			logoUrl: item.logoUrl,
			logoAlt: `Logo da instituição ${item.institution_name}`,
			meta: item.timePeriod
				? `${item.status}: ${item.timePeriod}`
				: item.status,
			title: item.institution_name,
			subtitle: item.program_title,
			details: item.details,
		};
	}

	private toExperienceTimelineItem(item: IExperienceItem): ITimelineItem {
		const period = buildExperiencePeriod(item.startDate, item.endDate);

		return {
			logoUrl: item.logoUrl,
			logoAlt: `Logo da empresa ${item.company_name}`,
			meta: period,
			title: item.role,
			subtitle: `${item.company_name} · ${item.employment_type}`,
			location: item.location,
			details: item.details,
			highlightsTitle: 'Principais entregas',
			highlights: item.highlights,
			skills: item.skills,
		};
	}

}
