import { ICaseStudy } from '../interfaces/projects/case-study.interface';

export const CaseStudiesData: ICaseStudy[] = [
	{
		slug: 'leitor-de-pdf-customizavel',
		subtitle:
			'Leitor de PDF no navegador para leituras longas, com cores, fontes e espaçamento ajustáveis por quem lê.',
		period: 'Set 2026',
		status: 'Concluído',
		problem: [
			'Ler um PDF por horas em um leitor comum cansa: o fundo é branco, e a fonte e o espaçamento são os que o arquivo definiu. Não há como adaptar a leitura a quem está lendo, seja por pouca luz no ambiente, baixa visão ou dislexia.',
			'As ferramentas que convertem o PDF para um formato mais confortável costumam exigir o envio do arquivo para um servidor, o que é um problema para documentos pessoais ou de trabalho.',
		],
		solution: [
			'Dois modos de leitura: o PDF original renderizado em canvas e um modo leitura que extrai o texto e o exibe como um ebook.',
			'Seis predefinições de cor (sépia, creme, escuro, alto contraste, verde suave e papel) e ajuste fino de fundo, inversão, matiz, contraste, brilho e sépia.',
			'No modo leitura: nove fontes, entre elas Atkinson Hyperlegible e OpenDyslexic, além de tamanho, altura de linha, largura da coluna e espaçamento entre letras.',
			'Renderização preguiçosa das páginas, preferências salvas entre sessões, atalhos de teclado e tela cheia.',
			'Todo o processamento acontece no navegador. Nenhum arquivo sai da máquina de quem usa.',
		],
		decisions: [
			{
				title: 'Processamento inteiro no cliente, com pdf.js em Web Worker',
				reason:
					'Garante privacidade, já que o arquivo nunca é enviado, e elimina custo de servidor: o deploy é estático na Vercel. O Web Worker tira a leitura do PDF da thread principal, então a interface não trava enquanto o documento carrega.',
				alternative:
					'Um back-end para converter o PDF, descartado por exigir upload do arquivo e ter custo de hospedagem.',
			},
			{
				title: 'Cores aplicadas com filtro CSS sobre o canvas',
				reason:
					'Trocar o tema não exige renderizar a página de novo: é só um filtro (invert, hue-rotate, contrast, brightness e sepia) sobre o canvas que já existe. No tema escuro, o hue-rotate de 180° depois da inversão devolve às imagens uma cor próxima da original.',
				alternative:
					'Renderizar cada página de novo com outras cores, o que seria lento em documentos grandes.',
			},
			{
				title: 'Renderização preguiçosa com IntersectionObserver',
				reason:
					'Cada página só é renderizada quando chega a 1.200 px da área visível. Um livro de centenas de páginas não precisa ser processado inteiro para a leitura começar. Se o zoom muda no meio da renderização, a tarefa anterior é cancelada.',
			},
			{
				title: 'Parágrafos reconstruídos pela posição do texto',
				reason:
					'O pdf.js não entrega parágrafos, e sim fragmentos de texto com coordenadas. Comparo a distância vertical entre um fragmento e o seguinte com a altura da linha: acima de 1,6 vira novo parágrafo, acima de 0,4 vira quebra de linha e, abaixo disso, um espaço. O texto extraído fica em cache por página, e o cache zera quando outro documento é aberto.',
			},
			{
				title: 'Um único estado persistido, com regra para predefinições',
				reason:
					'Todas as preferências ficam em um objeto salvo no localStorage. Mexer em um controle de cor marca o tema como "personalizado", mas trocar de modo ou de fonte mantém a predefinição escolhida, para que a interface não diga que o tema mudou quando ele não mudou.',
			},
		],
		challenges: [
			{
				title: 'Zoom que não fazia sentido no modo leitura',
				description:
					'No começo, os dois modos dividiam o mesmo zoom, que no modo leitura não tinha efeito nenhum: o indicador mostrava a escala do canvas, e os botões ficavam desabilitados. Separei os dois. No modo leitura, o zoom passou a ser o tamanho da fonte (18 px equivale a 100%), e os botões + e − ajustam o texto. O zoom do PDF fica guardado e volta igual ao reabrir o modo original.',
			},
			{
				title: 'Texto ilegível ao trocar o fundo',
				description:
					'Com um fundo escuro e o texto ainda em cor escura, o modo leitura ficava ilegível. Quando a pessoa não escolhe uma cor de texto, calculo a luminância do fundo e uso uma cor clara ou escura conforme o resultado.',
			},
			{
				title: 'Página atual durante a rolagem',
				description:
					'Como as páginas ficam em uma rolagem contínua, o número da página atual precisa acompanhar o que está na tela. Um segundo IntersectionObserver marca como atual a primeira página com pelo menos 15% visível, e a navegação por número rola até a página escolhida.',
			},
		],
		results: [
			'Aplicação publicada na Vercel, sem nenhum back-end.',
			'Um livro de 272 páginas abre e começa a ser lido sem renderizar todas as páginas, porque só as próximas da área visível são processadas.',
			'Trocar o tema de cor é instantâneo, porque nenhuma página é renderizada de novo.',
		],
		improvements: [
			'Adicionar OCR (por exemplo, com Tesseract.js) para PDFs escaneados, que não têm camada de texto e hoje aparecem vazios no modo leitura.',
			'Melhorar a reconstrução de parágrafos em layouts com mais de uma coluna, em que a heurística de distância vertical mistura as colunas.',
			'Criar testes automatizados para a extração de texto, usando PDFs de exemplo com layouts diferentes.',
			'Lembrar a última página lida de cada documento.',
		],
	},
];
