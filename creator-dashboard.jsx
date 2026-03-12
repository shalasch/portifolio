import { useState } from "react";
import { Sun, Moon, X, Check, TrendingUp, Users, Eye, Heart, Play, MessageCircle, Target, Edit3, Save } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const i18n = {
  PT: {
    badge: "CREATOR ANALYTICS",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    editBtn: "Editar",
    saveBtn: "Salvar",
    cancelBtn: "Cancelar",
    modalTitle: "Personalizar",
    modalSubtitle: "Editar Dashboard",
    youtube: "YouTube",
    instagram: "Instagram",
    sections: { geral: "Geral", youtube: "YouTube", instagram: "Instagram", metas: "Metas", historico: "Histórico", conteudo: "Conteúdo" },
    kpis: {
      ytViews: "VISUALIZAÇÕES", ytSubs: "INSCRITOS", ytHours: "HORAS ASSISTIDAS", ytCTR: "CTR MÉDIO",
      igReach: "ALCANCE", igFollowers: "SEGUIDORES", igSaves: "SALVAMENTOS", igEngagement: "ENGAJAMENTO",
    },
    charts: { ytViews: "VIEWS — 6 MESES", ytSubs: "NOVOS INSCRITOS", igReach: "ALCANCE — 6 MESES", igFollows: "NOVOS SEGUIDORES" },
    topVideos: "TOP VÍDEOS", calendar: "CALENDÁRIO EDITORIAL", goals: "METAS DO MÊS",
    vsLastMonth: "vs mês anterior",
    goal: "meta",
    fields: {
      channelName: "NOME DO CANAL", month: "MÊS DE REFERÊNCIA", accentColor: "COR DE DESTAQUE (HEX)",
      ytViews: "VISUALIZAÇÕES", ytViewsChange: "VARIAÇÃO % vs MÊS ANTERIOR",
      ytSubs: "INSCRITOS", ytSubsChange: "VARIAÇÃO % INSCRITOS",
      ytHours: "HORAS ASSISTIDAS", ytHoursChange: "VARIAÇÃO % HORAS",
      ytCTR: "CTR MÉDIO", ytCTRChange: "VARIAÇÃO % CTR",
      igReach: "ALCANCE", igReachChange: "VARIAÇÃO % ALCANCE",
      igFollowers: "SEGUIDORES", igFollowersChange: "VARIAÇÃO % SEGUIDORES",
      igSaves: "SALVAMENTOS", igSavesChange: "VARIAÇÃO % SALVAMENTOS",
      igEngagement: "ENGAJAMENTO", igEngagementChange: "VARIAÇÃO % ENGAJAMENTO",
      goalYtSubs: "META — INSCRITOS YOUTUBE", currentYtSubs: "ATUAL — INSCRITOS YOUTUBE",
      goalIgFollowers: "META — SEGUIDORES INSTAGRAM", currentIgFollowers: "ATUAL — SEGUIDORES INSTAGRAM",
      goalRevenue: "META — RECEITA MENSAL (R$)", currentRevenue: "ATUAL — RECEITA (R$)",
      goalVideos: "META — VÍDEOS NO MÊS", currentVideos: "ATUAL — VÍDEOS FEITOS",
      months: "MESES (separados por vírgula)", ytViewsHistory: "VIEWS YOUTUBE (6 valores, vírgula)",
      ytSubsHistory: "INSCRITOS YOUTUBE (6 valores)", igReachHistory: "ALCANCE INSTAGRAM (6 valores)",
      igFollowsHistory: "SEGUIDORES INSTAGRAM (6 valores)",
      content: "CONTEÚDO",
    },
    hints: {
      month: "Ex: Mar 2025", accentColor: "Ex: #7dd3fc ou #34d399",
      months: "Ex: Set,Out,Nov,Dez,Jan,Fev", ytViewsHistory: "Ex: 8400,12900,11200,24000,38800,52400",
      ytSubsHistory: "Ex: 120,210,180,390,640,820", igReachHistory: "Ex: 3200,5800,4900,9200,14600,21300",
      igFollowsHistory: "Ex: 45,89,72,156,248,362", ytCTR: "Ex: 6.8%",
      contentFormat: "Formato: Tipo — Tópico — status",
      contentStatus: "Status: done, today, pending",
    },
    days: ["SEG", "TER", "QUA", "QUI", "SEX"],
    goalLabels: ["Inscritos YouTube", "Seguidores Instagram", "Receita Mensal", "Vídeos no Mês"],
    ctr: "CTR",
  },
  EN: {
    badge: "CREATOR ANALYTICS",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    editBtn: "Edit",
    saveBtn: "Save",
    cancelBtn: "Cancel",
    modalTitle: "Customize",
    modalSubtitle: "Edit Dashboard",
    youtube: "YouTube",
    instagram: "Instagram",
    sections: { geral: "General", youtube: "YouTube", instagram: "Instagram", metas: "Goals", historico: "History", conteudo: "Content" },
    kpis: {
      ytViews: "VIEWS", ytSubs: "SUBSCRIBERS", ytHours: "WATCH HOURS", ytCTR: "AVG CTR",
      igReach: "REACH", igFollowers: "FOLLOWERS", igSaves: "SAVES", igEngagement: "ENGAGEMENT",
    },
    charts: { ytViews: "VIEWS — 6 MONTHS", ytSubs: "NEW SUBSCRIBERS", igReach: "REACH — 6 MONTHS", igFollows: "NEW FOLLOWERS" },
    topVideos: "TOP VIDEOS", calendar: "EDITORIAL CALENDAR", goals: "MONTHLY GOALS",
    vsLastMonth: "vs last month",
    goal: "goal",
    fields: {
      channelName: "CHANNEL NAME", month: "REFERENCE MONTH", accentColor: "ACCENT COLOR (HEX)",
      ytViews: "VIEWS", ytViewsChange: "% CHANGE vs LAST MONTH",
      ytSubs: "SUBSCRIBERS", ytSubsChange: "% CHANGE SUBSCRIBERS",
      ytHours: "WATCH HOURS", ytHoursChange: "% CHANGE HOURS",
      ytCTR: "AVG CTR", ytCTRChange: "% CHANGE CTR",
      igReach: "REACH", igReachChange: "% CHANGE REACH",
      igFollowers: "FOLLOWERS", igFollowersChange: "% CHANGE FOLLOWERS",
      igSaves: "SAVES", igSavesChange: "% CHANGE SAVES",
      igEngagement: "ENGAGEMENT RATE", igEngagementChange: "% CHANGE ENGAGEMENT",
      goalYtSubs: "GOAL — YOUTUBE SUBSCRIBERS", currentYtSubs: "CURRENT — YOUTUBE SUBSCRIBERS",
      goalIgFollowers: "GOAL — INSTAGRAM FOLLOWERS", currentIgFollowers: "CURRENT — INSTAGRAM FOLLOWERS",
      goalRevenue: "GOAL — MONTHLY REVENUE ($)", currentRevenue: "CURRENT — REVENUE ($)",
      goalVideos: "GOAL — VIDEOS THIS MONTH", currentVideos: "CURRENT — VIDEOS DONE",
      months: "MONTHS (comma separated)", ytViewsHistory: "YOUTUBE VIEWS (6 values, comma)",
      ytSubsHistory: "YOUTUBE SUBSCRIBERS (6 values)", igReachHistory: "INSTAGRAM REACH (6 values)",
      igFollowsHistory: "INSTAGRAM FOLLOWERS (6 values)",
      content: "CONTENT",
    },
    hints: {
      month: "E.g.: Mar 2025", accentColor: "E.g.: #7dd3fc or #34d399",
      months: "E.g.: Sep,Oct,Nov,Dec,Jan,Feb", ytViewsHistory: "E.g.: 8400,12900,11200,24000,38800,52400",
      ytSubsHistory: "E.g.: 120,210,180,390,640,820", igReachHistory: "E.g.: 3200,5800,4900,9200,14600,21300",
      igFollowsHistory: "E.g.: 45,89,72,156,248,362", ytCTR: "E.g.: 6.8%",
      contentFormat: "Format: Type — Topic — status",
      contentStatus: "Status: done, today, pending",
    },
    days: ["MON", "TUE", "WED", "THU", "FRI"],
    goalLabels: ["YouTube Subscribers", "Instagram Followers", "Monthly Revenue", "Videos This Month"],
    ctr: "CTR",
  },
};

// ─── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#04060a", surface: "#0d1117", surface2: "#161b22",
    border: "rgba(255,255,255,0.07)", text: "#f0f6fc",
    textMuted: "rgba(255,255,255,0.4)", textDim: "rgba(255,255,255,0.18)",
    grid: "rgba(255,255,255,0.018)", overlay: "rgba(0,0,0,0.75)",
    input: "#0d1117", inputBorder: "rgba(255,255,255,0.12)",
  },
  light: {
    bg: "#f0f4f8", surface: "#ffffff", surface2: "#e8edf2",
    border: "rgba(0,0,0,0.08)", text: "#0d1117",
    textMuted: "rgba(0,0,0,0.5)", textDim: "rgba(0,0,0,0.25)",
    grid: "rgba(0,0,0,0.025)", overlay: "rgba(0,0,0,0.5)",
    input: "#f8fafc", inputBorder: "rgba(0,0,0,0.15)",
  },
};

const DEFAULT = {
  channelName: "My Channel",
  month: "Mar 2025",
  ytViews: "52.4K", ytViewsChange: 35,
  ytSubs: "8.72K", ytSubsChange: 22,
  ytHours: "2.6K", ytHoursChange: 50,
  ytCTR: "6.8%", ytCTRChange: 8,
  igReach: "21.3K", igReachChange: 46,
  igFollowers: "6.24K", igFollowersChange: 17,
  igSaves: "840", igSavesChange: 42,
  igEngagement: "4.2%", igEngagementChange: 12,
  goalYtSubs: 10000, currentYtSubs: 8720,
  goalIgFollowers: 8000, currentIgFollowers: 6240,
  goalRevenue: 6000, currentRevenue: 4200,
  goalVideos: 12, currentVideos: 8,
  ytViewsHistory: "8400,12900,11200,24000,38800,52400",
  ytSubsHistory: "120,210,180,390,640,820",
  igReachHistory: "3200,5800,4900,9200,14600,21300",
  igFollowsHistory: "45,89,72,156,248,362",
  months: "Sep,Oct,Nov,Dec,Jan,Feb",
  content1: "Short — Hook: creator mistake #1 — done",
  content2: "Carousel — 5 free AI tools — done",
  content3: "Short — First income online — today",
  content4: "Reels — Notion tutorial 60s — pending",
  content5: "Long — Full AI automation guide — pending",
  accentColor: "#7dd3fc",
};

const YT = "#ff4444";
const IG = "#e1306c";

const topVideos = [
  { title: "How to use AI to create content", views: 18400, ctr: 8.2 },
  { title: "Make money with templates", views: 12900, ctr: 6.8 },
  { title: "Automate your business in 1h", views: 9200, ctr: 5.4 },
];

function parseHistory(str) {
  return str.split(",").map(v => parseFloat(v.trim()) || 0);
}
function parseContent(str) {
  const parts = str.split("—").map(s => s.trim());
  return { type: parts[0] || "", topic: parts[1] || "", status: parts[2] || "pending" };
}

function StatCard({ label, value, change, icon, color, t, lang }) {
  const up = parseFloat(change) >= 0;
  const tr = i18n[lang];
  return (
    <div style={{ padding: "16px 18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}`, transition: "all 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
        <div style={{ color, opacity: 0.7 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -1, fontFamily: "'JetBrains Mono',monospace", marginBottom: 5 }}>{value}</div>
      <div style={{ fontSize: 10, color: up ? "#34d399" : "#f87171", fontWeight: 600 }}>
        {up ? "▲" : "▼"} {Math.abs(parseFloat(change))}% {tr.vsLastMonth}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, t, type = "text", hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace", marginBottom: hint ? 3 : 5 }}>{label}</div>
      {hint && <div style={{ fontSize: 9, color: t.textMuted, marginBottom: 5, lineHeight: 1.5 }}>{hint}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: `1px solid ${t.inputBorder}`, background: t.input, color: t.text, fontSize: 12, fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

export default function CreatorDashboard() {
  const [mode, setMode] = useState("dark");
  const [lang, setLang] = useState("EN");
  const [platform, setPlatform] = useState("youtube");
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState(DEFAULT);
  const [draft, setDraft] = useState(DEFAULT);
  const [editSection, setEditSection] = useState("geral");

  const t = themes[mode];
  const tr = i18n[lang];
  const set = (key, val) => setDraft(p => ({ ...p, [key]: val }));
  const save = () => { setData(draft); setEditOpen(false); };
  const cancel = () => { setDraft(data); setEditOpen(false); };

  const months = data.months.split(",").map(s => s.trim());
  const ytMonthly = months.map((m, i) => ({ m, views: parseHistory(data.ytViewsHistory)[i] || 0, subs: parseHistory(data.ytSubsHistory)[i] || 0 }));
  const igMonthly = months.map((m, i) => ({ m, reach: parseHistory(data.igReachHistory)[i] || 0, follows: parseHistory(data.igFollowsHistory)[i] || 0 }));

  const contents = [data.content1, data.content2, data.content3, data.content4, data.content5].map((c, i) => ({
    day: tr.days[i], ...parseContent(c),
  }));

  const goals = [
    { label: tr.goalLabels[0], current: +data.currentYtSubs, target: +data.goalYtSubs, color: YT },
    { label: tr.goalLabels[1], current: +data.currentIgFollowers, target: +data.goalIgFollowers, color: IG },
    { label: tr.goalLabels[2], current: +data.currentRevenue, target: +data.goalRevenue, color: "#34d399", prefix: lang === "PT" ? "R$" : "$" },
    { label: tr.goalLabels[3], current: +data.currentVideos, target: +data.goalVideos, color: data.accentColor },
  ];

  const CustomTT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 11, color: t.text }}>
        <div style={{ marginBottom: 4, color: t.textMuted, fontSize: 10 }}>{label}</div>
        {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value?.toLocaleString()}</strong></div>)}
      </div>
    );
  };

  const editSections = Object.entries(tr.sections);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Inter',sans-serif", transition: "all 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${t.grid} 1px,transparent 1px),linear-gradient(90deg,${t.grid} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />

      {/* EDIT MODAL */}
      {editOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: t.overlay, backdropFilter: "blur(4px)" }}>
          <div style={{ width: "90%", maxWidth: 560, maxHeight: "85vh", borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 9, color: data.accentColor, letterSpacing: 3, fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}>{tr.modalTitle.toUpperCase()}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{tr.modalSubtitle}</div>
              </div>
              <button onClick={cancel} style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${t.border}`, background: t.surface2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.textMuted }}>
                <X size={13} />
              </button>
            </div>

            <div style={{ display: "flex", gap: 4, padding: "12px 22px 0", flexShrink: 0, flexWrap: "wrap" }}>
              {editSections.map(([id, label]) => (
                <button key={id} onClick={() => setEditSection(id)} style={{ padding: "5px 12px", borderRadius: 5, fontSize: 10, border: `1px solid ${editSection === id ? data.accentColor + "50" : t.border}`, background: editSection === id ? data.accentColor + "12" : "transparent", color: editSection === id ? data.accentColor : t.textMuted, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", transition: "all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
              {editSection === "geral" && (
                <>
                  <InputField label={tr.fields.channelName} value={draft.channelName} onChange={v => set("channelName", v)} t={t} />
                  <InputField label={tr.fields.month} value={draft.month} onChange={v => set("month", v)} t={t} hint={tr.hints.month} />
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>{tr.fields.accentColor}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {["#7dd3fc","#34d399","#e2ff5d","#c084fc","#fb923c","#f472b6","#ff4444","#ffffff"].map(color => (
                          <div key={color} onClick={() => set("accentColor", color)} style={{ width: 26, height: 26, borderRadius: 6, background: color, cursor: "pointer", border: draft.accentColor === color ? `2px solid ${t.text}` : "2px solid transparent", transition: "transform 0.15s", transform: draft.accentColor === color ? "scale(1.15)" : "scale(1)" }} />
                        ))}
                      </div>
                      <input value={draft.accentColor} onChange={e => set("accentColor", e.target.value)} style={{ width: 90, padding: "6px 10px", borderRadius: 6, border: `1px solid ${t.inputBorder}`, background: t.input, color: t.text, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", outline: "none" }} />
                    </div>
                  </div>
                </>
              )}
              {editSection === "youtube" && (
                <>
                  <InputField label={tr.fields.ytViews} value={draft.ytViews} onChange={v => set("ytViews", v)} t={t} />
                  <InputField label={tr.fields.ytViewsChange} value={draft.ytViewsChange} onChange={v => set("ytViewsChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.ytSubs} value={draft.ytSubs} onChange={v => set("ytSubs", v)} t={t} />
                  <InputField label={tr.fields.ytSubsChange} value={draft.ytSubsChange} onChange={v => set("ytSubsChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.ytHours} value={draft.ytHours} onChange={v => set("ytHours", v)} t={t} />
                  <InputField label={tr.fields.ytHoursChange} value={draft.ytHoursChange} onChange={v => set("ytHoursChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.ytCTR} value={draft.ytCTR} onChange={v => set("ytCTR", v)} t={t} hint={tr.hints.ytCTR} />
                  <InputField label={tr.fields.ytCTRChange} value={draft.ytCTRChange} onChange={v => set("ytCTRChange", v)} t={t} type="number" />
                </>
              )}
              {editSection === "instagram" && (
                <>
                  <InputField label={tr.fields.igReach} value={draft.igReach} onChange={v => set("igReach", v)} t={t} />
                  <InputField label={tr.fields.igReachChange} value={draft.igReachChange} onChange={v => set("igReachChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.igFollowers} value={draft.igFollowers} onChange={v => set("igFollowers", v)} t={t} />
                  <InputField label={tr.fields.igFollowersChange} value={draft.igFollowersChange} onChange={v => set("igFollowersChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.igSaves} value={draft.igSaves} onChange={v => set("igSaves", v)} t={t} />
                  <InputField label={tr.fields.igSavesChange} value={draft.igSavesChange} onChange={v => set("igSavesChange", v)} t={t} type="number" />
                  <InputField label={tr.fields.igEngagement} value={draft.igEngagement} onChange={v => set("igEngagement", v)} t={t} />
                  <InputField label={tr.fields.igEngagementChange} value={draft.igEngagementChange} onChange={v => set("igEngagementChange", v)} t={t} type="number" />
                </>
              )}
              {editSection === "metas" && (
                <>
                  <InputField label={tr.fields.goalYtSubs} value={draft.goalYtSubs} onChange={v => set("goalYtSubs", v)} t={t} type="number" />
                  <InputField label={tr.fields.currentYtSubs} value={draft.currentYtSubs} onChange={v => set("currentYtSubs", v)} t={t} type="number" />
                  <InputField label={tr.fields.goalIgFollowers} value={draft.goalIgFollowers} onChange={v => set("goalIgFollowers", v)} t={t} type="number" />
                  <InputField label={tr.fields.currentIgFollowers} value={draft.currentIgFollowers} onChange={v => set("currentIgFollowers", v)} t={t} type="number" />
                  <InputField label={tr.fields.goalRevenue} value={draft.goalRevenue} onChange={v => set("goalRevenue", v)} t={t} type="number" />
                  <InputField label={tr.fields.currentRevenue} value={draft.currentRevenue} onChange={v => set("currentRevenue", v)} t={t} type="number" />
                  <InputField label={tr.fields.goalVideos} value={draft.goalVideos} onChange={v => set("goalVideos", v)} t={t} type="number" />
                  <InputField label={tr.fields.currentVideos} value={draft.currentVideos} onChange={v => set("currentVideos", v)} t={t} type="number" />
                </>
              )}
              {editSection === "historico" && (
                <>
                  <InputField label={tr.fields.months} value={draft.months} onChange={v => set("months", v)} t={t} hint={tr.hints.months} />
                  <InputField label={tr.fields.ytViewsHistory} value={draft.ytViewsHistory} onChange={v => set("ytViewsHistory", v)} t={t} hint={tr.hints.ytViewsHistory} />
                  <InputField label={tr.fields.ytSubsHistory} value={draft.ytSubsHistory} onChange={v => set("ytSubsHistory", v)} t={t} hint={tr.hints.ytSubsHistory} />
                  <InputField label={tr.fields.igReachHistory} value={draft.igReachHistory} onChange={v => set("igReachHistory", v)} t={t} hint={tr.hints.igReachHistory} />
                  <InputField label={tr.fields.igFollowsHistory} value={draft.igFollowsHistory} onChange={v => set("igFollowsHistory", v)} t={t} hint={tr.hints.igFollowsHistory} />
                </>
              )}
              {editSection === "conteudo" && (
                <>
                  <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14, lineHeight: 1.7, padding: "10px 12px", background: t.surface2, borderRadius: 7 }}>
                    {tr.hints.contentFormat}<br />
                    {tr.hints.contentStatus}: <span style={{ color: "#34d399" }}>done</span>, <span style={{ color: "#e2ff5d" }}>today</span>, <span style={{ color: t.textMuted }}>pending</span>
                  </div>
                  {[1,2,3,4,5].map(n => (
                    <InputField key={n} label={`${tr.fields.content} ${n} (${tr.days[n-1]})`} value={draft[`content${n}`]} onChange={v => set(`content${n}`, v)} t={t} />
                  ))}
                </>
              )}
            </div>

            <div style={{ padding: "14px 22px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 8, justifyContent: "flex-end", flexShrink: 0 }}>
              <button onClick={cancel} style={{ padding: "9px 18px", borderRadius: 7, border: `1px solid ${t.border}`, background: "transparent", color: t.textMuted, fontSize: 12, cursor: "pointer" }}>{tr.cancelBtn}</button>
              <button onClick={save} style={{ padding: "9px 18px", borderRadius: 7, border: "none", background: data.accentColor, color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Save size={13} strokeWidth={2.5} /> {tr.saveBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* TOPBAR */}
        <div style={{ padding: "16px 28px", borderBottom: `1px solid ${t.border}`, background: t.surface, position: "sticky", top: 0, zIndex: 50, transition: "all 0.3s" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div>
                <div style={{ fontSize: 8, letterSpacing: 4, color: data.accentColor, fontFamily: "'JetBrains Mono',monospace", marginBottom: 1 }}>{tr.badge}</div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: t.text }}>{data.channelName}</div>
              </div>
              <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${t.border}` }}>
                {[{ id: "youtube", label: `▶ ${tr.youtube}`, color: YT }, { id: "instagram", label: `◈ ${tr.instagram}`, color: IG }].map(p => (
                  <button key={p.id} onClick={() => setPlatform(p.id)} style={{ padding: "6px 14px", fontSize: 11, background: platform === p.id ? p.color + "18" : "transparent", color: platform === p.id ? p.color : t.textMuted, border: "none", cursor: "pointer", fontWeight: platform === p.id ? 700 : 400, transition: "all 0.15s" }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: t.textDim, fontFamily: "'JetBrains Mono',monospace" }}>{data.month}</span>
              {/* Lang toggle */}
              <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: `1px solid ${t.border}` }}>
                {["PT","EN"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 10px", fontSize: 10, background: lang === l ? data.accentColor + "18" : "transparent", color: lang === l ? data.accentColor : t.textMuted, border: "none", cursor: "pointer", fontWeight: lang === l ? 700 : 400, fontFamily: "'JetBrains Mono',monospace", transition: "all 0.15s" }}>{l}</button>
                ))}
              </div>
              <button onClick={() => { setDraft(data); setEditOpen(true); }} style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${data.accentColor}40`, background: data.accentColor + "10", color: data.accentColor, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Edit3 size={12} strokeWidth={2} /> {tr.editBtn}
              </button>
              <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")} style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${t.border}`, background: t.surface2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.textMuted }}>
                {mode === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 28px 64px" }}>

          {/* YOUTUBE */}
          {platform === "youtube" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))", gap: 10, marginBottom: 14 }}>
                <StatCard t={t} lang={lang} label={tr.kpis.ytViews} value={data.ytViews} change={data.ytViewsChange} icon={<Eye size={14} />} color={YT} />
                <StatCard t={t} lang={lang} label={tr.kpis.ytSubs} value={data.ytSubs} change={data.ytSubsChange} icon={<Users size={14} />} color={YT} />
                <StatCard t={t} lang={lang} label={tr.kpis.ytHours} value={data.ytHours} change={data.ytHoursChange} icon={<Play size={14} />} color={YT} />
                <StatCard t={t} lang={lang} label={tr.kpis.ytCTR} value={data.ytCTR} change={data.ytCTRChange} icon={<TrendingUp size={14} />} color={YT} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.charts.ytViews}</div>
                  <ResponsiveContainer width="100%" height={110}>
                    <AreaChart data={ytMonthly}>
                      <defs><linearGradient id="ytg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={YT} stopOpacity={0.3}/><stop offset="100%" stopColor={YT} stopOpacity={0}/></linearGradient></defs>
                      <XAxis dataKey="m" tick={{ fontSize: 9, fill: t.textDim }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTT />} />
                      <Area type="monotone" dataKey="views" name={tr.kpis.ytViews} stroke={YT} strokeWidth={2} fill="url(#ytg)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.charts.ytSubs}</div>
                  <ResponsiveContainer width="100%" height={110}>
                    <BarChart data={ytMonthly} barSize={14}>
                      <XAxis dataKey="m" tick={{ fontSize: 9, fill: t.textDim }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTT />} />
                      <Bar dataKey="subs" name={tr.kpis.ytSubs} fill={YT} radius={[3,3,0,0]} opacity={0.85} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.topVideos}</div>
                  {topVideos.map((v, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: t.text, flex: 1, paddingRight: 8, lineHeight: 1.4 }}>{v.title}</span>
                        <span style={{ fontSize: 11, color: YT, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>{(v.views/1000).toFixed(1)}K</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 3, background: t.surface2, borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${v.ctr * 9}%`, background: YT, borderRadius: 2, opacity: 0.8 }} />
                        </div>
                        <span style={{ fontSize: 9, color: t.textDim, fontFamily: "'JetBrains Mono',monospace" }}>{tr.ctr} {v.ctr}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.calendar}</div>
                  {contents.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", padding: "5px 0", borderBottom: i < contents.length - 1 ? `1px solid ${t.border}` : "none" }}>
                      <span style={{ fontSize: 9, color: t.textDim, minWidth: 26, fontFamily: "'JetBrains Mono',monospace" }}>{c.day}</span>
                      <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: data.accentColor + "15", color: data.accentColor, minWidth: 50, textAlign: "center" }}>{c.type}</span>
                      <span style={{ flex: 1, fontSize: 11, color: c.status === "done" ? t.textDim : c.status === "today" ? t.text : t.textMuted, textDecoration: c.status === "done" ? "line-through" : "none" }}>{c.topic}</span>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: c.status === "done" ? "#34d399" : c.status === "today" ? "#e2ff5d" : t.surface2, boxShadow: c.status === "today" ? "0 0 6px #e2ff5d80" : "none" }} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* INSTAGRAM */}
          {platform === "instagram" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))", gap: 10, marginBottom: 14 }}>
                <StatCard t={t} lang={lang} label={tr.kpis.igReach} value={data.igReach} change={data.igReachChange} icon={<Eye size={14} />} color={IG} />
                <StatCard t={t} lang={lang} label={tr.kpis.igFollowers} value={data.igFollowers} change={data.igFollowersChange} icon={<Users size={14} />} color={IG} />
                <StatCard t={t} lang={lang} label={tr.kpis.igSaves} value={data.igSaves} change={data.igSavesChange} icon={<Heart size={14} />} color={IG} />
                <StatCard t={t} lang={lang} label={tr.kpis.igEngagement} value={data.igEngagement} change={data.igEngagementChange} icon={<MessageCircle size={14} />} color={IG} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.charts.igReach}</div>
                  <ResponsiveContainer width="100%" height={110}>
                    <AreaChart data={igMonthly}>
                      <defs><linearGradient id="igg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={IG} stopOpacity={0.3}/><stop offset="100%" stopColor={IG} stopOpacity={0}/></linearGradient></defs>
                      <XAxis dataKey="m" tick={{ fontSize: 9, fill: t.textDim }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTT />} />
                      <Area type="monotone" dataKey="reach" name={tr.kpis.igReach} stroke={IG} strokeWidth={2} fill="url(#igg)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.charts.igFollows}</div>
                  <ResponsiveContainer width="100%" height={110}>
                    <BarChart data={igMonthly} barSize={14}>
                      <XAxis dataKey="m" tick={{ fontSize: 9, fill: t.textDim }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTT />} />
                      <Bar dataKey="follows" name={tr.kpis.igFollowers} fill={IG} radius={[3,3,0,0]} opacity={0.85} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}`, marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>{tr.calendar}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                  {contents.map((c, i) => (
                    <div key={i} style={{ padding: "10px 8px", borderRadius: 8, textAlign: "center", background: c.status === "today" ? IG + "12" : t.surface2, border: `1px solid ${c.status === "today" ? IG + "40" : t.border}` }}>
                      <div style={{ fontSize: 8, color: t.textDim, fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>{c.day}</div>
                      <div style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: data.accentColor + "15", color: data.accentColor, marginBottom: 5, display: "inline-block" }}>{c.type}</div>
                      <div style={{ fontSize: 9, color: c.status === "done" ? t.textDim : t.textMuted, textDecoration: c.status === "done" ? "line-through" : "none", lineHeight: 1.3 }}>{c.topic}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* GOALS */}
          <div style={{ padding: "18px", borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <Target size={11} color={data.accentColor} />
              <div style={{ fontSize: 9, color: t.textDim, letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace" }}>{tr.goals}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16 }}>
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div key={g.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: t.textMuted }}>{g.label}</span>
                      <span style={{ fontSize: 10, color: g.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: t.surface2, borderRadius: 3, marginBottom: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: g.color, borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 9, color: t.textDim, fontFamily: "'JetBrains Mono',monospace" }}>{g.prefix || ""}{g.current.toLocaleString()}</span>
                      <span style={{ fontSize: 9, color: t.textDim, fontFamily: "'JetBrains Mono',monospace" }}>{tr.goal}: {g.prefix || ""}{g.target.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
