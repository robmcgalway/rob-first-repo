// parkrun 32 - list of Irish parkruns.
// Event names come from a list supplied by the user (meetups.ie). Counties were corrected by hand where that list looked wrong.
// Map positions are approximate, placed from memory. `check: true` = county or position needs checking.
// Names use the short form parkrun shows on results pages (without the word "parkrun").
// `alias` = other spellings to look for when matching pasted text.

const COUNTIES = {
  Republic: ["Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"],
  North: ["Antrim","Armagh","Down","Fermanagh","Londonderry","Tyrone"]
};

const GALWAY = { name: "Galway city", lat: 53.2707, lng: -9.0568 };

const PARKRUNS = [
  // Antrim
  { name: "Antrim", county: "Antrim", lat: 54.716, lng: -6.219 },
  { name: "Carrickfergus", county: "Antrim", lat: 54.716, lng: -5.806 },
  { name: "Colin Glen", county: "Antrim", lat: 54.548, lng: -6.020 },
  { name: "Ecos", county: "Antrim", lat: 54.862, lng: -6.270 },
  { name: "Falls", county: "Antrim", lat: 54.583, lng: -5.968 },
  { name: "Larne", county: "Antrim", lat: 54.850, lng: -5.815 },
  { name: "Limepark Playing Fields", county: "Antrim", lat: 54.750, lng: -5.950, alias: ["Limepark"], check: true },
  { name: "Paisley Park", county: "Antrim", lat: 54.850, lng: -6.260, check: true },
  { name: "Riverside", county: "Antrim", lat: 55.070, lng: -6.510 },
  { name: "Sixmilewater", county: "Antrim", lat: 54.750, lng: -6.000 },
  { name: "The Fisherman's Walk", county: "Antrim", lat: 54.870, lng: -6.460, alias: ["Fisherman's Walk"], check: true },
  { name: "Valley", county: "Antrim", lat: 54.680, lng: -5.950 },
  { name: "Waterworks", county: "Antrim", lat: 54.630, lng: -5.940 },
  { name: "Ormeau", county: "Antrim", lat: 54.585, lng: -5.915, check: true },
  { name: "Queen's", county: "Antrim", lat: 54.575, lng: -5.940, alias: ["Queens"], check: true },
  { name: "Wallace", county: "Antrim", lat: 54.510, lng: -6.050 },
  // Armagh
  { name: "Armagh", county: "Armagh", lat: 54.343, lng: -6.650 },
  { name: "Citypark", county: "Armagh", lat: 54.450, lng: -6.400 },
  { name: "Lurgan Park", county: "Armagh", lat: 54.468, lng: -6.333 },
  // Carlow
  { name: "Carlow Town", county: "Carlow", lat: 52.840, lng: -6.930, alias: ["Carlow"] },
  { name: "Tullow", county: "Carlow", lat: 52.800, lng: -6.740 },
  // Cavan
  { name: "Con Smith", county: "Cavan", lat: 53.990, lng: -7.360, check: true },
  { name: "Deerpark Forest", county: "Cavan", lat: 53.830, lng: -7.060 },
  { name: "Cootehill", county: "Cavan", lat: 54.070, lng: -7.080 },
  // Clare
  { name: "Lees Road", county: "Clare", lat: 52.850, lng: -8.980 },
  { name: "Vandeleur", county: "Clare", lat: 52.640, lng: -9.480 },
  { name: "Clarisford", county: "Clare", lat: 52.800, lng: -8.450, check: true },
  // Cork
  { name: "Ballincollig", county: "Cork", lat: 51.888, lng: -8.580 },
  { name: "Castlehaven", county: "Cork", lat: 51.530, lng: -9.200, check: true },
  { name: "Clonakilty", county: "Cork", lat: 51.620, lng: -8.870 },
  { name: "Glen River", county: "Cork", lat: 51.920, lng: -8.450, check: true },
  { name: "Macroom Castle Demesne", county: "Cork", lat: 51.900, lng: -8.960, alias: ["Macroom"] },
  { name: "Mallow Castle", county: "Cork", lat: 52.130, lng: -8.650, alias: ["Mallow"] },
  { name: "Midleton Greenway", county: "Cork", lat: 51.920, lng: -8.180, alias: ["Midleton"] },
  { name: "Tramore Valley", county: "Cork", lat: 51.870, lng: -8.470 },
  { name: "Bere Island", county: "Cork", lat: 51.630, lng: -9.850 },
  { name: "Glengarriff", county: "Cork", lat: 51.750, lng: -9.550 },
  { name: "Pobalscoil na Tríonóide", county: "Cork", lat: 51.950, lng: -7.850, check: true },
  // Donegal
  { name: "Ards Forest Park", county: "Donegal", lat: 55.130, lng: -7.990, alias: ["Ards"] },
  { name: "Dungloe", county: "Donegal", lat: 54.950, lng: -8.350 },
  { name: "Falcarragh", county: "Donegal", lat: 55.140, lng: -8.100 },
  { name: "Letterkenny", county: "Donegal", lat: 54.950, lng: -7.730 },
  { name: "Narin Beach", county: "Donegal", lat: 54.830, lng: -8.450, alias: ["Narin"] },
  { name: "Buncrana", county: "Donegal", lat: 55.130, lng: -7.450 },
  { name: "Bundoran Promenade", county: "Donegal", lat: 54.480, lng: -8.280, alias: ["Bundoran"] },
  // Down
  { name: "Belfast Victoria", county: "Down", lat: 54.600, lng: -5.875, alias: ["Victoria"], check: true },
  { name: "Newry Greenway", county: "Down", lat: 54.180, lng: -6.340, alias: ["Newry"], check: true },
  { name: "Bangor", county: "Down", lat: 54.660, lng: -5.670 },
  { name: "Belvoir Forest", county: "Down", lat: 54.550, lng: -5.930, alias: ["Belvoir"] },
  { name: "Castlewellan", county: "Down", lat: 54.260, lng: -5.940 },
  { name: "Comber", county: "Down", lat: 54.550, lng: -5.740 },
  { name: "Crawfordsburn Country", county: "Down", lat: 54.650, lng: -5.740, alias: ["Crawfordsburn"] },
  { name: "Dunleath Playing Fields", county: "Down", lat: 54.550, lng: -5.500, alias: ["Dunleath"], check: true },
  { name: "Hillsborough Forest", county: "Down", lat: 54.450, lng: -6.080, alias: ["Hillsborough"] },
  { name: "Montalto Estate", county: "Down", lat: 54.400, lng: -5.900, alias: ["Montalto"] },
  { name: "Orangefield", county: "Down", lat: 54.585, lng: -5.880 },
  { name: "Rostrevor", county: "Down", lat: 54.100, lng: -6.200 },
  { name: "Stormont", county: "Down", lat: 54.600, lng: -5.830 },
  // Dublin
  { name: "Ardgillan", county: "Dublin", lat: 53.580, lng: -6.150 },
  { name: "Brickfields", county: "Dublin", lat: 53.330, lng: -6.310 },
  { name: "Broadmeadow Linear", county: "Dublin", lat: 53.460, lng: -6.220, alias: ["Broadmeadow"] },
  { name: "Bushy", county: "Dublin", lat: 53.310, lng: -6.300 },
  { name: "Cabinteely", county: "Dublin", lat: 53.260, lng: -6.150 },
  { name: "Corkagh", county: "Dublin", lat: 53.300, lng: -6.420 },
  { name: "Darndale", county: "Dublin", lat: 53.400, lng: -6.200 },
  { name: "Dodder Valley", county: "Dublin", lat: 53.280, lng: -6.350 },
  { name: "Donabate", county: "Dublin", lat: 53.480, lng: -6.150 },
  { name: "Fairview", county: "Dublin", lat: 53.360, lng: -6.230 },
  { name: "Father Collins", county: "Dublin", lat: 53.400, lng: -6.160 },
  { name: "Griffeen", county: "Dublin", lat: 53.350, lng: -6.440 },
  { name: "Hartstown", county: "Dublin", lat: 53.390, lng: -6.410 },
  { name: "Malahide", county: "Dublin", lat: 53.450, lng: -6.160 },
  { name: "Marlay", county: "Dublin", lat: 53.280, lng: -6.260 },
  { name: "Poolbeg", county: "Dublin", lat: 53.340, lng: -6.170 },
  { name: "Poppintree", county: "Dublin", lat: 53.400, lng: -6.280 },
  { name: "Porterstown", county: "Dublin", lat: 53.380, lng: -6.380 },
  { name: "River Valley", county: "Dublin", lat: 53.460, lng: -6.210 },
  { name: "Shanganagh", county: "Dublin", lat: 53.230, lng: -6.110 },
  { name: "Sport Ireland Campus", county: "Dublin", lat: 53.390, lng: -6.370 },
  { name: "St Anne's", county: "Dublin", lat: 53.360, lng: -6.180, alias: ["St Annes"] },
  { name: "Tolka Valley", county: "Dublin", lat: 53.380, lng: -6.330 },
  { name: "Tymon", county: "Dublin", lat: 53.290, lng: -6.350 },
  { name: "Waterstown", county: "Dublin", lat: 53.350, lng: -6.390 },
  // Fermanagh
  { name: "Enniskillen", county: "Fermanagh", lat: 54.340, lng: -7.640 },
  { name: "Lough Head", county: "Fermanagh", lat: 54.350, lng: -7.750, check: true },
  // Galway
  { name: "Clonbur Woods", county: "Galway", lat: 53.550, lng: -9.360, alias: ["Clonbur"] },
  { name: "Galway Bay", county: "Galway", lat: 53.260, lng: -9.060 },
  { name: "Inis Meáin", county: "Galway", lat: 53.090, lng: -9.570, alias: ["Inis Meain"] },
  { name: "Knocknacarra", county: "Galway", lat: 53.260, lng: -9.110 },
  { name: "Oranmore", county: "Galway", lat: 53.270, lng: -8.930 },
  { name: "Oughterard", county: "Galway", lat: 53.430, lng: -9.320 },
  { name: "University of Galway", county: "Galway", lat: 53.280, lng: -9.060 },
  { name: "Coole", county: "Galway", lat: 53.060, lng: -8.830, check: true },
  { name: "Portumna", county: "Galway", lat: 53.090, lng: -8.230 },
  { name: "Mountbellew Forest", county: "Galway", lat: 53.470, lng: -8.500, alias: ["Mountbellew"] },
  // Kerry
  { name: "Fenit Greenway", county: "Kerry", lat: 52.270, lng: -9.870, alias: ["Fenit"] },
  { name: "Inch Beach", county: "Kerry", lat: 52.130, lng: -9.980, alias: ["Inch"] },
  { name: "Killarney House", county: "Kerry", lat: 52.060, lng: -9.510 },
  { name: "Listowel", county: "Kerry", lat: 52.450, lng: -9.480 },
  { name: "Tralee", county: "Kerry", lat: 52.270, lng: -9.700 },
  // Kildare
  { name: "Naas", county: "Kildare", lat: 53.220, lng: -6.660 },
  { name: "Royal Canal", county: "Kildare", lat: 53.400, lng: -6.670, alias: ["Kilcock"] },
  // Kilkenny
  { name: "Kilkenny", county: "Kilkenny", lat: 52.650, lng: -7.250 },
  // Laois
  { name: "Vicarstown", county: "Laois", lat: 53.000, lng: -7.030 },
  // Leitrim
  { name: "Ballinamore Greenway", county: "Leitrim", lat: 54.050, lng: -7.800, alias: ["Ballinamore"] },
  { name: "Glenfarne Wood", county: "Leitrim", lat: 54.250, lng: -8.080, alias: ["Glenfarne"] },
  // Limerick
  { name: "Illaunmanagh", county: "Limerick", lat: 52.660, lng: -8.630, check: true },
  { name: "Limerick", county: "Limerick", lat: 52.660, lng: -8.630, check: true },
  { name: "Mungret", county: "Limerick", lat: 52.630, lng: -8.690 },
  { name: "Newcastle West", county: "Limerick", lat: 52.450, lng: -9.060 },
  // Londonderry
  { name: "Christie", county: "Londonderry", lat: 54.990, lng: -7.320, check: true },
  { name: "Claudy Country Park", county: "Londonderry", lat: 54.920, lng: -7.150, alias: ["Claudy"] },
  { name: "Derry City", county: "Londonderry", lat: 54.990, lng: -7.320 },
  { name: "Derrynoid Forest", county: "Londonderry", lat: 54.800, lng: -6.750, alias: ["Derrynoid"] },
  { name: "Garvagh Forest", county: "Londonderry", lat: 55.000, lng: -6.680, alias: ["Garvagh"] },
  { name: "Limavady", county: "Londonderry", lat: 55.050, lng: -6.950 },
  { name: "Portrush", county: "Londonderry", lat: 55.200, lng: -6.650 },
  // Longford
  { name: "Longford", county: "Longford", lat: 53.730, lng: -7.800 },
  // Louth
  { name: "Dundalk", county: "Louth", lat: 54.000, lng: -6.400 },
  // Mayo
  { name: "Achill Greenway", county: "Mayo", lat: 53.930, lng: -9.900, alias: ["Achill"] },
  { name: "Ballina", county: "Mayo", lat: 54.120, lng: -9.160 },
  { name: "Castlebar", county: "Mayo", lat: 53.840, lng: -9.300 },
  { name: "Claremorris", county: "Mayo", lat: 53.720, lng: -8.990 },
  { name: "Erris", county: "Mayo", lat: 54.220, lng: -9.990 },
  { name: "Tourmakeady Wood", county: "Mayo", lat: 53.650, lng: -9.450, alias: ["Tourmakeady"] },
  { name: "Westport", county: "Mayo", lat: 53.800, lng: -9.520 },
  // Meath
  { name: "Laytown Beach", county: "Meath", lat: 53.680, lng: -6.240, alias: ["Laytown"] },
  { name: "Oldbridge", county: "Meath", lat: 53.720, lng: -6.420 },
  { name: "Deerpark", county: "Meath", lat: 53.680, lng: -6.880 },
  { name: "Edwin Carolan Community", county: "Meath", lat: 53.550, lng: -6.550, alias: ["Edwin Carolan"], check: true },
  { name: "Navan", county: "Meath", lat: 53.650, lng: -6.680 },
  { name: "Porch Field", county: "Meath", lat: 53.500, lng: -6.600, check: true },
  // Monaghan
  { name: "Castleblayney", county: "Monaghan", lat: 54.120, lng: -6.740 },
  { name: "Monaghan Town", county: "Monaghan", lat: 54.250, lng: -6.970 },
  // Offaly
  { name: "The Grand Canal Way", county: "Offaly", lat: 53.270, lng: -7.490, alias: ["Grand Canal Way"] },
  { name: "Mountlucas", county: "Offaly", lat: 53.250, lng: -7.300, check: true },
  // Roscommon
  { name: "Castlerea", county: "Roscommon", lat: 53.760, lng: -8.490 },
  { name: "Lough Key", county: "Roscommon", lat: 53.980, lng: -8.240 },
  { name: "Strokestown", county: "Roscommon", lat: 53.780, lng: -8.100 },
  // Sligo
  { name: "Sligo", county: "Sligo", lat: 54.270, lng: -8.470 },
  { name: "Tubbercurry Trail", county: "Sligo", lat: 54.060, lng: -8.730, alias: ["Tubbercurry"] },
  // Tipperary
  { name: "Borrisokane Town", county: "Tipperary", lat: 52.990, lng: -8.130, alias: ["Borrisokane"] },
  { name: "Fethard Town", county: "Tipperary", lat: 52.460, lng: -7.690, alias: ["Fethard"] },
  { name: "Knockanacree Woods", county: "Tipperary", lat: 52.950, lng: -8.300, alias: ["Knockanacree"], check: true },
  { name: "Templemore", county: "Tipperary", lat: 52.790, lng: -7.830 },
  { name: "Clonmel", county: "Tipperary", lat: 52.350, lng: -7.700 },
  // Tyrone
  { name: "Dungannon Park", county: "Tyrone", lat: 54.500, lng: -6.770 },
  { name: "MUSA Cookstown", county: "Tyrone", lat: 54.640, lng: -6.750, alias: ["Cookstown"] },
  { name: "Holy Cross College", county: "Tyrone", lat: 54.830, lng: -7.470 },
  { name: "Loughmacrory", county: "Tyrone", lat: 54.650, lng: -7.180 },
  { name: "Omagh", county: "Tyrone", lat: 54.600, lng: -7.300 },
  { name: "Pomeroy Forest", county: "Tyrone", lat: 54.600, lng: -6.930, alias: ["Pomeroy"] },
  // Waterford
  { name: "SETU Arena", county: "Waterford", lat: 52.250, lng: -7.150, alias: ["SETU"], check: true },
  { name: "Tramore", county: "Waterford", lat: 52.160, lng: -7.150 },
  // Westmeath
  { name: "Athlone RSC", county: "Westmeath", lat: 53.420, lng: -7.940, alias: ["Athlone"] },
  { name: "Mullingar", county: "Westmeath", lat: 53.520, lng: -7.340 },
  // Wexford
  { name: "New Ross", county: "Wexford", lat: 52.400, lng: -6.940 },
  { name: "Wexford Racecourse", county: "Wexford", lat: 52.360, lng: -6.460 },
  { name: "Gorey", county: "Wexford", lat: 52.680, lng: -6.290 },
  // Wicklow
  { name: "Avondale Forest", county: "Wicklow", lat: 52.950, lng: -6.220, alias: ["Avondale"] },
  { name: "Russborough", county: "Wicklow", lat: 53.150, lng: -6.550 }
];
