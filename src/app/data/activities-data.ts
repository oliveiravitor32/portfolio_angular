import { IActivityItem } from '../interfaces/activities/activity-item.interface';

export const ActivitiesData: IActivityItem[] = [
	{
		slug: 'jornadas-de-tecnologia-2026-icet',
		title: 'Jornadas de Tecnologia 2026 - ICET',
		organization: 'UNIP - Universidade Paulista',
		category: 'Apresentação',
		date: '2026-09-30',
		period: '28 a 30 Set 2026',
		location: 'Campus Marquês, São Paulo',
		summary:
			'Apresentei o jogo The Fallen Piolin para o público e passei três noites aprendendo sobre IA, computação quântica, dados e carreira.',
		sections: [
			{
				id: 'o-evento',
				title: 'Três noites no Campus Marquês',
				blocks: [
					{
						type: 'paragraph',
						text: 'De 28 a 30 de setembro de 2026 eu participei das Jornadas de Tecnologia do ICET, na UNIP. Fui com duas funções: apresentar um projeto meu para o público e assistir às palestras das três noites.',
					},
					{
						type: 'paragraph',
						text: 'Saí do evento enxergando a área de outro jeito. Ver temas como IA e computação quântica explicados por quem trabalha com eles, e ao mesmo tempo mostrar algo que eu ajudei a construir, me fez entender melhor onde eu estou e para onde quero ir.',
					},
				],
			},
			{
				id: 'apresentando-o-jogo',
				title: 'Do outro lado do estande',
				blocks: [
					{
						type: 'paragraph',
						text: 'Com o meu time, apresentei o The Fallen Piolin, um jogo 2D sobre preservação ambiental que criamos na faculdade. O objetivo é derrotar o Espalha Lixo antes que ele incendeie a floresta.',
					},
					{
						type: 'paragraph',
						text: 'A graça está no equilíbrio: se você só atacar, a floresta queima; se só apagar o fogo, vira o alvo. Explicar essa mecânica várias vezes por noite, para pessoas que nunca tinham jogado, me ensinou a falar do projeto de forma simples e direta.',
					},
					{
						type: 'quote',
						text: 'Nos dias do evento, ninguém conseguiu vencer o jogo no nível Difícil.',
					},
					{
						type: 'paragraph',
						text: 'O que mais me marcou foi ver quem está começando perceber que o que se aprende em sala de aula pode virar um jogo de verdade.',
					},
				],
			},
			{
				id: 'por-tras-do-jogo',
				title: 'O que tem por trás do jogo',
				blocks: [
					{
						type: 'paragraph',
						text: 'O jogo foi feito em Java com a engine FXGL e muita orientação a objetos. O vilão tem uma inteligência artificial própria, que decide entre espalhar o fogo e partir para cima do jogador, e os níveis de dificuldade foram pensados para quem nunca jogou.',
					},
					{
						type: 'link',
						text: 'O código é aberto. Quem quiser jogar, estudar como ele foi feito ou usar como referência para os primeiros projetos pode acessar:',
						label: 'github.com/oliveiravitor32/the-fallen-piolin_jogo_java',
						url: 'https://github.com/oliveiravitor32/the-fallen-piolin_jogo_java',
					},
				],
			},
			{
				id: 'palestras',
				title: 'O que aprendi nas palestras',
				blocks: [
					{
						type: 'list',
						items: [
							'IA generativa e deep learning: entendi o que existe por trás das ferramentas que eu uso todo dia.',
							'Computação quântica: um tema que parecia distante, explicado de um jeito que mostra que essa mudança já começou.',
							'Data science com imagens de satélite: vi como imagens do espaço viram dados para cuidar do meio ambiente e das cidades.',
							'LinkedIn para TI e a conversa com egressos: me fizeram repensar como eu mostro o que faço.',
						],
					},
				],
			},
			{
				id: 'o-que-levo',
				title: 'O que eu levo do evento',
				blocks: [
					{
						type: 'paragraph',
						text: 'A principal lição foi sobre comunicação. Saber fazer não basta; é preciso mostrar o que se fez de um jeito que outras pessoas entendam. Esta página, e a seção de atividades do portfólio, são resultado direto disso.',
					},
					{
						type: 'paragraph',
						text: 'Agradeço à Universidade Paulista, à coordenação e a todos os palestrantes pelas noites incríveis.',
					},
				],
			},
		],
		people: [
			{
				title: 'Time do The Fallen Piolin',
				people: [
					{
						name: 'Bruno Bonavigo Dacal',
						role: 'Desenvolvimento e apresentação',
						url: 'https://www.linkedin.com/in/bruno-bonavigo-dacal/',
					},
					{
						name: 'Helen Silva',
						role: 'Desenvolvimento e apresentação',
						url: 'https://www.linkedin.com/in/helen-silva-4a3035220/',
					},
					{
						name: 'Guilherme Leandro',
						role: 'Desenvolvimento',
						url: 'https://www.linkedin.com/in/guilhermeleandrotech/',
					},
				],
			},
			{
				title: 'Palestrantes',
				people: [
					{
						name: 'Lucas Madalena Gonzalez Abad',
						role: 'IA generativa e deep learning',
						url: 'https://www.linkedin.com/in/lucas-m-g-bad/',
					},
					{
						name: 'Marcus Leite, MSc',
						role: 'Computação quântica',
						url: 'https://www.linkedin.com/in/marcus-leite-msc-366413a/',
					},
					{
						name: 'André Luís Ferreira Marques',
						role: 'Data science com imagens de satélite',
						url: 'https://www.linkedin.com/in/andre-luis-ferreira-marques/',
					},
					{
						name: 'Aretha Albuquerque S. Martins',
						role: 'LinkedIn para TI',
						url: 'https://www.linkedin.com/in/aretha-dealbuquerque-santiago-33b40b154/',
					},
				],
			},
			{
				title: 'Organização',
				people: [
					{
						name: 'JOSE LUIZ VALENTE JUNIOR',
						role: 'UNIP',
						url: 'https://www.linkedin.com/in/jose-luiz-valente-junior-a4a4091a0/',
					},
				],
			},
		],
		images: [
			{
				src: 'assets/images/activity_jornadas_icet_1.jpg',
				alt: 'Vitor, Helen e Bruno em frente ao banner do The Fallen Piolin',
			},
			{
				src: 'assets/images/activity_jornadas_icet_2.jpg',
				alt: 'Banner do projeto The Fallen Piolin',
			},
			{
				src: 'assets/images/activity_jornadas_icet_3.jpg',
				alt: 'Foto em grupo com os participantes do evento',
			},
			{
				src: 'assets/images/activity_jornadas_icet_4.jpg',
				alt: 'Conversa com egressos no palco do auditório',
			},
			{
				src: 'assets/images/activity_jornadas_icet_5.jpg',
				alt: 'Palestrante no palco com o auditório ao fundo',
			},
			{
				src: 'assets/images/activity_jornadas_icet_6.jpg',
				alt: 'Palestra de computação quântica com Marcus Leite',
			},
			{
				src: 'assets/images/activity_jornadas_icet_7.jpg',
				alt: 'Palco do auditório antes da palestra',
			},
			{
				src: 'assets/images/activity_jornadas_icet_8.jpg',
				alt: 'Cartaz de divulgação das Jornadas de Tecnologia 2026',
			},
		],
		topics: [
			'Tecnologia',
			'InteligenciaArtificial',
			'ComputacaoQuantica',
			'DataScience',
			'CienciaDaComputacao',
			'ICET',
		],
		links: [
			{
				label: 'Ver publicação no LinkedIn',
				url: 'https://www.linkedin.com/feed/update/urn:li:activity:7514111842881871872/',
			},
		],
		logoUrl: 'assets/logos/unip-logo.png',
	},
];
