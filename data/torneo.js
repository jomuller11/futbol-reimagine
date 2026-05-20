// ============================================================
// DATOS DEL TORNEO PAPI FÚTBOL SAN JOSÉ — Generado automáticamente
// Última actualización: 2026-05-20 00:42 UTC
// Fuente: papifutbolsanjosemoron.com.ar
// NO EDITAR A MANO — este archivo lo regenera scraper/scrape.py
// ============================================================

const COLORES_EQUIPOS = {
  "01": "#5F5E5A",
  "02": "#185FA5",
  "03": "#993C1D",
  "04": "#0F6E56",
  "05": "#DC8C28",
  "06": "#534AB7",
  "07": "#888780",
  "08": "#BA7517",
  "09": "#A32D2D",
  "10": "#5DCAA5",
  "11": "#7F77DD",
  "12": "#D4537E",
  "13": "#D85A30",
  "14": "#0F3C5F",
  "15": "#85B7EB",
  "16": "#888780",
  "17": "#E24B4A",
  "18": "#534AB7",
  "19": "#27500A",
  "20": "#993C1D",
  "21": "#BA7517",
  "22": "#D4537E",
  "23": "#5F5E5A",
  "24": "#0F6E56"
};

const EQUIPOS = {
  "01": {
    "nombre": "Mobrici",
    "zona": 1
  },
  "02": {
    "nombre": "Ventriceli",
    "zona": 1
  },
  "03": {
    "nombre": "Meyer",
    "zona": 1
  },
  "04": {
    "nombre": "Da Costa",
    "zona": 1
  },
  "05": {
    "nombre": "Funaro",
    "zona": 1
  },
  "06": {
    "nombre": "Ortiz",
    "zona": 1
  },
  "07": {
    "nombre": "Del Valle",
    "zona": 1
  },
  "08": {
    "nombre": "Iribarren",
    "zona": 1
  },
  "09": {
    "nombre": "Aliano",
    "zona": 1
  },
  "10": {
    "nombre": "Ahumada",
    "zona": 1
  },
  "11": {
    "nombre": "Elizalde",
    "zona": 1
  },
  "12": {
    "nombre": "Maciel",
    "zona": 1
  },
  "13": {
    "nombre": "Pistilli",
    "zona": 2
  },
  "14": {
    "nombre": "Torres",
    "zona": 2
  },
  "15": {
    "nombre": "Ruiz Diaz",
    "zona": 2
  },
  "16": {
    "nombre": "Visconti",
    "zona": 2
  },
  "17": {
    "nombre": "Castro",
    "zona": 2
  },
  "18": {
    "nombre": "Gomez",
    "zona": 2
  },
  "19": {
    "nombre": "Laguna",
    "zona": 2
  },
  "20": {
    "nombre": "Miguel",
    "zona": 2
  },
  "21": {
    "nombre": "Pinto",
    "zona": 2
  },
  "22": {
    "nombre": "Rivas",
    "zona": 2
  },
  "23": {
    "nombre": "Resico",
    "zona": 2
  },
  "24": {
    "nombre": "Fenner",
    "zona": 2
  }
};

const PLANTELES = {
  "01": [
    "Eduardo Adrian Newman",
    "Gustavo Perez",
    "Ariel Alberto Mobrici",
    "Angel Marcelo Befaro",
    "Alejandro Gabriel Imparato",
    "Cristian Alfredo Pelizza",
    "Jorge Ocampo",
    "Diego Martin Medina",
    "Alejandro Bonardi",
    "Pablo Rappazzo",
    "Alberto Hernan Bonaiuto",
    "Emiliano Jesús Vargas"
  ],
  "02": [
    "Matias Hunau",
    "Federico Saggese",
    "Fernando De La Vega",
    "Juan Ignacio Brochero",
    "Leandro Ventricelli",
    "Patricio Javier Ventriceli",
    "Martin Ceraso",
    "Nicolas Suarez",
    "Fabricio Mauro Pontoriero",
    "Maximiliano Ponce De Leon",
    "Pablo Javier Correa",
    "Pablo Gaston Reyes"
  ],
  "03": [
    "Jose Luis Espinós",
    "Mauricio Eduardo Mones",
    "Ernesto Gabriel Fontan",
    "Ignacio Berra",
    "Daniel Leonardo Meyer",
    "Pablo Berard",
    "Martin Rodrigo Gelabert",
    "Martin Rodriguez",
    "Sebastián Lozupone",
    "Eduardo Gabriel Corvera",
    "Lautaro Ariel Valenzuela Suzuki",
    "Yair Owen Rego"
  ],
  "04": [
    "Francisco Di Santo",
    "Luis Lopez Castro",
    "Matias Javier Colucci",
    "Andres Guillermo Campos Alvarez",
    "Matias Eduardo Guirin",
    "Agustín Fonte",
    "Victor Gabriel Da Costa Sa",
    "Walter Nunes",
    "Daniel Bettosini",
    "Javier Alejandro Garcia",
    "Ricardo Escandar",
    "Nicolas Campos"
  ],
  "05": [
    "Juan Jose De Artiagoitia",
    "Mariano Giasone",
    "Luis Meade",
    "Adrian Alberto Narkizian",
    "Sebastian Cason",
    "Claudio Funaro Hijo",
    "Carlos  Alberto Tassi",
    "Nestor Claudio Gonzalez",
    "Claudio Funaro",
    "Sebastian Ruegg",
    "Dinard  Jorge Pablo",
    "Agustin Brignolo"
  ],
  "06": [
    "Nicolas Matesanz",
    "Bava Ariel Dario",
    "Argañaras Alfredo Ruben",
    "Facundo Da Cunha",
    "Arnaldo Gimenez",
    "Gustavo Gabriel Robles",
    "Kevin Zanola",
    "Rodrigo Hernan Granero",
    "Omar Alejandro Diaz",
    "Juan Manuel Tuegols",
    "Augusto Damian Ortiz",
    "Infante Cristian Leandro"
  ],
  "07": [
    "Leandro Martin Galvez",
    "Rosendo Liffourrena",
    "Eduardo L. Del Valle",
    "Leandro Ariel Rosciano",
    "Miguel Iniesta",
    "Victor Hugo Orona",
    "Pablo Nicolas Sonnante",
    "Pablo Fernando Javier Rodríguez",
    "Nahuel Serini",
    "Gustavo Ariel Moretto",
    "William Cooke",
    "Julio Orma Carrasco"
  ],
  "08": [
    "Manuel Gallardo",
    "Roberto Tomas Dolan",
    "Federico Martino",
    "Ariel Donnici",
    "Ernesto Daniel Iribarren",
    "Pablo Ivica",
    "Mariano Jorge Liani",
    "Juan Pablo Molina",
    "Juan José Torres",
    "Guillermo Filippini",
    "Federico Alvarez",
    "Horacio Emanuel Zalazar"
  ],
  "09": [
    "Guillermo Faggioli",
    "Pablo Javier Pardavila Francia",
    "Mariano Armando Dagostino",
    "Eduardo Andrés Iannaccio",
    "Martin Celedon",
    "Claudio Fabian Aliano",
    "Tomas Mc Cormack",
    "Enrique Gustavo Roldan",
    "Mauricio Ezequiel Lazarte",
    "Jose Luis Gonzalez",
    "Hugo Muñoz",
    "Juan Ignacio Lazarte"
  ],
  "10": [
    "Jorge Fernandez Menendez",
    "Diego Gomez",
    "Oscar Marcos",
    "Ernesto Fermin Bravo",
    "Ramiro Lionel Bejar",
    "Leandro Arroyo",
    "Hector Jose Raffaeli",
    "Pablo Gorbaran",
    "Guido Ezequiel Oclander",
    "Adrian Diaz",
    "Ariel Alvarez",
    "Ramiro Ahumada"
  ],
  "11": [
    "Luis Cristian Migliano",
    "Jose Alberto Müller",
    "Pablo Gomez",
    "Matías Elizalde",
    "Mariano Federico Lopez",
    "Gustavo Trovato",
    "Diego Fernando Rodriguez Barabino",
    "Sergio Eduardo Alessandrello",
    "Fabio Damian Aybar",
    "Gonzalo Sebastian Nardo",
    "Alejandro Trovato",
    "Martin Iribarne"
  ],
  "12": [
    "Diego Rodolfo Tull",
    "Juan Manuel Diego",
    "Ronald Walter Bartolomei",
    "Martin Rocca",
    "Gerardo Emilio Alonso",
    "Marcos Ariel Sadir",
    "Martin Baretta",
    "Walter Santini",
    "Cristian Damian Pujales",
    "Matías Eduardo Maciel",
    "Jorge Luis Raffo",
    "Mauro Maciel"
  ],
  "13": [
    "Ariel Peralta",
    "Dario Maggio",
    "Fabian Emanuel Calodolce",
    "Luciano Di Paolo",
    "Roberto Sciascia",
    "Sergio Andres Juarez",
    "Martín Emilio Salvel",
    "Hernan Mario Bosco",
    "Alejandro Pedro Teodori",
    "Calcagno Fernando Pablo",
    "Luis Gerardo Regner",
    "Federico Pistilli"
  ],
  "14": [
    "Martin Muzio",
    "Marcelo Solari Del Valle",
    "Luis Jeronimo",
    "Fernando Luis Gallegos",
    "Federico Solimei",
    "Almaraz Leandro",
    "Nicolas Ottoboni",
    "Fernando Ariel Torres",
    "Carlos Alberto Amarilla",
    "Alejandro Ottoboni",
    "Matias Centurion",
    "Marcelo Alberto Bonfiglio"
  ],
  "15": [
    "Gustavo Ariel Dagostino",
    "Leandro Ariel Maddaleno",
    "Mariano Lerda",
    "Yamal Salim Bakir",
    "Christian Muzio",
    "Juan Manuel Ruiz Diaz",
    "Francisco Santiago Espinos",
    "Pablo Mattos",
    "Diego Poterala",
    "Jorge Osvaldo Dolce",
    "Marcos Luis Moglia",
    "Pablo Nicolas Dolce"
  ],
  "16": [
    "Diego Gauto",
    "Lucas Matias Pizarro",
    "Hugo Hernan Chamorro",
    "Villalba Garcete Carlos Fidel",
    "Carlos Facundo Cruz Mannise",
    "Victor Visconti",
    "Xavier Vidal",
    "Gaston Kurtz Vignales",
    "Sergio Silva",
    "Cristian Szczygiel",
    "Nicolás Andrés Elia",
    "Castagna Juan Pablo"
  ],
  "17": [
    "Leo Soiero",
    "Javier Ferrante",
    "Mauro Piliu",
    "Ezequiel Rouge",
    "Claudio Daniel Castro",
    "Savelli Gabriel",
    "Gustavo Saitta",
    "Mauro David Mandanici",
    "Mariano Medina Mendoza",
    "Fernando Lamas",
    "Pablo Patricio Pirito",
    "Ezequiel Bernardez"
  ],
  "18": [
    "Mariano Luis Garcia",
    "Fernando Palmas",
    "Diego Pablo Romanos",
    "Federico Oviedo",
    "Rodriguez Mariano",
    "German Luis Artola",
    "Matías Javier Acuña",
    "Marcelo Gomez",
    "Pablo Ariel Gomez",
    "Eugenio Fresco",
    "Raul Malatini",
    "Andres Caballero Bordon"
  ],
  "19": [
    "Ariel Pagano",
    "Federico Sebastián Allan",
    "Santiago Bonomi",
    "Darío Cesar Gravano",
    "Mariano Nicolas Laguna",
    "Diego Andres Sedano",
    "Claudio Roberto Perez",
    "Ariel Froloff",
    "Daniel Jorge Creus",
    "Lucas Francisco Soriano",
    "Gaston Eduardo Barreto",
    "Ariel Fabio Cabrera"
  ],
  "20": [
    "Gabriel Luis Blanco",
    "Cristian Alberto Cata",
    "Alejandro Halfon",
    "German Ricardo Miguel",
    "Patricio Tramontano",
    "Johan De Conti",
    "Gabriel Lena",
    "Pablo Reggio",
    "Leandro Florio Cantú",
    "Luciano Jose Loraschi",
    "Mariano Miron",
    "Pablo Soldan"
  ],
  "21": [
    "Hernan Zabala",
    "Gerardo Ortega Guillen",
    "Federico Garbagnati",
    "Gaston Pringles",
    "Pablo Leonardo Nofri",
    "Alejandro Vizconti",
    "Ricardo Vallejo",
    "Matias Bianchi",
    "Diego Larrosa",
    "Mariano Bianchi",
    "Mirko Cogliolo",
    "Hernan Pinto"
  ],
  "22": [
    "Juan Jose Petracca",
    "Aníbal Domínguez",
    "Ezequiel Rodriguez Achaval",
    "Gonzalo Raúl Rivas",
    "Juan Gustavo Emanuel Viezzoli",
    "Gonzalo Garcia Bidegain",
    "Marcelo Carlos Rodriguez",
    "Emiliano Martin Oliva Ruiz Diaz",
    "Gustavo Ariel Alvarez",
    "Verdaguer Alejandro",
    "Victor Gaston Brunand",
    "Pablo Telmo"
  ],
  "23": [
    "Pablo Martin Jurado",
    "Martin Andreotta",
    "Nestor Adrian Resico",
    "Mariano Hernan Resico",
    "Hernan Rodriguez",
    "Julian Jorge Cardoso",
    "Miguel Vilmar Miguez",
    "Sebastián Rotolo",
    "Ezequiel Candanedo",
    "Ariel Gallo",
    "Santiago Muñoz",
    "Hernán Domnanovich"
  ],
  "24": [
    "Nicolas Vernola",
    "Matias Jose Fenner",
    "Javier Saiz",
    "Jose Maria Fenner",
    "Esteban Paulo Bessone",
    "Maximiliano Fenner",
    "Omar Eliceo Caraballo",
    "Renato Castellani",
    "Carlos Piombo",
    "Carlos Alberto Herrera",
    "Hernan Marcelo Fabris",
    "Eleazar Pin Etchave"
  ]
};

const POSICIONES = {
  "zona1": [
    {
      "id": "05",
      "pts": 15,
      "pj": 5,
      "pg": 5,
      "pe": 0,
      "pp": 0,
      "gf": 20,
      "gc": 10,
      "fp": 1
    },
    {
      "id": "04",
      "pts": 10,
      "pj": 5,
      "pg": 3,
      "pe": 1,
      "pp": 1,
      "gf": 13,
      "gc": 8,
      "fp": 3
    },
    {
      "id": "11",
      "pts": 9,
      "pj": 5,
      "pg": 3,
      "pe": 0,
      "pp": 2,
      "gf": 17,
      "gc": 13,
      "fp": 3
    },
    {
      "id": "08",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 17,
      "gc": 13,
      "fp": 2
    },
    {
      "id": "12",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 12,
      "gc": 11,
      "fp": 2
    },
    {
      "id": "02",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 12,
      "gc": 17,
      "fp": 3
    },
    {
      "id": "10",
      "pts": 6,
      "pj": 5,
      "pg": 2,
      "pe": 0,
      "pp": 3,
      "gf": 13,
      "gc": 13,
      "fp": 3
    },
    {
      "id": "07",
      "pts": 6,
      "pj": 5,
      "pg": 1,
      "pe": 3,
      "pp": 1,
      "gf": 16,
      "gc": 15,
      "fp": 4
    },
    {
      "id": "09",
      "pts": 6,
      "pj": 5,
      "pg": 2,
      "pe": 0,
      "pp": 3,
      "gf": 13,
      "gc": 15,
      "fp": 6
    },
    {
      "id": "03",
      "pts": 5,
      "pj": 5,
      "pg": 1,
      "pe": 2,
      "pp": 2,
      "gf": 13,
      "gc": 16,
      "fp": 3
    },
    {
      "id": "06",
      "pts": 4,
      "pj": 5,
      "pg": 1,
      "pe": 1,
      "pp": 3,
      "gf": 12,
      "gc": 21,
      "fp": 0
    },
    {
      "id": "01",
      "pts": 3,
      "pj": 5,
      "pg": 1,
      "pe": 0,
      "pp": 4,
      "gf": 14,
      "gc": 20,
      "fp": 2
    }
  ],
  "zona2": [
    {
      "id": "21",
      "pts": 11,
      "pj": 5,
      "pg": 3,
      "pe": 2,
      "pp": 0,
      "gf": 15,
      "gc": 5,
      "fp": 1
    },
    {
      "id": "14",
      "pts": 10,
      "pj": 5,
      "pg": 3,
      "pe": 1,
      "pp": 1,
      "gf": 9,
      "gc": 9,
      "fp": 5
    },
    {
      "id": "18",
      "pts": 9,
      "pj": 5,
      "pg": 3,
      "pe": 0,
      "pp": 2,
      "gf": 13,
      "gc": 11,
      "fp": 2
    },
    {
      "id": "15",
      "pts": 9,
      "pj": 5,
      "pg": 3,
      "pe": 0,
      "pp": 2,
      "gf": 11,
      "gc": 9,
      "fp": 4
    },
    {
      "id": "17",
      "pts": 9,
      "pj": 5,
      "pg": 3,
      "pe": 0,
      "pp": 2,
      "gf": 9,
      "gc": 9,
      "fp": 5
    },
    {
      "id": "20",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 8,
      "gc": 7,
      "fp": 0
    },
    {
      "id": "13",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 6,
      "gc": 8,
      "fp": 2
    },
    {
      "id": "24",
      "pts": 7,
      "pj": 5,
      "pg": 2,
      "pe": 1,
      "pp": 2,
      "gf": 8,
      "gc": 10,
      "fp": 3
    },
    {
      "id": "23",
      "pts": 5,
      "pj": 5,
      "pg": 1,
      "pe": 2,
      "pp": 2,
      "gf": 10,
      "gc": 13,
      "fp": 2
    },
    {
      "id": "22",
      "pts": 5,
      "pj": 5,
      "pg": 1,
      "pe": 2,
      "pp": 2,
      "gf": 10,
      "gc": 9,
      "fp": 7
    },
    {
      "id": "19",
      "pts": 4,
      "pj": 5,
      "pg": 1,
      "pe": 1,
      "pp": 3,
      "gf": 8,
      "gc": 8,
      "fp": 4
    },
    {
      "id": "16",
      "pts": 1,
      "pj": 5,
      "pg": 0,
      "pe": 1,
      "pp": 4,
      "gf": 6,
      "gc": 15,
      "fp": 4
    }
  ]
};

const FIXTURE = [
  {
    "fecha": 1,
    "fechaTexto": "14/03/2026",
    "estado": "jugada",
    "zona1": [
      {
        "local": "01",
        "visitante": "12",
        "golesL": 1,
        "golesV": 3
      },
      {
        "local": "02",
        "visitante": "11",
        "golesL": 4,
        "golesV": 3
      },
      {
        "local": "03",
        "visitante": "10",
        "golesL": 0,
        "golesV": 5
      },
      {
        "local": "04",
        "visitante": "09",
        "golesL": 1,
        "golesV": 2
      },
      {
        "local": "05",
        "visitante": "08",
        "golesL": 5,
        "golesV": 3
      },
      {
        "local": "06",
        "visitante": "07",
        "golesL": 4,
        "golesV": 4
      }
    ],
    "zona2": [
      {
        "local": "18",
        "visitante": "19",
        "golesL": 3,
        "golesV": 1
      },
      {
        "local": "17",
        "visitante": "20",
        "golesL": 1,
        "golesV": 0
      },
      {
        "local": "16",
        "visitante": "21",
        "golesL": 1,
        "golesV": 3
      },
      {
        "local": "15",
        "visitante": "22",
        "golesL": 3,
        "golesV": 2
      },
      {
        "local": "14",
        "visitante": "23",
        "golesL": 4,
        "golesV": 2
      },
      {
        "local": "13",
        "visitante": "24",
        "golesL": 3,
        "golesV": 1
      }
    ]
  },
  {
    "fecha": 2,
    "fechaTexto": "21/03/2026",
    "estado": "jugada",
    "zona1": [
      {
        "local": "01",
        "visitante": "02",
        "golesL": 4,
        "golesV": 5
      },
      {
        "local": "12",
        "visitante": "07",
        "golesL": 1,
        "golesV": 1
      },
      {
        "local": "08",
        "visitante": "06",
        "golesL": 6,
        "golesV": 1
      },
      {
        "local": "09",
        "visitante": "05",
        "golesL": 2,
        "golesV": 3
      },
      {
        "local": "10",
        "visitante": "04",
        "golesL": 0,
        "golesV": 3
      },
      {
        "local": "11",
        "visitante": "03",
        "golesL": 2,
        "golesV": 1
      }
    ],
    "zona2": [
      {
        "local": "22",
        "visitante": "16",
        "golesL": 3,
        "golesV": 0
      },
      {
        "local": "21",
        "visitante": "17",
        "golesL": 6,
        "golesV": 0
      },
      {
        "local": "20",
        "visitante": "18",
        "golesL": 2,
        "golesV": 0
      },
      {
        "local": "24",
        "visitante": "19",
        "golesL": 2,
        "golesV": 1
      },
      {
        "local": "23",
        "visitante": "15",
        "golesL": 4,
        "golesV": 1
      },
      {
        "local": "13",
        "visitante": "14",
        "golesL": 0,
        "golesV": 1
      }
    ]
  },
  {
    "fecha": 3,
    "fechaTexto": "18/04/2026",
    "estado": "jugada",
    "zona1": [
      {
        "local": "02",
        "visitante": "10",
        "golesL": 0,
        "golesV": 5
      },
      {
        "local": "03",
        "visitante": "04",
        "golesL": 3,
        "golesV": 3
      },
      {
        "local": "08",
        "visitante": "09",
        "golesL": 5,
        "golesV": 2
      },
      {
        "local": "01",
        "visitante": "06",
        "golesL": 6,
        "golesV": 2
      },
      {
        "local": "05",
        "visitante": "07",
        "golesL": 4,
        "golesV": 2
      },
      {
        "local": "11",
        "visitante": "12",
        "golesL": 5,
        "golesV": 3
      }
    ],
    "zona2": [
      {
        "local": "14",
        "visitante": "24",
        "golesL": 2,
        "golesV": 2
      },
      {
        "local": "15",
        "visitante": "16",
        "golesL": 2,
        "golesV": 1
      },
      {
        "local": "19",
        "visitante": "20",
        "golesL": 1,
        "golesV": 2
      },
      {
        "local": "13",
        "visitante": "17",
        "golesL": 0,
        "golesV": 4
      },
      {
        "local": "18",
        "visitante": "23",
        "golesL": 6,
        "golesV": 2
      },
      {
        "local": "21",
        "visitante": "22",
        "golesL": 3,
        "golesV": 3
      }
    ]
  },
  {
    "fecha": 4,
    "fechaTexto": "25/04/2026",
    "estado": "jugada",
    "zona1": [
      {
        "local": "02",
        "visitante": "08",
        "golesL": 1,
        "golesV": 1
      },
      {
        "local": "05",
        "visitante": "06",
        "golesL": 4,
        "golesV": 3
      },
      {
        "local": "03",
        "visitante": "07",
        "golesL": 5,
        "golesV": 5
      },
      {
        "local": "04",
        "visitante": "12",
        "golesL": 2,
        "golesV": 1
      },
      {
        "local": "01",
        "visitante": "09",
        "golesL": 2,
        "golesV": 6
      },
      {
        "local": "10",
        "visitante": "11",
        "golesL": 3,
        "golesV": 6
      }
    ],
    "zona2": [
      {
        "local": "16",
        "visitante": "20",
        "golesL": 3,
        "golesV": 3
      },
      {
        "local": "19",
        "visitante": "21",
        "golesL": 1,
        "golesV": 1
      },
      {
        "local": "13",
        "visitante": "23",
        "golesL": 1,
        "golesV": 1
      },
      {
        "local": "22",
        "visitante": "24",
        "golesL": 1,
        "golesV": 2
      },
      {
        "local": "15",
        "visitante": "18",
        "golesL": 5,
        "golesV": 0
      },
      {
        "local": "14",
        "visitante": "17",
        "golesL": 2,
        "golesV": 1
      }
    ]
  },
  {
    "fecha": 5,
    "fechaTexto": "02/05/2026",
    "estado": "jugada",
    "zona1": [
      {
        "local": "05",
        "visitante": "10",
        "golesL": 4,
        "golesV": 0
      },
      {
        "local": "02",
        "visitante": "04",
        "golesL": 2,
        "golesV": 4
      },
      {
        "local": "01",
        "visitante": "03",
        "golesL": 1,
        "golesV": 4
      },
      {
        "local": "07",
        "visitante": "09",
        "golesL": 4,
        "golesV": 1
      },
      {
        "local": "08",
        "visitante": "12",
        "golesL": 2,
        "golesV": 4
      },
      {
        "local": "06",
        "visitante": "11",
        "golesL": 2,
        "golesV": 1
      }
    ],
    "zona2": [
      {
        "local": "17",
        "visitante": "24",
        "golesL": 3,
        "golesV": 1
      },
      {
        "local": "16",
        "visitante": "18",
        "golesL": 1,
        "golesV": 4
      },
      {
        "local": "22",
        "visitante": "23",
        "golesL": 1,
        "golesV": 1
      },
      {
        "local": "14",
        "visitante": "19",
        "golesL": 0,
        "golesV": 4
      },
      {
        "local": "15",
        "visitante": "21",
        "golesL": 0,
        "golesV": 2
      },
      {
        "local": "13",
        "visitante": "20",
        "golesL": 2,
        "golesV": 1
      }
    ]
  },
  {
    "fecha": 6,
    "fechaTexto": "09/05/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "02",
        "visitante": "03"
      },
      {
        "local": "04",
        "visitante": "11"
      },
      {
        "local": "01",
        "visitante": "05"
      },
      {
        "local": "06",
        "visitante": "12"
      },
      {
        "local": "07",
        "visitante": "08"
      },
      {
        "local": "09",
        "visitante": "10"
      }
    ],
    "zona2": [
      {
        "local": "15",
        "visitante": "17"
      },
      {
        "local": "18",
        "visitante": "22"
      },
      {
        "local": "19",
        "visitante": "23"
      },
      {
        "local": "13",
        "visitante": "16"
      },
      {
        "local": "20",
        "visitante": "24"
      },
      {
        "local": "14",
        "visitante": "21"
      }
    ]
  },
  {
    "fecha": 7,
    "fechaTexto": "16/05/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "03",
        "visitante": "06"
      },
      {
        "local": "04",
        "visitante": "08"
      },
      {
        "local": "01",
        "visitante": "11"
      },
      {
        "local": "02",
        "visitante": "05"
      },
      {
        "local": "09",
        "visitante": "12"
      },
      {
        "local": "07",
        "visitante": "10"
      }
    ],
    "zona2": [
      {
        "local": "14",
        "visitante": "18"
      },
      {
        "local": "16",
        "visitante": "17"
      },
      {
        "local": "21",
        "visitante": "23"
      },
      {
        "local": "13",
        "visitante": "19"
      },
      {
        "local": "20",
        "visitante": "22"
      },
      {
        "local": "15",
        "visitante": "24"
      }
    ]
  },
  {
    "fecha": 8,
    "fechaTexto": "23/05/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "05",
        "visitante": "11"
      },
      {
        "local": "06",
        "visitante": "10"
      },
      {
        "local": "02",
        "visitante": "09"
      },
      {
        "local": "04",
        "visitante": "07"
      },
      {
        "local": "01",
        "visitante": "08"
      },
      {
        "local": "03",
        "visitante": "12"
      }
    ],
    "zona2": [
      {
        "local": "14",
        "visitante": "22"
      },
      {
        "local": "16",
        "visitante": "19"
      },
      {
        "local": "13",
        "visitante": "18"
      },
      {
        "local": "21",
        "visitante": "24"
      },
      {
        "local": "17",
        "visitante": "23"
      },
      {
        "local": "15",
        "visitante": "20"
      }
    ]
  },
  {
    "fecha": 9,
    "fechaTexto": "30/05/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "01",
        "visitante": "04"
      },
      {
        "local": "02",
        "visitante": "12"
      },
      {
        "local": "08",
        "visitante": "10"
      },
      {
        "local": "07",
        "visitante": "11"
      },
      {
        "local": "06",
        "visitante": "09"
      },
      {
        "local": "03",
        "visitante": "05"
      }
    ],
    "zona2": [
      {
        "local": "13",
        "visitante": "15"
      },
      {
        "local": "14",
        "visitante": "16"
      },
      {
        "local": "20",
        "visitante": "21"
      },
      {
        "local": "17",
        "visitante": "18"
      },
      {
        "local": "19",
        "visitante": "22"
      },
      {
        "local": "23",
        "visitante": "24"
      }
    ]
  },
  {
    "fecha": 10,
    "fechaTexto": "06/06/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "09",
        "visitante": "11"
      },
      {
        "local": "03",
        "visitante": "08"
      },
      {
        "local": "01",
        "visitante": "07"
      },
      {
        "local": "10",
        "visitante": "12"
      },
      {
        "local": "02",
        "visitante": "06"
      },
      {
        "local": "04",
        "visitante": "05"
      }
    ],
    "zona2": [
      {
        "local": "17",
        "visitante": "19"
      },
      {
        "local": "16",
        "visitante": "24"
      },
      {
        "local": "18",
        "visitante": "21"
      },
      {
        "local": "13",
        "visitante": "22"
      },
      {
        "local": "20",
        "visitante": "23"
      },
      {
        "local": "14",
        "visitante": "15"
      }
    ]
  },
  {
    "fecha": 11,
    "fechaTexto": "13/06/2026",
    "estado": "pendiente",
    "zona1": [
      {
        "local": "05",
        "visitante": "12"
      },
      {
        "local": "03",
        "visitante": "09"
      },
      {
        "local": "08",
        "visitante": "11"
      },
      {
        "local": "02",
        "visitante": "07"
      },
      {
        "local": "04",
        "visitante": "06"
      },
      {
        "local": "01",
        "visitante": "10"
      }
    ],
    "zona2": [
      {
        "local": "15",
        "visitante": "19"
      },
      {
        "local": "18",
        "visitante": "24"
      },
      {
        "local": "14",
        "visitante": "20"
      },
      {
        "local": "17",
        "visitante": "22"
      },
      {
        "local": "13",
        "visitante": "21"
      },
      {
        "local": "16",
        "visitante": "23"
      }
    ]
  }
];

const GOLEADORES = [
  {
    "pos": 1,
    "nombre": "Mariano Bianchi",
    "equipo": "21",
    "goles": 7
  },
  {
    "pos": 2,
    "nombre": "Sebastian Ruegg",
    "equipo": "05",
    "goles": 7
  },
  {
    "pos": 3,
    "nombre": "Martin Rodrigo Gelabert",
    "equipo": "03",
    "goles": 6
  },
  {
    "pos": 4,
    "nombre": "Mauro Maciel",
    "equipo": "12",
    "goles": 6
  },
  {
    "pos": 5,
    "nombre": "Sebastian Cason",
    "equipo": "05",
    "goles": 6
  },
  {
    "pos": 6,
    "nombre": "Pablo Javier Correa",
    "equipo": "02",
    "goles": 6
  },
  {
    "pos": 7,
    "nombre": "Gonzalo Sebastian Nardo",
    "equipo": "11",
    "goles": 6
  },
  {
    "pos": 8,
    "nombre": "Walter Adrian Ullua",
    "equipo": "",
    "goles": 6
  },
  {
    "pos": 9,
    "nombre": "Martin Celedon",
    "equipo": "09",
    "goles": 6
  },
  {
    "pos": 10,
    "nombre": "Agustín Fonte",
    "equipo": "04",
    "goles": 6
  },
  {
    "pos": 11,
    "nombre": "Ramiro Ahumada",
    "equipo": "10",
    "goles": 6
  },
  {
    "pos": 12,
    "nombre": "Leandro Florio Cantú",
    "equipo": "20",
    "goles": 6
  },
  {
    "pos": 13,
    "nombre": "Hernán Domnanovich",
    "equipo": "23",
    "goles": 5
  },
  {
    "pos": 14,
    "nombre": "Emiliano Jesús Vargas",
    "equipo": "01",
    "goles": 5
  },
  {
    "pos": 15,
    "nombre": "Raul Malatini",
    "equipo": "18",
    "goles": 5
  },
  {
    "pos": 16,
    "nombre": "Horacio Emanuel Zalazar",
    "equipo": "08",
    "goles": 5
  },
  {
    "pos": 17,
    "nombre": "Pablo Nicolas Dolce",
    "equipo": "15",
    "goles": 5
  },
  {
    "pos": 18,
    "nombre": "Fabio Damian Aybar",
    "equipo": "11",
    "goles": 5
  },
  {
    "pos": 19,
    "nombre": "Infante Cristian Leandro",
    "equipo": "06",
    "goles": 5
  },
  {
    "pos": 20,
    "nombre": "Emiliano Martin Oliva Ruiz Diaz",
    "equipo": "22",
    "goles": 4
  },
  {
    "pos": 21,
    "nombre": "Daniel Bettosini",
    "equipo": "04",
    "goles": 4
  },
  {
    "pos": 22,
    "nombre": "Martin Castagnino",
    "equipo": "",
    "goles": 4
  },
  {
    "pos": 23,
    "nombre": "Guillermo Filippini",
    "equipo": "08",
    "goles": 4
  },
  {
    "pos": 24,
    "nombre": "Alejandro Bonardi",
    "equipo": "01",
    "goles": 4
  },
  {
    "pos": 25,
    "nombre": "Federico Alvarez",
    "equipo": "08",
    "goles": 4
  },
  {
    "pos": 26,
    "nombre": "Pablo Leonardo Nofri",
    "equipo": "21",
    "goles": 4
  },
  {
    "pos": 27,
    "nombre": "Villalba Garcete Carlos Fidel",
    "equipo": "16",
    "goles": 4
  },
  {
    "pos": 28,
    "nombre": "Marcelo Alberto Bonfiglio",
    "equipo": "14",
    "goles": 4
  },
  {
    "pos": 29,
    "nombre": "Lautaro Ariel Valenzuela Suzuki",
    "equipo": "03",
    "goles": 3
  },
  {
    "pos": 30,
    "nombre": "Rodrigo Hernan Granero",
    "equipo": "06",
    "goles": 3
  },
  {
    "pos": 31,
    "nombre": "Ricardo Escandar",
    "equipo": "04",
    "goles": 3
  },
  {
    "pos": 32,
    "nombre": "Nahuel Serini",
    "equipo": "07",
    "goles": 3
  },
  {
    "pos": 33,
    "nombre": "Gustavo Ariel Moretto",
    "equipo": "07",
    "goles": 3
  },
  {
    "pos": 34,
    "nombre": "Claudio Funaro Hijo",
    "equipo": "05",
    "goles": 3
  },
  {
    "pos": 35,
    "nombre": "Adrian Diaz",
    "equipo": "10",
    "goles": 3
  },
  {
    "pos": 36,
    "nombre": "Martin Iribarne",
    "equipo": "11",
    "goles": 3
  },
  {
    "pos": 37,
    "nombre": "Pablo Telmo",
    "equipo": "22",
    "goles": 3
  },
  {
    "pos": 38,
    "nombre": "Maximiliano Fenner",
    "equipo": "24",
    "goles": 3
  },
  {
    "pos": 39,
    "nombre": "Fernando De La Vega",
    "equipo": "02",
    "goles": 3
  },
  {
    "pos": 40,
    "nombre": "Mariano Medina Mendoza",
    "equipo": "17",
    "goles": 3
  },
  {
    "pos": 41,
    "nombre": "Ezequiel Candanedo",
    "equipo": "23",
    "goles": 3
  },
  {
    "pos": 42,
    "nombre": "Eugenio Fresco",
    "equipo": "18",
    "goles": 3
  },
  {
    "pos": 43,
    "nombre": "Fernando Lamas",
    "equipo": "17",
    "goles": 3
  },
  {
    "pos": 44,
    "nombre": "Gaston Eduardo Barreto",
    "equipo": "19",
    "goles": 3
  },
  {
    "pos": 45,
    "nombre": "Marcos Luis Moglia",
    "equipo": "15",
    "goles": 2
  },
  {
    "pos": 46,
    "nombre": "Francisco Santiago Espinos",
    "equipo": "15",
    "goles": 2
  },
  {
    "pos": 47,
    "nombre": "Nestor Claudio Gonzalez",
    "equipo": "05",
    "goles": 2
  },
  {
    "pos": 48,
    "nombre": "Jorge Luis Raffo",
    "equipo": "12",
    "goles": 2
  },
  {
    "pos": 49,
    "nombre": "Ezequiel Bernardez",
    "equipo": "17",
    "goles": 2
  },
  {
    "pos": 50,
    "nombre": "Calcagno Fernando Pablo",
    "equipo": "13",
    "goles": 2
  },
  {
    "pos": 51,
    "nombre": "Gustavo Trovato",
    "equipo": "11",
    "goles": 2
  },
  {
    "pos": 52,
    "nombre": "Eleazar Pin Etchave",
    "equipo": "24",
    "goles": 2
  },
  {
    "pos": 53,
    "nombre": "Augusto Damian Ortiz",
    "equipo": "06",
    "goles": 2
  },
  {
    "pos": 54,
    "nombre": "Mariano Miron",
    "equipo": "20",
    "goles": 2
  },
  {
    "pos": 55,
    "nombre": "Andres Caballero Bordon",
    "equipo": "18",
    "goles": 2
  },
  {
    "pos": 56,
    "nombre": "Jorge Osvaldo Dolce",
    "equipo": "15",
    "goles": 2
  },
  {
    "pos": 57,
    "nombre": "Roberto Ezequiel Ortega",
    "equipo": "",
    "goles": 2
  },
  {
    "pos": 58,
    "nombre": "Ariel Alvarez",
    "equipo": "10",
    "goles": 2
  },
  {
    "pos": 59,
    "nombre": "Alejandro Pedro Teodori",
    "equipo": "13",
    "goles": 2
  },
  {
    "pos": 60,
    "nombre": "Hugo Muñoz",
    "equipo": "09",
    "goles": 2
  },
  {
    "pos": 61,
    "nombre": "Alejandro Ottoboni",
    "equipo": "14",
    "goles": 2
  },
  {
    "pos": 62,
    "nombre": "Daniel Leonardo Meyer",
    "equipo": "03",
    "goles": 2
  },
  {
    "pos": 63,
    "nombre": "Juan Ignacio Lazarte",
    "equipo": "09",
    "goles": 2
  },
  {
    "pos": 64,
    "nombre": "Juan José Torres",
    "equipo": "08",
    "goles": 2
  },
  {
    "pos": 65,
    "nombre": "Omar Eliceo Caraballo",
    "equipo": "24",
    "goles": 1
  },
  {
    "pos": 66,
    "nombre": "Julio Orma Carrasco",
    "equipo": "07",
    "goles": 1
  },
  {
    "pos": 67,
    "nombre": "Pablo Ariel Gomez",
    "equipo": "18",
    "goles": 1
  },
  {
    "pos": 68,
    "nombre": "Luis Meade",
    "equipo": "05",
    "goles": 1
  },
  {
    "pos": 69,
    "nombre": "Federico Sebastián Allan",
    "equipo": "19",
    "goles": 1
  },
  {
    "pos": 70,
    "nombre": "Mauricio Ezequiel Lazarte",
    "equipo": "09",
    "goles": 1
  },
  {
    "pos": 71,
    "nombre": "Castagna Juan Pablo",
    "equipo": "16",
    "goles": 1
  },
  {
    "pos": 72,
    "nombre": "Ignacio Berra",
    "equipo": "03",
    "goles": 1
  },
  {
    "pos": 73,
    "nombre": "Mariano Federico Lopez",
    "equipo": "11",
    "goles": 1
  },
  {
    "pos": 74,
    "nombre": "Matias Centurion",
    "equipo": "14",
    "goles": 1
  },
  {
    "pos": 75,
    "nombre": "Federico Garbagnati",
    "equipo": "21",
    "goles": 1
  },
  {
    "pos": 76,
    "nombre": "Matias Jose Fenner",
    "equipo": "24",
    "goles": 1
  },
  {
    "pos": 77,
    "nombre": "Oscar Marcos",
    "equipo": "10",
    "goles": 1
  },
  {
    "pos": 78,
    "nombre": "Aníbal Domínguez",
    "equipo": "22",
    "goles": 1
  },
  {
    "pos": 79,
    "nombre": "Martin Rocca",
    "equipo": "12",
    "goles": 1
  },
  {
    "pos": 80,
    "nombre": "Guido Ezequiel Oclander",
    "equipo": "10",
    "goles": 1
  },
  {
    "pos": 81,
    "nombre": "Ernesto Daniel Iribarren",
    "equipo": "08",
    "goles": 1
  },
  {
    "pos": 82,
    "nombre": "Martín Emilio Salvel",
    "equipo": "13",
    "goles": 1
  },
  {
    "pos": 83,
    "nombre": "Lucas Matias Pizarro",
    "equipo": "16",
    "goles": 1
  },
  {
    "pos": 84,
    "nombre": "Juan Pablo Molina",
    "equipo": "08",
    "goles": 1
  },
  {
    "pos": 85,
    "nombre": "Santiago Muñoz",
    "equipo": "23",
    "goles": 1
  },
  {
    "pos": 86,
    "nombre": "German Luis Artola",
    "equipo": "18",
    "goles": 1
  },
  {
    "pos": 87,
    "nombre": "Mariano Armando Dagostino",
    "equipo": "09",
    "goles": 1
  },
  {
    "pos": 88,
    "nombre": "Mariano Giasone",
    "equipo": "05",
    "goles": 1
  },
  {
    "pos": 89,
    "nombre": "Almaraz Leandro",
    "equipo": "14",
    "goles": 1
  },
  {
    "pos": 90,
    "nombre": "Lucas Francisco Soriano",
    "equipo": "19",
    "goles": 1
  },
  {
    "pos": 91,
    "nombre": "Eduardo Gabriel Corvera",
    "equipo": "03",
    "goles": 1
  },
  {
    "pos": 92,
    "nombre": "Pablo Rappazzo",
    "equipo": "01",
    "goles": 1
  },
  {
    "pos": 93,
    "nombre": "Matias Bianchi",
    "equipo": "21",
    "goles": 1
  },
  {
    "pos": 94,
    "nombre": "Walter Santini",
    "equipo": "12",
    "goles": 1
  },
  {
    "pos": 95,
    "nombre": "Ezequiel Rodriguez Achaval",
    "equipo": "22",
    "goles": 1
  },
  {
    "pos": 96,
    "nombre": "Marcelo Gomez",
    "equipo": "18",
    "goles": 1
  },
  {
    "pos": 97,
    "nombre": "Pablo Nicolas Sonnante",
    "equipo": "07",
    "goles": 1
  },
  {
    "pos": 98,
    "nombre": "Nicolas Suarez",
    "equipo": "02",
    "goles": 1
  },
  {
    "pos": 99,
    "nombre": "Hernan Pinto",
    "equipo": "21",
    "goles": 1
  },
  {
    "pos": 100,
    "nombre": "Pablo Fernando Javier Rodríguez",
    "equipo": "07",
    "goles": 1
  },
  {
    "pos": 101,
    "nombre": "Leandro Ariel Rosciano",
    "equipo": "07",
    "goles": 1
  },
  {
    "pos": 102,
    "nombre": "Cristian Damian Pujales",
    "equipo": "12",
    "goles": 1
  },
  {
    "pos": 103,
    "nombre": "Juan Manuel Tuegols",
    "equipo": "06",
    "goles": 1
  },
  {
    "pos": 104,
    "nombre": "Diego Andres Sedano",
    "equipo": "19",
    "goles": 1
  },
  {
    "pos": 105,
    "nombre": "Fabricio Mauro Pontoriero",
    "equipo": "02",
    "goles": 1
  },
  {
    "pos": 106,
    "nombre": "Ariel Gallo",
    "equipo": "23",
    "goles": 1
  },
  {
    "pos": 107,
    "nombre": "Alejandro Vizconti",
    "equipo": "21",
    "goles": 1
  },
  {
    "pos": 108,
    "nombre": "Pablo Gaston Reyes",
    "equipo": "02",
    "goles": 1
  },
  {
    "pos": 109,
    "nombre": "Martin Baretta",
    "equipo": "12",
    "goles": 1
  },
  {
    "pos": 110,
    "nombre": "Gustavo Ariel Alvarez",
    "equipo": "22",
    "goles": 1
  },
  {
    "pos": 111,
    "nombre": "Nicolas Ottoboni",
    "equipo": "14",
    "goles": 1
  },
  {
    "pos": 112,
    "nombre": "Claudio Daniel Castro",
    "equipo": "17",
    "goles": 1
  },
  {
    "pos": 113,
    "nombre": "Renato Castellani",
    "equipo": "24",
    "goles": 1
  },
  {
    "pos": 114,
    "nombre": "Jose Luis Gonzalez",
    "equipo": "09",
    "goles": 1
  },
  {
    "pos": 115,
    "nombre": "Federico Pistilli",
    "equipo": "13",
    "goles": 1
  },
  {
    "pos": 116,
    "nombre": "Gustavo Gabriel Robles",
    "equipo": "06",
    "goles": 1
  }
];

const FAIRPLAY = [
  {
    "pos": 1,
    "equipo": "20",
    "amarillas": 0,
    "azules": 0,
    "rojas": 0,
    "puntos": 0
  },
  {
    "pos": 2,
    "equipo": "06",
    "amarillas": 0,
    "azules": 0,
    "rojas": 0,
    "puntos": 0
  },
  {
    "pos": 3,
    "equipo": "21",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "puntos": 1
  },
  {
    "pos": 4,
    "equipo": "05",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "puntos": 1
  },
  {
    "pos": 5,
    "equipo": "18",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 6,
    "equipo": "01",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 7,
    "equipo": "12",
    "amarillas": 1,
    "azules": 1,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 8,
    "equipo": "08",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 9,
    "equipo": "23",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 10,
    "equipo": "13",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "puntos": 2
  },
  {
    "pos": 11,
    "equipo": "03",
    "amarillas": 3,
    "azules": 0,
    "rojas": 0,
    "puntos": 3
  },
  {
    "pos": 12,
    "equipo": "10",
    "amarillas": 3,
    "azules": 0,
    "rojas": 0,
    "puntos": 3
  },
  {
    "pos": 13,
    "equipo": "04",
    "amarillas": 3,
    "azules": 0,
    "rojas": 0,
    "puntos": 3
  },
  {
    "pos": 14,
    "equipo": "02",
    "amarillas": 3,
    "azules": 0,
    "rojas": 0,
    "puntos": 3
  },
  {
    "pos": 15,
    "equipo": "11",
    "amarillas": 2,
    "azules": 1,
    "rojas": 0,
    "puntos": 3
  },
  {
    "pos": 16,
    "equipo": "24",
    "amarillas": 1,
    "azules": 0,
    "rojas": 1,
    "puntos": 3
  },
  {
    "pos": 17,
    "equipo": "16",
    "amarillas": 4,
    "azules": 0,
    "rojas": 0,
    "puntos": 4
  },
  {
    "pos": 18,
    "equipo": "19",
    "amarillas": 4,
    "azules": 0,
    "rojas": 0,
    "puntos": 4
  },
  {
    "pos": 19,
    "equipo": "15",
    "amarillas": 4,
    "azules": 0,
    "rojas": 0,
    "puntos": 4
  },
  {
    "pos": 20,
    "equipo": "07",
    "amarillas": 4,
    "azules": 0,
    "rojas": 0,
    "puntos": 4
  },
  {
    "pos": 21,
    "equipo": "14",
    "amarillas": 4,
    "azules": 1,
    "rojas": 0,
    "puntos": 5
  },
  {
    "pos": 22,
    "equipo": "17",
    "amarillas": 5,
    "azules": 0,
    "rojas": 0,
    "puntos": 5
  },
  {
    "pos": 23,
    "equipo": "09",
    "amarillas": 6,
    "azules": 0,
    "rojas": 0,
    "puntos": 6
  },
  {
    "pos": 24,
    "equipo": "22",
    "amarillas": 6,
    "azules": 1,
    "rojas": 0,
    "puntos": 7
  }
];

const VALLA = [
  {
    "pos": 1,
    "arquero": "Hernan Zabala",
    "equipo": "21",
    "gc": 5
  },
  {
    "pos": 2,
    "arquero": "Gabriel Luis Blanco",
    "equipo": "20",
    "gc": 7
  },
  {
    "pos": 3,
    "arquero": "Ariel Pagano",
    "equipo": "19",
    "gc": 8
  },
  {
    "pos": 4,
    "arquero": "Francisco Di Santo",
    "equipo": "04",
    "gc": 8
  },
  {
    "pos": 5,
    "arquero": "Ariel Peralta",
    "equipo": "13",
    "gc": 8
  },
  {
    "pos": 6,
    "arquero": "Gustavo Ariel Dagostino",
    "equipo": "15",
    "gc": 9
  },
  {
    "pos": 7,
    "arquero": "Martin Muzio",
    "equipo": "14",
    "gc": 9
  },
  {
    "pos": 8,
    "arquero": "Juan Jose Petracca",
    "equipo": "22",
    "gc": 9
  },
  {
    "pos": 9,
    "arquero": "Leo Soiero",
    "equipo": "17",
    "gc": 9
  },
  {
    "pos": 10,
    "arquero": "Nicolas Vernola",
    "equipo": "24",
    "gc": 10
  },
  {
    "pos": 11,
    "arquero": "Juan Jose De Artiagoitia",
    "equipo": "05",
    "gc": 10
  },
  {
    "pos": 12,
    "arquero": "Mariano Luis Garcia",
    "equipo": "18",
    "gc": 11
  },
  {
    "pos": 13,
    "arquero": "Diego Rodolfo Tull",
    "equipo": "12",
    "gc": 11
  },
  {
    "pos": 14,
    "arquero": "Jorge Fernandez Menendez",
    "equipo": "10",
    "gc": 13
  },
  {
    "pos": 15,
    "arquero": "Pablo Martin Jurado",
    "equipo": "23",
    "gc": 13
  },
  {
    "pos": 16,
    "arquero": "Manuel Gallardo",
    "equipo": "08",
    "gc": 13
  },
  {
    "pos": 17,
    "arquero": "Luis Cristian Migliano",
    "equipo": "11",
    "gc": 13
  },
  {
    "pos": 18,
    "arquero": "Guillermo Faggioli",
    "equipo": "09",
    "gc": 15
  },
  {
    "pos": 19,
    "arquero": "Leandro Martin Galvez",
    "equipo": "07",
    "gc": 15
  },
  {
    "pos": 20,
    "arquero": "Diego Gauto",
    "equipo": "16",
    "gc": 15
  },
  {
    "pos": 21,
    "arquero": "Jose Luis Espinós",
    "equipo": "03",
    "gc": 16
  },
  {
    "pos": 22,
    "arquero": "Matias Hunau",
    "equipo": "02",
    "gc": 17
  },
  {
    "pos": 23,
    "arquero": "Eduardo Adrian Newman",
    "equipo": "01",
    "gc": 20
  },
  {
    "pos": 24,
    "arquero": "Nicolas Matesanz",
    "equipo": "06",
    "gc": 21
  }
];

const SANCIONES = [
  {
    "jugador": "Emiliano Martin Oliva Ruiz Diaz",
    "equipo": "22",
    "amarillas": 4,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "German Luis Artola",
    "equipo": "18",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Daniel Leonardo Meyer",
    "equipo": "03",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Juan Ignacio Lazarte",
    "equipo": "09",
    "amarillas": 2,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mauricio Ezequiel Lazarte",
    "equipo": "09",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Martin Celedon",
    "equipo": "09",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Victor Visconti",
    "equipo": "16",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Pablo Fernando Javier Rodríguez",
    "equipo": "07",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Fernando Lamas",
    "equipo": "17",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Oscar Marcos",
    "equipo": "10",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Federico Pistilli",
    "equipo": "13",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Alejandro Bonardi",
    "equipo": "01",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mariano Armando Dagostino",
    "equipo": "09",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Gustavo Perez",
    "equipo": "01",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Martín Emilio Salvel",
    "equipo": "13",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ariel Pagano",
    "equipo": "19",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mauro Piliu",
    "equipo": "17",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Martin Andreotta",
    "equipo": "23",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Victor Gaston Brunand",
    "equipo": "22",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ernesto Fermin Bravo",
    "equipo": "10",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mariano Federico Lopez",
    "equipo": "11",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Daniel Bettosini",
    "equipo": "04",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Carlos Facundo Cruz Mannise",
    "equipo": "16",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Diego Andres Sedano",
    "equipo": "19",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ezequiel Bernardez",
    "equipo": "17",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Leandro Ariel Maddaleno",
    "equipo": "15",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Castagna Juan Pablo",
    "equipo": "16",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mauro David Mandanici",
    "equipo": "17",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Rosendo Liffourrena",
    "equipo": "07",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ernesto Daniel Iribarren",
    "equipo": "08",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Christian Muzio",
    "equipo": "15",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Claudio Daniel Castro",
    "equipo": "17",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Hugo Hernan Chamorro",
    "equipo": "16",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Luis Lopez Castro",
    "equipo": "04",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Fernando Ariel Torres",
    "equipo": "14",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Hernan Zabala",
    "equipo": "21",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Alejandro Ottoboni",
    "equipo": "14",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Juan Manuel Ruiz Diaz",
    "equipo": "15",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ariel Froloff",
    "equipo": "19",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Nahuel Serini",
    "equipo": "07",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Julio Orma Carrasco",
    "equipo": "07",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Nicolas Suarez",
    "equipo": "02",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Dinard Jorge Pablo",
    "equipo": "05",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Patricio Javier Ventriceli",
    "equipo": "02",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Walter Santini",
    "equipo": "12",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Federico Sebastián Allan",
    "equipo": "19",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Maximiliano Ponce De Leon",
    "equipo": "02",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Fabio Damian Aybar",
    "equipo": "11",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Francisco Di Santo",
    "equipo": "04",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Francisco Santiago Espinos",
    "equipo": "15",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Julian Jorge Cardoso",
    "equipo": "23",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Ernesto Gabriel Fontan",
    "equipo": "03",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Leandro Arroyo",
    "equipo": "10",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Mariano Jorge Liani",
    "equipo": "08",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Hugo Muñoz",
    "equipo": "09",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Marcelo Solari Del Valle",
    "equipo": "14",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  },
  {
    "jugador": "Nicolas Vernola",
    "equipo": "24",
    "amarillas": 1,
    "azules": 0,
    "rojas": 0,
    "fechas": 0
  }
];

function getEquipoLabel(id) {
  if (!id) return '—';
  const e = EQUIPOS[id];
  return e ? `${id} ${e.nombre}` : id;
}

function getEquipoNombre(id) {
  return EQUIPOS[id]?.nombre || id;
}

function getEquipoColor(id) {
  return COLORES_EQUIPOS[id] || '#888780';
}

function teamAvatar(id, size) {
  size = size || 32;
  const fontSize = Math.round(size * 0.34);
  return `<span class="team-avatar" style="background:${getEquipoColor(id)}; width:${size}px; height:${size}px; font-size:${fontSize}px;">${id}</span>`;
}

function getStatsJugador(nombre, equipoId) {
  const nombreUpper = nombre.toUpperCase();
  const golesData = GOLEADORES.find(g =>
    g.nombre.toUpperCase() === nombreUpper && g.equipo === equipoId);
  const sancionData = SANCIONES.find(s =>
    s.jugador.toUpperCase() === nombreUpper && s.equipo === equipoId);
  const vallaData = VALLA.find(v =>
    v.arquero.toUpperCase() === nombreUpper && v.equipo === equipoId);
  return {
    goles: golesData ? golesData.goles : 0,
    amarillas: sancionData ? sancionData.amarillas : 0,
    azules: sancionData ? sancionData.azules : 0,
    rojas: sancionData ? sancionData.rojas : 0,
    esArquero: !!vallaData,
    golesRecibidos: vallaData ? vallaData.gc : null
  };
}

const STATS_GLOBALES = (function() {
  let totalGoles = 0;
  let partidosJugados = 0;
  FIXTURE.forEach(f => {
    if (f.estado === 'jugada') {
      [...f.zona1, ...f.zona2].forEach(p => {
        partidosJugados++;
        totalGoles += (p.golesL || 0) + (p.golesV || 0);
      });
    }
  });
  const fechasJugadas = FIXTURE.filter(f => f.estado === 'jugada').length;
  const proximaFecha = FIXTURE.find(f => f.estado === 'pendiente');
  return {
    equipos: Object.keys(EQUIPOS).length,
    partidosJugados,
    totalGoles,
    fechaActual: fechasJugadas,
    totalFechas: FIXTURE.length,
    proximaFecha: proximaFecha ? proximaFecha.fecha : null,
    proximaFechaTexto: proximaFecha ? proximaFecha.fechaTexto : '',
    ultimaFecha: fechasJugadas
  };
})();
