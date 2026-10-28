import { VocabItem } from '../types';

export const VOCABULARY_DATA: VocabItem[] = [
  // --- SAUDAÇÕES E ESSENCIAIS (16 itens) ---
  {
    id: 's_nihao',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    tom: 3,
    traducao: 'Olá / Oi',
    icone: '👋',
    exemplo_curto: {
      hanzi: '你好！很高兴认识你。',
      pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.',
      traducao: 'Olá! Muito prazer em te conhecer.'
    },
    radical: '亻 (Pessoa) + 女 (Mulher) + 子 (Criança)',
    dica: 'Combinação clássica de você (你) e bom (好).'
  },
  {
    id: 's_xiexie',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '谢谢',
    pinyin: 'xièxie',
    tom: 4,
    traducao: 'Obrigado(a)',
    icone: '🙏',
    exemplo_curto: {
      hanzi: '太谢谢你了！',
      pinyin: 'Tài xièxie nǐ le!',
      traducao: 'Muito obrigado a você!'
    },
    radical: '讠 (Fala/Palavra)',
    dica: 'Duplicação do verbo agradecer em tom suave.'
  },
  {
    id: 's_bukeqi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '不客气',
    pinyin: 'bù kèqi',
    tom: 4,
    traducao: 'De nada / Não há de quê',
    icone: '🤝',
    exemplo_curto: {
      hanzi: '不客气，慢慢来。',
      pinyin: 'Bù kèqi, màn man lái.',
      traducao: 'De nada, vá com calma.'
    },
    radical: '一 (Um) + 宀 (Teto) + 气 (Ar/Sopro)',
    dica: 'Literalmente: "Não seja cerimonioso".'
  },
  {
    id: 's_shi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '是',
    pinyin: 'shì',
    tom: 4,
    traducao: 'Sim / É (Verbo Ser)',
    icone: '✅',
    exemplo_curto: {
      hanzi: '是的，我是巴西人。',
      pinyin: 'Shì de, wǒ shì bāxī rén.',
      traducao: 'Sim, eu sou brasileiro.'
    },
    radical: '日 (Sol)',
    dica: 'Representa afirmação e retidão.'
  },
  {
    id: 's_bushi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '不是',
    pinyin: 'bú shì',
    tom: 4,
    traducao: 'Não / Não é',
    icone: '❌',
    exemplo_curto: {
      hanzi: '这不是我的手机。',
      pinyin: 'Zhè bú shì wǒ de shǒujī.',
      traducao: 'Este não é o meu celular.'
    },
    radical: '一 + 日',
    dica: 'Negação básica do verbo ser.'
  },
  {
    id: 's_duibuqi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '对不起',
    pinyin: 'duìbuqǐ',
    tom: 3,
    traducao: 'Desculpe / Perdão',
    icone: '🙇',
    exemplo_curto: {
      hanzi: '对不起，我迟到了。',
      pinyin: 'Duìbuqǐ, wǒ chídào le.',
      traducao: 'Desculpe, estou atrasado.'
    },
    radical: '寸 (Polegada)',
    dica: 'Usado para pedidos de desculpa sinceros.'
  },
  {
    id: 's_meiguanxi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '没关系',
    pinyin: 'méi guānxi',
    tom: 2,
    traducao: 'Não tem problema / Tudo bem',
    icone: '👌',
    exemplo_curto: {
      hanzi: '没关系，不用担心。',
      pinyin: 'Méi guānxi, bú yòng dānxīn.',
      traducao: 'Não tem problema, não se preocupe.'
    },
    radical: '氵 (Água)',
    dica: 'Resposta padrão para "对不起".'
  },
  {
    id: 's_qing',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '请',
    pinyin: 'qǐng',
    tom: 3,
    traducao: 'Por favor / Convidar',
    icone: '🤲',
    exemplo_curto: {
      hanzi: '请坐，请喝茶。',
      pinyin: 'Qǐng zuò, qǐng hē chá.',
      traducao: 'Por favor sente-se, por favor tome chá.'
    },
    radical: '讠 (Fala)',
    dica: 'Símbolo de máxima cortesia.'
  },
  {
    id: 's_zaijian',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '再见',
    pinyin: 'zàijiàn',
    tom: 4,
    traducao: 'Tchau / Até logo',
    icone: '🙋',
    exemplo_curto: {
      hanzi: '明天见，再见！',
      pinyin: 'Míngtiān jiàn, zàijiàn!',
      traducao: 'Até amanhã, tchau!'
    },
    radical: '冂 + 见 (Ver)',
    dica: 'Literalmente: "ver novamente".'
  },
  {
    id: 's_henhao',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '很好',
    pinyin: 'hěn hǎo',
    tom: 3,
    traducao: 'Muito bom / Muito bem',
    icone: '👍',
    exemplo_curto: {
      hanzi: '我今天很好。',
      pinyin: 'Wǒ jīntiān hěn hǎo.',
      traducao: 'Eu estou muito bem hoje.'
    },
    radical: '彳 (Passo)',
    dica: 'Expressão de aprovação diária.'
  },
  {
    id: 's_jiuming',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '救命',
    pinyin: 'jiù mìng',
    tom: 4,
    traducao: 'Socorro! / Ajuda!',
    icone: '🆘',
    exemplo_curto: {
      hanzi: '救命啊！请帮帮我！',
      pinyin: 'Jiùmìng a! Qǐng bāng bang wǒ!',
      traducao: 'Socorro! Por favor me ajudem!'
    },
    radical: '攵 + 口',
    dica: 'Literalmente salvar (救) vida (命).'
  },
  {
    id: 's_huanying',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '欢迎',
    pinyin: 'huānyíng',
    tom: 1,
    traducao: 'Bem-vindo(a)',
    icone: '🎉',
    exemplo_curto: {
      hanzi: '欢迎光临我们的店！',
      pinyin: 'Huānyíng guānglín wǒmen de diàn!',
      traducao: 'Sejam bem-vindos à nossa loja!'
    },
    radical: '欠 + 辶 (Caminhar)',
    dica: 'Muito ouvido ao entrar em comércios.'
  },
  {
    id: 's_mingzi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '名字',
    pinyin: 'míngzi',
    tom: 2,
    traducao: 'Nome',
    icone: '🏷️',
    exemplo_curto: {
      hanzi: '你叫什么名字？',
      pinyin: 'Nǐ jiào shénme míngzi?',
      traducao: 'Qual é o seu nome?'
    },
    radical: '夕 + 子',
    dica: 'Combinação de nome e caractere.'
  },
  {
    id: 's_pengyou',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '朋友',
    pinyin: 'péngyou',
    tom: 2,
    traducao: 'Amigo(a)',
    icone: '👥',
    exemplo_curto: {
      hanzi: '他是我的好朋友。',
      pinyin: 'Tā shì wǒ de hǎo péngyou.',
      traducao: 'Ele é o meu bom amigo.'
    },
    radical: '月 (Lua)',
    dica: 'Duas luas caminhando juntas.'
  },
  {
    id: 's_laoshi',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '老师',
    pinyin: 'lǎoshī',
    tom: 3,
    traducao: 'Professor(a)',
    icone: '👨‍🏫',
    exemplo_curto: {
      hanzi: '老师早上好！',
      pinyin: 'Lǎoshī zǎoshang hǎo!',
      traducao: 'Bom dia, professor!'
    },
    radical: '耂 (Velho/Sábio)',
    dica: 'Tratamento de alto respeito.'
  },
  {
    id: 's_xuesheng',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações e Essenciais',
    hanzi: '学生',
    pinyin: 'xuésheng',
    tom: 2,
    traducao: 'Estudante / Aluno',
    icone: '🎒',
    exemplo_curto: {
      hanzi: '他是大学学生。',
      pinyin: 'Tā shì dàxué xuésheng.',
      traducao: 'Ele é estudante universitário.'
    },
    radical: '子 + 生',
    dica: 'Aquele que aprende para a vida.'
  },

  // --- ROTINA E CASA (18 itens) ---
  {
    id: 'r_shui',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '水',
    pinyin: 'shuǐ',
    tom: 3,
    traducao: 'Água',
    icone: '💧',
    exemplo_curto: {
      hanzi: '我想喝一点水。',
      pinyin: 'Wǒ xiǎng hē yìdiǎn shuǐ.',
      traducao: 'Eu quero beber um pouco de água.'
    },
    radical: '水 (Água)',
    dica: 'O traço central parece um fluxo d’água corrente.'
  },
  {
    id: 'r_kafei',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '咖啡',
    pinyin: 'kāfēi',
    tom: 1,
    traducao: 'Café',
    icone: '☕',
    exemplo_curto: {
      hanzi: '热咖啡很好喝。',
      pinyin: 'Rè kāfēi hěn hǎohē.',
      traducao: 'Café quente é muito gostoso.'
    },
    radical: '口 (Boca)',
    dica: 'Ambos os caracteres possuem o radical de boca (comer/beber).'
  },
  {
    id: 'r_cha',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '茶',
    pinyin: 'chá',
    tom: 2,
    traducao: 'Chá',
    icone: '🍵',
    exemplo_curto: {
      hanzi: '中国人喜欢喝绿茶。',
      pinyin: 'Zhōngguó rén xǐhuan hē lǜchá.',
      traducao: 'Os chineses gostam de beber chá verde.'
    },
    radical: '艹 (Erva/Grama)',
    dica: 'Topo de folhas sobre a madeira/árvore.'
  },
  {
    id: 'r_mifan',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '米饭',
    pinyin: 'mǐfàn',
    tom: 3,
    traducao: 'Arroz cozido / Refeição',
    icone: '🍚',
    exemplo_curto: {
      hanzi: '中午我们吃米饭。',
      pinyin: 'Zhōngwǔ wǒmen chī mǐfàn.',
      traducao: 'Ao meio-dia nós comemos arroz.'
    },
    radical: '米 (Arroz) + 饣 (Comida)',
    dica: 'Base da alimentação cotidiana.'
  },
  {
    id: 'r_shuijiao',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '睡觉',
    pinyin: 'shuì jiào',
    tom: 4,
    traducao: 'Dormir',
    icone: '😴',
    exemplo_curto: {
      hanzi: '太累了，我想睡觉。',
      pinyin: 'Tài lèi le, wǒ xiǎng shuìjiào.',
      traducao: 'Muito cansado, eu quero dormir.'
    },
    radical: '目 (Olho)',
    dica: 'Olhos que se fecham para descansar.'
  },
  {
    id: 'r_qichuang',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '起床',
    pinyin: 'qǐ chuáng',
    tom: 3,
    traducao: 'Levantar da cama / Acordar',
    icone: '⏰',
    exemplo_curto: {
      hanzi: '我每天早上七点起床。',
      pinyin: 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng.',
      traducao: 'Eu levanto às 7 da manhã todo dia.'
    },
    radical: '走 + 广',
    dica: 'Levantar (起) da cama (床).'
  },
  {
    id: 'r_gongzuo',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '工作',
    pinyin: 'gōngzuò',
    tom: 1,
    traducao: 'Trabalhar / Trabalho',
    icone: '💼',
    exemplo_curto: {
      hanzi: '今天工作非常忙。',
      pinyin: 'Jīntiān gōngzuò fēicháng máng.',
      traducao: 'O trabalho hoje está muito ocupado.'
    },
    radical: '工 (Trabalho) + 亻 (Pessoa)',
    dica: 'Pessoa em atividade profissional.'
  },
  {
    id: 'r_xuexi',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '学习',
    pinyin: 'xuéxí',
    tom: 2,
    traducao: 'Estudar / Aprendizado',
    icone: '📖',
    exemplo_curto: {
      hanzi: '我在学习中文。',
      pinyin: 'Wǒ zài xuéxí zhōngwén.',
      traducao: 'Eu estou estudando língua chinesa.'
    },
    radical: '子 + 习',
    dica: 'Praticar repetidamente o saber.'
  },
  {
    id: 'r_shouji',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '手机',
    pinyin: 'shǒujī',
    tom: 3,
    traducao: 'Celular / Smartphone',
    icone: '📱',
    exemplo_curto: {
      hanzi: '我的手机在桌子上。',
      pinyin: 'Wǒ de shǒujī zài zhuōzi shang.',
      traducao: 'Meu celular está em cima da mesa.'
    },
    radical: '手 (Mão) + 木 (Máquina)',
    dica: 'Máquina de mão (手 + 机).'
  },
  {
    id: 'r_yaoshi',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '钥匙',
    pinyin: 'yàoshi',
    tom: 4,
    traducao: 'Chave',
    icone: '🔑',
    exemplo_curto: {
      hanzi: '你看到家里的钥匙了吗？',
      pinyin: 'Nǐ kàndào jiā lǐ de yàoshi le ma?',
      traducao: 'Você viu a chave de casa?'
    },
    radical: '钅 (Metal/Ouro)',
    dica: 'Objeto de metal para abrir fechaduras.'
  },
  {
    id: 'r_jia',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '家',
    pinyin: 'jiā',
    tom: 1,
    traducao: 'Casa / Família / Lar',
    icone: '🏠',
    exemplo_curto: {
      hanzi: '我想回我的家。',
      pinyin: 'Wǒ xiǎng huí wǒ de jiā.',
      traducao: 'Eu quero voltar para a minha casa.'
    },
    radical: '宀 (Teto/Telhado)',
    dica: 'Um teto (宀) abrigando um porco (豕, símbolo de abundância).'
  },
  {
    id: 'r_xishoujian',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '洗手间',
    pinyin: 'xǐshǒujiān',
    tom: 3,
    traducao: 'Banheiro / Lavabo',
    icone: '🚻',
    exemplo_curto: {
      hanzi: '请问，洗手间在哪里？',
      pinyin: 'Qǐngwèn, xǐshǒujiān zài nǎlǐ?',
      traducao: 'Com licença, onde fica o banheiro?'
    },
    radical: '氵 + 手 + 门',
    dica: 'Sala (间) para lavar (洗) as mãos (手).'
  },
  {
    id: 'r_chuang',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '床',
    pinyin: 'chuáng',
    tom: 2,
    traducao: 'Cama',
    icone: '🛏️',
    exemplo_curto: {
      hanzi: '这张床非常舒服。',
      pinyin: 'Zhè zhāng chuáng fēicháng shūfu.',
      traducao: 'Esta cama é muito confortável.'
    },
    radical: '广 + 木 (Madeira)',
    dica: 'Móvel de madeira sob um abrigo.'
  },
  {
    id: 'r_diannao',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '电脑',
    pinyin: 'diànnǎo',
    tom: 4,
    traducao: 'Computador',
    icone: '💻',
    exemplo_curto: {
      hanzi: '我用电脑写代码。',
      pinyin: 'Wǒ yòng diànnǎo xiě dàimǎ.',
      traducao: 'Eu uso o computador para programar.'
    },
    radical: '电 (Eletricidade) + 月 (Cérebro)',
    dica: 'Literalmente: "Cérebro elétrico".'
  },
  {
    id: 'r_yifu',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '衣服',
    pinyin: 'yīfu',
    tom: 1,
    traducao: 'Roupas / Vestuário',
    icone: '👕',
    exemplo_curto: {
      hanzi: '这件衣服很漂亮。',
      pinyin: 'Zhè jiàn yīfu hěn piàoliang.',
      traducao: 'Esta roupa é muito bonita.'
    },
    radical: '衣 (Roupa)',
    dica: 'Peça para cobrir o corpo.'
  },
  {
    id: 'r_shu',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '书',
    pinyin: 'shū',
    tom: 1,
    traducao: 'Livro',
    icone: '📚',
    exemplo_curto: {
      hanzi: '我喜欢看书。',
      pinyin: 'Wǒ xǐhuan kàn shū.',
      traducao: 'Eu gosto de ler livros.'
    },
    radical: '乛',
    dica: 'Caractere simplificado de pergaminhos antigos.'
  },
  {
    id: 'r_men',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '门',
    pinyin: 'mén',
    tom: 2,
    traducao: 'Porta / Portão',
    icone: '🚪',
    exemplo_curto: {
      hanzi: '请关门。',
      pinyin: 'Qǐng guān mén.',
      traducao: 'Por favor, feche a porta.'
    },
    radical: '门 (Porta)',
    dica: 'O formato lembra o vão e o batente de uma porta.'
  },
  {
    id: 'r_zhuozi',
    categoria: 'rotina',
    categoriaNome: 'Rotina e Casa',
    hanzi: '桌子',
    pinyin: 'zhuōzi',
    tom: 1,
    traducao: 'Mesa',
    icone: '🪑',
    exemplo_curto: {
      hanzi: '把书放在桌子上。',
      pinyin: 'Bǎ shū fàng zài zhuōzi shang.',
      traducao: 'Coloque o livro sobre a mesa.'
    },
    radical: '木 (Madeira)',
    dica: 'Móvel de madeira para apoiar coisas.'
  },

  // --- NÚMEROS E TEMPO (20 itens) ---
  {
    id: 'n_yi',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '一',
    pinyin: 'yī',
    tom: 1,
    traducao: 'Um (1)',
    icone: '1️⃣',
    exemplo_curto: {
      hanzi: '一个人。',
      pinyin: 'Yí gè rén.',
      traducao: 'Uma pessoa.'
    },
    radical: '一 (Um)',
    dica: 'Um único traço horizontal.'
  },
  {
    id: 'n_er',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '二',
    pinyin: 'èr',
    tom: 4,
    traducao: 'Dois (2)',
    icone: '2️⃣',
    exemplo_curto: {
      hanzi: '二月有二十八天。',
      pinyin: 'Èr yuè yǒu èrshíbā tiān.',
      traducao: 'Fevereiro tem vinte e oito dias.'
    },
    radical: '二 (Dois)',
    dica: 'Dois traços horizontais paralelos.'
  },
  {
    id: 'n_san',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '三',
    pinyin: 'sān',
    tom: 1,
    traducao: 'Três (3)',
    icone: '3️⃣',
    exemplo_curto: {
      hanzi: '三碗米饭。',
      pinyin: 'Sān wǎn mǐfàn.',
      traducao: 'Três tigelas de arroz.'
    },
    radical: '一',
    dica: 'Três traços horizontais.'
  },
  {
    id: 'n_si',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '四',
    pinyin: 'sì',
    tom: 4,
    traducao: 'Quatro (4)',
    icone: '4️⃣',
    exemplo_curto: {
      hanzi: '一年有四个季节。',
      pinyin: 'Yì nián yǒu sì gè jìjié.',
      traducao: 'Um ano tem quatro estações.'
    },
    radical: '囗 (Caixa/Cercado)',
    dica: 'Quatro cantos fechados.'
  },
  {
    id: 'n_wu',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '五',
    pinyin: 'wǔ',
    tom: 3,
    traducao: 'Cinco (5)',
    icone: '5️⃣',
    exemplo_curto: {
      hanzi: '我有五个苹果。',
      pinyin: 'Wǒ yǒu wǔ gè píngguǒ.',
      traducao: 'Eu tenho cinco maçãs.'
    },
    radical: '二',
    dica: 'Traços entrelaçados conectando céu e terra.'
  },
  {
    id: 'n_liu',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '六',
    pinyin: 'liù',
    tom: 4,
    traducao: 'Seis (6)',
    icone: '6️⃣',
    exemplo_curto: {
      hanzi: '星期六休息。',
      pinyin: 'Xīngqīliù xiūxi.',
      traducao: 'Descanso no sábado (dia 6).'
    },
    radical: '八',
    dica: 'Ponto no topo com pernas abertas.'
  },
  {
    id: 'n_qi',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '七',
    pinyin: 'qī',
    tom: 1,
    traducao: 'Sete (7)',
    icone: '7️⃣',
    exemplo_curto: {
      hanzi: '一个星期有七天。',
      pinyin: 'Yí gè xīngqī yǒu qī tiān.',
      traducao: 'Uma semana tem sete dias.'
    },
    radical: '一',
    dica: 'Parece um número 7 invertido com gancho.'
  },
  {
    id: 'n_ba',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '八',
    pinyin: 'bā',
    tom: 1,
    traducao: 'Oito (8)',
    icone: '8️⃣',
    exemplo_curto: {
      hanzi: '八在中国是吉祥数字。',
      pinyin: 'Bā zài zhōngguó shì jíxiáng shùzì.',
      traducao: 'O oito é um número de sorte na China.'
    },
    radical: '八 (Oito)',
    dica: 'Dois traços que se abrem para os lados.'
  },
  {
    id: 'n_jiu',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '九',
    pinyin: 'jiǔ',
    tom: 3,
    traducao: 'Nove (9)',
    icone: '9️⃣',
    exemplo_curto: {
      hanzi: '九点见！',
      pinyin: 'Jiǔ diǎn jiàn!',
      traducao: 'Nos vemos às nove horas!'
    },
    radical: '丿',
    dica: 'Curva expressiva e gancho final.'
  },
  {
    id: 'n_shi',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '十',
    pinyin: 'shí',
    tom: 2,
    traducao: 'Dez (10)',
    icone: '🔟',
    exemplo_curto: {
      hanzi: '十全十美。',
      pinyin: 'Shí quán shí měi.',
      traducao: 'Perfeito em todos os dez aspectos.'
    },
    radical: '十 (Dez)',
    dica: 'A cruz perfeita que representa plenitude.'
  },
  {
    id: 'n_ling',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '零',
    pinyin: 'líng',
    tom: 2,
    traducao: 'Zero (0)',
    icone: '0️⃣',
    exemplo_curto: {
      hanzi: '温度是零度。',
      pinyin: 'Wēndù shì líng dù.',
      traducao: 'A temperatura está em zero grau.'
    },
    radical: '雨 (Chuva)',
    dica: 'Chuva fininha que cai.'
  },
  {
    id: 'n_jintian',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '今天',
    pinyin: 'jīntiān',
    tom: 1,
    traducao: 'Hoje',
    icone: '📅',
    exemplo_curto: {
      hanzi: '今天天气很好。',
      pinyin: 'Jīntiān tiānqì hěn hǎo.',
      traducao: 'Hoje o tempo está muito bom.'
    },
    radical: '人 + 大',
    dica: 'Presente momento (今) do céu/dia (天).'
  },
  {
    id: 'n_mingtian',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '明天',
    pinyin: 'míngtiān',
    tom: 2,
    traducao: 'Amanhã',
    icone: '🌅',
    exemplo_curto: {
      hanzi: '明天是星期天。',
      pinyin: 'Míngtiān shì xīngqītiān.',
      traducao: 'Amanhã é domingo.'
    },
    radical: '日 + 月 (Sol e Lua)',
    dica: 'O dia brilhante que virá (明 = sol + lua).'
  },
  {
    id: 'n_zuotian',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '昨天',
    pinyin: 'zuótiān',
    tom: 2,
    traducao: 'Ontem',
    icone: '⏮️',
    exemplo_curto: {
      hanzi: '昨天我很忙。',
      pinyin: 'Zuótiān wǒ hěn máng.',
      traducao: 'Ontem eu estava muito ocupado.'
    },
    radical: '日 (Sol/Dia)',
    dica: 'O sol do passado.'
  },
  {
    id: 'n_xianzai',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '现在',
    pinyin: 'xiànzài',
    tom: 4,
    traducao: 'Agora',
    icone: '⏳',
    exemplo_curto: {
      hanzi: '现在几点了？',
      pinyin: 'Xiànzài jǐ diǎn le?',
      traducao: 'Que horas são agora?'
    },
    radical: '王 (Joia) + 土 (Terra)',
    dica: 'Estar presente no agora.'
  },
  {
    id: 'n_dian',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '点',
    pinyin: 'diǎn',
    tom: 3,
    traducao: 'Hora / Ponto / Pouco',
    icone: '🕐',
    exemplo_curto: {
      hanzi: '现在是下午三点。',
      pinyin: 'Xiànzài shì xiàwǔ sān diǎn.',
      traducao: 'Agora são três horas da tarde.'
    },
    radical: '灬 (Fogo)',
    dica: 'Quatro pontos de fogo na base.'
  },
  {
    id: 'n_fenzhong',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '分钟',
    pinyin: 'fēnzhōng',
    tom: 1,
    traducao: 'Minuto',
    icone: '⏱️',
    exemplo_curto: {
      hanzi: '等我五分钟。',
      pinyin: 'Děng wǒ wǔ fēnzhōng.',
      traducao: 'Me espere por cinco minutos.'
    },
    radical: '刀 + 钅 (Metal)',
    dica: 'Divisão de tempo do relógio.'
  },
  {
    id: 'n_zaoshang',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '早上',
    pinyin: 'zǎoshang',
    tom: 3,
    traducao: 'Manhã / Cedo',
    icone: '☀️',
    exemplo_curto: {
      hanzi: '早上好，朋友！',
      pinyin: 'Zǎoshang hǎo, péngyou!',
      traducao: 'Bom dia, amigo!'
    },
    radical: '日 (Sol) + 一 (Céu)',
    dica: 'O sol despontando no horizonte.'
  },
  {
    id: 'n_wanshang',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '晚上',
    pinyin: 'wǎnshang',
    tom: 3,
    traducao: 'Noite / Anoitecer',
    icone: '🌙',
    exemplo_curto: {
      hanzi: '晚上你想去哪儿？',
      pinyin: 'Wǎnshang nǐ xiǎng qù nǎr?',
      traducao: 'Aonde você quer ir à noite?'
    },
    radical: '日 + 免',
    dica: 'Hora do repouso após o sol se pôr.'
  },
  {
    id: 'n_nian',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números e Tempo',
    hanzi: '年',
    pinyin: 'nián',
    tom: 2,
    traducao: 'Ano',
    icone: '🗓️',
    exemplo_curto: {
      hanzi: '新年快乐！',
      pinyin: 'Xīnnián kuàilè!',
      traducao: 'Feliz Ano Novo!'
    },
    radical: '干',
    dica: 'Originalmente ligado ao ciclo da colheita anual.'
  },

  // --- LOCOMOÇÃO E RUA (16 itens) ---
  {
    id: 'l_lu',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '路',
    pinyin: 'lù',
    tom: 4,
    traducao: 'Rua / Caminho',
    icone: '🛣️',
    exemplo_curto: {
      hanzi: '这条路直走就到了。',
      pinyin: 'Zhè tiáo lù zhí zǒu jiù dào le.',
      traducao: 'Siga reto por esta rua e chegará.'
    },
    radical: '足 (Pé) + 各',
    dica: 'Pés que caminham por caminhos variados.'
  },
  {
    id: 'l_che',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '车',
    pinyin: 'chē',
    tom: 1,
    traducao: 'Carro / Veículo',
    icone: '🚗',
    exemplo_curto: {
      hanzi: '我有一辆白色车。',
      pinyin: 'Wǒ yǒu yí liàng báisè chē.',
      traducao: 'Eu tenho um carro branco.'
    },
    radical: '车 (Veículo)',
    dica: 'Pictograma simplificado de uma carruagem vista de cima.'
  },
  {
    id: 'l_gongjiao',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '公共汽车',
    pinyin: 'gōnggòng qìchē',
    tom: 1,
    traducao: 'Ônibus (Coletivo)',
    icone: '🚌',
    exemplo_curto: {
      hanzi: '坐公共汽车很方便。',
      pinyin: 'Zuò gōnggòng qìchē hěn fāngbiàn.',
      traducao: 'Pegar o ônibus é muito conveniente.'
    },
    radical: '八 + 气 + 车',
    dica: 'Veículo compartilhado pelo público.'
  },
  {
    id: 'l_ditie',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '地铁',
    pinyin: 'dìtiě',
    tom: 3,
    traducao: 'Metrô',
    icone: '🚇',
    exemplo_curto: {
      hanzi: '我们坐地铁去中心。',
      pinyin: 'Wǒmen zuò dìtiě qù zhōngxīn.',
      traducao: 'Nós vamos de metrô para o centro.'
    },
    radical: '土 (Terra) + 钅 (Ferro)',
    dica: 'Trilhos de ferro subterrâneos (地 + 铁).'
  },
  {
    id: 'l_chuzuche',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '出租车',
    pinyin: 'chūzūchē',
    tom: 1,
    traducao: 'Táxi',
    icone: '🚕',
    exemplo_curto: {
      hanzi: '叫一辆出租车吧。',
      pinyin: 'Jiào yí liàng chūzūchē ba.',
      traducao: 'Vamos chamar um táxi.'
    },
    radical: '车',
    dica: 'Carro que sai para aluguel.'
  },
  {
    id: 'l_zuo',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '左',
    pinyin: 'zuǒ',
    tom: 3,
    traducao: 'Esquerda',
    icone: '⬅️',
    exemplo_curto: {
      hanzi: '请往左转。',
      pinyin: 'Qǐng wǎng zuǒ zhuǎn.',
      traducao: 'Por favor, vire à esquerda.'
    },
    radical: '工 (Trabalho)',
    dica: 'Mão auxiliar que segura a ferramenta.'
  },
  {
    id: 'l_you',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '右',
    pinyin: 'yòu',
    tom: 4,
    traducao: 'Direita',
    icone: '➡️',
    exemplo_curto: {
      hanzi: '在下一个路口往右。',
      pinyin: 'Zài xià yí gè lùkǒu wǎng yòu.',
      traducao: 'No próximo cruzamento, vá para a direita.'
    },
    radical: '口 (Boca)',
    dica: 'A mão que leva o alimento à boca.'
  },
  {
    id: 'l_jin',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '近',
    pinyin: 'jìn',
    tom: 4,
    traducao: 'Perto / Próximo',
    icone: '📍',
    exemplo_curto: {
      hanzi: '超市离这里很近。',
      pinyin: 'Chāoshì lí zhèlǐ hěn jìn.',
      traducao: 'O supermercado fica bem perto daqui.'
    },
    radical: '辶 (Caminhar) + 斤 (Machado)',
    dica: 'Poucos passos de distância.'
  },
  {
    id: 'l_yuan',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '远',
    pinyin: 'yuǎn',
    tom: 3,
    traducao: 'Longe / Distante',
    icone: '🔭',
    exemplo_curto: {
      hanzi: '机场离市中心太远了。',
      pinyin: 'Jīchǎng lí shì zhōngxīn tài yuǎn le.',
      traducao: 'O aeroporto fica muito longe do centro.'
    },
    radical: '辶 (Caminhar)',
    dica: 'Caminho longo e prolongado.'
  },
  {
    id: 'l_mai',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '买',
    pinyin: 'mǎi',
    tom: 3,
    traducao: 'Comprar',
    icone: '🛒',
    exemplo_curto: {
      hanzi: '我想买这个东西。',
      pinyin: 'Wǒ xiǎng mǎi zhè ge dōngxi.',
      traducao: 'Eu quero comprar esta coisa.'
    },
    radical: '乙',
    dica: '3º tom (baixo e sobe): comprar!'
  },
  {
    id: 'l_qian',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '钱',
    pinyin: 'qián',
    tom: 2,
    traducao: 'Dinheiro',
    icone: '💰',
    exemplo_curto: {
      hanzi: '我没有现金零钱。',
      pinyin: 'Wǒ méiyǒu xiànjīn língqián.',
      traducao: 'Eu não tenho trocado em dinheiro vivo.'
    },
    radical: '钅 (Metal/Moeda)',
    dica: 'Moeda metálica cunhada.'
  },
  {
    id: 'l_duoshaoqian',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '多少钱',
    pinyin: 'duōshao qián',
    tom: 1,
    traducao: 'Quanto custa?',
    icone: '🏷️',
    exemplo_curto: {
      hanzi: '请问，这个多少钱？',
      pinyin: 'Qǐngwèn, zhè ge duōshao qián?',
      traducao: 'Com licença, quanto custa este?'
    },
    radical: '夕 + 小 + 钅',
    dica: 'Mais ou menos (多少) + dinheiro (钱).'
  },
  {
    id: 'l_fanguan',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '饭馆',
    pinyin: 'fànguǎn',
    tom: 4,
    traducao: 'Restaurante',
    icone: '🍲',
    exemplo_curto: {
      hanzi: '这家饭馆的菜很好吃。',
      pinyin: 'Zhè jiā fànguǎn de cài hěn hǎochī.',
      traducao: 'Os pratos deste restaurante são muito saborosos.'
    },
    radical: '饣 (Comida)',
    dica: 'Estabelecimento de refeições.'
  },
  {
    id: 'l_jiudian',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '酒店',
    pinyin: 'jiǔdiàn',
    tom: 3,
    traducao: 'Hotel',
    icone: '🏨',
    exemplo_curto: {
      hanzi: '我们订了一家酒店。',
      pinyin: 'Wǒmen dìng le yì jiā jiǔdiàn.',
      traducao: 'Nós reservamos um hotel.'
    },
    radical: '氵 (Vinho) + 广 (Estabelecimento)',
    dica: 'Hospedaria tradicional e moderna.'
  },
  {
    id: 'l_zainali',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '在哪里',
    pinyin: 'zài nǎlǐ',
    tom: 4,
    traducao: 'Onde fica? / Onde está?',
    icone: '❓',
    exemplo_curto: {
      hanzi: '地铁站在哪里？',
      pinyin: 'Dìtiě zhàn zài nǎlǐ?',
      traducao: 'Onde fica a estação de metrô?'
    },
    radical: '土 + 口 + 里',
    dica: 'Frase essencial para pedir direções.'
  },
  {
    id: 'l_jichang',
    categoria: 'locomocao',
    categoriaNome: 'Locomoção e Rua',
    hanzi: '机场',
    pinyin: 'jīchǎng',
    tom: 1,
    traducao: 'Aeroporto',
    icone: '✈️',
    exemplo_curto: {
      hanzi: '我现在要去机场。',
      pinyin: 'Wǒ xiànzài yào qù jīchǎng.',
      traducao: 'Eu preciso ir para o aeroporto agora.'
    },
    radical: '木 + 土',
    dica: 'Pátio/campo (场) de aviões (机).'
  },

  // --- VERBOS COMUNS (16 itens) ---
  {
    id: 'v_qu',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '去',
    pinyin: 'qù',
    tom: 4,
    traducao: 'Ir',
    icone: '🚶',
    exemplo_curto: {
      hanzi: '你去哪儿？我去超市。',
      pinyin: 'Nǐ qù nǎr? Wǒ qù chāoshì.',
      traducao: 'Aonde você vai? Eu vou ao supermercado.'
    },
    radical: '土 + 厶',
    dica: 'Movimento de partida para outro local.'
  },
  {
    id: 'v_lai',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '来',
    pinyin: 'lái',
    tom: 2,
    traducao: 'Vir',
    icone: '🏃',
    exemplo_curto: {
      hanzi: '快来这里看！',
      pinyin: 'Kuài lái zhèlǐ kàn!',
      traducao: 'Venha logo aqui ver!'
    },
    radical: '木',
    dica: 'Aproximação em direção a quem fala.'
  },
  {
    id: 'v_kan',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '看',
    pinyin: 'kàn',
    tom: 4,
    traducao: 'Ver / Olhar / Assistir',
    icone: '👀',
    exemplo_curto: {
      hanzi: '我看了一部电影。',
      pinyin: 'Wǒ kàn le yí bù diànyǐng.',
      traducao: 'Eu assisti a um filme.'
    },
    radical: '目 (Olho)',
    dica: 'Uma mão (手) fazendo sombra sobre o olho (目) para enxergar longe.'
  },
  {
    id: 'v_ting',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '听',
    pinyin: 'tīng',
    tom: 1,
    traducao: 'Ouvir / Escutar',
    icone: '👂',
    exemplo_curto: {
      hanzi: '他在听音乐。',
      pinyin: 'Tā zài tīng yīnyuè.',
      traducao: 'Ele está ouvindo música.'
    },
    radical: '口 (Boca) + 斤',
    dica: 'Prestar atenção nos sons ao redor.'
  },
  {
    id: 'v_shuo',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '说',
    pinyin: 'shuō',
    tom: 1,
    traducao: 'Falar / Dizer',
    icone: '🗣️',
    exemplo_curto: {
      hanzi: '请说慢一点。',
      pinyin: 'Qǐng shuō màn yìdiǎn.',
      traducao: 'Por favor, fale um pouco mais devagar.'
    },
    radical: '讠 (Fala/Palavra)',
    dica: 'Articular sons e palavras com a boca.'
  },
  {
    id: 'v_yao',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '要',
    pinyin: 'yào',
    tom: 4,
    traducao: 'Querer / Precisar / Vai (Futuro)',
    icone: '🎯',
    exemplo_curto: {
      hanzi: '我要一杯冰水。',
      pinyin: 'Wǒ yào yì bēi bīng shuǐ.',
      traducao: 'Eu quero um copo de água gelada.'
    },
    radical: '西 + 女',
    dica: 'Indica forte desejo, intenção ou necessidade.'
  },
  {
    id: 'v_you',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '有',
    pinyin: 'yǒu',
    tom: 3,
    traducao: 'Ter / Haver / Existir',
    icone: '🤲',
    exemplo_curto: {
      hanzi: '这里有一家好餐馆。',
      pinyin: 'Zhèlǐ yǒu yì jiā hǎo cānguǎn.',
      traducao: 'Aqui há um bom restaurante.'
    },
    radical: '月 (Carne/Lua)',
    dica: 'Mão segurando algo com segurança.'
  },
  {
    id: 'v_meiyou',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '没有',
    pinyin: 'méi yǒu',
    tom: 2,
    traducao: 'Não ter / Não há',
    icone: '🚫',
    exemplo_curto: {
      hanzi: '我没有时间。',
      pinyin: 'Wǒ méiyǒu shíjiān.',
      traducao: 'Eu não tenho tempo.'
    },
    radical: '氵 + 月',
    dica: 'Ausência ou negação de posse.'
  },
  {
    id: 'v_zuo',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '做',
    pinyin: 'zuò',
    tom: 4,
    traducao: 'Fazer / Cozinhar',
    icone: '🔨',
    exemplo_curto: {
      hanzi: '你在做什么？',
      pinyin: 'Nǐ zài zuò shénme?',
      traducao: 'O que você está fazendo?'
    },
    radical: '亻 (Pessoa) + 故',
    dica: 'Pessoa em ação de criar ou realizar.'
  },
  {
    id: 'v_chi',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '吃',
    pinyin: 'chī',
    tom: 1,
    traducao: 'Comer',
    icone: '🍜',
    exemplo_curto: {
      hanzi: '你吃晚饭了吗？',
      pinyin: 'Nǐ chī wǎnfàn le ma?',
      traducao: 'Você já jantou?'
    },
    radical: '口 (Boca)',
    dica: 'Boca (口) recebendo alimentos.'
  },
  {
    id: 'v_he',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '喝',
    pinyin: 'hē',
    tom: 1,
    traducao: 'Beber',
    icone: '🥤',
    exemplo_curto: {
      hanzi: '喝水对身体好。',
      pinyin: 'Hē shuǐ duì shēntǐ hǎo.',
      traducao: 'Beber água faz bem para a saúde.'
    },
    radical: '口 (Boca)',
    dica: 'Boca com a ação de engolir líquido.'
  },
  {
    id: 'v_xihuan',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '喜欢',
    pinyin: 'xǐhuan',
    tom: 3,
    traducao: 'Gostar de',
    icone: '❤️',
    exemplo_curto: {
      hanzi: '我很喜欢中国文化。',
      pinyin: 'Wǒ hěn xǐhuan zhōngguó wénhuà.',
      traducao: 'Eu gosto muito da cultura chinesa.'
    },
    radical: '士 + 口 + 欠',
    dica: 'Sentimento de alegria e afeto.'
  },
  {
    id: 'v_dong',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '懂',
    pinyin: 'dǒng',
    tom: 3,
    traducao: 'Entender / Compreender',
    icone: '💡',
    exemplo_curto: {
      hanzi: '我懂了，谢谢你！',
      pinyin: 'Wǒ dǒng le, xièxie nǐ!',
      traducao: 'Eu entendi, obrigado!'
    },
    radical: '忄 (Coração)',
    dica: 'Quando o coração/mente compreende com clareza.'
  },
  {
    id: 'v_zhidao',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '知道',
    pinyin: 'zhīdào',
    tom: 1,
    traducao: 'Saber / Ter conhecimento',
    icone: '🧠',
    exemplo_curto: {
      hanzi: '我不知道他在哪儿。',
      pinyin: 'Wǒ bù zhīdào tā zài nǎr.',
      traducao: 'Eu não sei onde ele está.'
    },
    radical: '矢 + 首 + 辶',
    dica: 'Conhecer o caminho (道) e a flecha da verdade.'
  },
  {
    id: 'v_bangzhu',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '帮助',
    pinyin: 'bāngzhù',
    tom: 1,
    traducao: 'Ajudar / Socorrer',
    icone: '🤝',
    exemplo_curto: {
      hanzi: '你能帮助我吗？',
      pinyin: 'Nǐ néng bāngzhù wǒ ma?',
      traducao: 'Você pode me ajudar?'
    },
    radical: '巾 + 力 (Força)',
    dica: 'Unir forças para apoiar outrem.'
  },
  {
    id: 'v_zhao',
    categoria: 'verbos',
    categoriaNome: 'Verbos Comuns',
    hanzi: '找',
    pinyin: 'zhǎo',
    tom: 3,
    traducao: 'Procurar / Buscar / Dar troco',
    icone: '🔍',
    exemplo_curto: {
      hanzi: '我在找我的钥匙。',
      pinyin: 'Wǒ zài zhǎo wǒ de yàoshi.',
      traducao: 'Eu estou procurando as minhas chaves.'
    },
    radical: '扌 (Mão) + 戈',
    dica: 'Mão buscando ativamente algo.'
  }
];

export const CATEGORIES = [
  { key: 'todas', nome: 'Todas', icone: '🀄' },
  { key: 'saudacoes', nome: 'Saudações', icone: '👋' },
  { key: 'rotina', nome: 'Rotina & Casa', icone: '🏠' },
  { key: 'numeros_tempo', nome: 'Números & Tempo', icone: '⏳' },
  { key: 'locomocao', nome: 'Rua & Viagem', icone: '🗺️' },
  { key: 'verbos', nome: 'Verbos', icone: '⚡' },
] as const;
