/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Place')
};
const messages = {
	calendar: 'calendar',
	adrContact: 'address & contact',
	map: 'map',
	images: 'images',
	locationmap: 'event location',
	moreInfo: 'further information',
	amenity_restaurant: 'Restaurant',
	amenity_cafe: 'Cafe',
  amenity_fast_food: 'Fast food restaurant, snack bar, sandwich bar or similar',
  amenity_bar: 'Bar',
  amenity_pub: 'Pub',
  amenity_ice_cream: 'Ice cream shop',
  amenity_biergarten: 'Biergarten (traditional sense)',
  leisure_outdoor_seating: 'An outdoor seating area, usually for the consumption of food and drink from neighbouring cafes and restaurants',
  tourism_artwork: 'Artwork',
  amenity_community_centre: 'Community centre',
  amenity_library: 'Library',
  tourism_museum: 'Museum',
  amenity_theatre: 'Theatre',
  amenity_cinema: 'Cinema',
  amenity_nightclub: 'Nightclub',
  amenity_arts_centre: 'Arts centre',
  tourism_gallery: 'Art gallery, art museum',
  amenity_internet_cafe: 'Internet cafe',
  amenity_casino: 'Casino',
  amenity_public_bookcase: 'Public bookcase',
  leisure_amusement_arcade: 'A venue with pay-to-play games',
  historic_memorial: 'Memorial (standard size)',
  historic_archaeological_site: 'Place in which objects of historic interest are preserved',
  historic_wayside_shrine: 'Historical shrine',
  historic_monument: 'Monument',
  historic_castle: 'Castle',
  historic_fort: 'Military historic fort',
  historic_city_gate: 'City gate',
  man_made_obelisk: 'Obelisk',
  leisure_playground: 'Playground',
  leisure_golf_course: 'Golf course',
  shop_massage: 'Massage shop',
  leisure_sauna: 'Sauna',
  amenity_public_bath: 'Public bath',
  leisure_miniature_golf: 'Miniature golf course',
  leisure_beach_resort: 'A managed beach',
  leisure_fishing: 'A public place for fishing',
  leisure_bowling_alley: 'Bowling center',
  leisure_dog_park: 'Dog park',
  golf_pin: 'Hole of a golf course',
  amenity_toilets: 'Public toilets',
  amenity_recycling: 'Recycling container or recycling centre',
  amenity_waste_basket: 'Waste basket',
  amenity_waste_disposal: 'Disposal bin (medium size), for bagged up household or industrial waste',
  amenity_bench: 'Bench',
  amenity_shelter: 'Shelter (e.g. weather shelter)',
  amenity_drinking_water: 'Drinking water, bubbler, drinking fountain',
  tourism_picnic_site: 'Picnic site',
  amenity_fountain: 'Fountain (recreational/decorational)',
  tourism_camp_site: 'Campsite, campground',
  leisure_picnic_table: 'Picnic table',
  tourism_caravan_site: 'Caravan site, caravan park, RV park',
  amenity_bbq: 'Barbeque',
  amenity_shower: 'Shower',
  leisure_firepit: 'Fireplace',
  leisure_bird_hide: 'Bird hide',
  tourism_viewpoint: 'Viewpoint',
  tourism_hotel: 'Hotel',
  tourism_guest_house: 'Guest house',
  tourism_hostel: 'Hostel',
  tourism_chalet: 'Chalet (holiday cottage)',
  tourism_motel: 'Motel',
  tourism_apartment: 'Apartment',
  tourism_alpine_hut: 'Alpine hut',
  tourism_wilderness_hut: 'Wilderness hut',
  amenity_bank: 'Bank',
  amenity_atm: 'ATM or cash point',
  amenity_bureau_de_change: 'Bureau de change',
  amenity_pharmacy: 'Pharmacy',
  amenity_hospital: 'Hospital (for stationary treatment)',
  amenity_dentist: 'Dentist',
  amenity_veterinary: 'Veterinary',
  amenity_post_box: 'Post box',
  amenity_post_office: 'Post office',
  amenity_telephone: 'Public telephone',
  emergency_phone: 'Emergency phone',
  amenity_parking: 'Car parking',
  highway_bus_stop: 'Bus stop',
  amenity_fuel: 'Gas station or petrol station or similar',
  amenity_bicycle_parking: 'Bicycle parking',
  amenity_bus_station: 'Bus station',
  aeroway_helipad: 'Helipad',
  aeroway_aerodrome: 'Airport',
  amenity_bicycle_rental: 'Bicycle-sharing/rental station',
  leisure_slipway: 'Slipway for boats',
  amenity_taxi: 'Taxi rank',
  railway_subway_entrance: 'Subway entrance',
  amenity_charging_station: 'Charging station',
  highway_elevator: 'Elevator',
  amenity_car_rental: 'Rent a car',
  amenity_ferry_terminal: 'Ferry terminal',
  amenity_motorcycle_parking: 'Motorcycle parking',
  amenity_bicycle_repair_station: 'Bicycle repair station',
  amenity_boat_rental: 'Boat rental',
  oneway_yes: 'One-way',
  barrier_gate: 'Gate',
  highway_traffic_signals: 'Traffic lights',
  barrier_cycle_barrier: 'Barriers to bicycle traffic',
  barrier_stile: 'Stile',
  highway_mini_roundabout: 'Mini roundabout',
  barrier_toll_booth: 'Tollbooth',
  barrier_cattle_grid: 'Cattle grid',
  barrier_kissing_gate: 'A gate which allows people to cross, but not livestock.',
  'barrier_full-height_turnstile': 'A full-height turnstile',
  barrier_motorcycle_barrier: 'Motorcycle barrier',
  waterway_dam: 'Dam',
  waterway_weir: 'Weir',
  waterway_lock_gate: 'Gate of a lock',
  natural_tree: 'Tree',
  natural_peak: 'Peak, summit, etc.',
  natural_spring: 'Spring',
  natural_cave_entrance: 'Cave entrance',
  waterway_waterfall: 'Waterfall',
  natural_saddle: 'Topographic saddle',
  natural_volcano: 'Volcano',
  amenity_police: 'Police station',
  amenity_townhall: 'Townhall',
  amenity_fire_station: 'Fire station',
  amenity_social_facility: 'Social facility',
  amenity_courthouse: 'Court house',
  amenity_prison: 'Prison',
  amenity_marketplace: 'Marketplace',
  shop_convenience: 'Convenience store',
  shop_supermarket: 'Supermarket',
  shop_hairdresser: "Hairdresser's and/or barber's",
  shop_bakery: 'Bakery',
  shop_car_repair: 'Car repair service',
  shop_car: 'Car store',
  shop_beauty: 'Beauty services except hairdressing',
  amenity_car_wash: 'Car wash',
  shop_butcher: 'Butcher',
  shop_furniture: 'Furniture store',
  shop_florist: 'Florist',
  shop_mobile_phone: 'Shop selling mobile phones and accessories',
  shop_electronics: 'Shop selling consumer electronics',
  shop_shoes: 'Shoe store',
  shop_car_parts: 'Car parts shop',
  shop_optician: 'Optician',
  shop_books: 'Book store',
  shop_gift: 'Gift or souvenier shop',
  shop_department_store: 'Department store',
  shop_bicycle: 'Bicycle shop, retail, repair and/or rental',
  shop_variety_store: 'Variety store',
  shop_travel_agency: 'Travel agency',
  shop_sports: 'Sports equipment shop',
  shop_chemist: 'Chemist',
  shop_computer: 'Computer store',
  shop_stationery: 'Stationery shop',
  shop_pet: 'Pet shop',
  shop_beverages: 'Shop selling beverages',
  shop_tyres: 'Tyres shop',
  shop_motorcycle: 'Motorcycle shop',
  shop_garden_centre: 'Garden centre',
  shop_copyshop: 'Copy shop',
  shop_toys: 'Toy shop',
  shop_deli: 'Shop selling delicatessen (gourmet foods)',
  shop_tobacco: 'Tobacco shop',
  shop_seafood: 'Shop selling fish and/or seafood',
  shop_interior_decoration: 'Shop selling interior decorations',
  shop_ticket: 'A shop selling tickets for concerts, events, public transport',
  shop_photo: 'Photo shop or photo studio',
  shop_outdoor: 'Shop selling outdoor equipment',
  shop_houseware: 'Shop selling houseware',
  shop_art: 'Art shop',
  shop_paint: 'Shop selling paints',
  shop_fabric: 'Shop that sells fabric',
  shop_bookmaker: 'Bookmaker',
  shop_second_hand: 'A shop selling second hand goods',
  shop_charity: 'Charity store',
  shop_bed: 'Shop selling mattresses',
  shop_medical_supply: 'A store where you can buy medical equipment',
  shop_hifi: 'Hi-fi store',
  shop_music: 'Shop selling recorded music',
  shop_coffee: 'Coffee shop',
  shop_musical_instrument: 'Shop selling musical instruments',
  shop_tea: 'Tea shop',
  shop_video: 'Shop selling or renting videos/DVDs',
  shop_bag: 'Bag shop',
  shop_carpet: 'Shop selling carpets',
  shop_video_games: 'Shop selling video games',
  amenity_vehicle_inspection: 'Government vehicle inspection',
  shop_dairy: 'Shop selling dairy products',
  office: 'Office, department, bureau (all)',
  man_made_tower: 'Tower in general',
  amenity_hunting_stand: 'Hunting stand',
  man_made_water_tower: 'Water tower',
  man_made_mast: 'Mast in general',
  military_bunker: 'Bunker',
  man_made_chimney: 'Chimney',
  man_made_lighthouse: 'Lighthouse',
  advertising_column: 'Advertising column',
  man_made_crane: 'Crane (stationary)',
  man_made_windmill: 'Windmill',
  man_made_communications_tower: 'A huge tower for transmitting radio applications',
  power_tower: 'Big electricity pylon, carrying high voltage electricity cables',
  power_pole: 'Small electricity pole, carrying low voltage electricity cables',
  place_city: 'City',
  capital: 'Capital',
  entrance_yes: 'Entrance (exit) of a building',
  entrance_main: 'Main entrance (exit) of a building',
  entrance_service: 'A backdoor of a building',
	parkingSubtle: 'Car parking on the carriage way or adjacent to the carriageway',
	parkingU: 'Underground parking entrance',
	parkingMulti: 'Multi-storey parking entrance',
	christian: "Christian (except Jehovah's Witnesses)",
	jewish: 'Jewish',
	muslim: 'Muslim',
	taoist: 'Taoist',
	hindu: 'Hindu',
	buddhist: 'Buddhist',
	shinto: 'Shinto',
	sikh: 'Sikh',
	religion_und: 'Unspecified or other religion',
	plaque: 'Memorial plaque / Blue plaque',
	statue: 'Statue',
	stone: 'Memorial stone',
	bust: 'Bust',
	guidepost: 'Guidepost',
	infoBoard: 'Information board',
	infoMap: 'Board with a map',
	infoMap3d: 'Information map as 3D-model',
	infoOffice: 'Tourism-Information',
	infoTerminal: 'Information terminal',
	audioguide: 'Audioguide',
	embassy: 'Embassy',
	consulate: 'Consulate',
	swimmingArea: 'Swimming area / (indoor or outdoor) swimming pool',
  waterPark: 'Water park / swimming areas',
	noEntrance: 'Any door of a building and access is not allowed',
	palace: 'Palace',
	stately: 'Stately home',
	manor: 'Manor house',
	castle: 'Castle',
	defensive: 'Defensive castle',
	fortress: 'Defensive castle / Fortress',
	castrum: 'Defensive castle / Castra',
	shiro: 'Defensive castle / Shiro',
	kremlin: 'Kremlin',
	wheelchair_yes: 'Wheelchairs have full unrestricted access.',
	wheelchair_limited: 'Wheelchairs have partial access.',
	wheelchair_no: 'Wheelchairs have NO unrestricted access',
	wheelchair_designated: 'The way or area is designated or purpose built for wheelchairs.',
	wheelchair_und: 'Access is not defined.',
	smoking_dedicated: "Dedicated to smokers; E.g., as a smoker's club, Fumoir, or Raucherclub.",
	smoking_yes: 	'Smoking is permitted in the entire property.',
	smoking_separated: 'Smoking is permitted in a separated area.',
	smoking_isolated: 'Smoking is allowed in a separated room',
	smoking_no: 'Smoking is prohibited in the entire property, without exceptions.',
	smoking_outside: 'Smoking is allowed on the property but only in outside areas.',
	smoking_und: 'No infos on smoking.',
	public_yes: 'Open to public visitors',
	public_no: 'Not open to public visitors',
	free_yes: 'Free access',
	free_no: 'Payed access',
	maxCapacity: 'max. capacity'
};

export default { locales, messages };
