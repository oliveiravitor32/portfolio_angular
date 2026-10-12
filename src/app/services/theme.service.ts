import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'system' | 'light' | 'dark';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly media = window.matchMedia('(prefers-color-scheme: dark)');
	private mode = new BehaviorSubject<ThemeMode>('system');
	private darkMode = new BehaviorSubject<boolean>(false);
	public mode$ = this.mode.asObservable();
	public darkMode$ = this.darkMode.asObservable();

	constructor() {
		const storedTheme = localStorage.getItem('theme');
		const mode: ThemeMode =
			storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
		this.setMode(mode);

		/* no modo "sistema", acompanha a troca de tema do sistema operacional */
		this.media.addEventListener('change', () => {
			if (this.mode.value === 'system') this.applyTheme();
		});
	}

	setMode(mode: ThemeMode): void {
		this.mode.next(mode);
		if (mode === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', mode);
		}
		this.applyTheme();
	}

	isDarkMode(): boolean {
		return this.darkMode.value;
	}

	private applyTheme(): void {
		const isDark =
			this.mode.value === 'dark' ||
			(this.mode.value === 'system' && this.media.matches);
		this.darkMode.next(isDark);
		document.body.classList.toggle('dark-theme', isDark);
		document.body.classList.toggle('light-theme', !isDark);
	}
}
