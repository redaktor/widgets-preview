// https://jsfiddle.net/zLycnos2/5/
// https://jsfiddle.net/pkg0v9uq/
const tests = `Ärger,Ärztin,Abend,Abfahrt,Abflug,Absender,Adresse,Alkohol,Alter,Ampel,Anfang,
Angebot,Angestellte,Angst,Ankunft,Anmeldung,Anrede,Anruf,Anrufbeantworter,
Ansage,Anschluss,Antwort,Anzeige,Anzug,Apfel,Apotheke,Appartement,Appetit,
Arbeit,Arbeitsplatz,Arm,Arzt,Aufenthalt,Aufgabe,Aufzug,Auge,August,Ausbildung,
Ausflug,Ausgang,Auskunft,Ausländer,Ausländerin,Ausland,Aussage,Ausstellung,
Ausweis,Auto,Autobahn,Automat,Bäckerei,Büro,Baby,Bad,Bahn,Bahnhof,Bahnsteig,
Balkon,Banane,Bank,Batterie,Baum,Beamte,Beamtin,Bein,Beispiel,Bekannte,Benzin,
Beratung,Berg,Beruf,Berufsschule,Besuch,Betrag,Bett,Bewerbung,Bier,Bild,Bildschirm,
Birne,Bitte,Blatt,Bleistift,Blick,Blume,Bluse,Blut,Bogen,Bohne,Brötchen,Brücke,Brief,
Briefkasten,Briefmarke,Brieftasche,Briefumschlag,Brille,Brot,Bruder,Buch,Buchstabe,
Bus,Butter,Café,CD,CD-ROM,Chef,Computer,Creme,Dach,Dame,Dank,Datum,Dauer,Deutsche,
Dezember,Dienstag,Ding,Disco,Doktor,Dom,Donnerstag,Doppelzimmer,Dorf,Drucker,Durchsage,
Durst,Dusche,E-Mail,Ecke,Ehefrau,Ehemann,Ei,Einführung,Eingang,Einladung,Eintritt,Einwohner,
Einzelzimmer,Eis,Eltern,Empfänger,Empfang,Ende,Enkel,Entschuldigung,Erdgeschoss,Erfahrung,
Ergebnis,Erlaubnis,Ermäßigung,Erwachsene,Essen,Export,Fähre,Führerschein,Führung,Fabrik,
Fahrer,Fahrkarte,Fahrplan,Fahrrad,Familie,Familienname,Familienstand,Farbe,Fax,Februar,
Fehler,Fenster,Ferien,Fernsehgerät,Fest,Feuer,Feuerwehr,Feuerzeug,Fieber,Film,Firma,Fisch,
Flasche,Fleisch,Flughafen,Flugzeug,Flur,Fluss,Formular,Foto,Fotoapparat,Frühjahr,Frühling,
Frühstück,Frage,Frau,Freitag,Freizeit,Freund,Freundin,Friseur,Frist,Fuß,Fußball,Fundbüro,
Gabel,Garage,Garten,Gas,Gast,Gebühr,Geburtsjahr,Geburtsort,Geburtstag,Gegenteil,Geld,
Geldbörse,Gemüse,Gepäck,Gericht,Gesamtschule,Geschäft,Geschenk,Geschirr,Geschwister,Gesicht,
Gespräch,Gesundheit,Getränk,Gewicht,Gewitter,Glück,Glückwunsch,Glas,Gleis,Goethe-Institut,Größe,
Grenze,Grippe,Großeltern,Großmutter,Großvater,Gruß,Grundschule,Gruppe,Guthaben,Gymnasium,
Hähnchen,Haar,Halbpension,Halle,Hals,Haltestelle,Hand,Handtuch,Handy,Haus,Hausaufgabe,Hausfrau,
Haushalt,Hausmann,Heimat,Heizung,Hemd,Herbst,Herd,Herr,Herz,Hilfe,Hobby,Holz,Hose,Hund,Hunger,
Idee,Import,Industrie,Information,Inhalt,Internet,Jacke,Jahr,Januar,Job,Jugendherberge,
Jugendliche,Juli,Junge,Juni,Käse,Körper,Küche,Kühlschrank,Kündigung,Kaffee,Kalender,Kamera,
Kanne,Karte,Kartoffel,Kasse,Kassette,Kassettenrecorder,Katze,Keller,Kellner,Kenntnisse,
Kennzeichen,Kette,Kfz,Kind,Kindergarten,Kinderwagen,Kino,Kiosk,Kirche,Klasse,Kleid,Kleidung,
Kneipe,Koffer,Kollege,Kollegin,Konsulat,Kontakt,Konto,Kontrolle,Konzert,Kopf,Kosmetik,
Krankenkasse,Krankheit,Kredit,Kreditkarte,Kreis,Kreuzung,Kuchen,Kugelschreiber,Kunde,Kundin,
Kurs,Löffel,Lösung,Laden,Lager,Lampe,Land,Landschaft,Leben,Lebensmittel,Leid,Lehre,Lehrer,Lehrerin,
Leute,Licht,Lied,Lkw,Loch,Lohn,Lokal,Luft,Lust,Mädchen,März,Möbel,Müll,Mülltonne,Magen,Mai,Mal,
Mann,Mantel,Markt,Maschine,Material,Mechaniker,Medikament,Meer,Mehrwertsteuer,Meinung,Menge,Mensch,
Messer,Metall,Miete,Milch,Minute,Mittag,Mitte,Mitteilung,Mittel,Mittelschule,Mittwoch,Mode,Moment,
Monat,Montag,Morgen,Motor,Mund,Museum,Musik,Mutter,Nähe,Nachbar,Nachbarin,Nachmittag,Nachrichten,
Nacht,Name,Natur,Nebel,Norden,Notarzt,Note,Notfall,Notiz,November,Nudel,Nummer,Ober,Obst,Oktober,
Oma,Opa,Operation,Orange,Ordnung,Ort,Osten,Öl,Päckchen,Paket,Panne,Papier,Papiere,Parfüm,Park,
Partei,Partner,Partnerin,Party,Pass,Pause,Pension,Pkw,Plan,Plastik,Platz,Polizei,Pommes frites,
Portion,Post,Postleitzahl,Prüfung,Praktikum,Praxis,Preis,Problem,Das Produkt,Programm,Prospekt,
Pullover,Qualität,Quittung,Rücken,Rabatt,Radio,Rathaus,Raucher,Raucherin,Raum,Realschule,Rechnung,
Regen,Reifen,Reinigung,Reis,Reise,Reisebüro,Reiseführer,Reparatur,Restaurant,Rezept,Rezeption,Rind,
Rock,Rose,Rundgang,Süden,S-Bahn,Sache,Saft,Salat,Salz,Samstag,Sonnabend,Satz,Schüler,Schülerin,Schalter,
Scheckkarte,Schiff,Schild,Schinken,Schirm,Schlüssel,Schloss,Schluss,Schmerzen,Schnee,Schnupfen,
Schokolade,Schrank,Schuh,Schule,Schwein,Schwester,Schwimmbad,See,Sehenswürdigkeit,Seife,Sekretärin,
Sekunde,Sendung,Senioren,September,Service,Sessel,Sofa,Sohn,Sommer,Sonderangebot,Sonne,Sonntag,Sorge,
Spülmaschine,Spaß,Spaziergang,Speisekarte,Spielplatz,Sprache,Sprachschule,Sprechstunde,Stück,Stadt,
Standesamt,Stempel,Steuer,Stock,Stoff,Straße,Straßenbahn,Strand,Streichholz,Strom,Student,Studentin,
Studium,Stuhl,Stunde,Supermarkt,Suppe,Tür,Tüte,Tag,Tankstelle,Tasche,Tasse,Taxi,Der Tee,Teil,Telefon,
Telefonbuch,Teller,Teppich,Termin,Test,Text,Theater,Thema,Ticket,Tier,Tipp,Tisch,Tochter,Toilette,
Tomate,Topf,Tourist,Treppe,Trinkgeld,Turm,U-Bahn,Uhr,Unfall,Universität,Unterhaltung,Unterkunft,
Unterricht,Unterschied,Unterschrift,Untersuchung,Urlaub,Übernachtung,Vater,Verbindung,Verein,
Verkäufer,Verkäuferin,Verkehr,Vermieter,Versicherung,Verspätung,Vertrag,Video,Vogel,Volksschule,
Vormittag,Vorname,Vorsicht,Vorwahl,Wäsche,Wagen,Wald,Wasser,Weg,Wein,Welt,Werkstatt,Werkzeug,Westen,
Wetter,Wiederhören,Wiedersehen,Wind,Winter,Wirtschaft,Woche,Wochenende,Wochentag,Wohnung,Wolke,Wort,
Wunsch,Wurst,Zahl,Zahn,Zeit,Zeitschrift,Zeitung,Zentrum,Zettel,Zeugnis,Zigarette,Zimmer,Zitrone,
Zoll,Zucker,Zug`.replace(/\n/g,'').split(',');




// f m n pl
// SUB GEN DAT AKK
const expand = (s) => s.replace(/\n/g,'').split(',');
const de = {
	article: {
  	DET: {
      a: ['die/der','der/des','der/dem','die/den'],
    	f: ['die','der','der','die'],
      m: ['der','des','dem','den'],
      n: ['das','des','dem','das'],
      pl:['die','der','den','die']
    },
    UND: {
      a: ['1','1','1','1'],
      f: ['eine','einer','einer','eine'],
      m: ['ein','eines','einem','einen'],
      n: ['ein','eines','einem','ein'],
      pl:['einige','einiger','einigen','einige']
    }
  },
  noun: {
    plural: {
      irregular: {
        bus:'Busse', visum:'Visa', atlas:'Atlanten', embryo:'Embryonen',
        globus:'Globen', kaktus:'Kakteen', komma:'Kommas', lexikon:'Lexika',
        luftballon:'Ballons', ballon:'Ballons', monitor:'Monitore', museum:'Museen',
        pizza:'Pizzen', radius:'Radien', rhythmus:'Rhythmen', studie:'Studien',
        tunnel:'Tunnel', verhalten:'Verhaltensweisen', virus:'Viren', zirkus:'Zirkusse'
      },
      only: ['alimente','einkünfte','eltern','ferien','gebrüder','geschwister',
      'kosten','lebensmittel','leute', 'chaos'],
      inflections: `aal|äle,aat|=en,abe|=n,ach|ächer,ade|=n,age|=n,ahn|
=en,ahr|=e,akt|=e,ale|=n,ame|=n,amt|ämter,ane|=n,ang|änge,ank|änke,ann|änner,ant|
=en,aph|=en,are|=n,arn|=e,ase|=n,ate|=n,att|ätter,atz|ätze,aum|äume,aus|äuser,bad|
bäder,bel|=,ben|=,ber|=,bot|=e,che|=n,chs|=e,cke|=n,del|=,den|=,der|=,ebe|=,ede|
=n,ehl|=e,ehr|=,eil|=e,eim|=e,eis|=e,eit|=en,ekt|=e,eld|=er,ell|=e,ene|=n,enz|=en,erd|
=e,ere|=n,erk|=e,ern|=e,ert|=e,ese|=n,ess|=e,est|=e,etz|=e,eug|=e,eur|=e,fel|=,fen|
=,fer|=,ffe|=n,gel|=,gen|=,ger|=,gie|=,hen|=,her|=,hie|=n,hle|=n,hme|=n,hne|=n,hof|
höfe,hre|=n,hrt|=en,hse|=n,hte|=n,ich|=e,ick|=e,ide|=n,ieb|=e,ief|=e,ieg|=e,iel|
=e,ien|ium,iet|=e,ife|=n,iff|=e,ift|=en,ige|=n,ika|ikum,ild|=er,ilm|=e,ine|=n,ing|
=e,ion|=en,ise|=n,iss|=e,ist|=en,ite|=n,itt|=e,itz|=e,ium|=,kel|=,ken|=,ker|=,lag|
läge,lan|läne,lar|=e,lei|=en,len|=,ler|=,lge|=n,lie|=n,lle|=n,mel|=,mer|=,mme|=n,mpe|
=n,mpf|=e,mus|=,mut|=,nat|=e,nde|=n,nen|=,ner|=,nge|=n,nie|=n,nis|=se,nke|=n,nkt|
=e,nne|=n,nst|=e,nte|=n,nze|=n,ock|öcke,ode|=n,off|=e,oge|=n,ohn|öhne,ohr|=e,olz|
ölzer,one|=n,oot|=e,opf|öpfe,ord|=e,orm|=en,orn|örner,ose|=n,ote|=n,pel|=,pen|=,per|
=,pie|=n,ppe|=n,rag|räge,ra|=ün,rbe|=n,rde|=n,rei|=en,rer|=,rie|=n,rin|=nen,rke|=n,rot|
=e,rre|=n,rte|=n,ruf|=e,rzt|=e,sel|=,sen|=,ser|=,sie|=n,sik|=,sse|=n,ste|=n,tag|=e,tel|
=,ten|=,ter|=,tie|=n,tin|=nen,tiv|=e,tor|=en,tte|=n,tum|=,tur|=en,tze|=n,ube|=n,ude|
=n,ufe|=n,uge|=n,uhr|=en,ule|=n,ume|=n,ung|=en,use|=n,uss|üsse,ute|=n,utz|=,ver|=,weg|
=e,zer|=,zug|züge,ück|=e`.replace('\n','').split(',').map((s) => {
        const a = s.split('|');
        return [a[0], a[1].replace('=',a[0])]
      }),

    }
  },

  adjective: {
    fixed: expand(`abrupt,absolut,absurd,adrett,adäquat,akkurat,akut,ärger,äussere,
delikat,desolat,devot,disparat,dröge,eigen,fett,flott,flügge,farbig,geheim,generös,
genuin,gerade,geraum,gering,geschienen,geschlafen,geschwind,gespien,gesund,gekäut,
gesät,gewiss,geworden,glatt,greise,gut,hager,kaputt,kokett,komplett,korrupt,laut,
leger,leise,matt,narbig,nett,träge,obligat,platt,privat,probat,rabiat,resolut,satt,
spät,suggestiv,tot,tuend,ungefähr,ungelenk,ungestüm,verabscheuend,live,nature,single,
irre,lose,nahe,rege,rose,vage,zage,bange,colle,dufte,krude,obere,taupe,trübe,cerise,
knorke,knülle,milde,rapide,rigide,sachte,spröde,timide,indigen,moderat,separat,
beige,mauve,orange,rot,violett`),
    endings: expand(`öd,all,alt,arg,arm,bar,big,bös,dig,eng,fix,gar,gig,ihr,irr,jäh,
lau,lax,lig,los,mig,nah,neu,nig,pur,rar,rau,reg,rig,roh,sig,sät,tig,vag,zig,zäh,ßte,
aart,abel,aben,abil,acht,ackt,aden,adet,adox,aesk,agil,ahlt,ahrt,alog,alzt,alös,ammt,
amor,amos,anal,anch,andt,anft,ankt,annt,ante,apid,arft,arid,arin,armt,arrt,asch,asiv,
atal,aten,atet,ativ,atös,aubt,auft,ault,aust,azil,bang,bart,bend,bent,bern,bial,bigt,
bios,blik,bost,brav,brid,bsam,bsch,bste,btil,bunt,bust,böig,chal,chen,cheu,chic,chig,
chön,cken,ckig,dant,deal,delt,dend,dent,derb,dere,dern,dert,dial,dick,digt,dios,diär,
diös,doof,dsam,dste,dual,dumm,dünn,dürr,eben,ebil,ebte,echt,eckt,edel,eden,eeig,eell,
eelt,egal,egan,egre,ehen,ehnt,ehrt,eibt,eich,eide,eift,eigt,eiig,eilt,eint,eise,eiss,
eist,eite,ekär,elbe,elch,elft,ellt,elnd,emmt,enal,enil,enzt,enös,eral,eren,eril,erkt,
ernd,erne,ernt,errt,erzt,erän,esch,esen,este,etal,eten,etzt,etär,eugt,euig,eunt,eust,
ewig,exiv,fach,fade,fahl,falb,faul,feig,feil,fekt,fend,fern,fest,ffen,ffig,ffus,fies,
fios,fiös,fnet,form,frei,früh,fste,ftet,fugt,fund,gabt,gant,ganz,geil,gelb,gial,gige,
giös,gral,gran,grob,grün,gsam,gste,gual,haft,halb,harf,hart,heel,heil,hell,helt,hend,
herb,here,hern,hert,hest,hial,hick,hief,hier,hlen,hmal,hnte,hohe,hohl,hold,holt,hren,
hrom,hron,hräg,hsam,hsen,hste,hten,htet,huht,hwul,hwül,hämt,höht,hört,iant,ibel,iche,
icht,ickt,idal,idar,idel,iden,idet,iebt,iech,iegt,iell,ielt,iend,ient,iern,iert,ifig,
igid,ihig,ikal,ikel,ikos,ilbt,ilmt,imal,immt,imär,inal,ingt,inin,init,inke,inär,inös,
ipel,ippt,iral,irmt,irrt,isch,isit,ital,itel,itet,itim,itiv,itzt,itär,ivil,ivol,izil,
izit,jede,jene,jung,kahl,kant,keck,kelt,kend,kert,kess,klar,klug,kral,kret,krud,ksam,
kste,ktal,ktiv,kult,kurz,kühl,kühn,lach,laff,lagt,lahm,lamm,lang,lank,lant,lapp,lass,
last,laue,lden,ldet,ldne,lear,lebt,leer,legt,lend,lent,lere,lern,lert,lfen,lfig,lgär,
lich,lide,lieb,ligt,limm,lind,link,lixt,liär,lkig,llel,llen,llin,lond,lopp,loss,lpin,
lsam,lsch,lsiv,lste,ltan,lten,lump,lzen,lümt,mant,mart,mdet,mell,melt,mend,mens,ment,
mert,mies,mild,mint,mmen,mmun,mpel,mpft,mpig,mpös,mste,mten,mtet,müde,naiv,nale,nant,
napp,nass,nden,ndet,ndre,ndän,ndär,near,nehm,neit,nell,nend,nent,nere,nern,nfam,nfus,
nial,nige,nigt,niös,nkav,nkel,nken,nkig,nnen,nobt,noid,norm,nsam,nsch,nsiv,nsre,nste,
ntal,ntan,ntar,nten,ntet,ntik,ntil,ntim,ntiv,ntär,ntös,nvex,nzen,näht,nügt,nütz,obal,
obel,oben,obil,ockt,odox,ofan,offt,ogam,ogen,ohnt,ohrt,okal,olar,olch,olet,olgt,olid,
oliv,omal,oman,omar,ompt,onal,onom,onor,onym,onär,oral,oren,orgt,oros,orph,orär,orös,
osiv,oten,oton,otyp,oval,oyal,pakt,pant,part,pekt,pelt,pfig,phal,phil,phob,phon,pial,
pitz,plex,polt,ppig,prok,ptiv,purn,pönt,quem,quid,raff,raft,ragt,rakt,ramm,rank,rant,
rass,raun,raus,rbal,rban,rben,real,rech,redt,reht,reif,reit,rekt,rell,remd,rend,rent,
resk,rfen,rfid,rfig,rial,rien,rige,rikt,rill,rios,rist,ritt,riös,rkis,rloh,rmal,robt,
rock,rode,roff,roht,romm,romt,ross,rran,rren,rril,rsal,rsam,rsch,rsiv,rste,rtet,rtiv,
rtun,rtär,rumm,rund,rvig,rvil,rvös,rüde,rüht,rüsk,sagt,samt,sant,scht,sell,selt,send,
sent,serm,sern,sial,sigt,skur,ssal,ssen,ssil,ssiv,sste,stel,sten,stet,stre,stum,stur,
sual,sziv,szön,süss,tagt,takt,tant,tark,tarr,taub,teif,teil,tell,telt,tend,tent,tere,
tern,tert,tete,thon,thum,tial,tief,tigt,till,tiär,tiös,toll,tolz,tont,tral,trem,treu,
trus,träg,trär,trös,trüb,tsam,tsch,tste,tten,tual,tumm,tuos,tzte,tört,ucht,uckt,udal,
uell,uent,uere,uert,ufen,ufig,ugal,uhig,ular,ulin,ulär,ulös,uman,umid,umpf,umpt,unal,
unkt,upid,ural,urös,usal,usam,usch,usiv,uste,utal,utet,utiv,utzt,vant,vent,vers,vert,
vial,viel,voll,vste,wach,wahr,waig,warz,wede,wegt,weit,welk,wert,west,wild,wogt,wohl,
wund,wüst,xakt,xual,ygam,zahm,zarr,zart,zeln,zelt,zend,zent,zern,zest,zial,zige,zise,
ziös,ähig,ählt,ähnt,ährt,ände,ängt,änkt,änzt,ärbt,ärft,ärmt,äumt,äzis,ödet,öhnt,ölft,
übel,ückt,üdet,üfft,ühlt,ühmt,ührt,üllt,ünft,ünnt,ürbe,ürgt,ützt,angen,genau,getan,
ungen,weise,gemäss,welche,bezogen,grössere`),
  },
  prefixRegExp: new RegExp(`^(ab|achter|aller|ambi|an|astro|auf|aus|aus|auseinander|
aussen|außen|be|bei|binnen|bio|dar|durch|ein|einzel|ent|er|fort|gegen|haupt|her|herab|
heran|herauf|heraus|herein|herum|herunter|hervor|hin|hinaus|hinein|hinter|hinzu|kontra|
miss|miß|mit|myko|nach|neben|neo|nicht|nieder|ober|olko|onko|pan|phyto|post|pra|quer|
riesen|runter|sonder|symptom|theo|thio|uber|über|um|un|unter|ur|ver|voll|vor|voran|voraus|
vorbei|vorder|vorher|weg|wider|wieder|zer|zu|zurück|zusammen)`.replace(/\n/g,''),'i')
};


function umlaut(s) {
	return s.replace('a','ä').replace('o','ö').replace('u','ü')
}
function endsWith(s, ...needles) {
  for (let needle of needles) {
    if (s.slice(needle.length * -1) === needle) { return true }
  }
  return false
}
function prefixWordParts(w) {
  const prefixA = w.trim().split(/(\s|[-]|[–]|[|])/g);
  const prefixMatch = w.match(de.prefixRegExp);
  const hasP = !!prefixMatch && !!prefixMatch.length &&
  	w.length-prefixMatch[0].length > 2 && /[aeiou]/i.test(w.slice(prefixMatch[0].length));

  const prefix = !!hasP ? prefixMatch[0] : '';
  return [prefix, !!hasP ? (!!hasP ? w.replace(new RegExp(`^${prefix}`),'') : w) : w, prefixA];
}
/*
er,ge,bar,lich | - en,end,ende,endes,t,te,tes
anerkannt
anerkannte
anerkanntes
vorangegangen
sonderbar
sonderlich
überprüft
*/
function hasAdjective(noun, gender = 'm') {
  // not “isAdjective” …
  if (
    noun.length < 4 || gender === 'f' || !endsWith(noun, 'e', 'em', 'en', 'er', 'es') ||
    /(wochen|monats|jahres)?(ende)$/i.test(noun) || /(live|nature|single|experte|gefährte)$/i.test(noun)
  ) {
    return false
  }
  noun = noun.toLowerCase().replace(/(a|i|o|u|ü|o)re$/,'$1er').replace(/le$/,'el').replace(/e$/,'');
  if (endsWith(noun, 'hoh')) { return true }
  return mightBeAdjective(noun)
}

function mightBeAdjective(w) {
  const ends = (...needles) => endsWith(w, ...needles);
  const char1 = w.slice(0,1);
  if (char1.toLowerCase() !== char1 || ends('a','j','o','q','w','y') || /[-–\s]/.test(w)) {
    return false
  }
  const {fixed, endings} = de.adjective;
  const ratherHasNoun = ends('expert','gefährt','tt','at','ät','ot','öt','ut','üt');
  const notSuperEndings = 'a,e,i,o,ü,u,y,bor,bür,ger,lei,pla,qua'.split(',').map((s) => `${s}st`);
  const isAdjective = ends(...fixed) || (/.*(gend)$/g).test(w) ||
    ends('baut','raut','rott','gebläut','legen','neut','reut','nger') ||
    ((/.*(ge).*(t)$/g).test(w) || (/.*(ge).*([bghks]en)$/g).test(w)) ||
    (/.*(ge).*(aut|eut|auen)$/g).test(w) || (/.*(ver).*(aut|gen|auen)$/g).test(w) ||
    (ends('oscher','icher') || (!ends('amper') && ends('er') && !ends('eer','ier'))) ||
    (w === 'best' || (w !== 'est' && ends('st') && !ends(...notSuperEndings))) ||
    ends( ...endings);
  return isAdjective
}

function declineAdjective(adjective, gender = 'm') {
  // if (gender = 'a') { gender = 'f' }
  const ends = {
    DET: {
      f:['e','en','en','e'],m:['e','en','en','en'],n:['e','en','en','e'],pl:['en','en','en','en']
    },
    UND: {
      f:['e','en','en','e'],m:['er','en','en','en'],n:['es','en','en','es'],pl:['e','er','en','e']
    },
    _: {
      f:['e','er','er','e'],m:['er','en','em','en'],n:['es','en','em','es'],pl:['en','en','en','en']
    }
  }
  const o = {ADJ: adjective};
  const s = adjective.replace(/(a|i|o|u|ü|o)er$/,'$1r').replace(/el$/,'l').replace(/e$/,'').replace(/(.*)(h|H)och$/i,'$1$2oh');

  const cases = {SUB:0,GEN:1,DAT:2,AKK:3};
  ['S','P'].forEach((numerusKey) => {
    const gKey = numerusKey !== 'P' ? gender : 'pl';
    const gEndKey = gender === 'a' ? 'f' : gender;
    o[`${numerusKey}`] = `${s}${ends._[gEndKey][0]}`;

    ['_','DET','UND'].forEach((determinationKey,i) => {
      const [SUB,GEN,DAT,AKK] = !i ? ['','','',''] : de.article[determinationKey][gKey];
      const articles = {SUB,GEN,DAT,AKK};
      for (let caseKey in articles) {
        const k = !i ? `${numerusKey}_${caseKey}` :
          `${numerusKey}_${determinationKey}_${caseKey}`;
        const suffix = ends[determinationKey][gEndKey][cases[caseKey]];
        o[k] = `${articles[caseKey]} ${s}${suffix}`.trim();
      }
    });
  });
  return o;
}

function pluralize(word, isAnglicism = false, gender = 'm', irregularPlurals = {}) {
	if (isAnglicism) {
  	/* TODO */
    return `${word.replace(/[\^]/g,'')}s`
  }
//// einkünfte, gebrüder, geschwister, verhalten
  const isFemale = gender === 'f';
  const {only, inflections, irregular} = de.noun.plural;
  const wLow = word.toLowerCase();
  if (!!only.filter((fixedPl) => (fixedPl === wLow)).length) {
    return word
  }
  for (let g of ['/','_','*',':']) {
  	if (word.slice(-3) === `${g}in`) {
      return `${word.slice(0,-3)}${g}innen`
    }
  }
  const irregulars = {...irregular, ...irregularPlurals};
  if (irregulars.hasOwnProperty(wLow)) {
  	return irregulars[wLow]
  }
  const [prefix, w] = prefixWordParts(word);
  const s = w.toLowerCase();
	for (let a of inflections) {
    const r = new RegExp(a[0]+'$');
    if (r.test(s)) {
      return `${prefix}${w.replace(r,a[1])}`
    }
  }
  const ends = (...needles) => endsWith(s, ...needles);
  if (s.substr(0,2) === 'ge' || ends('gie')) { return `${prefix}${w}` }
  if (ends('e')) { return `${prefix}${w}n` }
  if (ends('ien')) { return`${prefix}${w.slice(0,-2)}um` }
  if (
  	(ends('ein','eit') && (/[aeiou]/gi).test(s.slice(0,-3))) ||
  	(ends('au') && (/[aeiou]/gi).test(s.slice(0,-2)))
  ) {
  	return `${prefix}${w}`
  }
  if (ends('er','en','el','chen','mus','tik','tum','u')) {
  	return `${prefix}${w}`
  }
  if (ends('ant','ei','enz','ion','ist','or','schaft','tur','ung')) {
  	return `${prefix}${w}en`
  }
  if (!ends('ein') && ends('in')) { return `${prefix}${w}nen` }
  if (ends('nis')) { return `${prefix}${w}se` }
  if (ends('eld','ild','ind')) { return `${prefix}${w}er` }
  if (ends('o')) { return `${prefix}${w}s` }
  if (ends('a')) { return `${prefix}${w.slice(0,-1)}en` }
  if (ends('all','and','ang','ank','atz','auf','ock','opf','uch','uss')) {
  	const u = umlaut(w.slice(-3,-2));
    return `${prefix}${w.slice(0,-3)}${u}${w.slice(-2)}e`;
  }
  if (ends('ant','and')) {
  	return `${prefix}${w}en`
  }
  if (ends('ason','eson','ison','oson','uson','sson')) {
  	return `${prefix}${w}s`;
  } else if (ends('son') || ends('tat','tät')) {
  	return `${prefix}${w}en`;
  }
  if (/[aeious].*anz/.test(s)) {
  	return `${prefix}${w}en`;
  } else if (ends('anz')) {
  	return `${prefix}${umlaut(w)}e`;
  }

  for (let a of [['ag','äge'],['ann','änner'],['aum','äume'],['aus','äuser'],['zug','züge']]) {
  	if (ends(a[0])) {
    	return `${prefix}${w.slice(0,a[0].length * -1)}${a[1]}`;
    }
  }

  const uv = s.match(/[aou]/gi);
  const pluralUmlautR = new RegExp(`^[bcdfghjklmnpqrstvwxys](a|o|u)`,'i');
  if (pluralUmlautR.test(s) && !!uv && uv.length === 1 && !((/[ei]/gi).test(s))) {
  	const u = w.slice(1,2).replace('a','ä').replace('o','ö').replace('u','ü');
    return `${prefix}${w.slice(0,1)}${u}${w.slice(2)}e`;
  }
  return `${prefix}${w}${ends('a','i','o','u','y') ? 's' : (isFemale ? 'en': 'e')}`
}

function genitivS(s, gender, preferE = false) {
	if (gender === 'f') { return s }
  const hasE = endsWith(s, 'e', 'ent');
  s = s.replace(/(a|b|n)is$/,'$1iss');
	s = s.replace(/(ß|s|tz|t|x|z)$/,'$1e');
  return (hasE && gender === 'm') ? `${s}n` : s
}
function dativP(s) {
  return (/(e?n|s)$/).test(s) ? s : `${s}n`;
}

function declineNounPart(noun, gender = 'a') {

    if (!/\w\w/g.test(noun)) {
      return noun
    }
    const o = {SUB: noun};
    const isPersonLike = /[*]([\^])?$/.test(noun.trim());
    const isAnglicism = /[\^]([*])?$/.test(noun.trim());
    const testAdjective = noun.replace(/re$/,'er').replace(/le$/,'el').replace(/e$/,'').replace(/(.*)(h|H)oh$/i,'$1$2och');
    const isAdjectiveLike = !isAnglicism && !isPersonLike && hasAdjective(noun);
    if (isPersonLike) {
    	gender = 'f';
    	noun = noun.replace(/[aeiou][*]([\^])?$/,'*in').replace(/[*]([\^])?$/,'*in');
    }
    if (isAnglicism) {
    	noun = noun.replace(/[\^]/g,'')
    }
    if (isAdjectiveLike) {
      return declineAdjective(noun.replace(/(a|i|o|u|ü|o)re$/,'$1er').replace(/le$/,'el').replace(/e$/,'').replace(/(.*)(h|H)oh$/i,'$1$2och'), gender);
    }

    ['S','P'].forEach((numerusKey) => {
    	const isP = numerusKey === 'P';

      let n = (isP ? pluralize(noun, isAnglicism, gender) : noun.replace(/[|]/g,'')).trim();
      o[`${numerusKey}`] = n;

      ['DET','UND'].forEach((determinationKey) => {
      	const gKey = !isP ? gender : 'pl';
        const [SUB,GEN,DAT,AKK] = de.article[determinationKey][gKey];
        const articles = {SUB,GEN,DAT,AKK};
        for (let caseKey in articles) {
        	const _k = `${numerusKey}_${caseKey}`;
          const k = `${numerusKey}_${determinationKey}_${caseKey}`;

          const suffix = !isP && gender !== 'f' && caseKey === 'GEN' ?
          	(isPersonLike ? 'n' : 's') : '';

          const N = caseKey === 'DAT' && isP ? dativP(n) :
            `${caseKey === 'GEN' && !isP ? genitivS(n, gender) : n}${suffix}`;


          o[_k] = N;
          o[k] = `${articles[caseKey]} ${N}`;
        }
      });
    });
    return o
}
function declineNoun(noun) {
  const [prefix, w, prefixArray] = prefixWordParts(noun);
  const [possibleArticle, possibleSpace] = prefixArray;
  let articleParts = [];
  let gender = 'f';
  const {DET,UND} = de.article;
  [DET,UND].forEach((o, i) => {
    for (let g in o) {
      if (!!possibleArticle && !!possibleSpace && g !== 'pl' &&
        o[g][0] === possibleArticle.trim() && /^\s$/.test(possibleSpace)
      ) {
        gender = g;
        prefixArray.shift();
        prefixArray.shift();
        break;
      }
    }
  });
  const wordArray = prefixArray.map((word) => declineNounPart(word, gender));
	if (noun === 'Geordnete') { console.log('!!!', wordArray) }
	if (wordArray.length === 1) {
		return wordArray[0]
	}

	let [nounIndex,mainArticle] = [1,''];
	for (let i = 0, l = wordArray.length; i < l; i++) {
		const wordObject = wordArray[i];
		if (typeof wordObject === 'object' && !def.hasOwnProperty('ADJ')) {
			nounIndex = i;
			mainArticle = {};
			for (let key in wordObject) {
				const wordParts = wordObject[key].split(' ');
				mainArticle[key] = wordParts.length > 1 ? wordParts[0] : '';
			}
		}
	}
	console.log(mainArticle, noun);

  let hasArticle = false;
  return wordArray.reduce((o, def, i, a) => {
    if (typeof def === 'string') {
      for (let key in o) {
        o[key] = `${o[key]}${def}`;
      }
      return o
    }
    for (let key in def) {
			let target = def[key];
			if (!def.hasOwnProperty('ADJ') && i !== nounIndex) {
				// compound nouns - Komposita like 'Lotto-Annahmestelle' just get the last pluralized
				const S = def[key.replace('P_', 'S_')];
				for (let key in S) {
					const w = S[key].indexOf(' ') > -1 ? S[key].split(' ') : S[key];
					S[key] = mainArticle.hasOwnProperty(key) ? `${mainArticle[key]}${w}` : w;
				}
			}
			o[key] = (!o.hasOwnProperty(key) || !o[key]) ? target :
        `${o[key]}${(hasArticle && target.indexOf(' ') > -1 ? target.split(' ')[1] : target)}`;
    }
    hasArticle = true;
    return o
  }, {});

  // TODO ? - detect plurals and singularize …
}



const nls = {
  E: 'Einheit',
  Z: 'Zeit',
  M: 'der Mann',
  St: 'der Stein',
  Sw: 'das Schwein',
  A: 'der Abend',
  K: 'Kuh',
  N: 'Nacht',
  G: 'Gans',
  T: 'der Tanz',

	Ge: 'Geordnete',
  Ho: 'Hohe',
  D: 'Dunkle',
  Te: 'Teure',
  B: 'der Bekannte',

  Be: 'Benutzer*',
  C: 'Kunde*',
  P: 'Pilot*',

  Link: 'der Link^',
  Object: 'das Objekt',
  Collection: 'Sammlung',
  OrderedCollection: 'Geordnete Sammlung',
  CollectionPage: 'Sammlung-Seite',
  OrderedCollectionPage: 'Geordnete-Sammlung-Seite',

  Application: 'Anwendung',
  Group: 'Gruppe',
  Organization: 'Organisation',
  Person: 'Person',
  Service: 'der Service^',

  Activity: 'Aktivität',
  IntransitiveActivity: 'Intransitive Aktivität',
  Accept: 'Akzeptanz',
  TentativeAccept: 'Vorläufige Akzeptanz',
  Add: 'Hinzufügung',
  Arrive: 'Ankunft',
  Create: 'Erstellung',
  Delete: 'Löschung',
  Follow: 'Folge',
  Ignore: 'Ignoranz',
  Join: 'der Beitritt',
  Leave: 'der Austritt',  //Verlassen
  Like: 'das Gefallen',
  Offer: 'das Angebot',  //AnBieten
  Invite: 'Einladung',
  Reject: 'Ablehnung',
  TentativeReject: 'Vorläufige Ablehnung',
  Remove: 'Entfernung',
  Undo: 'das Rückgängig-Machen',
  Update: 'Aktualisierung',
  View: 'Ansicht',  // Ansehen
  Listen: 'Anhörung',  // Hören
  Read: 'Lesung',  // Lesen
  Move: 'Bewegung',
  Travel: 'Reise',
  Announce: 'Ankündigung',
  Block: 'Blockade',
  Flag: 'Flagge',
  Dislike: 'Abneigung',
  Question: 'Frage',
  Relationship: 'Beziehung',
  Article: 'der Artikel',
  Document: 'das Dokument',
  Audio: 'das Audio',
  Image: 'das Bild',
  Video: 'das Video',
  Note: 'Notiz',
  Page: 'Seite',
  Event: 'Ereignis',
  Place: 'der Ort',
  Mention: 'Erwähnung',
  Profile: 'das Profil',
  Tombstone: 'der Grab|stein'
}



const def = {};
for (let key in nls) {
  // Ausnahme Herz
  const declinedNoun = declineNoun(nls[key]);
  for (let k in declinedNoun) {
		if (k === 'ADJ') {
			def[key] = declinedNoun[k];
		}
    def[k === 'SUB' ? key : `${key}_${k}`] = declinedNoun[k];
  }
}


console.log(def);
/*
Object.keys(def).filter((_k) => _k.indexOf('_') < 0).forEach((k) => {
	const pl = pluralize(def[k]);
	if (def[k+'_P'] !== pl) { console.log(def[k], `${def[k+'_P']}`, pl) }
})
*/
Object.keys(def).filter((_k) => _k.indexOf('_') < 0).forEach((k) => {
  console.log(hasAdjective(def[k]));
	console.log(`${def[k+'_S_UND_SUB']} verknüpft ${def[k+'_S_DET_AKK']} mit ${def[k+'_S_UND_DAT']} ${def[k+'_S_DET_GEN']}`);

  console.log(`${def[k+'_P_UND_SUB']} verknüpfen ${def[k+'_P_DET_AKK']} mit ${def[k+'_P_UND_DAT']} ${def[k+'_P_DET_GEN']}`);

  console.log(`2 ${def[k+'_P_SUB']} verknüpfen 3 ${def[k+'_P_AKK']} mit 6 ${def[k+'_P_DAT']} ${def[k+'_P_DET_GEN']}`);
})








/*
[Log] ein Bekannte verknüpft den Bekannte mit einem Bekannte des Bekanntens (_display, line 57)

adv
der Vorläufige Ablehnungen
2 Grabstein verknüpfen 3 Grabstein mit 6 Grabstein der Grabstein
*/









/* TODO
EN
  continuous tense
*/
