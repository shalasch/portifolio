import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle, Github, Play, Workflow, Bot, LayoutDashboard, Code2, Database } from "lucide-react";

/* ── CURSOR ─────────────────────────────────────────────────────────────────── */
function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const tgt = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = e => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.1;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.1;
      if (ring.current) ring.current.style.transform = `translate(${pos.current.x - 18}px,${pos.current.y - 18}px)`;
      if (dot.current) dot.current.style.transform = `translate(${tgt.current.x - 2}px,${tgt.current.y - 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.25)",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference" }} />
      <div ref={dot} style={{ position:"fixed",top:0,left:0,width:4,height:4,borderRadius:0,background:"#fff",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference" }} />
    </>
  );
}

/* ── MARQUEE ────────────────────────────────────────────────────────────────── */
function Marquee({ items }) {
  return (
    <div style={{ overflow:"hidden",borderTop:"1px solid #111",borderBottom:"1px solid #111",padding:"10px 0",whiteSpace:"nowrap",userSelect:"none" }}>
      <div style={{ display:"inline-block",animation:"marquee 30s linear infinite" }}>
        {[...items,...items].map((item,i) => (
          <span key={i} style={{ fontSize:8,fontFamily:"'JetBrains Mono',monospace",letterSpacing:3,color:"#222",marginRight:40 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── REVEAL ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay=0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(14px)", transition:`opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── PIXEL SCANLINE BG ──────────────────────────────────────────────────────── */
function ScanLines() {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)", backgroundSize:"100% 4px", opacity:1 }} />
  );
}

/* ── DATA ───────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  // AUTOMATIONS FIRST
  { id:7, n:"01", cat:"AUTOMATION", hasDemo:false, complete:true, icon:<Workflow size={13}/>,
    PT:{ title:"PRODUCT IMPORT", sub:"CSV → Selenium → SQLite", desc:"Script Python que lê produtos de um CSV, preenche formulários web automaticamente via Selenium e armazena em SQLite. Zero input manual." },
    EN:{ title:"PRODUCT IMPORT", sub:"CSV → Selenium → SQLite", desc:"Python script that reads products from CSV, auto-fills web forms via Selenium and stores in SQLite. Zero manual input." },
    tags:["Python","Selenium","SQLite"], github:"https://github.com/shalasch/product-import-automation" },
  { id:8, n:"02", cat:"AUTOMATION", hasDemo:false, complete:true, icon:<Workflow size={13}/>,
    PT:{ title:"WHATSAPP LEADS", sub:"n8n · Twilio · Airtable", desc:"Captura e qualifica leads via WhatsApp com follow-ups automáticos e handler de status de entrega. Sistema completo." },
    EN:{ title:"WHATSAPP LEADS", sub:"n8n · Twilio · Airtable", desc:"Captures and qualifies leads via WhatsApp with automated follow-ups and delivery status handling. Full system." },
    tags:["n8n","Twilio","Airtable"] },
  { id:9, n:"03", cat:"AUTOMATION", hasDemo:false, complete:true, icon:<Database size={13}/>,
    PT:{ title:"LEAD QUALIFICATION", sub:"Make.com · Gmail · CRM", desc:"Pipeline completo: captura o lead, classifica por score, envia emails segmentados e notifica o time de vendas." },
    EN:{ title:"LEAD QUALIFICATION", sub:"Make.com · Gmail · CRM", desc:"Full pipeline: captures leads, scores them, sends segmented emails and notifies the sales team automatically." },
    tags:["Make.com","Gmail","CRM"] },
  // AI AGENTS
  { id:4, n:"04", cat:"AI AGENT", hasDemo:false, complete:false, icon:<Bot size={13}/>,
    PT:{ title:"PHANTOM", sub:"Short-form Script Generator", desc:"Agente IA para roteiros de vídeos curtos. Tema + nicho → hook, corpo e CTA prontos para gravar." },
    EN:{ title:"PHANTOM", sub:"Short-form Script Generator", desc:"AI agent for short-form video scripts. Topic + niche → hook, body and CTA, ready to record." },
    tags:["Claude API","Shorts","PT/EN"] },
  { id:5, n:"05", cat:"AI AGENT", hasDemo:false, complete:false, icon:<Bot size={13}/>,
    PT:{ title:"AD COPY AGENT", sub:"Meta · Google · Conversão", desc:"5 variações completas de copy com headline, corpo e CTA. Pronto para A/B test no mesmo output." },
    EN:{ title:"AD COPY AGENT", sub:"Meta · Google · Conversion", desc:"5 complete copy variations with headline, body and CTA. Ready for A/B testing in a single output." },
    tags:["Claude API","A/B Test","Ads"] },
  { id:6, n:"06", cat:"AI AGENT", hasDemo:false, complete:false, icon:<Bot size={13}/>,
    PT:{ title:"NEWSLETTER GW", sub:"No seu tom de voz", desc:"Ghostwriter IA treinado no seu estilo. Escreve newsletters completas com subject line otimizado para abertura." },
    EN:{ title:"NEWSLETTER GW", sub:"In your voice", desc:"AI ghostwriter trained on your style. Writes full newsletters with open-rate optimized subject lines." },
    tags:["Claude API","Fine-tuned","PT/EN"] },
  // DASHBOARDS LAST
  { id:1, n:"07", cat:"DASHBOARD", hasDemo:true, complete:true, icon:<LayoutDashboard size={13}/>,
    PT:{ title:"CREATOR METRICS", sub:"YouTube · Instagram · TikTok", desc:"Painel unificado de métricas para criadores. Views, inscritos, alcance e metas mensais. Entrega em 24h." },
    EN:{ title:"CREATOR METRICS", sub:"YouTube · Instagram · TikTok", desc:"Unified metrics panel for creators. Views, subscribers, reach and monthly goals. 24h delivery." },
    tags:["React","Recharts","PT/EN"] },
  { id:2, n:"08", cat:"DASHBOARD", hasDemo:true, complete:true, icon:<LayoutDashboard size={13}/>,
    PT:{ title:"LAUNCH PANEL", sub:"Infoprodutos · Cursos · Mentorias", desc:"Funil de lançamento em tempo real. Leads, vendas diárias, conversão e faturamento acumulado." },
    EN:{ title:"LAUNCH PANEL", sub:"Info Products · Courses · Coaching", desc:"Real-time launch funnel. Leads, daily sales, conversion and cumulative revenue." },
    tags:["React","Real-time","Funnel"] },
  { id:3, n:"09", cat:"DASHBOARD", hasDemo:true, complete:true, icon:<LayoutDashboard size={13}/>,
    PT:{ title:"TRAFFIC COMMAND", sub:"Meta Ads · Google Ads", desc:"ROAS diário, CPA e performance por adset. Identifica o que escalar e o que pausar num relance." },
    EN:{ title:"TRAFFIC COMMAND", sub:"Meta Ads · Google Ads", desc:"Daily ROAS, CPA and adset performance. Scale winners, cut losers — visible at a glance." },
    tags:["React","Meta+Google","ROAS"] },
];

const CAT_MAP = { automation:"AUTOMATION", agent:"AI AGENT", dashboard:"DASHBOARD" };
const MARQUEE_ITEMS = ["AUTOMATIONS","AI AGENTS","DASHBOARDS","24H DELIVERY","REACT","CLAUDE API","N8N","MAKE.COM","PYTHON","PT / EN"];

/* ── ROW ────────────────────────────────────────────────────────────────────── */
function Row({ p, lang, onDemo }) {
  const [hov, setHov] = useState(false);
  const d = p[lang];
  const catColor = { AUTOMATION:"#fff", "AI AGENT":"#888", DASHBOARD:"#444" }[p.cat] || "#fff";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns:"56px 1fr 130px", gap:"0 20px", padding:"22px 0", borderBottom:"1px solid #0d0d0d", background:hov?"#070707":"transparent", transition:"background 0.2s" }}
    >
      {/* Number */}
      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:"#1a1a1a", paddingTop:4, lineHeight:1.6 }}>{p.n}</div>

      {/* Content */}
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9, flexWrap:"wrap" }}>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:catColor, letterSpacing:3, border:`1px solid ${hov?catColor:"#151515"}`, padding:"2px 8px", transition:"border-color 0.2s" }}>{p.cat}</span>
          {!p.complete && <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#1c1c1c", letterSpacing:2 }}>// {lang==="PT"?"EM BREVE":"COMING SOON"}</span>}
        </div>

        {/* Title in pixel font */}
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"clamp(10px,1.6vw,15px)", color:hov?"#fff":"#666", letterSpacing:0, lineHeight:1.8, marginBottom:10, transition:"color 0.2s" }}>
          {d.title}
        </div>

        <div style={{ fontSize:8, fontFamily:"'JetBrains Mono',monospace", color:"#222", letterSpacing:2, marginBottom:10 }}>{d.sub}</div>
        <div style={{ fontSize:11.5, color:"#2e2e2e", lineHeight:1.8, maxWidth:500, fontWeight:300, letterSpacing:0.2 }}>{d.desc}</div>
        <div style={{ display:"flex", gap:5, marginTop:12, flexWrap:"wrap" }}>
          {p.tags.map(t => <span key={t} style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#1e1e1e", border:"1px solid #131313", padding:"2px 7px", letterSpacing:1 }}>{t}</span>)}
        </div>
      </div>

      {/* Action */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", paddingTop:2 }}>
        {p.hasDemo ? (
          <button onClick={() => onDemo(p.id)} style={{ padding:"8px 14px", border:`1px solid ${hov?"#fff":"#181818"}`, background:hov?"#fff":"transparent", color:hov?"#000":"#2a2a2a", fontSize:7, cursor:"pointer", fontFamily:"'Press Start 2P',monospace", letterSpacing:1, display:"flex", alignItems:"center", gap:7, transition:"all 0.2s", lineHeight:1.6 }}>
            <Play size={7} strokeWidth={2.5}/>DEMO
          </button>
        ) : (
          <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer"
            style={{ padding:"8px 14px", border:"1px solid #141414", color:"#1e1e1e", fontSize:7, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, display:"flex", alignItems:"center", gap:6, transition:"all 0.2s",
              ...(hov?{borderColor:"#fff",color:"#fff"}:{}) }}>
            {lang==="PT"?"CONTRATAR":"HIRE"} <ArrowUpRight size={9}/>
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" style={{ padding:"8px 14px", border:"1px solid #0f0f0f", color:"#1a1a1a", fontSize:7, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, display:"flex", alignItems:"center", gap:6 }}>
            <Github size={8}/>SRC
          </a>
        )}
      </div>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [lang, setLang] = useState("PT");
  const [cat, setCat] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [demoId, setDemoId] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x+1), 1000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" });

  const cats = lang==="PT"
    ? { all:"TODOS", automation:"AUTOMAÇÕES", agent:"AGENTES IA" }
    : { all:"ALL", automation:"AUTOMATIONS", agent:"AI AGENTS" };

  const filtered = cat==="all" ? PROJECTS : PROJECTS.filter(p => p.cat === CAT_MAP[cat]);

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"'JetBrains Mono',monospace", cursor:"none", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <Cursor/>
      <ScanLines/>
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes pixelIn { from{opacity:0;letter-spacing:0.5em} to{opacity:1;letter-spacing:0em} }
        @keyframes scandown { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        ::selection{background:#fff;color:#000}
        *{box-sizing:border-box}
      `}</style>

      {/* Moving scan line */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)", animation:"scandown 8s linear infinite", zIndex:1, pointerEvents:"none" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 40px",height:50,display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid #0d0d0d" }}>
        {/* Wordmark pixel */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:11, color:"#fff", letterSpacing:1, lineHeight:1 }}>SHALA</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:"#1a1a1a", letterSpacing:2 }}>.DEV</span>
        </div>

        {/* Live clock */}
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#151515", letterSpacing:3, fontVariantNumeric:"tabular-nums" }}>
          {timeStr}<span style={{ animation:"blink 1s step-end infinite", marginLeft:3, color:"#1e1e1e" }}>_</span>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", border:"1px solid #0f0f0f" }}>
            {["PT","EN"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding:"5px 12px", fontSize:8, background:lang===l?"#fff":"transparent", color:lang===l?"#000":"#1e1e1e", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, transition:"all 0.15s" }}>{l}</button>
            ))}
          </div>
          <a href="https://github.com/shalasch" target="_blank" rel="noreferrer" style={{ width:32,height:32,border:"1px solid #0f0f0f",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1a1a",textDecoration:"none" }}>
            <Github size={11}/>
          </a>
          <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer" style={{ padding:"6px 16px",background:"#fff",color:"#000",fontSize:7,fontWeight:700,textDecoration:"none",letterSpacing:2,fontFamily:"'Press Start 2P',monospace",lineHeight:1.6 }}>
            {lang==="PT"?"CONTATO":"CONTACT"}
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop:50,minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>

        {/* Pixel grid bg */}
        <div style={{ position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"radial-gradient(circle, #0f0f0f 1px, transparent 1px)",backgroundSize:"24px 24px",opacity:0.5 }} />

        {/* Big `</>` decoration */}
        <div style={{ position:"absolute",right:"-3%",bottom:"-4%",fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(80px,16vw,220px)",color:"transparent",WebkitTextStroke:"1px #0c0c0c",lineHeight:1,pointerEvents:"none",userSelect:"none",opacity:loaded?1:0,transition:"opacity 1.4s ease 0.4s",letterSpacing:-4 }}>
          &lt;/&gt;
        </div>

        <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 40px 60px",position:"relative",zIndex:2 }}>

          {/* Status */}
          <div style={{ opacity:loaded?1:0,animation:loaded?"fadeUp 0.5s ease 0.1s both":"none" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:44 }}>
              <div style={{ width:6,height:6,borderRadius:0,background:"#fff",boxShadow:"0 0 0 2px #000, 0 0 0 3px #fff" }} />
              <span style={{ fontSize:7,color:"#1e1e1e",letterSpacing:3,fontFamily:"'JetBrains Mono',monospace" }}>
                {lang==="PT"?"STATUS: DISPONÍVEL PARA PROJETOS":"STATUS: AVAILABLE FOR PROJECTS"}
              </span>
            </div>
          </div>

          {/* ── PIXEL HEADLINE ── */}
          <div style={{ opacity:loaded?1:0,animation:loaded?"fadeUp 0.6s ease 0.2s both":"none" }}>
            <div style={{ fontFamily:"'Press Start 2P',monospace", lineHeight:1.6, marginBottom:0 }}>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#fff", marginBottom:8 }}>AI</div>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#1a1a1a", marginBottom:8 }}>AGENTS</div>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#fff", marginBottom:8 }}>&amp; AUTO</div>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#131313" }}>
                MATIONS
                <span style={{ animation:"blink 1s step-end infinite", color:"#fff" }}>█</span>
              </div>
            </div>
          </div>

          {/* Sub + CTA */}
          <div style={{ opacity:loaded?1:0,animation:loaded?"fadeUp 0.6s ease 0.4s both":"none",marginTop:48,display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,maxWidth:840 }}>
            <p style={{ margin:0,fontSize:12,color:"#2a2a2a",lineHeight:1.9,fontWeight:300,letterSpacing:0.3 }}>
              {lang==="PT"
                ? "Agentes IA e automações para criadores, infoprodutores e negócios. Do briefing ao deploy em até 24 horas."
                : "Visual and intelligent solutions for creators, course sellers and traffic managers. Guaranteed 24-hour delivery."}
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer" style={{ padding:"14px 20px",background:"#fff",color:"#000",fontSize:7,fontWeight:700,textDecoration:"none",display:"flex",justifyContent:"space-between",alignItems:"center",letterSpacing:2,fontFamily:"'Press Start 2P',monospace",lineHeight:1.6 }}>
                WHATSAPP <ArrowUpRight size={13}/>
              </a>
              <a href="https://linkedin.com/in/shala-n-92bb56339" target="_blank" rel="noreferrer" style={{ padding:"14px 20px",border:"1px solid #111",color:"#1e1e1e",fontSize:7,textDecoration:"none",display:"flex",justifyContent:"space-between",alignItems:"center",letterSpacing:2,fontFamily:"'JetBrains Mono',monospace" }}>
                LINKEDIN <ArrowUpRight size={13}/>
              </a>
            </div>
          </div>

          {/* Stats — pixel font */}
          <div style={{ opacity:loaded?1:0,animation:loaded?"fadeUp 0.6s ease 0.6s both":"none",marginTop:60,display:"flex",borderTop:"1px solid #0c0c0c",paddingTop:24,gap:0,flexWrap:"wrap" }}>
            {[["12+",lang==="PT"?"AGENTES":"AGENTS"],["24H",lang==="PT"?"ENTREGA":"DELIVERY"],["3","STACKS"],["100%","CUSTOM"]].map(([v,l],i) => (
              <div key={l} style={{ paddingRight:32,marginRight:32,borderRight:i<3?"1px solid #0c0c0c":"none",marginBottom:8 }}>
                <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(14px,2.5vw,28px)",color:"#fff",lineHeight:1.4,letterSpacing:-1 }}>{v}</div>
                <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#1c1c1c",letterSpacing:3,marginTop:6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS}/>

      {/* ── PROJECTS ── */}
      <section style={{ padding:"72px 40px",maxWidth:1060,margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16 }}>
            <div>
              <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#1a1a1a",letterSpacing:3,marginBottom:12 }}>// {lang==="PT"?"PROJETOS":"PROJECTS"}</div>
              <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(13px,2.5vw,24px)",color:"#fff",lineHeight:1.6,letterSpacing:0 }}>
                {lang==="PT"?"O QUE\nCONSTRUO":"WHAT I\nBUILD"}
              </div>
            </div>
            {/* Filter */}
            <div style={{ display:"flex",gap:2,flexWrap:"wrap" }}>
              {Object.entries(cats).map(([k,v]) => (
                <button key={k} onClick={() => setCat(k)} style={{ padding:"7px 14px",background:cat===k?"#fff":"transparent",color:cat===k?"#000":"#1a1a1a",border:`1px solid ${cat===k?"#fff":"#111"}`,fontSize:7,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,transition:"all 0.15s" }}>{v}</button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Column headers */}
        <div style={{ display:"grid",gridTemplateColumns:"56px 1fr 130px",gap:"0 20px",paddingBottom:10,borderBottom:"1px solid #0a0a0a" }}>
          {["NO.","PROJETO / PROJECT","—"].map(h => (
            <span key={h} style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#141414",letterSpacing:3 }}>{h}</span>
          ))}
        </div>

        {filtered.map((p,i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <Row p={p} lang={lang} onDemo={setDemoId}/>
          </Reveal>
        ))}
      </section>

      {/* ── CONTACT ── */}
      <section style={{ padding:"60px 40px 96px",maxWidth:1060,margin:"0 auto",borderTop:"1px solid #0a0a0a" }}>
        <Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start" }}>
            <div>
              <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#1a1a1a",letterSpacing:3,marginBottom:20 }}>// CONTACT</div>
              <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(14px,3vw,30px)",color:"#fff",lineHeight:1.8,marginBottom:20 }}>
                {lang==="PT"?"VAMOS\nTRABALHAR\nJUNTOS?":"LET'S\nBUILD\nTOGETHER."}
              </div>
              <p style={{ fontSize:12,color:"#2a2a2a",lineHeight:1.8,fontWeight:300,maxWidth:300,letterSpacing:0.3 }}>
                {lang==="PT"
                  ? "Dashboard, agente IA ou automação. Me conta o que você precisa e entrego em até 24h."
                  : "Dashboard, AI agent or automation. Tell me what you need and I'll deliver in 24h."}
              </p>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:2,paddingTop:52 }}>
              {[
                { label:"WHATSAPP", href:"https://wa.me/5521967533689", primary:true },
                { label:"LINKEDIN", href:"https://linkedin.com/in/shala-n-92bb56339" },
                { label:"GITHUB", href:"https://github.com/shalasch" },
                { label:"EMAIL", href:"mailto:shaladrive@gmail.com" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  style={{ padding:"15px 20px",background:c.primary?"#fff":"transparent",color:c.primary?"#000":"#1e1e1e",border:`1px solid ${c.primary?"#fff":"#0f0f0f"}`,fontSize:c.primary?7:8,textDecoration:"none",display:"flex",justifyContent:"space-between",alignItems:"center",letterSpacing:2,transition:"all 0.18s",fontFamily:c.primary?"'Press Start 2P',monospace":"'JetBrains Mono',monospace",lineHeight:1.6,cursor:"none" }}
                  onMouseEnter={e => { if(!c.primary){e.currentTarget.style.borderColor="#fff";e.currentTarget.style.color="#fff";}}}
                  onMouseLeave={e => { if(!c.primary){e.currentTarget.style.borderColor="#0f0f0f";e.currentTarget.style.color="#1e1e1e";}}}>
                  {c.label} <ArrowUpRight size={12}/>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"14px 40px",borderTop:"1px solid #080808",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
        <span style={{ fontFamily:"'Press Start 2P',monospace",fontSize:9,color:"#0f0f0f",letterSpacing:0 }}>SHALA.DEV</span>
        <span style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#111",letterSpacing:3 }}>© 2026 · AI AGENTS · AUTOMATIONS · CLAUDE · OPENAI</span>
      </footer>
    </div>
  );
}
