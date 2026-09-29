// parkrun 32 - list of Irish parkruns.
// IMPORTANT: compiled from memory, NOT from parkrun's official list.
// Coordinates are approximate. `check: true` = I'm less sure this event exists / is named this way.
// Names use the short form parkrun shows on results pages (without the word "parkrun").
// `alias` = other spellings to look for when matching pasted text.

const COUNTIES = {
  Republic: ["Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"],
  North: ["Antrim","Armagh","Down","Fermanagh","Londonderry","Tyrone"]
};

const GALWAY = { name: "Galway city", lat: 53.2707, lng: -9.0568 };

const PARKRUNS = [
  // Carlow
  { name: "Carlow", county: "Carlow", lat: 52.85, lng: -6.90, check: true },
  // Cavan
  { name: "Cavan", county: "Cavan", lat: 53.99, lng: -7.36, check: true },
  // Clare
  { name: "Ennis", county: "Clare", lat: 52.84, lng: -8.98, check: true },
  // Cork
  { name: "Fota Island", county: "Cork", lat: 51.895, lng: -8.31, alias: ["Fota"] },
  { name: "Marina", county: "Cork", lat: 51.895, lng: -8.43, alias: ["Cork Marina"] },
  { name: "Ballincollig Regional Park", county: "Cork", lat: 51.888, lng: -8.58, alias: ["Ballincollig"] },
  // Donegal
  { name: "Letterkenny", county: "Donegal", lat: 54.95, lng: -7.73, check: true },
  // Dublin
  { name: "Phoenix Park", county: "Dublin", lat: 53.356, lng: -6.33 },
  { name: "Malahide Castle", county: "Dublin", lat: 53.45, lng: -6.16, alias: ["Malahide"] },
  { name: "Marlay", county: "Dublin", lat: 53.28, lng: -6.26 },
  { name: "Tymon", county: "Dublin", lat: 53.29, lng: -6.35 },
  { name: "Corkagh", county: "Dublin", lat: 53.30, lng: -6.42 },
  { name: "Bushy", county: "Dublin", lat: 53.31, lng: -6.30 },
  { name: "Cabinteely", county: "Dublin", lat: 53.26, lng: -6.15 },
  { name: "Albert College", county: "Dublin", lat: 53.38, lng: -6.26 },
  { name: "Fairview", county: "Dublin", lat: 53.36, lng: -6.23 },
  { name: "Griffeen Valley", county: "Dublin", lat: 53.35, lng: -6.44 },
  { name: "Father Collins", county: "Dublin", lat: 53.40, lng: -6.16, check: true },
  // Galway
  { name: "Salthill", county: "Galway", lat: 53.259, lng: -9.08, check: true },
  // Kerry
  { name: "Killarney", county: "Kerry", lat: 52.06, lng: -9.51, check: true },
  { name: "Tralee", county: "Kerry", lat: 52.27, lng: -9.70, check: true },
  // Kildare
  { name: "Celbridge", county: "Kildare", lat: 53.34, lng: -6.54, check: true },
  { name: "Naas", county: "Kildare", lat: 53.22, lng: -6.66, check: true },
  // Kilkenny
  { name: "Kilkenny", county: "Kilkenny", lat: 52.65, lng: -7.25, check: true },
  // Laois
  { name: "Portlaoise", county: "Laois", lat: 53.03, lng: -7.30, check: true },
  // Leitrim
  { name: "Carrick-on-Shannon", county: "Leitrim", lat: 53.94, lng: -8.09, check: true },
  // Limerick
  { name: "Limerick", county: "Limerick", lat: 52.66, lng: -8.62, check: true },
  // Longford
  { name: "Longford", county: "Longford", lat: 53.73, lng: -7.79, check: true },
  // Louth
  { name: "Drogheda", county: "Louth", lat: 53.72, lng: -6.35, check: true },
  { name: "Dundalk", county: "Louth", lat: 54.00, lng: -6.40, check: true },
  // Mayo
  { name: "Castlebar", county: "Mayo", lat: 53.84, lng: -9.30 },
  { name: "Westport", county: "Mayo", lat: 53.80, lng: -9.52, check: true },
  // Meath
  { name: "Trim", county: "Meath", lat: 53.56, lng: -6.79, check: true },
  { name: "Navan", county: "Meath", lat: 53.65, lng: -6.68, check: true },
  // Monaghan
  { name: "Monaghan", county: "Monaghan", lat: 54.25, lng: -6.97, check: true },
  // Offaly
  { name: "Tullamore", county: "Offaly", lat: 53.27, lng: -7.49, check: true },
  // Roscommon
  { name: "Lough Key", county: "Roscommon", lat: 53.98, lng: -8.24, check: true },
  // Sligo
  { name: "Sligo", county: "Sligo", lat: 54.27, lng: -8.48, check: true },
  // Tipperary
  { name: "Clonmel", county: "Tipperary", lat: 52.35, lng: -7.70, check: true },
  { name: "Nenagh", county: "Tipperary", lat: 52.86, lng: -8.20, check: true },
  // Waterford
  { name: "Waterford", county: "Waterford", lat: 52.26, lng: -7.11, check: true },
  { name: "Tramore", county: "Waterford", lat: 52.16, lng: -7.15, check: true },
  // Westmeath
  { name: "Athlone", county: "Westmeath", lat: 53.42, lng: -7.94, check: true },
  { name: "Mullingar", county: "Westmeath", lat: 53.52, lng: -7.34, check: true },
  // Wexford
  { name: "Wexford", county: "Wexford", lat: 52.34, lng: -6.46, check: true },
  // Wicklow
  { name: "Bray", county: "Wicklow", lat: 53.20, lng: -6.10, check: true },
  { name: "Greystones", county: "Wicklow", lat: 53.14, lng: -6.06, check: true },

  // ---- Northern Ireland ----
  // Antrim
  { name: "Ormeau", county: "Antrim", lat: 54.58, lng: -5.92 },
  { name: "Carrickfergus", county: "Antrim", lat: 54.72, lng: -5.81 },
  // Armagh
  { name: "Armagh", county: "Armagh", lat: 54.34, lng: -6.65, check: true },
  { name: "Lurgan", county: "Armagh", lat: 54.46, lng: -6.33, alias: ["Craigavon"], check: true },
  // Down
  { name: "Castlewellan", county: "Down", lat: 54.26, lng: -5.94 },
  { name: "Bangor", county: "Down", lat: 54.66, lng: -5.67, check: true },
  // Fermanagh
  { name: "Enniskillen", county: "Fermanagh", lat: 54.33, lng: -7.63, check: true },
  // Londonderry
  { name: "Derry~Londonderry", county: "Londonderry", lat: 54.99, lng: -7.31, alias: ["Derry", "Londonderry"], check: true },
  { name: "Roe Valley", county: "Londonderry", lat: 55.03, lng: -6.96, check: true },
  // Tyrone
  { name: "Dungannon", county: "Tyrone", lat: 54.50, lng: -6.77, check: true },
  { name: "Omagh", county: "Tyrone", lat: 54.60, lng: -7.30, check: true }
];
