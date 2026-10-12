import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';

export interface IReadmeHeading {
	id: string;
	title: string;
	level: 2 | 3;
}

export interface IReadme {
	html: string;
	headings: IReadmeHeading[];
	/* ids de todos os títulos, na ordem do documento; o sanitizador do Angular
	   remove o atributo id do HTML, então a página aplica depois de renderizar */
	headingIds: string[];
	/* imagens do README, para a página esperar elas antes de exibir o texto */
	imageUrls: string[];
	sourceUrl: string;
}

/* nomes de arquivo mais comuns, tentados nessa ordem */
const README_FILES = ['README.md', 'readme.md', 'Readme.md'];

@Injectable({
	providedIn: 'root',
})
export class ReadmeService {
	/* um README por repositório durante a sessão, sem buscar de novo */
	private readonly cache = new Map<string, Observable<IReadme>>();

	constructor(private readonly _http: HttpClient) {}

	/* busca o README do repositório no GitHub e devolve o HTML pronto para exibir */
	getReadme(repositoryUrl: string): Observable<IReadme> {
		const repository = this.parseRepository(repositoryUrl);
		if (!repository) {
			return throwError(() => new Error('URL de repositório inválida'));
		}

		const key = `${repository.owner}/${repository.name}`;
		if (!this.cache.has(key)) {
			const request = this.fetchMarkdown(repository.owner, repository.name).pipe(
				map(({ markdown, file }) =>
					this.toReadme(markdown, repository.owner, repository.name, file),
				),
				shareReplay(1),
			);
			this.cache.set(key, request);
		}
		return this.cache.get(key)!;
	}

	private parseRepository(url: string): { owner: string; name: string } | null {
		const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
		return match ? { owner: match[1], name: match[2] } : null;
	}

	/* raw.githubusercontent.com não tem o limite de requisições da API do GitHub */
	private fetchMarkdown(
		owner: string,
		name: string,
		fileIndex = 0,
	): Observable<{ markdown: string; file: string }> {
		const file = README_FILES[fileIndex];
		const url = `https://raw.githubusercontent.com/${owner}/${name}/HEAD/${file}`;

		return this._http.get(url, { responseType: 'text' }).pipe(
			map((markdown) => ({ markdown, file })),
			catchError((error) =>
				fileIndex + 1 < README_FILES.length
					? this.fetchMarkdown(owner, name, fileIndex + 1)
					: throwError(() => error),
			),
		);
	}

	private toReadme(
		markdown: string,
		owner: string,
		name: string,
		file: string,
	): IReadme {
		const rendered = marked.parse(markdown, { gfm: true, async: false }) as string;
		const doc = new DOMParser().parseFromString(rendered, 'text/html');
		const rawBase = `https://raw.githubusercontent.com/${owner}/${name}/HEAD/`;
		const blobBase = `https://github.com/${owner}/${name}/blob/HEAD/`;

		/* o título da página já mostra o nome do projeto */
		const first = doc.body.firstElementChild;
		if (first?.tagName === 'H1') first.remove();

		/* caminhos relativos do README apontam para arquivos do repositório */
		const imageUrls: string[] = [];
		doc.querySelectorAll('img[src]').forEach((img) => {
			const src = this.resolve(img.getAttribute('src')!, rawBase);
			img.setAttribute('src', src);
			imageUrls.push(src);
		});

		doc.querySelectorAll('a[href]').forEach((link) => {
			const href = link.getAttribute('href')!;
			if (href.startsWith('#')) return;
			link.setAttribute('href', this.resolve(href, blobBase));
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});

		/* ids no mesmo formato do GitHub, para âncoras do próprio README funcionarem */
		const usedIds = new Map<string, number>();
		const headings: IReadmeHeading[] = [];
		const headingIds: string[] = [];
		doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
			const title = heading.textContent?.trim() ?? '';
			const id = this.uniqueId(this.slugify(title), usedIds);
			headingIds.push(id);

			const level = Number(heading.tagName[1]);
			if (level === 2 || level === 3) {
				headings.push({ id, title, level });
			}
		});

		return {
			html: doc.body.innerHTML,
			headings,
			headingIds,
			imageUrls,
			sourceUrl: `https://github.com/${owner}/${name}/blob/HEAD/${file}`,
		};
	}

	private resolve(path: string, base: string): string {
		try {
			return new URL(path, base).href;
		} catch {
			return path;
		}
	}

	private slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\p{L}\p{N}\s-]/gu, '')
			.trim()
			.replace(/\s/g, '-');
	}

	private uniqueId(base: string, used: Map<string, number>): string {
		const id = base || 'secao';
		const count = used.get(id) ?? 0;
		used.set(id, count + 1);
		return count ? `${id}-${count}` : id;
	}
}

