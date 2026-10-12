import { IExperienceItem } from '../interfaces/experience/experience-item.interface';

export const ExperienceData: IExperienceItem[] = [
	{
		company_name: 'ControlXRM - Software',
		role: 'Estágio Desenvolvedor full stack',
		employment_type: 'Estágio',
		startDate: '2026-04',
		location: 'São Paulo, São Paulo, Brasil',
		details: [
			'Atuando em aplicações SaaS B2B para grandes operadores de aeroportos e shoppings, contribuindo no desenvolvimento e evolução de sistemas críticos para a gestão dessas operações.',
			'Trabalho com C# / .NET / Razor e React, implementando novas funcionalidades, realizando manutenção evolutiva e correção de defeitos a partir das especificações técnicas definidas. Atuação em ambiente ágil Scrum, com colaboração próxima entre desenvolvimento e demais áreas envolvidas.',
			'Integro o time reduzido que está construindo do zero um novo produto da empresa: um catálogo sob demanda dos espaços comerciais cadastrados no sistema principal. O administrador do empreendimento monta o catálogo e o envia por link a um interessado, que percorre dentro da aplicação todo o fluxo de captação, da análise dos espaços ao envio de documentos e à geração da proposta de loja, documento que dá origem ao contrato.',
			'O produto digitaliza uma etapa hoje conduzida em planilhas, apresentações e e-mails, com o objetivo de encurtar o tempo entre a prospecção do lojista e a assinatura do contrato. Diferente do sistema principal, usa arquitetura desacoplada, com API em .NET e front-end em React, e atuo nas duas camadas.',
		],
		highlights: [
			'Cache e compartilhamento de login com Redis entre aplicações distintas do mesmo domínio.',
			'Multi-tenant para separar e validar grupos diferentes de usuários.',
			'Cadastro e acesso de usuários sem login e senha, por códigos de segurança, com envio e validação de tokens por e-mail.',
			'Armazenamento de arquivos na nuvem AWS.',
			'Mapa de calor interativo e interface totalmente responsiva, pensada para uso no celular.',
			'Histórico completo de ações, para rastrear cada etapa do processo.',
			'Controle de funil e de itens para o administrador cadastrar e acompanhar, além de gestão de documentos e conversa entre vendedor e interessado.',
		],
		skills: [
			'C#',
			'.NET',
			'React',
			'Razor',
			'SQL Server',
			'Redis',
			'AWS',
			'Git',
			'Scrum',
		],
		logoUrl: 'assets/logos/controlxrm-logo.jpg',
	},
];
