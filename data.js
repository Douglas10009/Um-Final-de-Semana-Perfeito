// ══════════════════════════════════════
//  DATA — Perguntas & Brincadeiras
// ══════════════════════════════════════

const PERGUNTAS_LEVES = [
  "Se você pudesse mandar uma mensagem pra sua versão de 13 anos, o que diria?",
  "Qual é o pensamento mais estranho que você teve essa semana?",
  "Você tem alguma superstição que não faz sentido nenhum, mas segue mesmo assim?",
  "Qual era seu esconderijo favorito quando você era criança?",
  "Se seu humor agora fosse uma canção, qual seria?",
  "Você tem alguma teoria maluca sobre algo completamente banal do dia a dia?",
  "Qual foi a última vez que você riu de um jeito que não conseguia parar — do quê foi?",
  "Se você pudesse desaparecer por um mês sem avisar ninguém, o que faria?",
  "Qual habilidade você tem que a maioria das pessoas não sabe que você tem?",
  "O que te dá uma energia inexplicável — aquela coisa que faz o tempo voar?",
];

const PERGUNTAS_PESADAS = [
  "Qual versão sua você tenta esconder até de mim?",
  "O que você acha que a maioria das pessoas entende errado sobre você?",
  "Tem algo que você já perdoou, mas ainda não conseguiu esquecer?",
  "O que você sente quando fica em silêncio por tempo demais?",
  "Se você soubesse que eu nunca te julgaria por absolutamente nada, o que me contaria?",
  "Qual é um limite que você tem e que quase ninguém sabe que existe?",
  "Existe alguma parte da sua infância que você ainda não processou direito?",
  "O que o amor já te custou, que você nunca falou em voz alta?",
  "Qual foi a decisão mais difícil que você tomou sabendo que ia machucar alguém?",
  "O que você faz quando sente que tá desaparecendo por dentro?",
];

const BRINCADEIRAS = [
  {
    emoji: "🎵",
    titulo: "Playlist Battle",
    clima: "Leve & Revelador",
    tempo: "~30 min",
    descricao: "Cada um monta uma playlist com 5 músicas que define seu humor agora. Depois trocam e tentam adivinhar a emoção por trás de cada escolha.",
    instrucoes: [
      "Cada um pega o celular e tem 5 minutos pra montar uma playlist.",
      "A regra: as 5 músicas precisam contar como você tá se sentindo hoje, mas sem explicar.",
      "Trocam as playlists e tocam uma de cada vez.",
      "A cada música, o outro tenta adivinhar o que ela representa ou a emoção por trás.",
      "Depois de todas as músicas, comparam os chutes com a real intenção.",
      "Bônus: qual música vocês escolheriam pra representar o relacionamento de vocês?"
    ],
    cor: "teal"
  },
  {
    emoji: "🍳",
    titulo: "Ingrediente Surpresa",
    clima: "Divertido & Caótico",
    tempo: "~1 hora",
    descricao: "Cada um escolhe um ingrediente secreto que o outro tem que usar obrigatoriamente na receita. O resultado é imprevisível — e delicioso ou hilário.",
    instrucoes: [
      "Decidam o que vão cozinhar juntos (pode ser algo simples: macarrão, ovo mexido, sanduíche).",
      "Antes de começar, cada um escreve um ingrediente surpresa num papel dobrado.",
      "Revelam os ingredientes ao mesmo tempo.",
      "Os dois ingredientes precisam entrar na receita de alguma forma — sem veto.",
      "Cozinhem juntos, mas cada um é responsável por defender o seu ingrediente.",
      "No final, comem juntos e dão notas: sabor (1–10) e criatividade (1–10)."
    ],
    cor: "coral"
  },
  {
    emoji: "🎨",
    titulo: "Desenho às Cegas",
    clima: "Leve & Engraçado",
    tempo: "~20 min",
    descricao: "Um descreve algo apenas com palavras, sem mostrar. O outro tenta desenhar sem ver. Comparar os resultados é onde a graça mora.",
    instrucoes: [
      "Precisam de: papel, caneta, e um objeto ou imagem pra descrever (pode ser uma foto no celular).",
      "O descritor escolhe algo pra descrever — pode ser uma cena, um objeto, um emoji.",
      "Sem usar o nome do objeto! Só formas, tamanhos, posições.",
      "O desenhista não pode fazer perguntas, só ouvir e desenhar.",
      "Revelam juntos e comparam.",
      "Trocam de papel: quem descreveu agora desenha.",
      "Bônus nível hard: descrevam o rosto um do outro sem olhar pra frente."
    ],
    cor: "gold"
  },
  {
    emoji: "📜",
    titulo: "Carta pro Futuro",
    clima: "Romântico & Profundo",
    tempo: "~30 min",
    descricao: "Cada um escreve uma carta pra si mesmo que vai abrir daqui 1 ano. Lê pro outro antes de guardar. É mais revelador do que parece.",
    instrucoes: [
      "Cada um pega papel e caneta — sem usar o celular nesse momento.",
      "Escrevem uma carta pra si mesmos, pra ser aberta em 1 ano.",
      "Sugestão de temas: o que espera de si mesmo, o que quer mudar, o que quer guardar, o que sente pelo outro agora.",
      "Sem prazo — escrevam com calma, sem pressa.",
      "Quando terminarem, leem em voz alta um pro outro.",
      "Guardem as cartas em algum lugar especial e colocam um lembrete no celular pra daqui 1 ano.",
      "Bônus: também escrevam uma carta um pro outro."
    ],
    cor: "teal"
  },
  {
    emoji: "🃏",
    titulo: "Eu Nunca — Versão Casal",
    clima: "Revelador & Descontraído",
    tempo: "~30 min",
    descricao: "A versão clássica, mas sem drinks — cada confissão vira uma conversa. O foco é rir e se surpreender com o outro.",
    instrucoes: [
      "Sem bebida: quem nunca fez, levanta a mão. Quem já fez, conta a história.",
      "Não precisa de cartas — podem improvisar.",
      "Comecem com coisas leves e vão aumentando a intensidade.",
      "Exemplos leves: 'Eu nunca fingi que tava dormindo pra não responder alguém.'",
      "Exemplos médios: 'Eu nunca me arrependi de alguma coisa que disse pra uma pessoa importante.'",
      "Exemplos pesados: 'Eu nunca escondi algo de alguém por medo da reação.'",
      "A regra de ouro: sem julgamento, só curiosidade genuína."
    ],
    cor: "coral"
  },
  {
    emoji: "🔮",
    titulo: "Previsões do Casal",
    clima: "Divertido & Reflexivo",
    tempo: "~20 min",
    descricao: "Fazem apostas sobre o futuro de vocês e guardam. Quando revisitarem, vai ser uma viagem do tempo emocional.",
    instrucoes: [
      "Cada um escreve 5 previsões sobre o casal pra daqui 2 anos.",
      "Podem ser sérias ou absurdas — misturem os dois.",
      "Exemplos: 'Em 2 anos vamos ter mudado de cidade', 'Em 2 anos o Douglas ainda vai odiar acordar cedo'.",
      "Releiam em voz alta e discutam cada uma.",
      "Guardem o papel junto com as cartas do futuro.",
      "Bônus: cada um escreve 3 coisas que acredita que o outro vai conquistar."
    ],
    cor: "gold"
  },
  {
    emoji: "🎯",
    titulo: "Qual dos Dois",
    clima: "Leve & Hilário",
    tempo: "~15 min",
    descricao: "Perguntas absurdas e situacionais sobre vocês dois. Quem é mais provável de fazer X? As respostas revelam muito mais do que parecem.",
    instrucoes: [
      "Sem votação formal — cada um responde em voz alta e depois compara.",
      "Se discordarem, o que respondeu diferente conta por quê.",
      "Exemplos: 'Qual dos dois sobreviveria mais tempo num apocalipse zumbi?'",
      "'Qual dos dois cederia primeiro numa briga de décor do apartamento?'",
      "'Qual dos dois viraria streamer se perdesse o emprego?'",
      "'Qual dos dois enviaria uma mensagem pra ex às 2 da manhã num universo paralelo?'",
      "Inventem as próprias perguntas — as piores são as mais reveladoras."
    ],
    cor: "teal"
  },
  {
    emoji: "🕵️",
    titulo: "Quiz da Nossa História",
    clima: "Nostálgico & Fofo",
    tempo: "~20 min",
    descricao: "Perguntas sobre os detalhes do relacionamento de vocês. Quem lembra mais? Quem esqueceu o quê? É mais emocionante do que qualquer quiz de TV.",
    instrucoes: [
      "Um faz as perguntas, o outro responde — depois trocam.",
      "Exemplos de perguntas: 'Qual foi a primeira música que tocou no nosso primeiro encontro?'",
      "'O que eu estava usando no dia em que você decidiu que me amava?'",
      "'Qual foi a primeira coisa estranha que você percebeu em mim?'",
      "'Qual foi nossa primeira briga — e por quê foi ridícula?'",
      "'O que você pensou quando me viu pela primeira vez?'",
      "Quem errar faz um mimo pro outro: um elogio, uma massagem de 1 min, ou conta uma memória favorita."
    ],
    cor: "coral"
  }
];
