function populateQuestions(database) {
    const makeQuestions = (items, prefix, category) => items.map((item, index) => ({
        id: `${prefix}_${index + 1}`,
        category,
        topic: item[0],
        enunciado: item[1],
        options: item[2],
        correct: item[3],
        explanation: item[4]
    }));

    const ibamSpecific = [
        ['NR-05 & CIPA', 'Segundo a NR-05, o mandato dos membros eleitos da CIPA tem duração de:',
            ['2 anos, vedada a reeleição', '1 ano, permitida uma reeleição', '3 anos, com reeleição ilimitada', '6 meses, renovável a critério do SESMT'], 1,
            'O mandato dos membros eleitos da CIPA é de um ano, permitida uma reeleição.'],
        ['NR-06 & EPI', 'Constitui obrigação do empregador quanto ao EPI, conforme a NR-06:',
            ['Fornecer gratuitamente o EPI adequado ao risco, em perfeito estado e com Certificado de Aprovação (CA)', 'Descontar o valor do EPI do salário do trabalhador', 'Transferir ao empregado a compra do EPI', 'Fornecer EPI sem CA, desde que o trabalhador concorde'], 0,
            'O EPI deve ser fornecido gratuitamente, adequado ao risco, em bom estado e com CA válido.'],
        ['NR-07 & Exame de Retorno ao Trabalho', 'De acordo com a NR-07, o exame de retorno ao trabalho deve ser realizado:',
            ['Após 5 dias de afastamento por qualquer motivo', 'Apenas se o trabalhador solicitar', 'No primeiro dia de volta, quando o afastamento por doença ou acidente for igual ou superior a 30 dias', 'Somente após 90 dias de afastamento'], 2,
            'O exame de retorno é obrigatório no primeiro dia da volta ao trabalho de quem esteve ausente por 30 dias ou mais por doença ou acidente.'],
        ['NR-15 & Insalubridade', 'Os percentuais do adicional de insalubridade nos graus mínimo, médio e máximo são, respectivamente:',
            ['5%, 10% e 20%', '10%, 20% e 40%', '20%, 30% e 50%', '10%, 25% e 60%'], 1,
            'A NR-15 prevê 10% (mínimo), 20% (médio) e 40% (máximo), calculados sobre a base legal.'],
        ['NR-17 & Ergonomia', 'Para avaliar a adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores, a NR-17 prevê, quando necessário, a:',
            ['PPRA', 'LTCAT', 'Análise Ergonômica do Trabalho (AET)', 'Mapa de Riscos'], 2,
            'A AET é a ferramenta da NR-17 para avaliar as situações de trabalho e embasar medidas de adequação.'],
        ['NR-32 & Vacinação', 'Quanto à vacinação dos trabalhadores de serviços de saúde, a NR-32 determina que as vacinas (como hepatite B e tétano) sejam:',
            ['Cobradas do trabalhador, com desconto parcelado', 'Fornecidas gratuitamente pelo empregador, com comprovante e registro', 'Opcionais e sem necessidade de registro', 'Dispensadas em áreas de baixo risco'], 1,
            'O empregador deve fornecer gratuitamente as vacinas, mantendo o comprovante individual do trabalhador.'],
        ['Hierarquia das Medidas de Controle', 'A ordem de prioridade das medidas de prevenção no gerenciamento de riscos ocupacionais é:',
            ['EPI, treinamento, eliminação, substituição', 'Eliminação, substituição, controles de engenharia, medidas administrativas e EPI', 'Sinalização, EPI, eliminação', 'EPI primeiro, seguido da eliminação'], 1,
            'Prioriza-se eliminar ou substituir o perigo na fonte; o EPI é a última barreira.'],
        ['Lei 8.213/91 & Doença do Trabalho', 'Segundo a Lei 8.213/91, doença do trabalho é aquela:',
            ['Degenerativa, própria do grupo etário', 'Endêmica, adquirida por habitante de determinada região', 'Adquirida ou desencadeada em função de condições especiais em que o trabalho é realizado e com ele relacionada diretamente', 'Que não produz incapacidade para o trabalho'], 2,
            'Doença do trabalho decorre das condições especiais em que o trabalho é executado; as hipóteses das alternativas A, B e D são excluídas pela lei.'],
        ['Estabilidade Acidentária', 'Segundo a Lei 8.213/91, o segurado que sofreu acidente de trabalho tem garantia de manutenção do contrato pelo prazo mínimo de:',
            ['6 meses', '12 meses após a cessação do auxílio-doença acidentário', '24 meses após o acidente', 'Não há estabilidade'], 1,
            'O art. 118 assegura estabilidade de 12 meses após o fim do auxílio-doença acidentário.'],
        ['PAIR & Saúde Ocupacional', 'A Perda Auditiva Induzida por Ruído (PAIR) caracteriza-se por ser:',
            ['Unilateral, reversível e de origem condutiva', 'Geralmente bilateral, irreversível e neurossensorial', 'Aguda, temporária e restrita ao ouvido médio', 'Congênita e sem relação com ruído'], 1,
            'A PAIR é neurossensorial, em geral bilateral, progressiva e irreversível.']
    ];

    const ibamPortuguese = [
        ['Concordância Nominal', 'Assinale a frase com concordância correta:',
            ['Seguem anexo os documentos.', 'Seguem anexos os documentos.', 'Segue anexas os documentos.', 'Seguem anexa os documentos.'], 1,
            '"Anexo" é adjetivo e concorda com o substantivo: documentos → anexos.'],
        ['Colocação Pronominal', 'Assinale a alternativa em que a colocação do pronome está de acordo com a norma-padrão:',
            ['Nunca disseram-me a verdade.', 'Nunca me disseram a verdade.', 'Me disseram nunca a verdade.', 'Disseram nunca-me a verdade.'], 1,
            'Com advérbio de negação ("nunca"), a próclise é obrigatória.'],
        ['Mau x Mal', 'Assinale a opção que completa corretamente: "O ____ funcionamento do equipamento causou o acidente, pois ele estava ____ conservado."',
            ['mal / mau', 'mau / mal', 'mau / mau', 'mal / mal'], 1,
            '"Mau" é adjetivo (antônimo de bom); "mal" é advérbio (antônimo de bem).'],
        ['Conectivos', 'Em "Os exames foram remarcados, visto que o laboratório estava fechado", o conectivo expressa:',
            ['Causa', 'Concessão', 'Finalidade', 'Condição'], 0,
            '"Visto que" é conjunção causal, introduz a razão do fato anterior.']
    ];

    const ibamMathematics = [
        ['Regra de Três', 'Se 5 enfermeiros atendem 120 trabalhadores em um dia, quantos trabalhadores 8 enfermeiros atendem no mesmo ritmo?',
            ['192', '160', '180', '200'], 0, '120/5 = 24 por enfermeiro; 24 x 8 = 192.'],
        ['NBR 14280 - Taxa de Frequência', 'Uma empresa teve 3 acidentes com afastamento e 600.000 horas-homem de exposição ao risco. A Taxa de Frequência é:',
            ['2,0', '5,0', '8,0', '3,0'], 1, 'TF = (3 x 1.000.000) / 600.000 = 5,0.'],
        ['Média Aritmética', 'Os dias de ausência de 5 setores foram 4, 6, 8, 10 e 12. A média de ausência é:',
            ['7', '9', '8', '10'], 2, '(4+6+8+10+12)/5 = 40/5 = 8.'],
        ['Porcentagem', 'Um trabalhador recebe R$ 2.000,00 e tem direito a adicional de 20% calculado sobre uma base de R$ 1.500,00. Qual o total recebido?',
            ['R$ 2.300,00', 'R$ 2.400,00', 'R$ 2.200,00', 'R$ 2.500,00'], 0, '20% de 1.500 = 300; 2.000 + 300 = 2.300.']
    ];

    const ibamComputing = [
        ['Excel - SOMASE', 'No Excel, a fórmula =SOMASE(A1:A10;"Setor A";B1:B10) retorna:',
            ['A contagem de células do intervalo A1:A10', 'A soma dos valores de B1:B10 cujas células correspondentes em A1:A10 sejam "Setor A"', 'A média de A1:A10', 'O maior valor de B1:B10'], 1,
            'SOMASE soma o intervalo de soma (B) quando o critério (A = "Setor A") é atendido.'],
        ['Segurança da Informação', 'A realização periódica de backup contribui principalmente para qual princípio da segurança da informação?',
            ['Confidencialidade', 'Disponibilidade', 'Autenticidade', 'Não repúdio'], 1,
            'O backup permite recuperar os dados após falhas, garantindo a disponibilidade.'],
        ['Excel - Referências', 'No Excel, para fixar uma referência de célula (ex.: $A$1) ao copiar uma fórmula, usa-se:',
            ['Referência relativa', 'Referência absoluta', 'Referência mista sem cifrão', 'Função INDIRETO apenas'], 1,
            'O cifrão antes da coluna e da linha cria referência absoluta (atalho F4).']
    ];

    database.ibam_enfermeiro.questions = [
        ...makeQuestions(ibamSpecific, 'ibam_e', 'especifica'),
        ...makeQuestions(ibamPortuguese, 'ibam_p', 'portugues'),
        ...makeQuestions(ibamMathematics, 'ibam_m', 'matematica'),
        ...makeQuestions(ibamComputing, 'ibam_i', 'informatica')
    ];

    const transpetroPortuguese = [
        ['Crase', 'Assinale a opção em que o emprego do acento indicativo de crase está correto:',
            ['Refiro-me à proposta apresentada ontem.', 'Cheguei à pé ao terminal.', 'Entreguei o relatório à ele.', 'Começamos à analisar os contratos.', 'Visitamos a empresa à convite do diretor.'], 0,
            '"Referir-se a" + "a proposta" (feminino determinado) gera crase. Não há crase antes de pronome pessoal, verbo ou palavra masculina.'],
        ['Pronome Relativo', 'Assinale a frase em que o pronome relativo "cujo" está empregado corretamente:',
            ['O contrato cujas cláusulas foram revistas foi assinado.', 'O contrato que as cláusulas foram revistas foi assinado.', 'O contrato cujo as cláusulas foram revistas foi assinado.', 'O contrato onde cujas cláusulas foram revistas foi assinado.', 'O contrato no qual cujas cláusulas foram revistas foi assinado.'], 0,
            '"Cujo" concorda com o termo que vem depois (cláusulas → cujas) e indica posse.'],
        ['Porquês', 'Assinale a opção que completa corretamente: "Não sabemos ____ o prazo foi prorrogado."',
            ['porque', 'por quê', 'porquê', 'por que', 'porquê, com acento e junto'], 3,
            '"Por que" (separado, sem acento) introduz oração interrogativa indireta.']
    ];

    const transpetroEnglish = [
        ['Connectors', 'In "Despite the delay, the shipment arrived on time", "despite" expresses an idea of:',
            ['Contrast', 'Cause', 'Purpose', 'Condition', 'Addition'], 0,
            '"Despite" (apesar de) introduz contraste entre dois fatos.'],
        ['Corporate Vocabulary', 'In a work context, the word "deadline" means:',
            ['A prazo final', 'A reunião de diretoria', 'Uma linha de produção', 'Um relatório mensal', 'Um contrato de trabalho'], 0,
            '"Deadline" significa prazo final para concluir uma tarefa.'],
        ['Verb Tenses', 'Choose the correct option: "The report ____ submitted yesterday."',
            ['is', 'was', 'will be', 'has been being', 'are'], 1,
            '"Yesterday" exige passado simples na voz passiva: was submitted.']
    ];

    const transpetroAdministration = [
        ['Lei 14.133/2021 & PNCP', 'A Lei 14.133/2021 determina que os atos e contratos da Administração sejam divulgados obrigatoriamente no:',
            ['Diário de Classe', 'Portal Nacional de Contratações Públicas (PNCP)', 'Portal da Receita Federal', 'Sistema do Banco Central', 'Cadastro Nacional de Pessoas Jurídicas apenas'], 1,
            'O PNCP é o sítio oficial para divulgação centralizada dos atos exigidos pela Lei 14.133/2021.'],
        ['Teoria Clássica - Fayol', 'As funções administrativas descritas por Henri Fayol são:',
            ['Planejar, organizar, comandar, coordenar e controlar', 'Produzir, vender, comprar, estocar e entregar', 'Contratar, treinar, demitir, pagar e avaliar', 'Analisar, projetar, testar, implantar e manter', 'Liderar, motivar, comunicar, decidir e negociar'], 0,
            'Fayol propôs: prever/planejar, organizar, comandar, coordenar e controlar.'],
        ['Gestão de Estoques - LEC', 'O Lote Econômico de Compra (LEC) tem por objetivo:',
            ['Maximizar o estoque de segurança', 'Minimizar o custo total de pedido e de manutenção de estoque', 'Eliminar totalmente os estoques', 'Aumentar o preço unitário de aquisição', 'Reduzir o número de fornecedores a um só'], 1,
            'O LEC encontra a quantidade que equilibra custo de emitir pedidos e custo de manter estoque.'],
        ['Balanced Scorecard', 'As quatro perspectivas do Balanced Scorecard (BSC) são:',
            ['Financeira, clientes, processos internos e aprendizado e crescimento', 'Estratégica, tática, operacional e logística', 'Forças, fraquezas, oportunidades e ameaças', 'Qualidade, custo, prazo e risco', 'Planejar, fazer, checar e agir'], 0,
            'O BSC (Kaplan e Norton) integra as perspectivas financeira, de clientes, de processos internos e de aprendizado e crescimento.'],
        ['Ciclo PDCA', 'No ciclo PDCA, a etapa "C" (Check) corresponde a:',
            ['Executar o plano', 'Padronizar a solução', 'Verificar os resultados em relação ao planejado', 'Definir metas e métodos', 'Treinar a equipe'], 2,
            'Check é a etapa de verificar e comparar os resultados obtidos com as metas.'],
        ['Orçamento Público - Anualidade', 'Segundo a Lei 4.320/64, o exercício financeiro coincide com o ano civil, o que expressa o princípio orçamentário da:',
            ['Universalidade', 'Unidade', 'Anualidade', 'Exclusividade', 'Legalidade'], 2,
            'A anualidade (periodicidade) determina que o orçamento vale por um exercício, de 1º/jan a 31/dez.']
    ];

    database.transpetro_adm.questions = [
        ...makeQuestions(transpetroPortuguese, 'tp_p', 'portugues'),
        ...makeQuestions(transpetroEnglish, 'tp_ing', 'ingles'),
        ...makeQuestions(transpetroAdministration, 'tp_adm', 'especifica')
    ];

    const addQuestions = (examKey, category, prefix, items) => {
        const questions = database[examKey].questions;
        let nextId = questions.filter(question => question.category === category).length;

        items.forEach(item => {
            nextId += 1;
            questions.push({
                id: `${prefix}_${nextId}`,
                category,
                topic: item[0],
                enunciado: item[1],
                options: item[2],
                correct: item[3],
                explanation: item[4]
            });
        });
    };

    addQuestions('ibam_enfermeiro', 'especifica', 'ibam_e', [
        ['CAT', 'A empresa deve emitir a CAT de acidente sem morte até:',
            ['O primeiro dia útil seguinte ao da ocorrência', '30 dias após o acidente', 'O fim do mês', 'A alta do INSS'], 0, 'Art. 22 da Lei 8.213/91: até o primeiro dia útil seguinte; em caso de morte, de imediato.'],
        ['Riscos Ocupacionais', 'O ruído contínuo no ambiente de trabalho é classificado como risco:',
            ['Químico', 'Biológico', 'Físico', 'Ergonômico'], 2, 'Ruído, vibração, calor e radiações são agentes físicos.'],
        ['Precauções-Padrão', 'A principal medida para prevenir a transmissão cruzada de infecções em serviços de saúde é:',
            ['Uso de máscara por todos os pacientes', 'Higienização das mãos nos momentos indicados', 'Uso de luvas em qualquer contato', 'Isolamento de todos os pacientes'], 1, 'A higiene das mãos é a medida isolada mais eficaz contra infecções relacionadas à assistência.'],
        ['NTEP & Nexo Causal', 'O Nexo Técnico Epidemiológico Previdenciário (NTEP) serve para:',
            ['Calcular horas-homem trabalhadas', 'Presumir a natureza acidentária de doença a partir da relação entre CID e atividade econômica da empresa', 'Definir o grau de insalubridade', 'Substituir o ASO'], 1, 'O NTEP (art. 21-A, Lei 8.213/91) presume o nexo entre a doença e a atividade da empresa.'],
        ['Consulta de Enfermagem', 'Segundo a Lei 7.498/86, é privativa do enfermeiro:',
            ['A consulta de enfermagem', 'A aplicação de curativos simples', 'A verificação de sinais vitais', 'A administração de medicamentos orais'], 0, 'O art. 11 inclui a consulta de enfermagem entre as atividades privativas do enfermeiro.']
    ]);

    addQuestions('ibam_enfermeiro', 'portugues', 'ibam_p', [
        ['Regência Verbal', 'Assinale a frase com a regência correta:',
            ['Assistimos o treinamento ontem.', 'Assistimos ao treinamento ontem.', 'Assistimos de treinamento ontem.', 'Assistimos no treinamento ontem.'], 1, 'Assistir no sentido de ver exige a preposição "a".'],
        ['Vírgula no Aposto', 'Assinale a frase pontuada corretamente:',
            ['O Dr. Silva médico do trabalho, assinou o ASO.', 'O Dr. Silva, médico do trabalho, assinou o ASO.', 'O Dr. Silva médico do trabalho assinou, o ASO.', 'O Dr. Silva, médico do trabalho assinou o ASO.'], 1, 'O aposto explicativo deve ser isolado por vírgulas.']
    ]);

    addQuestions('ibam_enfermeiro', 'matematica', 'ibam_m', [
        ['NBR 14280 - Taxa de Gravidade', 'Houve 60 dias perdidos em 300.000 horas-homem trabalhadas. A Taxa de Gravidade é:',
            ['100', '200', '300', '20'], 1, 'TG = (60 x 1.000.000) / 300.000 = 200.'],
        ['Porcentagem', 'Os atendimentos passaram de 50 para 60 por semana. O aumento percentual foi de:',
            ['10%', '15%', '20%', '25%'], 2, '(60-50)/50 = 0,20 = 20%.']
    ]);

    addQuestions('ibam_enfermeiro', 'informatica', 'ibam_i', [
        ['Senhas', 'Uma senha considerada forte combina:',
            ['Apenas o nome do usuário', 'Letras maiúsculas e minúsculas, números e símbolos', 'Somente números sequenciais', 'A data de nascimento'], 1, 'Quanto maior e mais variada a senha, mais difícil de ser descoberta.'],
        ['Gráficos no Excel', 'Para mostrar a evolução de acidentes ao longo dos meses, o tipo de gráfico mais indicado é o de:',
            ['Linhas', 'Pizza', 'Dispersão de bolhas', 'Radar de categorias fixas'], 0, 'Gráficos de linhas evidenciam tendências no tempo.']
    ]);

    addQuestions('transpetro_adm', 'especifica', 'tp_adm', [
        ['Lei 14.133 - Inexigibilidade', 'Segundo a Lei 14.133/2021, a licitação é inexigível quando:',
            ['O valor é muito alto', 'Há inviabilidade de competição', 'O prazo é curto', 'Existem muitos fornecedores'], 1, 'A inexigibilidade ocorre quando a competição é inviável, como na existência de fornecedor exclusivo.'],
        ['Fluxograma', 'O fluxograma é utilizado na gestão de processos para:',
            ['Calcular o lucro', 'Representar graficamente as etapas e o fluxo de um processo', 'Definir salários', 'Medir o clima organizacional'], 1, 'Representa visualmente sequência, decisões e responsáveis.'],
        ['Maslow', 'Na pirâmide de Maslow, a necessidade situada no topo é a de:',
            ['Segurança', 'Estima', 'Fisiológica', 'Autorrealização', 'Social'], 3, 'A autorrealização é o nível mais alto da hierarquia.'],
        ['Cinco Forças de Porter', 'O modelo das Cinco Forças de Porter é usado para analisar:',
            ['A estrutura competitiva de um setor', 'O fluxo de caixa', 'O clima organizacional', 'A cadeia logística interna', 'O orçamento anual'], 0, 'Analisa rivalidade, entrantes, substitutos e poder de fornecedores e clientes.'],
        ['PEPS', 'No método de avaliação de estoques PEPS (FIFO):',
            ['O último a entrar é o primeiro a sair', 'O primeiro a entrar é o primeiro a sair', 'Sai o item de menor valor', 'Sai o item de maior giro', 'A saída é aleatória'], 1, 'PEPS = Primeiro que Entra, Primeiro que Sai.'],
        ['Liderança Situacional', 'Segundo Hersey e Blanchard, o estilo de liderança deve variar conforme:',
            ['O tamanho da empresa', 'O nível de maturidade dos liderados', 'O horário de trabalho', 'O salário do líder', 'A localização do escritório'], 1, 'O líder adapta o estilo ao grau de prontidão do seguidor.']
    ]);

    Object.values(database).forEach(exam => {
        exam.description = `${exam.description} ${exam.questions.length} questões disponíveis.`;
    });
}
