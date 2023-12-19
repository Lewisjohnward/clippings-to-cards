import { expect, test } from "vitest";
import { getUniqueWords, getWords} from "../src/helpers/parseWords";

test("Parses string into lower casearray", () => {
  expect(getWords(`m’interessa l’hai è ripeté verità`)).toStrictEqual([
    "interessa",
    "hai",
    "è",
    "ripeté",
    "verità",
  ]);

  expect(
    getWords(
      `Ma temo che non mi permetterebbero di tenerti con me, tesoro. Niente donne nella confraternita in nero, nessuna dolce mogliettina con le lentiggini a tenerti caldo il letto la notte: solo venti gelidi, salmone salato e un po’ di birra l'imperatore.`,
    ),
  ).toStrictEqual([
    "ma",
    "temo",
    "che",
    "non",
    "mi",
    "permetterebbero",
    "di",
    "tenerti",
    "con",
    "me",
    "tesoro",
    "niente",
    "donne",
    "nella",
    "confraternita",
    "in",
    "nero",
    "nessuna",
    "dolce",
    "mogliettina",
    "con",
    "le",
    "lentiggini",
    "a",
    "tenerti",
    "caldo",
    "il",
    "letto",
    "la",
    "notte",
    "solo",
    "venti",
    "gelidi",
    "salmone",
    "salato",
    "e",
    "un",
    "po",
    "di",
    "birra",
    "imperatore",
  ]);

  expect(
    getWords(
      `“L’unica parte di te che m’interessa ce l’hai in mezzo alle gambe” stava per dire. Aveva le parole sulla punta della lingua ma per qualche ragione non oltrepassarono le sue labbra. “Lei non è Shae” ripeté a se stesso il Folletto “è soltanto una stupida che pensa che io voglia giocare agli indovinelli.” A dire la verità, nemmeno la sua fica gli interessava molto. “Devo essere malato, oppure morto.”`,
    ),
  ).toStrictEqual([
    "unica",
    "parte",
    "di",
    "te",
    "che",
    "interessa",
    "ce",
    "hai",
    "in",
    "mezzo",
    "alle",
    "gambe",
    "stava",
    "per",
    "dire",
    "aveva",
    "le",
    "parole",
    "sulla",
    "punta",
    "della",
    "lingua",
    "ma",
    "per",
    "qualche",
    "ragione",
    "non",
    "oltrepassarono",
    "le",
    "sue",
    "labbra",
    "lei",
    "non",
    "è",
    "shae",
    "ripeté",
    "a",
    "se",
    "stesso",
    "il",
    "folletto",
    "è",
    "soltanto",
    "una",
    "stupida",
    "che",
    "pensa",
    "che",
    "io",
    "voglia",
    "giocare",
    "agli",
    "indovinelli",
    "a",
    "dire",
    "la",
    "verità",
    "nemmeno",
    "la",
    "sua",
    "fica",
    "gli",
    "interessava",
    "molto",
    "devo",
    "essere",
    "malato",
    "oppure",
    "morto",
  ]);
  expect(
    getWords(
      `Dick Crabb mostrò la sua vera natura il giorno seguente, quando si fermarono ad abbeverare i cavalli. Brienne andò dietro un cespuglio per svuotare la vescica. Mentre si stava accucciando, udì Podrick dire: «Cosa stai facendo? Allontanati da lì». Finì quello che doveva fare, si tirò su le brache e ritornò sulla strada. Trovò Dick lo Svelto che si puliva le dita dalla farina. «Non troverai dragoni nelle mie bisacce» gli disse Brienne. «L’oro me lo tengo addosso.»`,
    ),
  ).toStrictEqual([
    "dick",
    "crabb",
    "mostrò",
    "la",
    "sua",
    "vera",
    "natura",
    "il",
    "giorno",
    "seguente",
    "quando",
    "si",
    "fermarono",
    "ad",
    "abbeverare",
    "i",
    "cavalli",
    "brienne",
    "andò",
    "dietro",
    "un",
    "cespuglio",
    "per",
    "svuotare",
    "la",
    "vescica",
    "mentre",
    "si",
    "stava",
    "accucciando",
    "udì",
    "podrick",
    "dire",
    "cosa",
    "stai",
    "facendo",
    "allontanati",
    "da",
    "lì",
    "finì",
    "quello",
    "che",
    "doveva",
    "fare",
    "si",
    "tirò",
    "su",
    "le",
    "brache",
    "e",
    "ritornò",
    "sulla",
    "strada",
    "trovò",
    "dick",
    "lo",
    "svelto",
    "che",
    "si",
    "puliva",
    "le",
    "dita",
    "dalla",
    "farina",
    "non",
    "troverai",
    "dragoni",
    "nelle",
    "mie",
    "bisacce",
    "gli",
    "disse",
    "brienne",
    "oro",
    "me",
    "lo",
    "tengo",
    "addosso",
  ]);
  expect(
    getWords(
      `Trovò una stanza piena di armi e armature: elmi ornati, curiosi vecchi pettorali, spade lunghe, pugnali, daghe, balestre e alte lance con punte a forma di foglia.`,
    ),
  ).toStrictEqual([
    "trovò",
    "una",
    "stanza",
    "piena",
    "di",
    "armi",
    "e",
    "armature",
    "elmi",
    "ornati",
    "curiosi",
    "vecchi",
    "pettorali",
    "spade",
    "lunghe",
    "pugnali",
    "daghe",
    "balestre",
    "e",
    "alte",
    "lance",
    "con",
    "punte",
    "a",
    "forma",
    "di",
    "foglia",
  ]);
  expect(
    getWords(
      `«Il tuo cane, ce l’ha un nome?» chiese Podrick Payne. «Certo» rispose Meribald. «Ma lui non è mio.» Il cane abbaiò e scodinzolò. Era una creatura enorme, con il pelo lungo, pesava almeno cento libbre, ma era mansueto.`,
    ),
  ).toStrictEqual([
    "il",
    "tuo",
    "cane",
    "ce",
    "ha",
    "un",
    "nome",
    "chiese",
    "podrick",
    "payne",
    "certo",
    "rispose",
    "meribald",
    "ma",
    "lui",
    "non",
    "è",
    "mio",
    "il",
    "cane",
    "abbaiò",
    "e",
    "scodinzolò",
    "era",
    "una",
    "creatura",
    "enorme",
    "con",
    "il",
    "pelo",
    "lungo",
    "pesava",
    "almeno",
    "cento",
    "libbre",
    "ma",
    "era",
    "mansueto",
  ]);
  expect(
    getWords(
      `"L’universo è un’immensa foresta abitata da feroci predatori. Nascondersi significa sopravvivere, rivelarsi significa diventare prede.", title: "La materia del cosmo"`,
    ),
  ).toStrictEqual([
    "universo",
    "è",
    "immensa",
    "foresta",
    "abitata",
    "da",
    "feroci",
    "predatori",
    "nascondersi",
    "significa",
    "sopravvivere",
    "rivelarsi",
    "significa",
    "diventare",
    "prede",
    "title",
    "la",
    "materia",
    "del",
    "cosmo",
  ]);
  // expect(
  //   getWords(
  //     `"Il giorno prima, Zhang Yuanchao aveva compilato i moduli di pensionamento e lasciato l’industria chimica dove aveva lavorato per più di quarant’anni. Nelle parole del suo vicino di casa, Lao Yang,  2 quel giorno segnava l’inizio della sua seconda giovinezza. Lao Yang gli diceva che i sessant’anni, così come i sedici, erano il periodo più bello, un’età in cui ci si liberava dei fardelli dei quaranta e cinquanta, ma ancora non si era", title: "La materia del cosmo"`,
  //   ),
  // ).toStrictEqual([
  //   "il",
  //   "giorno",
  //   "prima",
  //   "zhang",
  //   "yuanchao",
  //   "aveva",
  //   "compilato",
  //   "i",
  //   "moduli",
  //   "di",
  //   "pensionamento",
  //   "e",
  //   "lasciato",
  //   "industria",
  //   "chimica",
  //   "dove",
  //   "aveva",
  //   "lavorato",
  //   "per",
  //   "più",
  //   "di",
  //   "quaranta",
  //   "anni",
  //   "nelle",
  //   "parole",
  //   "del",
  //   "suo",
  //   "vicino",
  //   "di",
  //   "casa",
  //   "lao",
  //   "yang",
  //   "",
  //   "quel",
  //   "giorno",
  //   "segnava",
  //   "inizio",
  //   "della",
  //   "sua",
  //   "seconda",
  //   "giovinezza",
  //   "lao",
  //   "yang",
  //   "gli",
  //   "diceva",
  //   "che",
  //   "i",
  //   "sessantanni",
  //   "così",
  //   "come",
  //   "i",
  //   "sedici",
  //   "erano",
  //   "il",
  //   "periodo",
  //   "più",
  //   "bello",
  //   "età",
  //   "in",
  //   "cui",
  //   "ci",
  //   "si",
  //   "liberava",
  //   "dei",
  //   "fardelli",
  //   "dei",
  //   "quaranta",
  //   "e",
  //   "cinquanta",
  //   "ma",
  //   "ancora",
  //   "non",
  //   "si",
  //   "era",
  //   "title",
  //   "la",
  //   "materia",
  //   "del",
  //   "cosmo",
  // ]);
});

test("Counts correct number of unique words", () => {
  expect(getUniqueWords(["ciao", "come", "stai"])).toStrictEqual([
    "ciao",
    "come",
    "stai",
  ]);

  expect(getUniqueWords(["duplicate", "duplicate"])).toStrictEqual([
    "duplicate",
  ]);
});
