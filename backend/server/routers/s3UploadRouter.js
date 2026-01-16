.extname(req.file.originalname);
    const baseName = path.basename(req.file.originalname, ext);
    const blobName = `${baseName}_${timestamp}${ext}`;

    // Upload to Azure Blob Storage
    const blockBlobClient = containerClient.gnfig();

const router = express.Router();

// Configure Azure Blob Storage
const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
const containerClient = blobServiceClient.getContainerClient("uploads");

// Configure multer for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
          if (!req.file) {
                  return res.status(400).json({ messaigmep:o r"tN oe xfpirlees sp rforvoimd e"de"x p}r)e;s
                                               s " ; 
                                                i}m
                                              p
      o r t   m/u/l tGeern efrraotme  "bmluolbt enra"m;e

  i m p o rcto n{s tB ltoibmSeesrtvaimcpe C=l iDeantte .}n ofwr(o)m; 
  " @ a z ucroen/sstt oerxatg e=- bplaotbh".;e
      xitmnpaomret( rpeaqt.hf iflreo.mo r"ipgaitnha"l;n
      aimmep)o;r
      t   d o tceonnvs tf rboams e"Ndaomtee n=v "p;a
      t
      hd.obtaesnevn.acmoen(friegq(.)f;i
      l
      ec.oonrsitg irnoaultnearm e=,  eexxptr)e;s
s . R o uctoenrs(t) ;b
      l
      o/b/N aImnei t=i a`l$i{zbea sAezNuarmee }B_l$o{bt iSmteosrtaagmep }c$l{ieexntt}
      `c;o
      n
      s t   c o/n/n eUcptliooandS ttroi nAgz u=r ep rBolcoebs sS.teonrva.gAeZ
      U R E _ ScToOnRsAtG Eb_lCoOcNkNBElCoTbICOlNi_eSnTtR I=N Gc;o
      nctoanisnte rcColniteanitn.egreNtaBmleo c=k B"luopblColaidesn"t;(
        b
        lloebtN abmleo)b;S
      e r v i caewCaliite nbtl;o
      clkeBtl ocboCnltiaeinnte.ruCpllioeandt(;r
      e
      qt.rfyi l{e
                . b ubflfoebrS,e rrveiqc.efCilliee.nbtu f=f eBrl.olbeSnegrtvhi)c;e
C
                l i e n t/./f rGoemtC otnhnee cbtlioobn SUtRrLi
                n g ( c ocnonnesctt ibolnoSbtUrriln g=) ;b
                l o cckoBnltoabiCnleireCnlti.eunrtl ;=

      b l o b Sreertvuircne Crleise.nstt.agteutsC(o2n0t0a)i.njesroCnl(i{e
                                                                        n t ( c o n tmaeisnseargNea:m e")F;i
                                                                          l}e  cuaptlcoha d(eedr rtoor )A z{u
                                                                                                            r e  cBolnosbo lSet.oerrargoer"(,"
                                                                                                            F a i l e d  st3oF iilneiPtaitahl:i zbel oAbzUurrle,  B/l/o bK eSetpo rsaagmee  ckleiye nnta:m"e,  feorrr ofrr)o;n
                                                                                                              t}e
                n
                d/ /c oCmopnaftiigbuirlei tmyu
                l t e r  }t)o; 
u s e}  mceamtocrhy  (setrorroarg)e  {t
                                      e m p o rcaornisloyl
                                      ec.oenrsrto rs(t"oFrialgee  u=p lmoualdt eerr.rmoerm:o"r,y Setrorroarg)e;(
                                        ) ; 
   c ornesst. sutpaltouasd( 5=0 0m)u.ljtseorn(({{  smteosrsaaggee :} )";F
     i
                                      l/e/  uUppllooaadd  feanidlpeodi"n,t 
                                        erroruotre:r .eprorsotr(."m/euspslaogaed "},) ;u
                                      p l o}a
  d}.)s;i
n
gelxep(o"rfti ldee"f)a,u lats yrnocu t(erre;q, res) => {
  try {
                                                   if (!req.file) {
                                                           return res.status(400).json({ message: "No file uploaded" });
                                                   }

      // Generate blob name with timestamp
      const timestamp = Date.now();
        const ext = path
