import { useState } from "react";
import {
  BarChart2, Bot, Zap, Github, MessageCircle, Database,
  Workflow, Code2, LayoutDashboard, Globe, Mail, Linkedin,
  ChevronRight, ArrowUpRight, Terminal
} from "lucide-react";

// ─── COPY PT/EN ───────────────────────────────────────────────────────────────
const copy = {
  PT: {
    badge: "DISPONÍVEL PARA PROJETOS",
    h1a: "Dashboards, Agentes IA",
    h1b: "e Automações",
    h1c: "que geram resultado.",
    sub: "Entrego soluções visuais e inteligentes para criadores, infoprodutores e gestores de tráfego — com prazo de 24 horas e resultado que você vê na primeira tela.",
    cta1: "WhatsApp",
    cta2: "Ver GitHub",
    stats: ["Projetos", "Entrega", "Stacks", "Personalizado"],
    sectionTitle: "Projetos",
    cats: ["Todos", "Dashboards", "Agentes IA", "Automações"],
    contactLabel: "Iniciar projeto",
    footerSub: "DASHBOARDS · AGENTES IA · AUTOMAÇÕES",
    ctaTitle: "Tem um projeto em mente?",
    ctaDesc: "Dashboard personalizado, agente IA ou automação — me conta o que você precisa e entrego em até 24 horas.",
    ctaBtn: "Iniciar conversa",
    deliverables: { "24h": "Entrega em 24h", "imediato": "Acesso imediato", "aberto": "Código aberto", "demanda": "Sob demanda" },
    contactTitle: "Contato",
    incomplete: "EM BREVE",
  },
  EN: {
    badge: "AVAILABLE FOR PROJECTS",
    h1a: "Dashboards, AI Agents",
    h1b: "and Automations",
    h1c: "that drive results.",
    sub: "I build visual and intelligent solutions for creators, course sellers and paid traffic managers — delivered in 24 hours, with impact you see on the first screen.",
    cta1: "WhatsApp",
    cta2: "View GitHub",
    stats: ["Projects", "Delivery", "Stacks", "Custom"],
    sectionTitle: "Projects",
    cats: ["All", "Dashboards", "AI Agents", "Automations"],
    contactLabel: "Start project",
    footerSub: "DASHBOARDS · AI AGENTS · AUTOMATIONS",
    ctaTitle: "Have a project in mind?",
    ctaDesc: "Custom dashboard, AI agent or automation — tell me what you need and I'll deliver within 24 hours.",
    ctaBtn: "Start a conversation",
    deliverables: { "24h": "Delivered in 24h", "imediato": "Instant access", "aberto": "Open source", "demanda": "On demand" },
    contactTitle: "Contact",
    incomplete: "COMING SOON",
  },
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1, category: "dashboard",
    PT: { title: "Central de Métricas para Criadores", subtitle: "YouTube · Instagram · TikTok", desc: "Painel unificado de métricas: views, receita, inscritos e fontes de tráfego. Entrega em 24h com suas cores e dados reais." },
    EN: { title: "Creator Metrics Dashboard", subtitle: "YouTube · Instagram · TikTok", desc: "Unified metrics panel: views, revenue, subscribers and traffic sources. Delivered in 24h with your branding and real data." },
    tags: ["React", "Recharts", "Custom data"], color: "#7dd3fc", icon: <LayoutDashboard size={16} strokeWidth={1.5} />, price: { PT: "R$297", EN: "$57" }, deliverable: "24h", highlight: true, complete: true,
  },
  {
    id: 2, category: "dashboard",
    PT: { title: "Painel de Lançamento", subtitle: "Infoprodutos · Cursos · Mentorias", desc: "Acompanhamento em tempo real: leads, vendas por dia, funil de conversão e faturamento acumulado." },
    EN: { title: "Launch Performance Panel", subtitle: "Info Products · Courses · Coaching", desc: "Real-time launch tracking: leads, daily sales, conversion funnel and cumulative revenue." },
    tags: ["React", "Recharts", "Real-time"], color: "#a78bfa", icon: <BarChart2 size={16} strokeWidth={1.5} />, price: { PT: "R$297", EN: "$57" }, deliverable: "24h", highlight: false, complete: true,
  },
  {
    id: 3, category: "dashboard",
    PT: { title: "Central de Tráfego Pago", subtitle: "Meta Ads · Google Ads", desc: "ROAS diário, CPA e performance por conjunto. Identifica o que escalar e o que pausar num relance." },
    EN: { title: "Paid Traffic Command Center", subtitle: "Meta Ads · Google Ads", desc: "Daily ROAS, CPA, and adset performance. Instantly see what to scale and what to kill." },
    tags: ["React", "Meta + Google", "Recharts"], color: "#fbbf24", icon: <BarChart2 size={16} strokeWidth={1.5} />, price: { PT: "R$297", EN: "$57" }, deliverable: "24h", highlight: false, complete: true,
  },
  {
    id: 4, category: "agent",
    PT: { title: "PHANTOM", subtitle: "Gerador de Roteiros para Shorts", desc: "Agente IA que cria roteiros otimizados para vídeos curtos. Input: tema + nicho. Output: hook, desenvolvimento e CTA prontos." },
    EN: { title: "PHANTOM", subtitle: "Short-form Script Generator", desc: "AI agent that creates optimized scripts for short videos. Input: topic + niche. Output: hook, body and CTA ready to record." },
    tags: ["Claude API", "PT/EN", "Kiwify"], color: "#34d399", icon: <Bot size={16} strokeWidth={1.5} />, price: { PT: "R$97", EN: "$19" }, deliverable: "imediato", highlight: true, complete: false,
  },
  {
    id: 5, category: "agent",
    PT: { title: "HERMES", subtitle: "Roteiros Herméticos e Esotéricos", desc: "Agente especializado em conteúdo esotérico. Cria roteiros com estrutura mítica, referências simbólicas e linguagem elevada." },
    EN: { title: "HERMES", subtitle: "Hermetic & Esoteric Script Agent", desc: "Specialized agent for esoteric content. Creates scripts with mythic structure, symbolic references and elevated language." },
    tags: ["Claude API", "Niche", "PT"], color: "#c084fc", icon: <Bot size={16} strokeWidth={1.5} />, price: { PT: "R$97", EN: "$19" }, deliverable: "imediato", highlight: false, complete: false,
  },
  {
    id: 6, category: "agent",
    PT: { title: "Repurposing Agent", subtitle: "1 vídeo → 10 formatos", desc: "Transforma uma transcrição em thread X, post LinkedIn, newsletter, email, 3 Shorts, carrossel e blog post de uma vez." },
    EN: { title: "Repurposing Agent", subtitle: "1 video → 10 formats", desc: "Turns a transcript into an X thread, LinkedIn post, newsletter, email, 3 Shorts, carousel and blog post — all at once." },
    tags: ["Claude API", "Multi-format", "PT/EN"], color: "#2dd4bf", icon: <Bot size={16} strokeWidth={1.5} />, price: { PT: "R$97", EN: "$19" }, deliverable: "imediato", highlight: false, complete: false,
  },
  {
    id: 7, category: "automation",
    PT: { title: "Product Import Automation", subtitle: "CSV → Selenium → Web Form → SQLite", desc: "Script Python que lê produtos de um CSV, preenche formulários web automaticamente via Selenium e armazena em SQLite." },
    EN: { title: "Product Import Automation", subtitle: "CSV → Selenium → Web Form → SQLite", desc: "Python script that reads products from CSV, auto-fills web forms via Selenium and stores data in SQLite. Zero manual input." },
    tags: ["Python", "Selenium", "SQLite"], color: "#60a5fa", icon: <Code2 size={16} strokeWidth={1.5} />, price: { PT: null, EN: null }, deliverable: "aberto", highlight: false, complete: true,
    github: "https://github.com/shalasch/product-import-automation",
  },
  {
    id: 8, category: "automation",
    PT: { title: "WhatsApp Lead Automation", subtitle: "n8n + Twilio + Airtable", desc: "Sistema completo de captura e qualificação de leads via WhatsApp com follow-ups automáticos e handler de status de entrega." },
    EN: { title: "WhatsApp Lead Automation", subtitle: "n8n + Twilio + Airtable", desc: "Full WhatsApp lead capture and qualification system with automated follow-ups and delivery status handling." },
    tags: ["n8n", "Twilio", "Airtable"], color: "#4ade80", icon: <Workflow size={16} strokeWidth={1.5} />, price: { PT: "Consultar", EN: "Get quote" }, deliverable: "demanda", highlight: false, complete: true,
  },
  {
    id: 9, category: "automation",
    PT: { title: "Lead Intake & Qualification", subtitle: "Make.com · Gmail · CRM", desc: "Pipeline de qualificação: captura o lead, classifica por score, envia emails personalizados e notifica o time de vendas." },
    EN: { title: "Lead Intake & Qualification", subtitle: "Make.com · Gmail · CRM", desc: "Qualification pipeline: captures leads, scores them, sends segmented emails and notifies the sales team automatically." },
    tags: ["Make.com", "Gmail", "Lead Score"], color: "#fb923c", icon: <Database size={16} strokeWidth={1.5} />, price: { PT: "Consultar", EN: "Get quote" }, deliverable: "demanda", highlight: false, complete: true,
  },
];

const catKeys = {
  PT: ["Todos", "Dashboards", "Agentes IA", "Automações"],
  EN: ["All", "Dashboards", "AI Agents", "Automations"],
};
const catIds = ["all", "dashboard", "agent", "automation"];

const stats = [
  { val: "9+", key: 0 }, { val: "24h", key: 1 },
  { val: "3", key: 2 }, { val: "100%", key: 3 },
];

const contacts = [
  { icon: <MessageCircle size={15} strokeWidth={1.5} />, label: "WhatsApp", href: "https://wa.me/5521967533689", color: "#25d366" },
  { icon: <Mail size={15} strokeWidth={1.5} />, label: "Email", href: "mailto:shaladrive@gmail.com", color: "#7dd3fc" },
  { icon: <Linkedin size={15} strokeWidth={1.5} />, label: "LinkedIn", href: "https://linkedin.com/in/shala-n-92bb56339", color: "#0a66c2" },
  { icon: <Github size={15} strokeWidth={1.5} />, label: "GitHub", href: "https://github.com/shalasch", color: "#e2e8f0" },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ p, lang, c }) {
  const [hov, setHov] = useState(false);
  const t = p[lang];
  const delLabel = c.deliverables[p.deliverable];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.018)",
        border: `1px solid ${hov ? p.color + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10,
        padding: "22px",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* top line accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: hov ? `linear-gradient(90deg, transparent, ${p.color}80, transparent)` : "transparent",
        transition: "all 0.3s",
      }} />

      {/* badges */}
      <div style={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 6 }}>
        {p.highlight && (
          <div style={{ fontSize: 7, letterSpacing: 2, padding: "3px 8px", background: p.color + "18", color: p.color, borderRadius: 3, border: `1px solid ${p.color}35` }}>
            DESTAQUE
          </div>
        )}
        {!p.complete && (
          <div style={{ fontSize: 7, letterSpacing: 2, padding: "3px 8px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
            {c.incomplete}
          </div>
        )}
      </div>

      {/* icon + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingRight: 80 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: p.color + "12", border: `1px solid ${p.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: p.color, flexShrink: 0,
        }}>
          {p.icon}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.3 }}>{t.title}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: 1, marginTop: 1 }}>{t.subtitle}</div>
        </div>
      </div>

      {/* desc */}
      <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, marginBottom: 16, flex: 1 }}>
        {t.desc}
      </div>

      {/* tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 18 }}>
        {p.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: 9, padding: "2px 7px", borderRadius: 3, letterSpacing: 0.5,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>{delLabel?.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" style={{
              width: 30, height: 30, borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.09)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.35)", textDecoration: "none",
            }}>
              <Github size={13} strokeWidth={1.5} />
            </a>
          )}
          <a
            href="https://wa.me/5521967533689"
            target="_blank" rel="noreferrer"
            style={{
              padding: "7px 13px", borderRadius: 7,
              background: hov ? p.color : "rgba(255,255,255,0.04)",
              color: hov ? "#000" : "rgba(255,255,255,0.4)",
              border: `1px solid ${hov ? p.color : "rgba(255,255,255,0.08)"}`,
              fontSize: 10, fontWeight: 600, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.2s",
            }}
          >
            {c.contactLabel} <ChevronRight size={10} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("PT");
  const [cat, setCat] = useState("all");
  const c = copy[lang];

  const filtered = cat === "all" ? projects : projects.filter((p) => p.category === cat);
  const catLabels = catKeys[lang];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030507",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Subtle grid bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav style={{
          padding: "16px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "sticky", top: 0,
          background: "rgba(3,5,7,0.88)",
          backdropFilter: "blur(16px)",
          zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Terminal size={16} strokeWidth={1.5} style={{ color: "#7dd3fc" }} />
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace" }}>
              sha<span style={{ color: "#7dd3fc" }}>.dev</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Lang toggle */}
            <div style={{
              display: "flex", borderRadius: 7, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {["PT", "EN"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "6px 14px", fontSize: 11, fontWeight: 600,
                  background: lang === l ? "rgba(125,211,252,0.12)" : "transparent",
                  color: lang === l ? "#7dd3fc" : "rgba(255,255,255,0.3)",
                  border: "none", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
                  transition: "all 0.15s",
                }}>
                  {l}
                </button>
              ))}
            </div>

            <a href="https://github.com/shalasch" target="_blank" rel="noreferrer" style={{
              padding: "7px 14px", borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)", fontSize: 11,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <Github size={13} strokeWidth={1.5} /> GitHub
            </a>

            <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer" style={{
              padding: "7px 16px", borderRadius: 7,
              background: "#7dd3fc", color: "#030507",
              fontSize: 11, fontWeight: 700,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            }}>
              <MessageCircle size={13} strokeWidth={2} /> {c.cta1}
            </a>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ padding: "88px 40px 56px", maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 12px", borderRadius: 4,
            background: "rgba(125,211,252,0.07)",
            border: "1px solid rgba(125,211,252,0.2)",
            fontSize: 10, color: "#7dd3fc",
            letterSpacing: 3, marginBottom: 32,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7dd3fc", boxShadow: "0 0 6px #7dd3fc" }} />
            {c.badge}
          </div>

          <h1 style={{
            margin: "0 0 24px",
            fontSize: "clamp(30px, 5.5vw, 58px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#f1f5f9",
          }}>
            {c.h1a}<br />
            <span style={{ color: "#7dd3fc" }}>{c.h1b}</span><br />
            {c.h1c}
          </h1>

          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.38)",
            maxWidth: 500, lineHeight: 1.8,
            margin: "0 0 40px", fontWeight: 400,
          }}>
            {c.sub}
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://wa.me/5521967533689" style={{
              padding: "12px 24px", borderRadius: 8,
              background: "#7dd3fc", color: "#030507",
              fontWeight: 700, fontSize: 13,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
            }}>
              <MessageCircle size={14} strokeWidth={2} /> {c.cta1}
            </a>
            <a href="https://github.com/shalasch" style={{
              padding: "12px 24px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.45)", fontWeight: 500, fontSize: 13,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
            }}>
              <Github size={14} strokeWidth={1.5} /> {c.cta2}
            </a>
          </div>
        </div>

        {/* STATS */}
        <div style={{ padding: "0 40px 64px", maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "22px 16px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: "rgba(255,255,255,0.015)",
              }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", letterSpacing: -1, fontFamily: "'JetBrains Mono', monospace" }}>{s.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2, marginTop: 4 }}>{c.stats[s.key].toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div style={{ padding: "0 40px 80px", maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>{c.sectionTitle}</div>
            <div style={{ display: "flex", gap: 5 }}>
              {catLabels.map((label, i) => (
                <button key={i} onClick={() => setCat(catIds[i])} style={{
                  padding: "6px 14px", borderRadius: 6, fontSize: 11,
                  border: `1px solid ${cat === catIds[i] ? "#7dd3fc50" : "rgba(255,255,255,0.07)"}`,
                  background: cat === catIds[i] ? "rgba(125,211,252,0.08)" : "transparent",
                  color: cat === catIds[i] ? "#7dd3fc" : "rgba(255,255,255,0.3)",
                  cursor: "pointer", transition: "all 0.15s",
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: cat === catIds[i] ? 600 : 400,
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 14,
          }}>
            {filtered.map((p) => <Card key={p.id} p={p} lang={lang} c={c} />)}
          </div>
        </div>

        {/* CONTACT */}
        <div style={{ padding: "0 40px 80px", maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            border: "1px solid rgba(125,211,252,0.15)",
            borderRadius: 12, padding: "40px",
            background: "rgba(125,211,252,0.03)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
          }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#7dd3fc", marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>
                {c.contactTitle.toUpperCase()}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", letterSpacing: -0.5, marginBottom: 10 }}>
                {c.ctaTitle}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
                {c.ctaDesc}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
              {contacts.map((contact) => (
                <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer" style={{
                  padding: "12px 18px", borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 12, fontWeight: 500, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 10,
                  transition: "all 0.2s",
                }}>
                  <span style={{ color: contact.color }}>{contact.icon}</span>
                  {contact.label}
                  <ArrowUpRight size={11} strokeWidth={2} style={{ marginLeft: "auto", opacity: 0.4 }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          padding: "20px 40px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
            sha<span style={{ color: "#7dd3fc" }}>.dev</span>
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace" }}>
            {c.footerSub}
          </div>
        </div>
      </div>
    </div>
  );
}
