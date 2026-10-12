export interface ICaseStudyDecision {
	title: string;
	reason: string;
	alternative?: string;
}

export interface ICaseStudyChallenge {
	title: string;
	description: string;
}

export interface ICaseStudy {
	slug: string;
	subtitle: string;
	period: string;
	status: string;
	problem: string[];
	solution: string[];
	decisions: ICaseStudyDecision[];
	challenges: ICaseStudyChallenge[];
	results: string[];
	improvements: string[];
}
