export interface IExperienceItem {
	company_name: string;
	role: string;
	employment_type: string;

	startDate: string;

	endDate?: string;
	location?: string;
	details?: string[];
	highlights?: string[];
	skills?: string[];
	logoUrl: string;
}
