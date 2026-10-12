import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeMode, ThemeService } from '../../services/theme.service';

@Component({
	selector: 'app-theme-toggle',
	templateUrl: './theme-toggle.component.html',
	styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
	readonly options: { mode: ThemeMode; label: string }[] = [
		{ mode: 'system', label: 'Tema do sistema' },
		{ mode: 'light', label: 'Tema claro' },
		{ mode: 'dark', label: 'Tema escuro' },
	];

	mode: ThemeMode = 'system';
	private subscription?: Subscription;

	constructor(private readonly _themeService: ThemeService) {}

	ngOnInit(): void {
		this.subscription = this._themeService.mode$.subscribe((mode) => {
			this.mode = mode;
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	setMode(mode: ThemeMode): void {
		this._themeService.setMode(mode);
	}
}
