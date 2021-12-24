export interface LocationFeatureSpecification {
  /* amenity */
  propertyID?: string;
  /* restaurant */
  value?: any; /* string | boolean | number | https://schema.org/StructuredValue; */
  /* osm:979019920 */
  valueReference?: any;

  maxValue?: number;
  minValue?: number;
  measurementTechnique?: string;
  unitCode?: string;
  unitText?: string;
}
const icons: any = {
  amenity: {
    restaurant: 'b/bb/Restaurant-14',
    food_court: 'b/bb/Restaurant-14',
    cafe: 'd/da/Cafe-16',
    fast_food: '1/1f/Fast-food-16',
    bar: '9/94/Bar-16',
    pub: '5/5d/Pub-16',
    ice_cream: '0/0f/Ice-cream-14',
    biergarten: 'e/e1/Biergarten-16',
    community_centre: '0/0b/Community_centre-14',
    library: 'c/c5/Library.14',
    theatre: 'e/eb/Theatre-16',
    cinema: '3/31/Cinema-16',
    nightclub: 'e/ee/Nightclub-16',
    arts_centre: 'b/bf/Arts_centre',
    internet_cafe: '8/89/Internet_cafe-14',
    casino: '8/83/Casino-14',
    public_bookcase: 'b/b2/Public_bookcase-14',
    public_bath: '0/01/Public_bath',
    toilets: 'f/fa/Toilets-16',
    recycling: '1/16/Recycling-16',
    waste_basket: '6/6f/Waste-basket-12',
    waste_disposal: 'e/e6/Waste_disposal-14',
    bench: '0/0c/Bench-16',
    shelter: 'f/f8/Shelter-14',
    drinking_water: '0/08/Drinking-water-16',
    fountain: 'a/a1/Fountain-14',
    bbq: '5/50/Bbq-14',
    shower: '5/5a/Shower-14',
    bank: '3/3b/Bank-16',
    atm: 'f/f9/Atm-14',
    bureau_de_change: 'e/ed/Bureau_de_change-14',
    pharmacy: '1/1e/Pharmacy-14',
    hospital: '3/33/Hospital-14',
    clinic: '7/71/Doctors-14',
    doctors: '7/71/Doctors-14',
    dentist: '8/86/Dentist-14',
    veterinary: 'f/fc/Veterinary-14',
    post_box: 'd/d4/Post_box-12',
    post_office: 'e/e1/Post_office-14',
    telephone: 'f/fa/Telephone.16',
    parking: '7/7b/Parking-16',
    fuel: '7/77/Fuel-16',
    bicycle_parking: '7/7f/Parking-bicycle-16',
    bus_station: '5/5a/Amenity_bus_station',
    bicycle_rental: 'd/d5/Rental-bicycle-16',
    taxi: '9/94/Taxi.16',
    charging_station: 'a/af/Charging_station.16',
    car_rental: '1/11/Rental-car-16',
    ferry_terminal: '2/24/Ferry-icon',
    motorcycle_parking: '3/31/Parking-motorcycle-16',
    bicycle_repair_station: '0/01/Bicycle_repair_station-14',
    boat_rental: 'b/b1/Boat_rental-14',
    police: '5/59/Police-16',
    townhall: 'a/a3/Town-hall-16',
    fire_station: 'b/b7/Fire-station-16',
    social_facility: '0/0e/Social_facility-14',
    courthouse: 'd/db/Courthouse-16',
    prison: 'd/d0/Prison-16',
    marketplace: '1/1c/Marketplace-14',
    car_wash: '6/65/Car_wash-14',
    vehicle_inspection: '5/56/Vehicle_inspection-14',
    driving_school: 'c/c4/Shop-other-16',
    nursing_home: 'a/ad/Social_amenity_darken_80-16',
    childcare: 'a/ad/Social_amenity_darken_80-16',
    hunting_stand: 'a/a6/Hunting-stand-16'
  },
  leisure: {
    outdoor_seating: 'a/ac/Outdoor_seating-14',
    amusement_arcade: '4/44/Amusement_arcade-14',
    playground: '3/31/Playground-16',
    fitness_centre: 'b/bd/Fitness',
    fitness_station: 'b/bd/Fitness',
    golf_course: 'd/d2/Golf-icon',
    sauna: '3/3a/Sauna-14',
    miniature_golf: '4/44/Miniature_golf',
    beach_resort: 'c/cd/Beach_resort-14',
    fishing: 'b/ba/Fishing-14',
    bowling_alley: '0/05/Bowling_alley-14',
    dog_park: 'd/da/Dog_park',
    picnic_table: '7/7d/Table-16',
    firepit: 'd/df/Firepit',
    bird_hide: '9/92/Bird_hide-14',
    slipway: '8/88/Transport_slipway'
  },
  tourism: {
    artwork: '1/12/Artwork-14',
    museum: 'a/a9/Museum-16',
    gallery: '7/7e/Gallery-14',
    picnic_site: 'f/fc/Picnic_site',
    camp_site: 'e/e4/Camping.16',
    caravan_site: 'a/a1/Caravan-16',
    viewpoint: 'c/c2/Viewpoint-16',
    hotel: 'c/ca/Hotel-16',
    guest_house: 'd/dc/Tourism_guest_house',
    hostel: '4/4f/Hostel-16',
    chalet: 'e/e9/Chalet',
    motel: '1/10/Motel-16',
    apartment: '0/0d/Apartment',
    alpine_hut: 'f/f1/Alpinehut',
    wilderness_hut: '8/8e/Wilderness_hut'
  },
  historic: {
    memorial: '6/6e/Memorial-16',
    archaeological_site: '7/7d/Archaeological-site-16',
    wayside_shrine: '1/17/Carto_shrine',
    monument: '9/94/Monument-16',
    castle: '5/51/Castle-14',
    fort: '0/0d/Historic-fort',
    city_gate: '4/47/City-gate-14',
    wayside_cross: '2/26/Christian.9'
  },
  man_made: {
    obelisk: '8/82/Obelisk-14',
    storage_tank: '1/15/Storage_tank-14',
    silo: '1/15/Storage_tank-14',
    tower: '0/0d/Tower_freestanding',
    cross: '2/26/Christian.9',
    water_tower: '1/13/Water-tower-16',
    mast: '4/4b/Mast_general',
    chimney: '8/8a/Chimney-14',
    lighthouse: 'c/c2/Lighthouse-16',
    crane: 'e/e0/Crane-14',
    windmill: '0/0b/Windmill-16',
    communications_tower: '0/0c/Communication_tower-14'
  },
  shop: {
    massage: '2/29/Massage-14',
    convenience: '9/96/Convenience-14',
    supermarket: '7/76/Supermarket-14',
    clothes: 'd/de/Clothes-16',
    fashion: 'd/de/Clothes-16',
    hairdresser: '6/6b/Hairdresser-16',
    bakery: 'f/fe/Bakery-16',
    car_repair: '2/26/Car_repair-14',
    doityourself: 'c/c3/Doityourself-16',
    hardware: 'c/c3/Doityourself-16',
    car: 'b/b2/Purple-car',
    kiosk: 'b/bf/Newsagent-14',
    newsagent: 'b/bf/Newsagent-14',
    beauty: '0/06/Beauty-14',
    butcher: 'b/b8/Butcher',
    alcohol: 'e/eb/Alcohol-16',
    wine: 'e/eb/Alcohol-16',
    furniture: 'a/a0/Furniture-16',
    florist: '6/69/Florist-16',
    mobile_phone: '1/19/Mobile-phone-16',
    electronics: '2/27/Electronics-16',
    shoes: '3/3b/Shoes-16',
    car_parts: '7/78/Car_parts-14',
    greengrocer: 'd/d8/Greengrocer-14',
    farm: 'd/d8/Greengrocer-14',
    laundry: '3/34/Laundry-14',
    dry_cleaning: '3/34/Laundry-14',
    optician: '6/60/Optician-16',
    jewelry: '8/8d/Jewellery-16',
    jewellery: '8/8d/Jewellery-16',
    books: '1/18/Books-16',
    gift: '1/11/Gift-16',
    department_store: '7/79/Department_store-16',
    bicycle: '1/1b/Bicycle-16',
    confectionery: 'c/cc/Confectionery-14',
    chocolate: 'c/cc/Confectionery-14',
    pastry: 'c/cc/Confectionery-14',
    variety_store: '2/24/Variety_store-14',
    travel_agency: 'b/b1/Travel_agency-14',
    sports: 'd/df/Sports-14',
    chemist: '3/36/Chemist-14',
    computer: 'b/bb/Computer-14',
    stationery: '5/58/Stationery-14',
    pet: '5/5d/Pet-16',
    beverages: '9/98/Beverages-14',
    cosmetics: 'e/e9/Perfumery-14',
    perfumery: 'e/e9/Perfumery-14',
    tyres: '5/53/Tyres',
    motorcycle: '5/5d/Shop_motorcycle',
    garden_centre: '4/48/Garden_centre-14',
    copyshop: '2/2c/Copyshop-14',
    toys: '6/62/Toys-14',
    deli: '3/3b/Deli-14',
    tobacco: 'b/b0/Tobacco-14',
    seafood: 'd/d9/Seafood-14',
    interior_decoration: 'f/f4/Interior_decoration-14',
    ticket: '7/79/Ticket-14',
    photo: '4/4a/Photo-14',
    trade: 'f/f2/Trade-14',
    wholesale: 'f/f2/Trade-14',
    outdoor: '7/76/Outdoor-14',
    houseware: '8/84/Houseware-14',
    art: 'f/fb/Art-14',
    paint: '3/31/Paint-14',
    fabric: '4/45/Fabric-14',
    bookmaker: '8/81/Bookmaker-14',
    second_hand: 'a/a3/Second_hand-14',
    charity: '8/85/Charity-14',
    bed: '9/91/Bed-14',
    medical_supply: 'f/fa/Medical_supply',
    hifi: '0/0c/Hifi-14',
    music: '1/13/Shop_music',
    coffee: 'd/d5/Coffee-14',
    musical_instrument: 'd/d0/Musical_instrument-14',
    tea: '3/34/Tea-14',
    video: '2/2d/Video-14',
    bag: '4/41/Bag-14',
    carpet: '5/5f/Carpet-14',
    video_games: 'a/ab/Video_games-14',
    dairy: '0/0e/Dairy',
    '*': 'c/c4/Shop-other-16'
  },
  golf: { pin: 'c/ca/Leisure-golf-pin' },
  emergency: { phone: '1/1c/Emergency-phone.16' },
  highway: {
    bus_stop: '5/52/Bus-stop-12',
    elevator: '6/6d/Elevator-12',
    traffic_signals: '8/84/Traffic_light-16',
    mini_roundabout: '9/9b/Highway_mini_roundabout'
  },
  railway: {
    station: 'https://wiki.openstreetmap.org/w/images/1/11/Rendering-railway-tram_stop-mapnik.png.png',
    halt: 'https://wiki.openstreetmap.org/w/images/1/11/Rendering-railway-tram_stop-mapnik.png.png',
    tram_stop: 'https://wiki.openstreetmap.org/w/images/1/11/Rendering-railway-tram_stop-mapnik.png.png',
    subway_entrance: '3/3c/Subway-entrance-12',
    level_crossing: 'f/f7/Level_crossing',
    crossing: 'f/f7/Level_crossing'
  },
  aeroway: { helipad: 'e/ed/Helipad.16', aerodrome: 'b/bc/Aerodrome' },
  oneway: { yes: 'e/e6/Oneway' },
  barrier: {
    gate: '9/97/Barrier_gate',
    bollard: '8/8f/Barrier',
    block: '8/8f/Barrier',
    turnstile: '8/8f/Barrier',
    log: '8/8f/Barrier',
    lift_gate: '8/8f/Liftgate-7',
    swing_gate: '8/8f/Liftgate-7',
    cycle_barrier: '0/09/Cycle_barrier-14',
    stile: '7/7c/Barrier_stile-14',
    toll_booth: 'd/d7/Toll_booth',
    cattle_grid: '4/4c/Barrier_cattle_grid-14',
    kissing_gate: '2/2f/Kissing_gate-14',
    'full-height_turnstile': 'b/bb/Full-height_turnstile-14',
    motorcycle_barrier: 'b/b5/Motorcycle_barrier-14'
  },
  ford: { yes: '5/50/Ford.16', stepping_stones: '5/50/Ford.16' },
  vending: {
    'public_transport_tickets': [
      '2/28/Public_transport_tickets-14',
      'A machine vending bus, tram, train... tickets'
    ],
    'parking_tickets': [
      'b/be/Parking_tickets-14', 'A machine selling tickets for parking'
    ],
    'excrement_bags': [ '0/08/Excrement_bags-14', 'Excrement bag dispenser' ]
  },
  waterway: {
    dam: 'c/cb/Dam_node',
    weir: '0/00/Weir_node',
    lock_gate: '9/97/Lock_gate_node',
    waterfall: '7/72/Waterfall-14'
  },
  'Node with highway': {
    'turning_circle at way with highwaytrack': '2/2f/Turning_circle_on_highway_track-16'
  },
  natural: {
    tree: '6/65/Tree-16',
    peak: '6/67/Peak-8',
    spring: '0/0e/Spring-14',
    cave_entrance: 'b/b1/Cave.14',
    saddle: 'a/a3/Saddle-8',
    volcano: 'e/e3/Volcano-8'
  },
  military: { bunker: '3/36/Bunker-osmcarto' },
  advertising: { column: '2/20/Column-14' },
  power: { tower: 'e/e3/Power_tower', pole: 'd/d8/Power_pole' },
  entrance: {
    yes: '9/92/Rect',
    main: '0/00/Entrance_main',
    service: '2/27/Entrance'
  },
  wheelchair: {
  	yes: '5/5f/Wheelchair_sign_yes',
  	limited: '0/0c/Wheelchair_sign_limited',
  	no: ' 4/46/Wheelchair_sign_no',
  	designated: '8/8a/Wheelchair_sign_only'
  },
  place: { city: '9/97/Place-6' },

  capital: '0/0d/Place-capital-8',
  office: '9/92/Office-16'
};

export function osmKeyAndIcon(locationFeatures: LocationFeatureSpecification[] | LocationFeatureSpecification) {
  if (typeof locationFeatures !== 'object') { return [] }
  const _a = (!Array.isArray(locationFeatures) ? [locationFeatures] : locationFeatures);
  const sl = (s: string) => s.trim().toLowerCase();
  const o = _a.reduce((_o: any, l) => {
    if (
      l.hasOwnProperty('propertyID') && l.hasOwnProperty('value') &&
      typeof l.propertyID === 'string' && typeof l.value === 'string'
    ) {
      const k = sl(l.propertyID.replace('osm:',''));
      const v = sl(l.value);
      if (!_o.hasOwnProperty(k)) { _o[k] = {}; }
      _o[k][v] = 1;
    }
    return _o
  }, {});

  const a: [string, string][] = [];
  if (!!o.amenity) {
    if (!!o.amenity.parking && !!o.parking && (!!o.parking.lane || !!o.parking.street_side)) {
      a.push(['parkingSubtle', '6/64/Parking-subtle']);
    }
    if (!!o.amenity.parking_entrance && !!o.parking) {
      if (!!o.parking.underground) {
        a.push(['parkingU', 'b/b1/Parking_entrance-14']);
      }
      if (!!o.parking['multi-storey']) {
        a.push(['parkingMulti', 'b/b1/Parking_entrance-14']);
      }
    }
    if (!!o.amenity.place_of_worship) {
      const religions: [string, string][] = [
        ['christian', '3/39/Christian-16'], ['jewish', 'c/cb/Jewish-16'],
        ['muslim', '5/5d/Muslim-16'], ['taoist', '7/7e/Taoist-16'],
        ['hindu', '2/2f/Hinduist-16'], ['buddhist', 'a/ae/Buddhist-16'],
        ['shinto', '8/8a/Shintoist-16'], ['sikh', '7/75/Sikhist-16'],
        ['religion_und', '0/04/Place-of-worship-16']
      ];
      if (!!o.religion) {
        religions.forEach((rA) => {
          if (!!o.religion[rA[0]]) { a.push(rA);  }
        });
      }
    }
  }
  if (!!o.artwork_type) {
    if (!!o.artwork_type.statue) { a.push(['statue', '6/68/Statue-14']) }
    if (!!o.artwork_type.bust) { a.push(['bust', '9/9f/Bust-14']) }
  }
  if (!!o.tourism && !!o.tourism.information && !!o.information) {
    if (!!o.information.guidepost) { a.push(['guidepost', 'd/dc/Guidepost-14']) }
    if (!!o.information.board) { a.push(['infoBoard', '7/77/Board-14']) }
    if (!!o.information.map) { a.push(['infoMap', 'c/ca/Map-14']) }
    if (!!o.information.tactile_map) { a.push(['infoMap3d', 'c/ca/Map-14']) }
    if (!!o.information.office) { a.push(['infoOffice', '7/78/Office-14']) }
    if (!!o.information.terminal) { a.push(['infoTerminal', '9/9c/Terminal-14']) }
    if (!!o.information.audioguide) { a.push(['audioguide', '6/6a/Audioguide-14']) }
  }
  if (!!o.office && !!o.office.diplomatic && !!o.diplomatic) {
    if (!!o.diplomatic.embassy) { a.push(['embassy', 'f/f5/Diplomatic']) }
    if (!!o.diplomatic.consulate) { a.push(['consulate', '4/4f/Office-diplomatic-consulate']) }
  }
  if (!!o.historic && !!o.historic.memorial && !!o.memorial) {
    if (!!o.memorial.plaque || !!o.memorial.blue_plaque) { a.push(['plaque', 'b/b2/Plaque']) }
    if (!!o.memorial.statue) { a.push(['statue', '6/68/Statue-14']) }
    if (!!o.memorial.stone) { a.push(['stone', '8/87/Stone-14']) }
    if (!!o.memorial.bust) { a.push(['bust', '9/9f/Bust-14']) }
  }
  if (!!o.historic && !!o.historic.castle) {
    if (!!o.castle_type && !!o.castle_type.palace) { a.push(['palace', '3/33/Palace-14']) }
    if (!!o.castle_type && !!o.castle_type.stately) { a.push(['stately', '3/33/Palace-14']) }
    if (!!o.castle_type && !!o.castle_type.manor) { a.push(['manor', '4/41/Manor-14']) }
    if (!!o.castle_type && !o.castle_type.palace && !o.castle_type.stately) {
      a.push([Object.keys(o.castle_type)[0]||'castle', '3/31/Fortress-14'])
    }
    if (!o.castle_type) {
      a.push(['castle', '3/31/Fortress-14'])
    }
  }
  if (!!o.leisure) {
    if (!!o.leisure.swimming_area || (!!o.leisure.sports_centre && !!o.sport && !!o.sport.swimming)) {
      a.push(['swimmingArea', 'c/cb/Swimming-16'])
    }
    if (!!o.leisure.water_park) {
      a.push(['waterPark', 'c/cb/Swimming-16'])
    }
  }
  if (!!o.entrance && !!o.access && !!o.access.no) {
    a.push(['noEntrance', '0/0d/Rectdiag'])
  }
  const withFullIcon = (_a: [string, string]) => { _a[1] = `https://wiki.openstreetmap.org/w/images/${_a[1]}.svg`; return _a }

  for (let k in o) {
    if (k === 'wheelchair' || !o.hasOwnProperty(k)) { continue }
    if (a.length > 1) { break }
    if (icons.hasOwnProperty(k)) {
      for (let v in o[k]) {
        if (a.length > 1) { break }
        if (icons[k].hasOwnProperty(v)) {
          typeof icons[k][v] === 'string' && a.push([`${k}_${v}`, icons[k][v]]);
        }
      }
      !a.length && typeof icons[k] === 'string' && a.push([k, icons[k]]);
    }
  }
  if (!!o.wheelchair) {
    for (let wk in o.wheelchair) {
      o.wheelchair.hasOwnProperty(wk) && a.push([`wheelchair_${wk}`, icons.wheelchair[wk]]);
    }
  } else {
    a.push(['wheelchair_und', '9/93/Wheelchair_sign_unknown']);
  }
  if (!!o.hasDriveThroughService && !!o.hasDriveThroughService.yes) {
    a.push(['hasDriveThroughService_yes','c/c4/Car-14'])
  }
  return a.map(withFullIcon)
}

/* TODO multi-level keys ...
'man_made=tower + tower:type=communication': [ '2/27/Tower_cantilever_communication', 'Communication towers' ],
'power=generator + generator:source=wind ( + generator:method=wind_turbine)': [ 'b/b2/Generator_wind-14', 'Wind turbine' ],
'man_made=tower + tower:type=observation / man_made=tower + tower:type=watchtower': [ 'b/b9/Tower_observation', 'Observation tower / Watch tower' ],
'man_made=tower + tower:type=bell_tower': [ '1/1a/Tower_bell_tower', 'Bell tower' ],
'man_made=tower + tower:type=lighting': [ '3/3d/Tower_lighting', 'Towers for lighting' ],
'man_made=tower + tower:type=communication + tower:construction=lattice': [
  '9/9d/Tower_lattice_communication',
  'Lattice communication towers'
],
'man_made=mast + tower:type=lighting': [ 'e/e9/Mast_lighting', 'Poles for lighting' ],
'man_made=mast + tower:type=communication': [ '2/25/Mast_communications', 'Mast with transmitters' ],
'man_made=tower + tower:type=defensive': [ '0/0f/Tower_defensive', 'Fortified defensive tower' ],
'man_made=tower + tower:type=cooling': [ 'b/be/Tower_cooling', 'Cooling tower' ],
'man_made=tower + tower:construction=lattice': [
  'e/e9/Tower_lattice',
  'The tower is constructed from steel lattice'
],
'man_made=tower + tower:type=lighting + tower:construction=lattice': [
  'c/c4/Tower_lattice_lighting',
  'Tower is constructed from steel lattice for lighting'
],
'man_made=tower + tower:construction=dish': [ 'c/c3/Tower_dish', "The 'communication tower' is a dish" ],
'man_made=tower + tower:construction=dome': [ 'c/c0/Tower_dome', "The 'communication tower' is a dome" ],
'man_made=telescope + telescope:type=radio': [ '5/59/Telescope_dish-14', 'Radio telescope' ],
'man_made=telescope + telescope:type=optical': [ 'e/e0/Telescope_dome-14', 'Optical telescope' ],
*/
