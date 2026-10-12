import { ITimelineLink } from '../timeline/timeline-item.interface';

export type ActivityCategory = 'Apresentação' | 'Palestra' | 'Evento' | 'Curso';

export type ActivityBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'list'; items: string[] }
	| { type: 'quote'; text: string }
	| { type: 'link'; text: string; label: string; url: string };

/* cada seção vira um título no texto e um item no sumário lateral */
export interface IActivitySection {
	id: string;
	title: string;
	blocks: ActivityBlock[];
}

export interface IActivityPerson {
	name: string;
	role?: string;
	url: string;
}

export interface IActivityPeopleGroup {
	title: string;
	people: IActivityPerson[];
}

export interface IActivityImage {
	src: string;
	alt: string;
}

export interface IActivityItem {
	slug: string;
	title: string;
	organization: string;
	category: ActivityCategory;
	date: string;
	period: string;
	location?: string;
	summary: string;
	sections: IActivitySection[];
	people?: IActivityPeopleGroup[];
	images?: IActivityImage[];
	topics?: string[];
	links?: ITimelineLink[];
	logoUrl: string;
}
