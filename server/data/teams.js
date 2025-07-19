const teams = [{
    name: "United States of America",
    shortName: "United States",
    type: "N",
    code: "USA",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "USA"
      },
      {
        title: "Vice President",
        type: "Head of State",
        countryCode: "USA"
      },
      {
        title: "Secretary of State",
        type: "Diplomat",
        countryCode: "USA"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "USA"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "USA"
      },
      {
        title: "Commander of Strategic Forces & Space Command",
        type: "Military",
        countryCode: "USA"
      },
      {
        title: "Commander of the Military",
        type: "Military",
        countryCode: "USA"
      },
      {
        title: "Senior Diplomat",
        type: "Diplomat",
        countryCode: "USA"
      },
      {
        title: "Senior Diplomat",
        type: "Diplomat",
        countryCode: "USA"
      },
      {
        title: "Head of the Joint Chiefs of Staff",
        type: "Military",
        countryCode: "USA"
      }
    ],
    prTrack: [
      0,
      6,
      12,
      18,
      24,
      30,
      36,
      42,
      48
    ],
    prLevel: 5,
  },
  {
    name: "United Kingdom of Great Britain and Northern Ireland",
    shortName: "United Kingdom",
    type: "N",
    code: "GBR",
    roles: [
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "GBR"
      },
      {
        title: "Secretary of State for Foreign Affairs and Commonwealth Nations",
        type: "Diplomat",
        countryCode: "GBR"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "GBR"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "GBR"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "GBR"
      },
      {
        title: "Deputy Prime Minister",
        type: "Head of State",
        countryCode: "GBR"
      },
    ],
    prTrack: [
      0,
      3,
      6,
      9,
      12,
      16,
      19,
      22,
      25
    ],
    prLevel: 5,
  },
  {
    name: "The Republic of South Africa",
    shortName: "South Africa",
    type: "N",
    code: "RSA",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "RSA"
      },
      {
        title: "Vice President",
        type: "Head of State",
        countryCode: "RSA"
      },
      {
        title: "Minister of International Relations and Cooperation",
        type: "Diplomat",
        countryCode: "RSA"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "RSA"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "RSA"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "RSA"
      },
    ],
    prTrack: [
      0,
      3,
      5,
      7,
      10,
      12,
      14,
      16,
      17
    ],
    prLevel: 5,
  },
  {
    name: "Russian Federation",
    shortName: "Russia",
    type: "N",
    code: "RFD",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "RFD"
      },
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "RFD"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "RFD"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "RFD"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "RFD"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "RFD"
      },
      {
        title: "Senior Diplomat",
        type: "Diplomat",
        countryCode: "RFD"
      },
    ],
    prTrack: [
      0,
      3,
      6,
      9,
      12,
      16,
      19,
      22,
      25
    ],
    prLevel: 5,
  },
  {
    name: "Japan",
    shortName: "Japan",
    type: "N",
    code: "JPN",
    roles: [
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "JPN"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "JPN"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "JPN"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "JPN"
      },
      {
        title: "Commander of Self Defense Forces",
        type: "Military",
        countryCode: "JPN"
      },
    ],
    prTrack: [
      0,
      3,
      7,
      10,
      14,
      18,
      21,
      25,
      28
    ],
    prLevel: 5,
  },
  {
    name: "Islamic Republic of Iran",
    shortName: "Iran",
    type: "N",
    code: "IRN",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "IRN"
      },
      {
        title: "Supreme Leader",
        type: "Head of State",
        countryCode: "IRN"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "IRN"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "IRN"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "IRN"
      },
      {
        title: "Armed Forces Commander",
        type: "Military",
        countryCode: "IRN"
      },
    ],
    prTrack: [
      0,
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16
    ],
    prLevel: 5,
  },
  {
    name: "Republic of India",
    shortName: "India",
    type: "N",
    code: "IND",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "IND"
      },
      {
        title: "Minister of External Affairs",
        type: "Diplomat",
        countryCode: "IND"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "IND"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "IND"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "IND"
      },
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "IND"
      },
    ],
    prTrack: [
      0,
      3,
      6,
      9,
      12,
      16,
      19,
      22,
      25
    ],
    prLevel: 5,
  },
  {
    name: "The French Republic",
    shortName: "France",
    type: "N",
    code: "FRA",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "FRA"
      },
      {
        title: "Minister of Foreign Affairs & International Development",
        type: "Diplomat",
        countryCode: "FRA"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "FRA"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "FRA"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "FRA"
      },
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "FRA"
      },
    ],
    prTrack: [
      0,
      3,
      6,
      9,
      12,
      16,
      19,
      22,
      25
    ],
    prLevel: 5,
  },
  {
    name: "The Arab Republic of Egypt",
    shortName: "Egypt",
    type: "N",
    code: "EPT",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "EPT"
      },
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "EPT"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "EPT"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "EPT"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "EPT"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "EPT"
      },
    ],
    prTrack: [
      0,
      2,
      4,
      6,
      8,
      10,
      11,
      12,
      13
    ],
    prLevel: 5,
  },
  {
    name: "People's Republic of China",
    shortName: "China",
    type: "N",
    code: "CHN",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "CHN"
      },
      {
        title: "Premier",
        type: "Head of State",
        countryCode: "CHN"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "CHN"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "CHN"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "CHN"
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "CHN"
      },
      {
        title: "Senior Diplomat",
        type: "Diplomat",
        countryCode: "CHN"
      },
      {
        title: "Commander of Second Artillery Corps",
        type: "Military",
        countryCode: "CHN"
      },
    ],
    prTrack: [
      0,
      5,
      10,
      16,
      21,
      27,
      32,
      37,
      43
    ],
    prLevel: 5,
  },
  {
    name: "Federative Republic of Brazil",
    shortName: "Brazil",
    type: "N",
    code: "BRZ",
    roles: [
      {
        title: "President",
        type: "Head of State",
        countryCode: "BRZ"
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
        countryCode: "BRZ"
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "BRZ"
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
        countryCode: "BRZ"
      },
      {
        title: "Commander of the Joint General Staff",
        type: "Military",
        countryCode: "BRZ"
      },
      {
        title: "Deputy Prime Minister",
        type: "Head of State",
        countryCode: "BRZ"
      },
    ],
    prTrack: [
      0,
      3,
      6,
      9,
      12,
      16,
      19,
      22,
      25
    ],
    prLevel: 5,
  },
  {
    name: "The Commonwealth of Australia",
    shortName: "Australia",
    type: "N",
    code: "AUS",
    roles: [
      {
        title: "Prime Minister",
        type: "Head of State",
        countryCode: "AUS",
      },
      {
        title: "Minister of Foreign Affairs",
        type: "Diplomat",
   
        countryCode: "AUS",
      },
      {
        title: "UN Ambassador",
        type: "Ambassador",
        countryCode: "AUS",
      },
      {
        title: "Scientific Advisor",
        type: "Scientist",
   
        countryCode: "AUS",
      },
      {
        title: "Chief of the Defense Staff",
        type: "Military",
        countryCode: "AUS",
      },
    ],
    prTrack: [
      0,
      2,
      5,
      8,
      9,
      12,
      16,
      19,
      22
    ],
    prLevel: 5,
  },
  {
    name: "Federation",
    shortName: "Aliens",
    type: "A",
    code: "FFG",
    roles: [
      {
        title: "Frontier Guild Leader",
        type: "Head of State",
        countryCode: "FFG"
      },
      {
        title: "Frontier Envoy",
        type: "Diplomat",
        countryCode: "FFG"
      },
      {
        title: "Frontier Logistics Officer",
        type: "Military",
        countryCode: "FFG"
      },
    ],
    prLevel: 0,
  },
   {
    name: "Remnant",
    shortName: "Aliens",
    type: "A",
    code: "RMT",
    roles: [
      {
        title: "Ship Commander",
        type: "Head of State",
        countryCode: "RMT"
      },
      {
        title: "Lead Surveyor",
        type: "Diplomat",
        countryCode: "RMT"
      },
      {
        title: "Operations Officer",
        type: "Military",
        countryCode: "RMT"
      },
    ],
    prLevel: 0,
  },
   {
    name: "Conglomerate",
    shortName: "Aliens",
    type: "A",
    code: "CGM",
    roles: [
      {
        title: "Expeditionary Group Commander",
        type: "Head of State",
        countryCode: "CGM"
      },
      {
        title: "Contract Specialist",
        type: "Diplomat",
        countryCode: "CGM"
      },
      {
        title: "Systemization Operative",
        type: "Military",
        countryCode: "CGM"
      },
    ],
    prLevel: 0,
  },
  {
    name: "Control Team",
    shortName: "Control",
    type: "C",
    code: "TCN",
    roles: [
      {
        title: "Game Controller",
        type: "Head of State",
        countryCode: "TCN"
      },
      {
        title: "Alliances Controller",
        type: "Diplomat",
        countryCode: "TCN"
      },
      {
        title: "Alien Controller",
        type: "Ambassador",
        countryCode: "TCN"
      },
      {
        title: "Science Controller",
        type: "Scientist",
        countryCode: "TCN"
      },
      {
        title: "Map Controller",
        type: "Military",
        countryCode: "TCN"
      },
      {
        title: "Deputy Game Controller",
        type: "Head of State",
        countryCode: "TCN"
      },
    ],
    prTrack: [],
    prLevel: 5,
  },
  {
    name: "Hypno Wars",
    shortName: "Hypno Wars",
    type: "M",
    code: "HPW",
    roles: [
      {
        title: "Editor",
        type: "Head of State",
        countryCode: "HPW"
      },
      {
        title: "Reporter",
        type: "Diplomat",
        countryCode: "HPW"
      },
      {
        title: "Public Relations",
        type: "Ambassador",
        countryCode: "HPW"
      },
    ],
    prTrack: [],
    prLevel: 5,
  },

  {
    name: "Badger News Network",
    shortName: "BNC",
    type: "M",
    code: "BNC",
    roles: [
      {
        title: "Editor",
        type: "Head of State",
        countryCode: "BNC"
      },
      {
        title: "Reporter",
        type: "Diplomat",
        countryCode: "BNC"
      },
      {
        title: "Public Relations",
        type: "Ambassador",
        countryCode: "BNC"
      },
    ],
    prTrack: [],
    prLevel: 5,
  },
  {
    name: "Global News Network",
    shortName: "GNN",
    type: "M",
    code: "GNN",
    roles: [
      {
        title: "Editor",
        type: "Head of State",
        countryCode: "GNN"
      },
      {
        title: "Reporter",
        type: "Diplomat",
        countryCode: "GNN"
      },
      {
        title: "Public Relations",
        type: "Ambassador",
        countryCode: "GNN"
      },
    ],
    prTrack: [],
    prLevel: 5,
  },
    {
    name: "Development Team",
    shortName: "Dev Team",
    type: "D",
    code: "DEV",
    roles: [
      {
        title: "Develpment Lead",
        type: "Head of State",
        countryCode: "DEV"
      },
      {
        title: "Front End Developer",
        type: "Diplomat",
        countryCode: "DEV"
      },
      {
        title: "Back-End Developer",
        type: "Ambassador",
        countryCode: "DEV"
      },
    ],
    prTrack: [],
    prLevel: 5,
  },
  {
    name: "Non-Player Character",
    shortName: "NPC",
    type: "P",
    code: "NPC",
    roles: [],
    prTrack: [],
    prLevel: 5,
  },
      {
    name: "Nexus Development Team",
    shortName: "Development",
    type: "D",
    code: "DEV",
    roles: [
      {
        title: "Project Lead",
        type: "Head of State",
        countryCode: "DEV"
      },
      {
        title: "Senior Developer",
        type: "Diplomat",
        countryCode: "DEV"
      },
      {
        title: "Jr. Developer",
        type: "Ambassador",
        countryCode: "DEV"
      }
    ],
    prTrack: [],
    prLevel: 5,
  },
]

module.exports = teams