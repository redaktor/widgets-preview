import exporter from '../exporter';
const abbreviations = {
  exclamation: `yahoo,joomla,jeopardy`,
  organization: `dept,univ,assn,bros,inc,ltd,co,agcy,agt,mfg`,
  unit: `fl,ia,nm,ft,sq,lt,f,bpm,bps,lb,qt,rpm,tsp,k,k,bbl,cu,gal,m,doz,oz,
    floz,gr,gro,kt,mi,mph,pt,sqm,t,tbsp,yd`,
  honorific: `col,md,dr,acad,adm,amb,artd,as,assn,asst,atty,ba,bc,bca,br,bs,
    bros,brig,capt,cmdr,comdr,corp,cpl,dsc,dvm,dis,doc,esq,fr,gen,gov,hc,hon,
    icdr,ing,ingsheet,judr,jd,jr,llb,lt,ltcol,ma,mga,mgr,maj,messrs,mlle,mme,
    mphil,mr,mrs,ms,msgr,mstr,mx,op,ord,odbas,ofc,paeddr,phmr,pharmdr,pres,
    rcdr,rndr,rsdr,rtdr,sr,thd,thdr,thlic,thmgr,treas,phd,phdr,prof,pvt,rep,
    reps,res,rev,sen,sens,sec,sgt,supt,surg`,
  common: `abbr,ac,acc,afaik,aka,asap,btw,bcc,byob,ca,cca,cc,dc,dist,diy,
    eg,eta,etc,ex,faq,fy,fyi,ie,lit,pl,ps,rip,rsvp,tba,vip,vs,wrt,adj,adv,det`,
  place: `pl,ala,ariz,ark,cal,calif,colo,conn,dak,dc,del,col,fl,fla,flor,ga,ida,id
    ,ill,il,ind,in,ia,kan,kans,ky,ken,la,md,mass,mich,minn,mn,miss,mo,mont,nebr,neb,nev,nv,nh,nj,
    nmex,nm,ny,nc,ndak,nd,o,oh,okla,oreg,pa,penna,penn,ri,sc,sdak,sd,tenn,tex,tx,ut,vt,va,virg,
    wis,wisc,wva,wyo,usafa,alta,ont,que,sask,apt,ave,blvd,bldg,ctr,cir,cres,ct,dr,expy,ext,ft,
    fwy,hts,hwy,is,jct,ln,mt,pky,po,rd,rr,st,spg,spgs,sq,ste,str,ter,tce,univ,us,usa`,
  month: `jan,feb,mar,jun,jul,aug,sep,sept,oct,nov,dec`,
  day: `mon,tue,wed,thu,fri,sat`
}
export default exporter(abbreviations);
