import { IProjectsData } from '../interfaces/projects/projects-data.interface';

export const ProjectsData: IProjectsData = {
	projects: [
		{
			img_urls: [
				'assets/images/project_pdf_reader_home.png',
				'assets/images/project_pdf_reader_original.png',
				'assets/images/project_pdf_reader_reading_mode.png',
			],
			title: 'Leitor de PDF customizável',
			description:
				'Leitor de PDF que permite ajustar cores, fontes e espaçamento para leituras longas, com modo leitura que extrai o texto e o exibe como um ebook. Roda inteiramente no navegador, sem enviar arquivos para nenhum servidor.',
			technologies: ['React', 'TypeScript', 'Tailwind', 'pdf.js', 'Vite'],
			code_url:
				'https://github.com/oliveiravitor32/leitor-de-pdf-customizavel_react',
			demo_url: 'https://leitor-de-pdf-customizavel-react.vercel.app/',
			case_study_slug: 'leitor-de-pdf-customizavel',
		},
		{
			img_urls: ['assets/images/project_game_library.png'],
			title: 'Biblioteca de jogos',
			description:
				'O projeto Biblioteca de Jogos é um website desenvolvido em Angular 17, integrado com a API RAWG Video Games Database.',
			technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
			code_url:
				'https://github.com/oliveiravitor32/biblioteca-de-jogos_angular',
			demo_url:
				'https://biblioteca-de-jogos-angular-oliveiravitor32s-projects.vercel.app/',
		},
		{
			img_urls: [
				'assets/images/project_the_fallen_piolin_gameplay.png',
				'assets/images/project_the_fallen_piolin_menu.png',
				'assets/images/project_the_fallen_piolin_controls.png',
			],
			title: 'The Fallen Piolin',
			description:
				'Jogo de plataforma 2D com luta de chefe, em que o Piolin precisa derrotar o Espalha Lixo antes que ele incendeie a floresta. O inimigo tem IA própria com máquina de estados, que escolhe entre atear fogo no cenário e partir para cima do jogador. Mapa montado no Tiled e interface em pixel art feita do zero.',
			technologies: ['Java', 'FXGL', 'JavaFX', 'Maven', 'Tiled'],
			code_url:
				'https://github.com/oliveiravitor32/the-fallen-piolin_jogo_java',
		},
		{
			img_urls: ['assets/images/project_pokedex_angular.png'],
			title: 'Pokédex',
			description:
				'Projeto de uma pokédex contruída com Angular e com a PokeApi(API do pokemon).',
			technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
			code_url: 'https://github.com/oliveiravitor32/pokedex_angular',
			demo_url: 'https://angular-pokedex-umber.vercel.app/',
		},
		{
			img_urls: ['assets/images/project_note_app_angular.png'],
			title: 'Lista de tarefas',
			description:
				'Projeto Bloco de Notas (NoteApp) construído utilizando Angular com navegação de página única (single page application) e possibilita buscas por notas, criar, deletar e editar notas.',
			technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
			code_url: 'https://github.com/oliveiravitor32/lista-de-tarefas_angular',
			demo_url: 'https://note-app-oliveiravitor32.vercel.app/',
		},
		{
			img_urls: ['assets/images/project_shopping_cart_react.png'],
			title: 'Carrinho de compras',
			description:
				'Projeto Carrinho de Compras (Shopping Cart) construído com ReactJS utilizando a API do Mercado Livre, desenvolvido com o canal Manual do Dev no Youtube.',
			technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
			code_url:
				'https://github.com/oliveiravitor32/arquivado_carrinho-de-compras_react',
		},
		{
			img_urls: ['assets/images/project_to_do_list_react.png'],
			title: 'Lista de tarefas',
			description:
				'Simples projeto de uma lista de tarefas (To Do List) utilizando ReactJS, que permite criar, concluir, editar, e também deletar tarefas.',
			technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
			code_url: 'https://github.com/oliveiravitor32/lista-de-tarefas_react',
			demo_url: 'https://to-do-list-react-js-oliveiravitor32.vercel.app/',
		},
		{
			img_urls: ['assets/images/project_old_porfolio.png'],
			title: 'Antigo portfólio',
			description:
				'Meu antigo portfólio com página responsiva, implementações de animações via CSS e JS e com formulário funcional. Desenvolvido com o curso "Html-Css-Feliz" de Marco Bruno Dev no Youtube.',
			technologies: ['HTML', 'CSS', 'JavaScript'],
			code_url:
				'https://github.com/oliveiravitor32/arquivado_portfolio_html-css',
			demo_url:
				'https://oliveiravitor32.github.io/arquivado_portfolio_html-css/',
		},
	],
};
