export interface ITimelineLink {
	label: string;
	url: string;
}

export interface ITimelineItem {
	logoUrl: string;
	logoAlt: string;
	meta: string;
	title: string;
	subtitle: string;
	location?: string;
	details?: string[];
	highlightsTitle?: string;
	highlights?: string[];
	skills?: string[];
	link?: ITimelineLink;
}
