/*
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "summary": "Daniel Craig plays James Bond",
  "type": ["Relationship","Person"],
  "subject": {
    "type": "Person",
    "name": "Daniel"
  },
  "relationship": "redaktor.me/performs",
  "object": {
    "type": "Profession",
    "name": "Actor"
  }
}


Relations from attributedTo to CreativeWork
maps:
IPTC
Adobe XMP
MP4 Official Tags
EBML Official Matroska (and webm) Tags
id3
https://schema.org
https://developers.themoviedb.org/3/configuration/get-jobs



Document
Note
Page
Profile

skos:prefLabel "animals"@en ;
skos:altLabel "fauna"@en ;
skos:hiddenLabel "aminals"@en ;
skos:prefLabel "Tiere"@de ;
skos:altLabel "Fauna"@de .

:N102000
    a skos:Concept ;
    skos:broader :N100000 ;
    skos:inScheme <https://nwbib.de/subjects> ;
    skos:narrower :N102060, :N102070, :N105000 ;
    skos:notation "102000" ;
    skos:prefLabel "Landesbeschreibungen"@de .
*/

// lead, act, contribute,
// leadActAs, actAs, doubleAs, speakAs, speakFor

// Iptc4xmpExt:PersonInImage Text
// Iptc4xmpExt:OrganisationInImageName Text
// Iptc4xmpExt:ProductInImage [Bag Product structure <External>]
// photoshop:TextLayers [{LayerName, LayerText}, ]
// CLASS Character, Musical Instrument?

// id, labels, narrowerIds
const as = [
  ['Video',{pref:{en:'Video',de:'Video'}, alt:{en:'Movie',de:'Film'}},false],
  ['Audio',{pref:{en:'Audio',de:'Audio'}, alt:{en:'Sound',de:'Sound'}},false],
  ['Image',{pref:{en:'Image',de:'Bild'}, alt:{en:'Photo',de:'Foto'}},false],
  ['Event',{pref:{en:'Event',de:'Veranstaltung'}, alt:{en:'Happening',de:'Ereignis'}},false],
  ['Place',{pref:{en:'Place',de:'Ort'}, alt:{en:'Location',de:'Örtlichkeit'}},false],
  ['Article',{pref:{en:'Article',de:'Artikel'}},false],
];


// https://redaktor.me/relation

// actor is Actor
// actor contributes characters or work

/* Relations from location to Location Type */
const locationRoles = [
  'ContentLocation', 'SpatialCoverage', 'LocationCreated'
];
// loc:
// ["pup","Publication place"],["prp","Production place"],
// ["evp","Event place"],["uvp","University place"],["dbp","Distribution place"]
// ["mfp","Manufacture place"],

const relation = [
  ['isRemixOf', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],

  ['leadPerforms', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['performs', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['speaks', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['doubles', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['hasRole', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['contributes', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['worksWith' false, {pref:{en:'Colleague',de:''}, alt:{en:'',de:''}}, false],
  ['speaksFor', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}, false],
  ['actsFor', false, {pref:{en:'Actor',de:''}, alt:{en:'',de:''}}, false]
];

// https://redaktor.me/profession
// id and TMDB (replace()), labels pref/alt/hidden/tmdb/loc [--> map pref to as:summaryMap ! --> loc can be [exact near]]
const orgRoles = [ ['OrganisationInImageName', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}] ];
const productRoles = [ ['ProductInImage', false, {pref:{en:'',de:''}, alt:{en:'',de:''}}] ];
const roles = [
  ['Artist', {loc: 'art', pref:{en:'',de:''}, alt:{en:'',de:''}}], // "primary artist"
  ['Author', {loc: 'aut', pref:{en:'',de:''}, alt:{en:'',de:''}}],
  ['Contributor', {tmdb: false, loc: 'ctb', pref:{en:'Copyright holder',de:''}, alt:{en:'Copyright claimant',de:''}}],
  ['Copyright', {tmdb: false, loc: ['cph','cpc'], pref:{en:'',de:''}, alt:{en:'',de:''}}],
  ['PersonInImage', {tmdb: false, loc: 'dpc', pref:{en:'',de:''}, alt:{en:'',de:''}}],
  ['Character', 'Character', {pref:{en:'',de:''}, alt:{en:'',de:''}}],

  ['LeadPerformer', {tmdb: 'Actor', loc: 'prf', pref:{en:'Lead performer',de:''}, alt:{en:'LeadPerformer',de:''}, hidden:{en:'Starring',de:''}}],
  ['Actor', {loc: 'act', pref:{en:'Actor',de:''}, alt:{en:'Performer',de:''}}],
  ['Double', {tmdb: 'Stunt Double', pref:{en:'Double',de:''}, alt:{en:'',de:''}}],
  ['Voice', {loc: ['vac','spk'], pref:{en:'Voice actor',de:''}, alt:{en:'Speaker',de:''}}],
  ['Cameo', {pref:{en:'',de:''}, alt:{en:'',de:''}}],
  ['SpecialGuest', {tmdb: 'Special Guest', pref:{en:'',de:''}, alt:{en:'',de:''}}],

  ['AccountablePerson', {tmdb: 'Accountable person', loc: 'rpy', pref:{en: 'Accountable Person', de: 'V.i.S.d.P.'}}],
  ['Owner', {tmdb: false, loc: 'own', pref:{en: 'Former owner', de: 'Eigentümer'}}],
  ['FormerOwner', {tmdb: false, loc: 'fmo', pref:{en: 'Former owner', de: 'Vorheriger Eigentümer'}}],
  ['DistributedBy',{tmdb: false, loc: ['dst','fds'], pref:{en: 'distributed by', de: ''}, alt: {en: 'Film distributor', de: ''}}],
  ['RemixedBy',{pref:{en:'remixed by',de:''}, alt:{en:'',de:''}}],
  ['ThanksTo',{pref:{en:'Thanks to',de:''}, alt:{en:'',de:''}}],
  ['Funder',{loc: 'fnd', pref:{en:'',de:''}, alt:{en:'Funding',de:''}}],
  ['Sponsor',{loc: ['spn','dnr'], pref:{en:'',de:''}, alt:{en:'Sponsoring',de:''}}],
  ['Maintainer',{pref:{en:'Maintainance',de:''}, alt:{en:'',de:''}}],
  ['sdPublisher',{loc: ['ann','mrk'], pref:{en:'Annotator or Markup editor',de:''}, alt:{en:'metadata',de:''}}],
]; // "dst"
const categories = [
  [1000,"CostumeStyling","Costume & Make-Up","",false],
  [2000,"Lighting",false,"",false],
  [3000,"Production",false,"",false],
  [4000,"Camera","Camera","",false],
  [5000,"VisualEffects","Visual Effects","",false],
  [6000,"Sound","Sound","",false],
  [7000,"Actors","Actors","",false],
  [8000,"Directing","Directing","",false],
  [9000,"Art","Art","",false],
  [10000,"Writing","Writing","",false],
  [11000,"Crew","Crew","",false],
  [12000,"Editing","Editing","",false],
  [13000,"Comic","Comic","",false]
]

// job can be [key, locKey, TMDBmapToKey?, altLabel?]
const creativeRoles = [
  {
    "department":"Costume & Make-Up",
    "jobs":[
      "Costume Design",
      "Makeup Artist",
      "Hairstylist",
      "Set Dressing Artist",
      "Set Dressing Supervisor",
      "Set Dressing Manager",
      "Set Dressing Production Assistant",
      "Facial Setup Artist",
      "Hair Setup",
      "Costume Supervisor",
      "Set Costumer",
      "Makeup Department Head",
      "Wigmaker",
      "Shoe Design",
      "Other",
      "Co-Costume Designer",
      "Hair Department Head",
      "Hair Designer",
      "Makeup Designer",
      "Assistant Costume Designer",
      "Prosthetic Supervisor",
      "Seamstress",
      "Key Hair Stylist",
      "Ager/Dyer",
      "Costume Consultant",
      "Costume Coordinator",
      "Costume Illustrator",
      "Hair Supervisor",
      "Key Costumer",
      "Key Makeup Artist",
      "Key Set Costumer",
      "Makeup Effects Designer",
      "Makeup Supervisor",
      "Prosthetic Designer",
      "Prosthetic Makeup Artist",
      "Tailor",
      "Tattoo Designer",
      "Wardrobe Supervisor",
      "Wig Designer",
      "Additional Hairstylist",
      "Additional Wardrobe Assistant",
      "Assistant Hairstylist",
      "Assistant Hairdresser",
      "Assistant Makeup Artist",
      "Contact Lens Designer",
      "Contact Lens Painter",
      "Contact Lens Technician",
      "Costume Assistant",
      "Costume Mistress",
      ["Costume Designer","cst"],
      "Costume Set Supervisor",
      "Costume Standby",
      "Costumer",
      "Daily Makeup & Hair",
      "Daily Wardrobe",
      "Dresser",
      "Extras Dresser",
      "Extras Makeup Artist",
      "First Assistant Hairstylist",
      "First Assistant Makeup Artist",
      "Hair Assistant",
      "Hairdresser",
      "Key Dresser",
      "Key Hairdresser",
      "Lead Costumer",
      "Makeup & Hair",
      "Makeup & Hair Assistant",
      "Makeup Trainee",
      "On Set Dresser",
      "Principal Costumer",
      "Prosthetics",
      "Prosthetics Painter",
      "Prosthetics Sculptor",
      "Special Effects Key Makeup Artist",
      "Special Effects Makeup Artist",
      "Truck Costumer",
      "Truck Supervisor",
      "Wardrobe Assistant",
      "Wardrobe Coordinator",
      "Wardrobe Designer",
      "Wardrobe Intern",
      "Wardrobe Master",
      "Wardrobe Specialized Technician"
    ]
  },
  {
    "department":"Lighting",
    "jobs":[
      "Lighting Technician",
      "Best Boy Electric",
      "Gaffer",
      "Rigging Gaffer",
      "Lighting Supervisor",
      "Lighting Manager",
      ["Directing Lighting Artist","lgd",false,"Lighting designer"],
      "Master Lighting Artist",
      ["Lighting Artist","ilu",false,"Illuminator"],
      "Lighting Coordinator",
      "Lighting Production Assistant",
      "Best Boy Electrician",
      ["Electrician","elg"],
      "Rigging Grip",
      "Other",
      "Chief Lighting Technician",
      "Lighting Director",
      "Rigging Supervisor",
      "Underwater Gaffer",
      "Additional Gaffer",
      "Additional Lighting Technician",
      "Assistant Chief Lighting Technician",
      "Assistant Electrician",
      "Assistant Gaffer",
      "Best Boy Lighting Technician",
      "Daily Electrics",
      "Genetator Operator",
      "Key Rigging Grip",
      "Lighting Design",
      "Lighting Programmer",
      "O.B. Lighting",
      "Standby Rigger"
    ]
  },
  {
    "department":"Production",
    "jobs":[
      ["Production Studio","prn",false,"Production company"],
      ["Producer","pro"],
      "Co-Producer",
      ["Executive Producer","fmp"],
      ["Publicist","pbl"],
      ["Production Designer","prs"],
      ["Casting","cas"],
      ["Production Manager","pmn"],
      "Unit Production Manager",
      "Line Producer",
      "Location Manager",
      ["Other","prd",false,"Production personnel"],
      "Production Supervisor",
      "Production Accountant",
      "Production Office Coordinator",
      "Finance",
      ["Executive Consultant","csl"],
      "Character Technical Supervisor",
      "Development Manager",
      "Administration",
      "Executive In Charge Of Post Production",
      ["Production Director","pdr",false,"Project director"],
      "Executive In Charge Of Production",
      "Associate Producer",
      "Co-Executive Producer",
      "Casting Associate",
      ["Researcher","res"],
      "Production Coordinator",
      "Consulting Producer",
      "Supervising Producer",
      "Senior Executive Consultant",
      "Unit Manager",
      "ADR Voice Casting",
      "Assistant Production Coordinator",
      "Assistant Production Manager",
      "Casting Assistant",
      "Casting Consultant",
      "Coordinating Producer",
      "Local Casting",
      "Script Researcher",
      "Accountant",
      "Accounting Clerk Assistant",
      "Accounting Supervisor",
      "Accounting Trainee",
      "Additional Casting",
      "Additional Production Assistant",
      "Additional Post-Production Supervisor",
      "Art Department Production Assistant",
      "Assistant Accountant",
      "Assistant Extras Casting",
      "Assistant Location Manager",
      "Assistant Unit Manager",
      "Attorney",
      "Background Casting Director",
      "Back-up Set Production Assistant",
      "Back-up Truck Production Assistant",
      "Broadcast Producer",
      "Business Affairs Coordinator",
      "Casting Coordinator",
      "Casting Director",
      "Casting Producer",
      "Casting Researcher",
      "Consulting Accountant",
      "Contract Manager",
      "Controller",
      ["Data Management Technician","dtm"],
      "Delegated Producer",
      "Development Producer",
      "Director of Operations",
      "Executive Assistant",
      "Executive Co-Producer",
      "Executive Producer's Assistant",
      "Extras Casting",
      "Extras Casting Assistant",
      "Extras Casting Coordinator",
      "Feature Finishing Producer",
      "Finishing Producer",
      "First Assistant Accountant",
      "First Assistant Production Coordinator",
      "General Manager",
      "Grip Production Assistant",
      "Head of Production",
      "Head of Programming",
      ["Head of Research","rth",false,"Research team head"],
      "Human Resources",
      "Insert Unit Location Manager",
      "Key Accountant",
      "Key Art Production Assistant",
      "Key Grip Production Assistant",
      "Key Production Assistant",
      "Key Set Production Assistant",
      "Locale Casting Director",
      "Location Assistant",
      "Location Casting",
      "Location Coordinator",
      "Location Production Assistant",
      "Musical Casting",
      "Original Casting",
      "Payroll Accountant",
      "Post Coordinator",
      "Post Producer",
      "Post Production Accountant",
      "Post Production Coordinator",
      "Post Production Producer",
      "Post Production Technical Engineer",
      "Producer's Assistant",
      "Production Assistant",
      ["Production Consultant","csp",false,"Consultant to a project"],
      "Production Driver",
      "Production Executive",
      "Production Runner",
      ["Production Secretary","sec"],
      "Production Trainee",
      ["Research Assistant","rtm"],
      "Second Assistant Accountant",
      "Second Assistant Production Coordinator",
      "Second Assistant Unit Manager",
      "Second Unit Location Manager",
      "Street Casting",
      "Trainee Production Coordinator",
      "Travel Coordinator",
      "Truck Production Assistant",
      "Unit Swing"
    ]
  },
  {
    "department":"Camera",
    "jobs":[
      ["Director of Photography","cng"],
      "Still Photographer",
      "Underwater Camera",
      "Camera Operator",
      "Camera Department Manager",
      "Camera Supervisor",
      "Camera Technician",
      "Other",
      "Grip",
      "Steadicam Operator",
      "Additional Camera",
      "Camera Intern",
      "Additional Photography",
      "Helicopter Camera",
      "First Assistant Camera",
      "Additional Still Photographer",
      "Aerial Camera",
      "Aerial Camera Technician",
      "Aerial Director of Photography",
      "Camera Loader",
      "Dolly Grip",
      "Epk Camera Operator",
      "Key Grip",
      "Russian Arm Operator",
      "Second Unit Director of Photography",
      "Ultimate Arm Operator",
      "Underwater Director of Photography",
      "\"A\" Camera Operator",
      "\"B\" Camera Operator",
      "\"C\" Camera Operator",
      "\"D\" Camera Operator",
      "Additional Director of Photography",
      "Additional First Assistant Camera",
      "Additional Grip",
      "Additional Key Grip",
      "Additional Second Assistant Camera",
      "Additional Set Photographer",
      "Additional Underwater Photography",
      "Assistant Camera",
      "Assistant Grip",
      "Best Boy Grip",
      "BTS Footage",
      "BTS Photographer",
      "BTS Videographer",
      "Camera Car",
      "Camera Department Production Assistant",
      "Camera Production Assistant",
      "Camera Trainee",
      "Camera Truck",
      "Clapper Loader",
      "Data Wrangler",
      "Digital Imaging Technician",
      "Drone Cinematographer",
      "Drone Pilot",
      "Epk Director",
      "Epk Producer",
      "First Assistant \"A\" Camera",
      "First Assistant \"B\" Camera",
      "First Assistant \"C\" Camera",
      "First Assistant \"D\" Camera",
      "First Company Grip",
      "Focus Puller",
      "Head of Layout",
      "Jimmy Jib Operator",
      "Libra Head Technician",
      "Phantom Operator",
      "Red Technician",
      "Second Assistant \"A\" Camera",
      "Second Assistant \"B\" Camera",
      "Second Assistant \"C\" Camera",
      "Second Assistant \"D\" Camera",
      "Second Assistant Camera",
      "Second Company Grip",
      "Set Photographer",
      "Third Assistant \"A\" Camera",
      "Third Assistant \"B\" Camera",
      "Third Assistant \"C\" Camera",
      "Third Assistant \"D\" Camera",
      "Third Assistant Camera",
      "Underwater Epk Photographer",
      "Underwater Stills Photographer",
      "Videojournalist",
      "Video Report"
    ]
  },
  {
    "department":"Visual Effects",
    "jobs":[
      ["Animation","anm"],
      "Visual Effects",
      ["Chief Technician / Stop-Motion Expert","tcd",false,"Technical director"],
      "Creature Design",
      "Shading",
      "Modeling",
      "CG Painter",
      "Visual Development",
      "Animation Manager",
      "Animation Director",
      "Fix Animator",
      "Animation Department Coordinator",
      "Animation Fix Coordinator",
      "Animation Production Assistant",
      "Visual Effects Supervisor",
      "Mechanical & Creature Designer",
      "Battle Motion Coordinator",
      "Animation Supervisor",
      "VFX Supervisor",
      "Cloth Setup",
      "VFX Artist",
      "CG Engineer",
      "24 Frame Playback",
      "Imaging Science",
      "I/O Supervisor",
      "Visual Effects Producer",
      "VFX Production Coordinator",
      "I/O Manager",
      "Additional Effects Development",
      "Color Designer",
      "Simulation & Effects Production Assistant",
      "Simulation & Effects Artist",
      "Pyrotechnic Supervisor",
      "Special Effects Supervisor",
      "3D Supervisor",
      "3D Director",
      "Digital Compositor",
      "Visual Effects Coordinator",
      "VFX Editor",
      "2D Artist",
      "2D Supervisor",
      "3D Animator",
      "3D Artist",
      "3D Coordinator",
      "3D Generalist",
      "3D Modeller",
      "3D Sequence Supervisor",
      "3D Tracking Layout",
      "CG Animator",
      "CGI Director",
      "Character Designer",
      "Character Modelling Supervisor",
      "Creature Technical Director",
      "Digital Effects Producer",
      "Key Animation",
      "Lead Animator",
      "Lead Character Designer",
      "Matchmove Supervisor",
      "Mechanical Designer",
      "Opening/Ending Animation",
      "Pre-Visualization Supervisor",
      "Roto Supervisor",
      "Stereoscopic Coordinator",
      "VFX Director of Photography",
      "VFX Lighting Artist",
      "Visual Effects Designer",
      "Visual Effects Technical Director",
      "2D Sequence Supervisor",
      "Additional Visual Effects",
      "Animation Coordinator",
      "Animation Technical Director",
      "CG Artist",
      "Compositing Artist",
      "Compositing Lead",
      "Compositing Supervisor",
      "Creature Effects Technical Director",
      "Cyber Scanning Supervisor",
      "Digital Film Recording",
      "Director of Previsualization",
      "Effects Supervisor",
      "Generalist",
      "Head of Animation",
      "Layout Supervisor",
      "Lead Creature Designer",
      "Matte Painter",
      "Modelling Supervisor",
      "Pipeline Technical Director",
      "Photo Retouching",
      "Pre-Visualization Coordinator",
      "Rotoscoping Artist",
      "Senior Animator",
      "Senior Generalist",
      "Senior Modeller",
      "Senior Visual Effects Supervisor",
      "Smoke Artist",
      "Stereoscopic Supervisor",
      "Stereoscopic Technical Director",
      "Supervising Animation Director",
      "Visual Effects Assistant Editor",
      "Visual Effects Camera",
      "Visual Effects Compositor",
      "Visual Effects Director",
      "Visual Effects Lineup",
      "Visual Effects Production Assistant",
      "Visual Effects Production Manager"
    ]
  },
  {
    "department":"Music",
    "jobs": [
      ["Music Director","msd",false,"Musical director"],
      ["Musician",["mus","itr"]],
      ["Singer","sng",false,"Musician"],
      "Songs",
      "Music",
      ["Original Music Composer","cmp"],
      "Main Title Theme Composer",
      "Orchestrator",
      "Vocal Coach",
      "Music Supervisor",
      ["Music Arranger","arr"],
      "Music Co-Supervisor",
      "Music Consultant",
      "Music Coordinator",
      "Music Producer",
      "Music Sound Design and Processing",
      "Music Supervision Assistant",
      "Music Programmer",
      "Music Score Producer",
      "Playback Singer",
      "Vocals"
    ]
  },
  {
    "department":"Sound",
    "jobs":[
      "Sound",
      "Sound Engineer",
      "Sound Mixer",
      "Sound Post Supervisor",
      ["Sound Designer","sds"],
      "Sound Editor",
      "Sound Director",
      "Music Editor",
      "Sound Effects Editor",
      "Production Sound Mixer",
      "Additional Soundtrack",
      "Supervising Sound Editor",
      "Supervising Sound Effects Editor",
      "Sound Re-Recording Mixer",
      ["Recording Supervision","rce"],
      "Boom Operator",
      "Sound Montage Associate",
      ["ADR & Dubbing", 'mcp'],
      ["Sound Recordist","rcd"],
      "Foley",
      "Dialogue Editor",
      "Additional Music Supervisor",
      "First Assistant Sound Editor",
      "Scoring Mixer",
      "Dolby Consultant",
      "Other",
      "Additional Sound Re-Recording Mixer",
      "Additional Sound Re-Recordist",
      "ADR Editor",
      "ADR Supervisor",
      "Apprentice Sound Editor",
      "Assistant Music Supervisor",
      "Assistant Sound Editor",
      ["Conductor","cnd"],
      "Foley Editor",
      "Sound Effects",
      "Sound Effects Designer",
      "Supervising ADR Editor",
      "Supervising Dialogue Editor",
      "Supervising Music Editor",
      "Theme Song Performance",
      "Utility Sound",
      "Additional Production Sound Mixer",
      "ADR Editor",
      "ADR Engineer",
      "ADR Coordinator",
      "ADR Mixer",
      "ADR Post Producer",
      "ADR Recording Engineer",
      "ADR Recordist",
      "Assistant Dialogue Editor",
      "Assistant Foley Artist",
      "Assistant Sound Designer",
      "Assistant Sound Engineer",
      "Audio Post Coordinator",
      "Digital Foley Artist",
      "Foley Artist",
      "Foley Mixer",
      "Foley Recording Engineer",
      "Foley Recordist",
      "Foley Supervisor",
      "Joint ADR Mixer",
      "Keyboard Programmer",
      "Location Sound Assistant",
      "Location Sound Mixer",
      "Location Sound Recordist",
      "Loop Group Coordinator",
      "O.B. Sound",
      "Second Assistant Sound",
      "Sound Assistant",
      "Sound Mix Technician",
      "Sound Post Production Coordinator",
      "Sound Re-Recording Assistant",
      "Sound Supervisor",
      "Sound Technical Supervisor"
    ]
  },
  {
    "department":"Actors",
    "jobs":[
      "LeadPerformer",
      "Actor",
      "Stunt Double",
      "Voice",
      "Cameo",
      "Special Guest"
    ]
  },
  {
    "department":"Directing",
    "jobs":[
      ["Director",["drt","fmd"]],
      "Assistant Director",
      "Script Supervisor",
      "Other",
      "Layout",
      "Script Coordinator",
      "Special Guest Director",
      "Co-Director",
      "Continuity",
      "First Assistant Director",
      "Second Assistant Director",
      "Third Assistant Director",
      "Action Director",
      "Additional Second Assistant Director",
      "Additional Third Assistant Director",
      "Assistant Director Trainee",
      "Crowd Assistant Director",
      ["Field Director","fld"],
      "First Assistant Director (Prep)",
      "First Assistant Director Trainee",
      "Insert Unit Director",
      "Insert Unit First Assistant Director",
      "Second Assistant Director Trainee",
      "Second Second Assistant Director",
      "Second Unit Director",
      "Second Unit First Assistant Director",
      "Series Director",
      ["Stage Director","sgd"],
      ["Stage Manager","stm","Stage Director"],
    ]
  },
  {
    "department":"Art",
    "jobs":[
      ["Art Direction","adi"],
      ["Photographer","pht"],
      ["Illustrator","ill"],
      ["Album Artist","cov","Cover designer"],
      "Production Design",
      "Art Direction",
      "Set Decoration",
      ["Set Designer","std"],
      "Conceptual Design",
      "Interior Designer",
      "Settings",
      "Assistant Art Director",
      "Art Department Coordinator",
      "Assistant Property Master",
      "Other",
      "Art Department Manager",
      ["Sculptor","scl"],
      "Art Department Assistant",
      "Background Designer",
      "Co-Art Director",
      "Set Decoration Buyer",
      "Production Illustrator",
      "Standby Painter",
      "Property Master",
      "Location Scout",
      "Supervising Art Director",
      "Leadman",
      "Greensman",
      "Gun Wrangler",
      "Construction Coordinator",
      "Construction Foreman",
      "Lead Painter",
      "Sign Painter",
      "Painter",
      "Assistant Set Dresser",
      "Conceptual Illustrator",
      "Draughtsman",
      "Lead Set Dresser",
      "Prop Designer",
      "Set Decorating Coordinator",
      "Set Dresser",
      "Storyboard Designer",
      "Title Designer",
      "Additional Construction",
      "Additional Construction Grip",
      "Additional Key Construction Grip",
      "Additional Set Dresser",
      "Additional Storyboarding",
      "Art Department Trainee",
      "Art Designer",
      "Art Direction Intern",
      "Assistant Decorator",
      "Assistant Director of Photography",
      "Assistant Production Design",
      "Assistant Set Decoration Buyer",
      "Assistant Set Decoration",
      "Assistant Set Designer",
      "Assistant Set Propsman",
      "Concept Artist",
      "Construction Buyer",
      "Construction Grip",
      "Construction Manager",
      "Creative Director",
      "Daily Grip",
      "Decorator",
      "Digital Storyboarding",
      "Dressing Prop",
      "First Assistant Art Direction",
      "First Assistant Property Master",
      "Graphic Designer",
      "Head Carpenter",
      "Head Decorator",
      "Head Designer",
      "Head Greensman",
      "Helping Hand",
      "Key Carpenter",
      "Key Construction Grip",
      "Key Set Painter",
      "Main Title Designer",
      "On Set Computer Graphics",
      "On Set Key Props",
      "On Set Props",
      "Opening Title Sequence",
      "Original Series Design",
      "Paint Coordinator",
      "Petty Cash Buyer",
      "Property Builder",
      "Property Buyer",
      "Property Graphic Designer",
      "Props",
      "Runner Art Department",
      "Second Assistant Art Director",
      "Set Dressing Buyer",
      "Set Painter",
      "Set Propsman",
      "Set Supervisor",
      "Set Buyer",
      "Shop Electric",
      "Special Props",
      "Standby Art Director",
      "Standby Carpenter",
      "Standby Property Master",
      "Storyboard Artist",
      "Storyboard Assistant",
      "Supervising Carpenter",
      "Swing",
      "Textile Artist",
      "Title Illustration",
      "Web Designer"
    ]
  },
  {
    "department":"Writing",
    "jobs":[
      "Author",
      ["Lyricist","lyr"],
      "Screenplay",
      "Novel",
      "Characters",
      "Theatre Play",
      "Adaptation",
      ["Dialogue","aud"],
      "Writer",
      "Other",
      "Storyboard",
      "Original Story",
      ["Scenario Writer","sce",false,"Scenarist"],
      ["Screenstory","aus",false,"Screenwriter"],
      "Musical",
      "Idea",
      "Story",
      "Creative Producer",
      "Teleplay",
      "Opera",
      "Co-Writer",
      "Book",
      "Comic Book",
      "Short Story",
      "Series Composition",
      ["Script Editor","flm",false,"Film editor"],
      "Script Consultant",
      "Story Editor",
      "Executive Story Editor",
      "Graphic Novel",
      "Head of Story",
      "Junior Story Editor",
      ["Original Concept","ccp"],
      "Original Film Writer",
      "Original Series Creator",
      "Senior Story Editor",
      "Staff Writer",
      "Story Artist",
      "Story Consultant",
      "Story Coordinator",
      "Story Developer",
      "Story Manager",
      "Story Supervisor",
      "Writers' Assistant",
      "Writers' Production"
    ]
  },
  {
    "department":"Crew",
    "jobs":[
      ["Choreographer","chr"],
      ["Translator","trl"],
      "Special Effects",
      ["Post Production Supervisor","ren"],
      "Second Unit",
      "Stunts",
      "Stunt Coordinator",
      "Special Effects Coordinator",
      "Supervising Technical Director",
      "Supervising Animator",
      "Production Artist",
      "Sequence Lead",
      "Second Film Editor",
      "Temp Music Editor",
      "Temp Sound Editor",
      "Sequence Supervisor",
      "Software Team Lead",
      "Software Engineer",
      "Documentation & Support",
      "Machinist",
      "Photoscience Manager",
      "Department Administrator",
      "Schedule Coordinator",
      "Supervisor of Production Resources",
      "Production Office Assistant",
      "Information Systems Manager",
      "Systems Administrators & Support",
      "Projection",
      "Post Production Assistant",
      "Sound Design Assistant",
      "Mix Technician",
      "Motion Actor",
      "Sets & Props Supervisor",
      ["Compositor","cmt"],
      "Tattooist",
      "Sets & Props Artist",
      "Motion Capture Artist",
      "Sequence Artist",
      "Mixing Engineer",
      "Special Sound Effects",
      "Post-Production Manager",
      "Dialect Coach",
      "Picture Car Coordinator",
      "Cableman",
      "Set Production Assistant",
      "Video Assist Operator",
      "Unit Publicist",
      "Set Medic",
      "Stand In",
      "Transportation Coordinator",
      "Transportation Captain",
      "Post Production Consulting",
      "Production Intern",
      "Utility Stunts",
      "Actor's Assistant",
      "Set Production Intern",
      "Production Controller",
      "Studio Teacher",
      "Chef",
      "Craft Service",
      "Scenic Artist",
      "Propmaker",
      "Prop Maker",
      "Transportation Co-Captain",
      "Driver",
      "Security",
      "Second Unit Cinematographer",
      "Loader",
      "Manager of Operations",
      "Quality Control Supervisor",
      "Legal Services",
      "Public Relations",
      "Score Engineer",
      "Title Graphics",
      "Telecine Colorist",
      "Animatronic and Prosthetic Effects",
      "Martial Arts Choreographer",
      "Cinematography",
      "Steadycam",
      "Executive Visual Effects Producer",
      "Visual Effects Design Consultant",
      "Digital Effects Supervisor",
      "Digital Producer",
      "CG Supervisor",
      "Visual Effects Art Director",
      "Visual Effects Editor",
      "Executive in Charge of Finance",
      "Associate Choreographer",
      "Makeup Effects",
      "Treatment",
      "Dramaturgy",
      "Lighting Camera",
      "Technical Supervisor",
      "CGI Supervisor",
      "Creative Consultant",
      "Script",
      "Executive Music Producer",
      "Commissioning Editor",
      ["Additional Writing","wam"],
      "Additional Music",
      ["Writer of added lyrics","wal","Additional Music"],
      "Poem",
      "Thanks",
      ["Creator","cre"],
      "Additional Dialogue",
      "Video Game",
      "Graphic Novel Illustrator",
      "Other",
      "Series Writer",
      "Radio Play",
      "Armorer",
      "Carpenter",
      "Editorial Staff",
      "Aerial Coordinator",
      "Animal Coordinator",
      "Animal Wrangler",
      "Animatronics Designer",
      "Drone Operator",
      "In Memory Of",
      "Pilot",
      ["Moderator","mod","Presenter"]
      ["Onscreen presenter","osp","Presenter"],
      ["Presenter","pre"],
      "Animatronics Supervisor",
      "Armory Coordinator",
      "Digital Effects Producer",
      "Fight Choreographer",
      "Marine Coordinator",
      "Pyrotechnician",
      "Techno Crane Operator",
      "Acting Double",
      "Additional Script Supervisor",
      "Administrative Assistant",
      "Assistant Chef",
      "Assistant Craft Service",
      "Assistant Picture Car Coordinator",
      "Assistant Script",
      "Assistant Vehicles Coordinator",
      "Base Camp Operator",
      "Captain Driver",
      "Cast Driver",
      "Catering",
      "Catering Head Chef",
      "Chaperone",
      "Chaperone Tutor",
      "Charge Scenic Artist",
      "Child Wrangler",
      "Clearances Coordinator",
      "Clearances Consultant",
      "Dialogue Coach",
      "Digital Supervisor",
      "Director of Communications",
      "File Footage",
      "Film Processor",
      "Floor Runner",
      "Generator Operator",
      "Head Driver",
      "Health and Safety",
      "Interactive Manager",
      "Intern",
      "Key Scenic Artist",
      "Key Special Effects",
      "Logistics Coordinator",
      "Marine Pilot",
      "Master at Arms",
      "Medical Consultant",
      "Military Consultant",
      "Playback Coordinator",
      "Police Consultant",
      "Post Production Scripts",
      "Receptionist",
      ["Scientific Consultant","sad"],
      "Security Coordinator",
      "Series Publicist",
      "Set Runner",
      "Special Effects Assistant",
      "Special Effects Best Boy",
      "Special Effects Manager",
      "Special Effects Technician",
      "Specialized Driver",
      "Sponsorship Coordinator",
      "Sponsorship Director",
      "Stunt Double",
      "Stunt Driver",
      "Supervising Armorer",
      "Technical Advisor",
      "Transcriptions",
      "Unit Medic",
      "Vehicles Coordinator",
      "Vehicles Wrangler",
      "Weapons Master",
      "Weapons Wrangler"
    ]
  },
  {
    "department":"Editing",
    "jobs":[
      ["Editor","edt"],
      ["Colorist","clr"],
      "Supervising Film Editor",
      "Additional Editing",
      ["Editorial Manager","edm"],
      "First Assistant Editor",
      "Additional Editorial Assistant",
      "Editorial Coordinator",
      "Editorial Production Assistant",
      "Editorial Services",
      "Archival Footage Coordinator",
      "Archival Footage Research",
      "Color Timer",
      "Digital Intermediate",
      "Other",
      "Assistant Editor",
      "Associate Editor",
      "Co-Editor",
      "Negative Cutter",
      "3D Digital Colorist",
      "3D Editor",
      "Additional Colorist",
      "Additional Editor",
      "Assistant Picture Editor",
      "Atmos Editor",
      "Color Assistant",
      "Color Grading",
      "Consulting Editor",
      "Dailies Manager",
      "Dailies Operator",
      "Dailies Technician",
      "Digital Color Timer",
      "Digital Colorist",
      "Digital Conform Editor",
      "Digital Intermediate Assistant",
      "Digital Intermediate Colorist",
      "Digital Intermediate Data Wrangler",
      "Digital Intermediate Editor",
      "Digital Intermediate Producer",
      "Editorial Consultant",
      "EPK Editor",
      "First Assistant Picture Editor",
      "Lead Editor",
      "Online Editor",
      "Project Manager",
      "Senior Colorist",
      "Senior Digital Intermediate Colorist",
      "Stereoscopic Editor",
      "Supervising Editor"
    ]
  },
  {
    "department":"Comic",
    "jobs":[
      "Colorist",
      "Inker",
      "Letterer",
      "Penciler"
    ]
  }
];

const locRoles = [
  // TODO
  // ["stg","Setting"], ["ant","Bibliographic antecedent"],
  // ["mdc","Metadata contact"],["rcp","Addressee"],["att","Attributed name"],

  {
    "department":"#",
    "jobs":[
      ["prv","Provider"],["cli","Client"],["med","Medium"],["dpt","Depositor"],
      ["dto","Dedicator"],["len","Lender"],["inv","Inventor"],["pth","Patent holder"],
      ["brd","Broadcaster"],["hst","Host"],["his","Host institution"],["sht","Supporting host"],
      ["cur","Curator"],["ard","Artistic director"],["sll","Seller"],["bsl","Bookseller"],
      ["fmk","Filmmaker"],["ivr","Interviewer"],["ppt","Puppeteer"],
      ["dsr","Designer"],["lso","Licensor"],["exp","Expert"],["col","Collector"],
      ["pat","Patron"],["pan","Panelist"],
      ["tch","Teacher"],["dgs","Degree supervisor"],["ctr","Contractor"]
    ]
  }, {
    "department":"Directing",
    "jobs":[["tld","Television director"],["rdd","Radio director"],["pbd","Publishing director"]]
  }, {
    "department":"Production",
    "jobs":[
      ["tlp","Television producer"],["rpc","Radio producer"],["bkp","Book producer"],
      ["ldr","Laboratory director"],["lbr","Laboratory"],["mtk","Minute taker"],["eng","Engineer"]
    ]
  }, {
    "department":"Writing",
    "jobs":[
      ["aui","Author of introduction, etc."],["aft","Author of afterword, colophon, etc."],
      ["win","Writer of introduction"],["wpr","Writer of preface"],["wat","Writer of added text"],
      ["wst","Writer of supplementary textual content"],["wac","Writer of added commentary"],
      ["stl","Storyteller"],["nrt","Narrator"],["ths","Thesis advisor"],["pfr","Proofreader"],
      ["cwt","Commentator for written text"],["aqt","Author in quotations or text abstracts"],
      ["ato","Autographer"],["cmm","Commentator"],["fac","Facsimilist"],["blw","Blurb writer"],
      ["anl","Analyst"],["trc","Transcriber"],["scr","Scribe"]

    ]
  }, {
    "department":"Editing",
    "jobs":[
      ["edc","Editor of compilation"],["red","Redaktor"],
      ["gis","Geographic information specialist"],["ctg","Cartographer"],["ins","Inscriber"],
      ["rev","Reviewer"],["abr","Abridger"],["rbr","Rubricator"],["crr","Corrector"]
    ]
  }, {
    "department":"Art",
    "jobs":[
      ["tyd","Type designer"],["tyg","Typographer"],["cll","Calligrapher"],["str","Stereotyper"],
      ["bkd","Book designer"],["bjd","Bookjacket designer"],["bdd","Binding designer"],
      ["drm","Draftsman"],["etr","Etcher"],["rsg","Restager"],["con","Conservator"],
      ["acp","Art copyist"]
    ]
  }, {
    "department":"Reporting",
    "jobs":[
      ["rpt","Reporter"],["crt","Court reporter"],["crp","Correspondent"],["wit","Witness"],
      ["ive","Interviewee"],["vdg","Videographer"],["pht","Photojournalist"]
    ]
  }, {
    "department":"Manufacturing", /*Herstellung*/
    "jobs":[
      ["bpd","Bookplate designer"],["egr","Engraver"],["ltg","Lithographer"],["clt","Collotyper"],
      ["elt","Electrotyper"],["prt","Printer"],["prm","Printmaker"],["bnd","Binder"],
      ["brl","Braille embosser"],["mfr","Manufacturer"],["wde","Wood engraver"],
      ["mte","Metal-engraver"],["ppm","Papermaker"],["wdc","Woodcutter"],
      ["pop","Printer of plates"],["plt","Platemaker"],["mrb","Marbler"]
    ]
  }, {
    "department":"Crew",
    "jobs":[
      ["prg","Programmer"],["com","Compiler"],["arc","Architect"],
      ["lsa","Landscape architect"]
    ]
  }, {
    "department":"Music",
    "jobs":[["dnc","Dancer"],["lbt","Librettist"]]
  }, {
    "department":"Legal",
    "jobs":[
      ["stn","Standards body"],["isb","Issuing body"],
      ["orm","Organizer"],["dtc","Data contributor"],["rps","Repository"],["asn","Associated name"],
      ["dis","Dissertant"],["cor","Collection registrar"],["app","Applicant"],["lil","Libelant"],
      ["rse","Respondent-appellee"],["ptf","Plaintiff"],["ape","Appellee"],["hnr","Honoree"],
      ["cpt","Complainant-appellant"],["adp","Adapter"],["org","Originator"],["prc","Process contact"],
      ["cos","Contestant"],["dln","Delineator"],["lel","Libelee"],["enj","Enacting jurisdiction"],
      ["lse","Licensee"],["lee","Libelee-appellee"],["cts","Contestee"],
      ["cns","Censor"],["srv","Surveyor"],["auc","Auctioneer"],["sgn","Signer"],["ctt","Contestee-appellant"],
      ["jud","Judge"],["led","Lead"],["dfe","Defendant-appellee"],["lit","Libelant-appellant"],["cou","Court governed"],
      ["coe","Contestant-appellee"],["dgg","Degree granting institution"],["dte","Dedicatee"],["pra","Praeses"],
      ["jug","Jurisdiction governed"],["cte","Contestee-appellee"],["opn","Opponent"],["pma","Permitting agency"],
      ["pta","Patent applicant"],["fpy","First party"],["spy","Second party"],["rsp","Respondent"],["apl","Appellant"],
      ["rst","Respondent-appellant"],["let","Libelee-appellant"],["ptt","Plaintiff-appellant"],["dft","Defendant-appellant"],
      ["lie","Libelant-appellee"],["cot","Contestant-appellant"],["cpl","Complainant"],["asg","Assignee"],
      ["pte","Plaintiff-appellee"],["cpe","Complainant-appellee"],["dfd","Defendant"],["dub","Dubious author"],
      ["rsr","Restorationist"],["frg","Forger"]
    ]
  }
];

/*
---
TMDB categories
["Costume & Make-Up","Lighting","Production","Camera","Visual Effects","Sound","Actors","Directing","Art","Writing","Crew","Editing"]

+ Character Mapping
+ Musical Instruments Mapping

EBML
[
  "Artist"
  COPYRIGHT
  "LeadPerformer","Actor",
  "Director","AssistantDirector",
  "DirectorOfPhotography",
  "ArtDirector" --> "Art Direction"
  "Composer", --> "Original Music Composer", "MasteredBy" --> "Sound Post Supervisor", "Arranger" --> "Music Arranger",  "Sound Engineer", "Conductor", "MixedBy", "Accompaniment" --> "Music",
  "ScreenplayBy", --> "Screenplay", "WrittenBy" --> "Author",   "Lyricist",
  "ProductionStudio","Producer","CoProducer" --> "Co-Producer","ExecutiveProducer","Publisher" --> "Publicist","ProductionDesigner",
  "EditedBy" --> "Editor",
  "Choreographer"
  "CostumeDesigner" --> "Costume Design",
]
MP4
'©ART' [Artist]
'cprt' [Copyright]
'©wrt' --> "Original Music Composer"
'aART' [AlbumArtist]
'xid' [Owner]


https://schema.org/CreativeWork
  accountablePerson
  Specifies the Person that is legally accountable for the CreativeWork.
  -author
  The author of this content.
  character
  Fictional person connected with a creative work.
  -contributor
  A secondary contributor to the CreativeWork or Event.
  -copyrightHolder --> Copyright
  The party holding the legal copyright to the CreativeWork.
  -editor
  Specifies the Person who edited the CreativeWork.
  funder
  A person or organization that supports (sponsors) something through some kind of financial contribution.
  sponsor
  A person or organization that supports a thing through a pledge, promise, or financial contribution.
  maintainer
  A maintainer is a Person or Organization that manages contributions to, and/or publication of, some (typically complex) artifact.
  -producer
  The person or organization who produced the work (e.g. music album, movie, tv/radio series etc.).
  -provider --> DistributedBy
  The service provider, service operator, or service performer; the goods producer.
  Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller.
  -publisher --> "Publicist"
  The publisher of the creative work.
  sdPublisher
  Indicates the party responsible for generating and publishing the current structured data markup.
  -translator
  Organization or person who adapts a creative work to different languages.


https://schema.org/VisualArtwork
https://schema.org/ComicStory
  -artist
  The primary artist for a work in a medium other than pencils or digital line art--for example, if the primary artwork is done in watercolors or digital paints.
  -colorist
  The individual who adds color to inked drawings.
  -inker
  The individual who traces over the pencil drawings in ink after pencils are complete.
  -letterer
  The individual who adds lettering, including speech balloons and sound effects, to artwork.
  -penciler
  The individual who draws the primary narrative artwork.

https://schema.org/MusicComposition
  -composer --> "Original Music Composer"
  The person or organization who wrote a composition, or who is the composer of a work performed at some event.
  -lyricist
  The person who wrote the words.

https://schema.org/Book
  -illustrator
  The illustrator of the book.

https://schema.org/Clip
https://schema.org/Movie
  -director
  A director of e.g. tv, radio, movie, video gaming etc. content, or of an event.
  -musicBy --> "Original Music Composer"
  The composer of the soundtrack.
https://schema.org/Movie
https://schema.org/Episode
  -actor
  An actor, e.g. in tv, radio, movie, video games etc., or in an event.
  -productionCompany --> "ProductionStudio"
  The production company or studio responsible for the item e.g. series, video game, episode etc.


*/
