import { useState, useMemo, useEffect } from "react";

// ── SEED DATA (demo) ───────────────────────────────────────────────────────────
const SEED_REGISTROS = [];

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUTOS = [
  { id:"c1",  categoria:"Cerveja",      marca:"Skol",             embalagem:"Lata 350ml" },
  { id:"c2",  categoria:"Cerveja",      marca:"Skol",             embalagem:"Long Neck 355ml" },
  { id:"c3",  categoria:"Cerveja",      marca:"Skol",             embalagem:"Garrafa 600ml" },
  { id:"c4",  categoria:"Cerveja",      marca:"Brahma",           embalagem:"Lata 350ml" },
  { id:"c5",  categoria:"Cerveja",      marca:"Brahma",           embalagem:"Long Neck 355ml" },
  { id:"c6",  categoria:"Cerveja",      marca:"Brahma",           embalagem:"Garrafa 600ml" },
  { id:"c7",  categoria:"Cerveja",      marca:"Antarctica",       embalagem:"Lata 350ml" },
  { id:"c8",  categoria:"Cerveja",      marca:"Antarctica",       embalagem:"Garrafa 600ml" },
  { id:"c9",  categoria:"Cerveja",      marca:"Heineken",         embalagem:"Lata 350ml" },
  { id:"c10", categoria:"Cerveja",      marca:"Heineken",         embalagem:"Long Neck 330ml" },
  { id:"c11", categoria:"Cerveja",      marca:"Heineken",         embalagem:"Garrafa 600ml" },
  { id:"c12", categoria:"Cerveja",      marca:"Budweiser",        embalagem:"Lata 350ml" },
  { id:"c13", categoria:"Cerveja",      marca:"Budweiser",        embalagem:"Long Neck 330ml" },
  { id:"c14", categoria:"Cerveja",      marca:"Corona",           embalagem:"Long Neck 330ml" },
  { id:"c15", categoria:"Cerveja",      marca:"Stella Artois",    embalagem:"Lata 350ml" },
  { id:"c16", categoria:"Cerveja",      marca:"Stella Artois",    embalagem:"Long Neck 330ml" },
  { id:"c17", categoria:"Cerveja",      marca:"Original",         embalagem:"Garrafa 600ml" },
  { id:"c18", categoria:"Cerveja",      marca:"Original",         embalagem:"Long Neck 355ml" },
  { id:"c19", categoria:"Cerveja",      marca:"Itaipava",         embalagem:"Lata 350ml" },
  { id:"c20", categoria:"Cerveja",      marca:"Itaipava",         embalagem:"Garrafa 600ml" },
  { id:"c21", categoria:"Cerveja",      marca:"Bohemia",          embalagem:"Long Neck 355ml" },
  { id:"c22", categoria:"Cerveja",      marca:"Spaten",           embalagem:"Lata 350ml" },
  // ── NOVOS SKUs ────────────────────────────────────────────────────────────
  { id:"c23", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Lata 350ml" },
  { id:"c24", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Lata 269ml" },
  { id:"c25", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Garrafa 600ml" },
  { id:"c26", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Long Neck 355ml" },
  { id:"c27", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Garrafa 1L" },
  { id:"c28", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Barril 50L" },
  { id:"c29", categoria:"Cerveja", marca:"Amstel",                   embalagem:"Lata 473ml" },
  { id:"c30", categoria:"Cerveja", marca:"Baden Witbier",            embalagem:"Garrafa 600ml" },
  { id:"c31", categoria:"Cerveja", marca:"Baden Pilsen",             embalagem:"Garrafa 600ml" },
  { id:"c32", categoria:"Cerveja", marca:"Baden Pilsen",             embalagem:"Lata 350ml" },
  { id:"c33", categoria:"Cerveja", marca:"Bavaria",                  embalagem:"Lata 473ml" },
  { id:"c34", categoria:"Cerveja", marca:"Bavaria",                  embalagem:"Lata 350ml" },
  { id:"c35", categoria:"Cerveja", marca:"Bavaria",                  embalagem:"Garrafa 600ml" },
  { id:"c36", categoria:"Cerveja", marca:"Eisenbahn India Pale Ale", embalagem:"Lata 350ml" },
  { id:"c37", categoria:"Cerveja", marca:"Eisenbahn India Pale Ale", embalagem:"Long Neck 355ml" },
  { id:"c38", categoria:"Cerveja", marca:"Eisenbahn Pale Ale",       embalagem:"Lata 350ml" },
  { id:"c39", categoria:"Cerveja", marca:"Eisenbahn Weizenbier",     embalagem:"Long Neck 355ml" },
  { id:"c40", categoria:"Cerveja", marca:"Eisenbahn Session IPA",    embalagem:"Long Neck 355ml" },
  { id:"c41", categoria:"Cerveja", marca:"Eisenbahn Pale Ale",       embalagem:"Long Neck 355ml" },
  { id:"c42", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Lata 350ml" },
  { id:"c43", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Garrafa 600ml" },
  { id:"c44", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Lata 269ml" },
  { id:"c45", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Long Neck 355ml" },
  { id:"c46", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Barril 30L" },
  { id:"c47", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Lata 473ml" },
  { id:"c48", categoria:"Cerveja", marca:"Eisenbahn Pilsen",         embalagem:"Barril 50L" },
  { id:"c49", categoria:"Cerveja", marca:"Eisenbahn Unfiltered",     embalagem:"Lata 350ml" },
  { id:"c50", categoria:"Cerveja", marca:"Eisenbahn Unfiltered",     embalagem:"Long Neck 355ml" },
  { id:"c51", categoria:"Cerveja", marca:"Glacial",                  embalagem:"Lata 350ml" },
  { id:"c52", categoria:"Cerveja", marca:"Glacial",                  embalagem:"Lata 473ml" },
  { id:"c53", categoria:"Cerveja", marca:"Heineken",                 embalagem:"Lata 269ml" },
  { id:"c54", categoria:"Cerveja", marca:"Heineken",                 embalagem:"Lata 250ml" },
  { id:"c55", categoria:"Cerveja", marca:"Heineken",                 embalagem:"Barril 50L" },
  { id:"c56", categoria:"Cerveja", marca:"Heineken",                 embalagem:"Barril 5L" },
  { id:"c57", categoria:"Cerveja", marca:"Heineken",                 embalagem:"Barril 30L" },
  { id:"c58", categoria:"Cerveja", marca:"Heineken 0.0%",            embalagem:"Long Neck 330ml" },
  { id:"c59", categoria:"Cerveja", marca:"Heineken 0.0%",            embalagem:"Lata 350ml" },
  { id:"c60", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Lata 350ml" },
  { id:"c61", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Garrafa 600ml" },
  { id:"c62", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Lata 473ml" },
  { id:"c63", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Garrafa 1L" },
  { id:"c64", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Barril 50L" },
  { id:"c65", categoria:"Cerveja", marca:"Kaiser",                   embalagem:"Barril 30L" },
  { id:"c66", categoria:"Cerveja", marca:"Sol Premium",              embalagem:"Lata 350ml" },
  { id:"c67", categoria:"Cerveja", marca:"Sol Premium",              embalagem:"Long Neck 330ml" },
  { id:"c68", categoria:"Cerveja", marca:"Sol Premium",              embalagem:"Garrafa 600ml" },
  { id:"c69", categoria:"Cerveja", marca:"Sol Premium 0.0%",         embalagem:"Long Neck 330ml" },
];

const CATEGORIAS = ["Todas", "Cerveja"];
const CANAIS = ["Supermercado","Hipermercado","Atacado","Padaria/Mercearia","Conveniência","Bar/Restaurante","Distribuidora"];
const COR_CAT = { "Cerveja":"#f59e0b" };
const PALETA = ["#3b82f6","#f59e0b","#22c55e","#ef4444","#8b5cf6","#06b6d4","#f97316","#ec4899","#84cc16","#14b8a6"];

const fmt   = v => (v != null && !isNaN(v)) ? `R$ ${Number(v).toFixed(2).replace(".",",")}` : "—";
const today = () => new Date().toISOString().slice(0,10);
const ago30 = () => { const d = new Date(); d.setDate(d.getDate()-30); return d.toISOString().slice(0,10); };

function toCSV(regs) {
  const hdr = ["Data","Pesquisador","PDV","Canal","Cidade","Categoria","Marca","Embalagem","Preço"].join(";");
  const rows = regs.map(r => {
    const p = PRODUTOS.find(x=>x.id===r.produtoId)||{};
    return [r.data,r.usuario||"",r.pdv,r.canal,r.cidade,p.categoria,p.marca,p.embalagem,String(r.preco).replace(".",",")].join(";");
  });
  return [hdr,...rows].join("\n");
}

function parseCSV(text) {
  const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = clean.trim().split("\n").filter(l=>l.trim());
  if(lines.length < 2) return [];
  const hdr = lines[0].split(";").map(h=>h.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z]/g,"")
  );
  const idx = k => hdr.findIndex(h=>h.includes(k));
  const iData  = idx("data");
  const iUsuario = idx("pesq") >= 0 ? idx("pesq") : idx("usu");
  const iPdv   = idx("pdv");
  const iCanal = idx("canal");
  const iCidade= idx("cidade");
  const iMarca = idx("marca");
  const iEmb   = idx("embal");
  const iPreco = idx("prec");
  const result = [];
  lines.slice(1).forEach((line, idx)=>{
    if(!line.trim()) return;
    const cols = line.split(";");
    const marca = cols[iMarca]?.trim();
    const emb   = cols[iEmb]?.trim();
    const prod  = PRODUTOS.find(p=>p.marca===marca && p.embalagem===emb);
    if(!prod) return;
    const precoStr = (cols[iPreco]||"0").trim().replace(",",".");
    const preco = parseFloat(precoStr);
    if(!preco || isNaN(preco)) return;
    result.push({
      id: Date.now() + idx + Math.random(),
      produtoId: prod.id,
      preco,
      pdv:     cols[iPdv]?.trim()    || "",
      canal:   cols[iCanal]?.trim()  || "",
      cidade:  cols[iCidade]?.trim() || "",
      data:    cols[iData]?.trim()   || today(),
      usuario: iUsuario >= 0 ? cols[iUsuario]?.trim() || "" : "",
    });
  });
  return result;
}

// ── SHARED PRIMITIVES ─────────────────────────────────────────────────────────
const Ico = ({d,size=16,color="currentColor"}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const IC = {
  plus:"M12 5v14M5 12h14", trash:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  dl:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  check:"M20 6L9 17l-5-5", x:"M18 6L6 18M6 6l12 12",
  store:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  filter:"M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  trend:"M23 6l-9.5 9.5-5-5L1 18", cal:"M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
  upload:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
};

function Bdg({label,color}) {
  return <span style={{background:color+"22",color,border:`1px solid ${color}55`,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700,letterSpacing:.5}}>{label}</span>;
}
function Card({children,style,onClick,onMouseEnter,onMouseLeave}) {
  return <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    style={{background:"#1a1f2e",border:"1px solid #2a3148",borderRadius:14,padding:"20px 22px",...style}}>{children}</div>;
}
function Inp({label,...p}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {label&&<label style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5}}>{label}</label>}
      <input {...p} style={{background:"#0f1219",border:"1px solid #2a3148",borderRadius:8,color:"#e2e8f0",padding:"9px 12px",fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",...(p.style||{})}}/>
    </div>
  );
}
function Sel({label,children,...p}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {label&&<label style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5}}>{label}</label>}
      <select {...p} style={{background:"#0f1219",border:"1px solid #2a3148",borderRadius:8,color:"#e2e8f0",padding:"9px 12px",fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer",...(p.style||{})}}>{children}</select>
    </div>
  );
}
function Btn({children,onClick,v="primary",style,disabled}) {
  const base={border:"none",borderRadius:8,padding:"10px 18px",fontWeight:700,fontSize:13,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:6,opacity:disabled?.5:1,transition:"opacity .15s",...style};
  const vs={primary:{background:"#3b82f6",color:"#fff"},success:{background:"#22c55e",color:"#fff"},danger:{background:"#ef444422",color:"#ef4444",border:"1px solid #ef444433"},ghost:{background:"#ffffff0a",color:"#94a3b8"}};
  return <button onClick={onClick} disabled={disabled} style={{...base,...vs[v]}}>{children}</button>;
}
function Empty({t}) {
  return <div style={{textAlign:"center",padding:"60px 20px",color:"#475569"}}><div style={{fontSize:40,marginBottom:12}}>📭</div><div style={{fontSize:15}}>{t}</div></div>;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({open,onClose,title,children}) {
  useEffect(()=>{ const fn=e=>{if(e.key==="Escape")onClose();}; if(open)window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn); },[open,onClose]);
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000000bb",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#141924",border:"1px solid #2a3148",borderRadius:18,width:"100%",maxWidth:680,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 80px #000a",animation:"modalIn .2s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderBottom:"1px solid #1e2d4a",flexShrink:0}}>
          <span style={{fontWeight:800,fontSize:16,color:"#f1f5f9"}}>{title}</span>
          <button onClick={onClose} style={{background:"#ffffff0f",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",color:"#94a3b8",display:"flex"}}><Ico d={IC.x} size={16}/></button>
        </div>
        <div style={{overflowY:"auto",padding:"20px 24px"}}>{children}</div>
      </div>
    </div>
  );
}

// ── SPARKLINE ─────────────────────────────────────────────────────────────────
function Spark({data,color="#3b82f6",w=100,h=36}) {
  if(!data||data.length<2) return <span style={{color:"#334155",fontSize:11}}>—</span>;
  const mn=Math.min(...data),mx=Math.max(...data);
  const pts=data.map((v,i)=>[(i/(data.length-1))*w, h-((v-mn)/Math.max(mx-mn,.01))*(h-6)-3]);
  const path=pts.map(([x,y],i)=>`${i===0?"M":"L"}${x},${y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{width:w,height:h}}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r={3} fill={color}/>
    </svg>
  );
}

// ── BAR RANGE CHART ───────────────────────────────────────────────────────────
function RangeBar({items}) {
  if(!items.length) return null;
  const maxV = Math.max(...items.map(i=>i.max));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {items.map((item,i)=>(
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontSize:13,fontWeight:700,color:"#cbd5e1"}}>{item.label}</span>
            <span style={{fontSize:12,color:"#64748b"}}>{fmt(item.min)} — {fmt(item.max)}</span>
          </div>
          <div style={{position:"relative",height:12,background:"#0f1219",borderRadius:99}}>
            <div style={{position:"absolute",left:`${(item.min/maxV)*100}%`,width:`${((item.max-item.min)/maxV)*100}%`,height:"100%",background:item.color+"44",borderRadius:99}}/>
            <div style={{position:"absolute",left:`${(item.avg/maxV)*100}%`,transform:"translateX(-50%)",width:4,height:12,background:item.color,borderRadius:99}}/>
          </div>
          <div style={{textAlign:"center",fontSize:11,color:item.color,fontWeight:700,marginTop:3}}>média {fmt(item.avg)}</div>
        </div>
      ))}
      <div style={{fontSize:11,color:"#475569",marginTop:4}}>
        <span>▌ barra = range mín–máx &nbsp; ▏ traço = média</span>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════════════════════════════
const SENHA_ACESSO = "Brasil@062026";

function Login({onLogin}) {
  const [senha,setSenha] = useState("");
  const [erro,setErro]   = useState(false);
  const [show,setShow]   = useState(false);

  const tentar = () => {
    if(senha === SENHA_ACESSO) { onLogin(); }
    else { setErro(true); setSenha(""); setTimeout(()=>setErro(false),2000); }
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0d16",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Inter','Segoe UI',sans-serif"}}>
      <div style={{background:"#141924",border:"1px solid #2a3148",borderRadius:20,padding:"40px 36px",width:"100%",maxWidth:380,boxShadow:"0 32px 80px #000a",display:"flex",flexDirection:"column",gap:24,alignItems:"center"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>🍺</div>
          <div style={{fontWeight:800,fontSize:20,color:"#f1f5f9",letterSpacing:-.3}}>Pesquisa de Mercado</div>
          <div style={{color:"#475569",fontSize:13,marginTop:6}}>Digite a senha para acessar</div>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{position:"relative"}}>
            <input
              type={show?"text":"password"}
              value={senha}
              onChange={e=>{setSenha(e.target.value);setErro(false);}}
              onKeyDown={e=>e.key==="Enter"&&tentar()}
              placeholder="Senha de acesso"
              autoFocus
              style={{width:"100%",boxSizing:"border-box",background:"#0f1219",border:`1px solid ${erro?"#ef4444":"#2a3148"}`,borderRadius:10,color:"#e2e8f0",padding:"12px 44px 12px 16px",fontSize:15,outline:"none",transition:"border-color .2s"}}
            />
            <button onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#475569",fontSize:16,padding:0}}>
              {show?"🙈":"👁"}
            </button>
          </div>
          {erro&&<div style={{color:"#f87171",fontSize:13,textAlign:"center",fontWeight:600}}>Senha incorreta. Tente novamente.</div>}
        </div>
        <button onClick={tentar}
          style={{width:"100%",background:"#3b82f6",color:"#fff",border:"none",borderRadius:10,padding:"13px",fontWeight:700,fontSize:15,cursor:"pointer"}}>
          Entrar
        </button>
        <div style={{color:"#334155",fontSize:11}}>Acesso restrito à equipe autorizada</div>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
const TABS = ["🗂 Resumo","📋 Registrar","📊 Comparativo","📈 Histórico","🏪 PDVs"];

export default function App() {
  const [tab,setTab]       = useState(0);
  const [logado,setLogado] = useState(false);
  const [regs,setRegs]     = useState(SEED_REGISTROS);
  const [pdvs,setPdvs]     = useState([]);
  const [toast,setToast]   = useState(null);

  if(!logado) return <Login onLogin={()=>setLogado(true)}/>;

  const notify = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const addReg = r => { setRegs(p=>[r,...p]); notify("Preço registrado!"); };
  const delReg = id => setRegs(p=>p.filter(r=>r.id!==id));
  const addPDV = p => { setPdvs(p2=>[...p2,p]); notify("PDV cadastrado!"); };
  const delPDV = id => setPdvs(p=>p.filter(x=>x.id!==id));
  const importRegs = (novos) => {
    setRegs(p=>{
      const existentes = new Set(p.map(r=>`${r.produtoId}|${r.pdv}|${r.data}`));
      const filtrados = novos.filter(r=>!existentes.has(`${r.produtoId}|${r.pdv}|${r.data}`));
      return [...p,...filtrados];
    });
    notify(`Histórico importado com sucesso!`);
  };
  const doExport = () => {
    const blob=new Blob(["\uFEFF"+toCSV(regs)],{type:"text/csv;charset=utf-8;"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`precos_${today()}.csv`; a.click();
    notify("Exportado!");
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0d16",color:"#e2e8f0",fontFamily:"'Inter','Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      <div style={{background:"linear-gradient(135deg,#111827,#1a2035)",borderBottom:"1px solid #1e2d4a",padding:"18px 24px 0",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>🍺</span>
                <span style={{fontWeight:800,fontSize:18,color:"#f1f5f9",letterSpacing:-.3}}>Pesquisa de Mercado</span>
                <span style={{fontSize:11,color:"#3b82f6",background:"#3b82f611",border:"1px solid #3b82f633",padding:"2px 8px",borderRadius:20,fontWeight:600}}>PRO</span>
              </div>
              <div style={{color:"#64748b",fontSize:12,marginTop:2}}>Pesquisa de preços · Bebidas Brasil</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:"#64748b",fontSize:12}}>{regs.length} registros</span>
              {regs.length>0&&<Btn onClick={doExport} v="ghost" style={{fontSize:12,padding:"7px 12px"}}><Ico d={IC.dl} size={14}/>CSV</Btn>}
            </div>
          </div>
          <div style={{display:"flex",gap:2,overflowX:"auto"}}>
            {TABS.map((t,i)=>(
              <button key={i} onClick={()=>setTab(i)} style={{background:tab===i?"#1e2d4a":"transparent",color:tab===i?"#60a5fa":"#64748b",border:"none",borderRadius:"8px 8px 0 0",padding:"10px 16px",cursor:"pointer",fontWeight:tab===i?700:500,fontSize:13,borderBottom:tab===i?"2px solid #3b82f6":"2px solid transparent",transition:"all .15s",whiteSpace:"nowrap"}}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{flex:1,maxWidth:980,margin:"0 auto",width:"100%",padding:"24px 16px",boxSizing:"border-box"}}>
        {tab===0&&<TabResumo     regs={regs}/>}
        {tab===1&&<TabRegistrar  regs={regs} pdvs={pdvs} addReg={addReg} delReg={delReg} importRegs={importRegs}/>}
        {tab===2&&<TabComp       regs={regs}/>}
        {tab===3&&<TabHist       regs={regs}/>}
        {tab===4&&<TabPDVs       pdvs={pdvs} addPDV={addPDV} delPDV={delPDV}/>}
      </div>

      {toast&&(
        <div style={{position:"fixed",bottom:24,right:24,background:toast.type==="success"?"#166534":"#7f1d1d",border:`1px solid ${toast.type==="success"?"#22c55e44":"#ef444444"}`,color:toast.type==="success"?"#4ade80":"#fca5a5",borderRadius:10,padding:"12px 18px",fontWeight:600,fontSize:14,zIndex:1000,display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px #00000066",animation:"fadeIn .2s ease"}}>
          <Ico d={toast.type==="success"?IC.check:IC.x} size={16}/>{toast.msg}
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(12px)}to{opacity:1;transform:scale(1)}}
        input::placeholder{color:#4a5568} select option{background:#0f1219}
        ::-webkit-scrollbar{width:6px;height:6px} ::-webkit-scrollbar-track{background:#0f1219} ::-webkit-scrollbar-thumb{background:#2a3148;border-radius:99px}
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 0 — RESUMO
// ══════════════════════════════════════════════════════════════════════════════
function TabResumo({regs}) {
  const [dtIni,setDtIni]   = useState(ago30());
  const [dtFim,setDtFim]   = useState(today());
  const [canal,setCanal]   = useState("Todos");
  const [marcasSel,setMS]  = useState([]);
  const [embsSel,setES]    = useState([]);
  const [modal,setModal]   = useState(null);

  const canaisComDados = useMemo(()=>{
    const cs = [...new Set(regs.filter(r=>r.data>=dtIni&&r.data<=dtFim).map(r=>r.canal).filter(Boolean))].sort();
    return ["Todos",...cs];
  },[regs,dtIni,dtFim]);

  const todasMarcas = useMemo(()=>{
    const rs = regs.filter(r=>r.data>=dtIni&&r.data<=dtFim&&(canal==="Todos"||r.canal===canal));
    const ids = new Set(rs.map(r=>r.produtoId));
    return [...new Set(PRODUTOS.filter(p=>ids.has(p.id)).map(p=>p.marca))].sort();
  },[regs,dtIni,dtFim,canal]);

  const todasEmbs = useMemo(()=>{
    const ps = marcasSel.length ? PRODUTOS.filter(p=>marcasSel.includes(p.marca)) : PRODUTOS;
    return [...new Set(ps.map(p=>p.embalagem))].sort((a,b)=>ordemEmb(a)-ordemEmb(b));
  },[marcasSel]);

  const toggleM = m => { setMS(s=>s.includes(m)?s.filter(x=>x!==m):[...s,m]); setES([]); };
  const toggleE = e => setES(s=>s.includes(e)?s.filter(x=>x!==e):[...s,e]);

  const filtered = useMemo(()=>regs.filter(r=>{
    if(r.data<dtIni||r.data>dtFim) return false;
    if(canal!=="Todos"&&r.canal!==canal) return false;
    const p=PRODUTOS.find(x=>x.id===r.produtoId); if(!p) return false;
    if(marcasSel.length&&!marcasSel.includes(p.marca)) return false;
    if(embsSel.length&&!embsSel.includes(p.embalagem)) return false;
    return true;
  }),[regs,dtIni,dtFim,canal,marcasSel,embsSel]);

  const kpis = useMemo(()=>{
    if(!filtered.length) return null;
    const ps=filtered.map(r=>r.preco);
    return { n:filtered.length, pdvs:new Set(filtered.map(r=>r.pdv)).size, marcas:new Set(filtered.map(r=>PRODUTOS.find(x=>x.id===r.produtoId)?.marca)).size, min:Math.min(...ps), max:Math.max(...ps), avg:ps.reduce((a,b)=>a+b,0)/ps.length };
  },[filtered]);

  const porProd = useMemo(()=>{
    const map={};
    filtered.forEach(r=>{ if(!map[r.produtoId]) map[r.produtoId]=[]; map[r.produtoId].push(r); });
    return Object.entries(map).map(([id,rs])=>{
      const p=PRODUTOS.find(x=>x.id===id);
      const ps=rs.map(r=>r.preco), sorted=[...rs].sort((a,b)=>a.data.localeCompare(b.data));
      const mn=Math.min(...ps),mx=Math.max(...ps);
      return { produto:p, regs:sorted, min:mn, max:mx, avg:ps.reduce((a,b)=>a+b,0)/ps.length, spark:sorted.map(r=>r.preco), pdvMin:rs.find(r=>r.preco===mn)?.pdv, pdvMax:rs.find(r=>r.preco===mx)?.pdv, count:rs.length };
    }).sort((a,b)=>a.produto?.marca.localeCompare(b.produto?.marca));
  },[filtered]);

  const porMarca = useMemo(()=>{
    const map={};
    filtered.forEach(r=>{ const p=PRODUTOS.find(x=>x.id===r.produtoId); if(!p) return; if(!map[p.marca]) map[p.marca]=[]; map[p.marca].push(r.preco); });
    return Object.entries(map).map(([marca,ps],i)=>({ label:marca, min:Math.min(...ps), max:Math.max(...ps), avg:ps.reduce((a,b)=>a+b,0)/ps.length, color:PALETA[i%PALETA.length] }));
  },[filtered]);

  const hasDados = filtered.length>0;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <Card>
        <div style={{fontWeight:700,marginBottom:14,color:"#94a3b8",fontSize:12,letterSpacing:.8,display:"flex",alignItems:"center",gap:8}}>
          <Ico d={IC.filter} size={13} color="#3b82f6"/> FILTROS DO RELATÓRIO
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:16}}>
          <Inp label="Data início" type="date" value={dtIni} onChange={e=>setDtIni(e.target.value)}/>
          <Inp label="Data fim"    type="date" value={dtFim} onChange={e=>setDtFim(e.target.value)}/>
          <Sel label="Canal do PDV" value={canal} onChange={e=>{setCanal(e.target.value);setMS([]);setES([]);}}>
            {canaisComDados.map(c=><option key={c}>{c}</option>)}
          </Sel>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5}}>MARCAS</span>
            <button onClick={()=>{setMS(todasMarcas);setES([]);}} style={{background:"none",border:"1px solid #2a3148",borderRadius:6,color:"#64748b",fontSize:11,padding:"2px 8px",cursor:"pointer"}}>Todas</button>
            <button onClick={()=>{setMS([]);setES([]);}} style={{background:"none",border:"1px solid #2a3148",borderRadius:6,color:"#64748b",fontSize:11,padding:"2px 8px",cursor:"pointer"}}>Nenhuma</button>
            {marcasSel.length>0&&<span style={{color:"#3b82f6",fontSize:12}}>{marcasSel.length} selecionadas</span>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {todasMarcas.map((m,i)=>{
              const sel=marcasSel.includes(m), cor=PALETA[i%PALETA.length];
              return <button key={m} onClick={()=>toggleM(m)} style={{background:sel?cor+"33":"#0f1219",border:`1px solid ${sel?cor:"#2a3148"}`,borderRadius:99,color:sel?cor:"#64748b",fontSize:12,fontWeight:sel?700:400,padding:"5px 14px",cursor:"pointer",transition:"all .15s"}}>{m}</button>;
            })}
            {!todasMarcas.length&&<span style={{color:"#475569",fontSize:13}}>Sem dados no período selecionado.</span>}
          </div>
        </div>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5}}>EMBALAGENS</span>
            <button onClick={()=>setES(todasEmbs)} style={{background:"none",border:"1px solid #2a3148",borderRadius:6,color:"#64748b",fontSize:11,padding:"2px 8px",cursor:"pointer"}}>Todas</button>
            <button onClick={()=>setES([])} style={{background:"none",border:"1px solid #2a3148",borderRadius:6,color:"#64748b",fontSize:11,padding:"2px 8px",cursor:"pointer"}}>Nenhuma</button>
            {embsSel.length>0&&<span style={{color:"#f59e0b",fontSize:12}}>{embsSel.length} selecionadas</span>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {todasEmbs.map(e=>{
              const sel=embsSel.includes(e);
              return <button key={e} onClick={()=>toggleE(e)} style={{background:sel?"#f59e0b33":"#0f1219",border:`1px solid ${sel?"#f59e0b":"#2a3148"}`,borderRadius:99,color:sel?"#f59e0b":"#64748b",fontSize:12,fontWeight:sel?700:400,padding:"5px 14px",cursor:"pointer",transition:"all .15s"}}>{embIcon(e)} {e}</button>;
            })}
          </div>
        </div>
      </Card>

      {!hasDados&&<Empty t="Nenhum registro no período. Ajuste os filtros ou vá para Registrar."/>}

      {hasDados&&<>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10}}>
          {[
            {e:"📋",l:"Registros",  v:kpis.n,       c:"#3b82f6"},
            {e:"🏪",l:"PDVs",       v:kpis.pdvs,     c:"#22c55e"},
            {e:"🏷",l:"Marcas",     v:kpis.marcas,   c:"#f59e0b"},
            {e:"⬇️",l:"Menor preço",v:fmt(kpis.min), c:"#4ade80"},
            {e:"⬆️",l:"Maior preço",v:fmt(kpis.max), c:"#f87171"},
            {e:"〜",l:"Preço médio", v:fmt(kpis.avg), c:"#a78bfa"},
          ].map(k=>(
            <Card key={k.l} style={{textAlign:"center",padding:"14px 10px"}}>
              <div style={{fontSize:18,marginBottom:4}}>{k.e}</div>
              <div style={{fontSize:18,fontWeight:800,color:k.c,lineHeight:1}}>{k.v}</div>
              <div style={{color:"#64748b",fontSize:11,marginTop:3}}>{k.l}</div>
            </Card>
          ))}
        </div>

        {porMarca.length>0&&(
          <Card>
            <div style={{fontWeight:700,marginBottom:16,color:"#94a3b8",fontSize:12,letterSpacing:.8,display:"flex",alignItems:"center",gap:8}}>
              <Ico d={IC.trend} size={13} color="#3b82f6"/> RANGE DE PREÇO POR MARCA
            </div>
            <RangeBar items={porMarca}/>
          </Card>
        )}

        <div>
          <div style={{fontWeight:700,marginBottom:12,color:"#94a3b8",fontSize:12,letterSpacing:.8,display:"flex",alignItems:"center",gap:8}}>
            <Ico d={IC.eye} size={13} color="#3b82f6"/> PRODUTOS — clique para ver detalhes
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:12}}>
            {porProd.map(item=>{
              const cor=COR_CAT[item.produto?.categoria]||"#64748b";
              const delta=item.max>0?((item.max-item.min)/item.min*100):0;
              return (
                <div key={item.produto?.id}
                  onClick={()=>setModal(item)}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=cor;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${cor}22`}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a3148";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}
                  style={{background:"#1a1f2e",border:"1px solid #2a3148",borderRadius:14,padding:"18px 18px",cursor:"pointer",transition:"all .18s"}}
                >
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                        <span style={{width:8,height:8,borderRadius:"50%",background:cor,display:"inline-block"}}/>
                        <span style={{fontWeight:700,fontSize:14,color:"#e2e8f0"}}>{item.produto?.marca}</span>
                      </div>
                      <div style={{color:"#64748b",fontSize:12}}>{item.produto?.embalagem}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <Bdg label={item.produto?.categoria} color={cor}/>
                      <div style={{color:"#475569",fontSize:11,marginTop:4}}>{item.count} coletas</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
                    {[{l:"MÍN",v:fmt(item.min),c:"#4ade80"},{l:"MÉD",v:fmt(item.avg),c:"#a78bfa"},{l:"MÁX",v:fmt(item.max),c:"#f87171"}].map(m=>(
                      <div key={m.l} style={{background:"#0f1219",borderRadius:8,padding:"8px 4px",textAlign:"center"}}>
                        <div style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:.5,marginBottom:2}}>{m.l}</div>
                        <div style={{fontSize:13,fontWeight:800,color:m.c}}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Spark data={item.spark} color={cor}/>
                    <span style={{fontSize:11,color:delta>15?"#f59e0b":"#475569",fontWeight:delta>15?700:400}}>Δ {delta.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>}

      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?`${modal.produto?.marca} · ${modal.produto?.embalagem}`:""}>
        {modal&&<DetalheModal item={modal}/>}
      </Modal>
    </div>
  );
}

function DetalheModal({item}) {
  const cor = COR_CAT[item.produto?.categoria]||"#64748b";
  const data = item.regs;
  const mn=item.min, mx=item.max;
  const W=540, H=140;
  const pts = data.map((r,i)=>{
    const x=data.length===1?W/2:(i/(data.length-1))*(W-40)+20;
    const y=H-((r.preco-mn)/Math.max(mx-mn,.01))*(H-40)-20;
    return [x,y,r];
  });
  const path=pts.map(([x,y],i)=>`${i===0?"M":"L"}${x},${y}`).join(" ");
  const pdvs=[...new Set(item.regs.map(r=>r.pdv))];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <Bdg label={item.produto?.categoria} color={cor}/>
        <Bdg label={`${item.count} coletas`} color="#3b82f6"/>
        <Bdg label={`${pdvs.length} PDV${pdvs.length>1?"s":""}`} color="#22c55e"/>
        <Bdg label={`Δ ${item.max>0?((item.max-item.min)/item.min*100).toFixed(0):0}%`} color="#f59e0b"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          {l:"PREÇO MÍNIMO",v:fmt(item.min),s:item.pdvMin||"—",c:"#4ade80"},
          {l:"PREÇO MÉDIO", v:fmt(item.avg),s:`${item.count} registros`,c:"#a78bfa"},
          {l:"PREÇO MÁXIMO",v:fmt(item.max),s:item.pdvMax||"—",c:"#f87171"},
        ].map(k=>(
          <div key={k.l} style={{background:"#0f1219",border:`1px solid ${k.c}33`,borderRadius:12,padding:"14px 10px",textAlign:"center"}}>
            <div style={{fontSize:10,color:"#64748b",letterSpacing:.8,marginBottom:6,fontWeight:700}}>{k.l}</div>
            <div style={{fontSize:22,fontWeight:800,color:k.c,lineHeight:1}}>{k.v}</div>
            <div style={{fontSize:11,color:"#475569",marginTop:5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k.s}</div>
          </div>
        ))}
      </div>
      {data.length>1&&(
        <div>
          <div style={{fontWeight:700,marginBottom:8,color:"#94a3b8",fontSize:12,letterSpacing:.5}}>EVOLUÇÃO TEMPORAL</div>
          <div style={{background:"#0f1219",borderRadius:12,padding:"16px 8px",overflowX:"auto"}}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block",minWidth:280}}>
              <defs><linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={cor} stopOpacity=".3"/><stop offset="100%" stopColor={cor} stopOpacity="0"/></linearGradient></defs>
              {[0,.25,.5,.75,1].map((t,i)=>{ const y=H-(t*(H-40))-20; const v=mn+(t*(mx-mn)); return <g key={i}><line x1="20" x2={W-20} y1={y} y2={y} stroke="#1e2d4a" strokeWidth="1"/><text x="14" y={y+4} fontSize="9" fill="#475569" textAnchor="end">{v.toFixed(2)}</text></g>; })}
              <path d={path+` L${pts[pts.length-1][0]},${H-20} L${pts[0][0]},${H-20} Z`} fill="url(#mg2)"/>
              <path d={path} fill="none" stroke={cor} strokeWidth="2.5" strokeLinejoin="round"/>
              {pts.map(([x,y,r],i)=>(<g key={i}><circle cx={x} cy={y} r={5} fill={cor} stroke="#141924" strokeWidth={2}/><text x={x} y={H-4} fontSize="9" fill="#475569" textAnchor="middle">{r.data.slice(5)}</text></g>))}
            </svg>
          </div>
        </div>
      )}
      <div>
        <div style={{fontWeight:700,marginBottom:8,color:"#94a3b8",fontSize:12,letterSpacing:.5}}>TODOS OS REGISTROS</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:200,overflowY:"auto"}}>
          {item.regs.map((r,i)=>{
            const isMin=r.preco===mn, isMax=r.preco===mx;
            return (
              <div key={i} style={{display:"grid",gridTemplateColumns:"88px 1fr auto",gap:8,alignItems:"center",background:"#0f1219",borderRadius:8,padding:"9px 12px"}}>
                <span style={{color:"#64748b",fontSize:12}}>{r.data}</span>
                <div><span style={{fontSize:13,fontWeight:600,color:"#cbd5e1"}}>{r.pdv}</span>{r.canal&&<span style={{color:"#475569",fontSize:11,marginLeft:8}}>{r.canal}</span>}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontWeight:800,fontSize:14,color:isMin?"#4ade80":isMax?"#f87171":"#e2e8f0"}}>{fmt(r.preco)}</span>
                  {isMin&&<span style={{fontSize:10,background:"#4ade8022",color:"#4ade80",borderRadius:4,padding:"1px 5px"}}>MIN</span>}
                  {isMax&&<span style={{fontSize:10,background:"#f8717122",color:"#f87171",borderRadius:4,padding:"1px 5px"}}>MÁX</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{fontWeight:700,marginBottom:8,color:"#94a3b8",fontSize:12,letterSpacing:.5}}>PREÇO MÉDIO POR PDV</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {pdvs.map(pdv=>{
            const rs=item.regs.filter(r=>r.pdv===pdv);
            const avg=rs.reduce((s,r)=>s+r.preco,0)/rs.length;
            const pct=(avg/mx)*100;
            return (
              <div key={pdv} style={{background:"#0f1219",borderRadius:8,padding:"10px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:13,color:"#cbd5e1",fontWeight:600}}>{pdv}</span>
                  <span style={{fontSize:13,fontWeight:800,color:cor}}>{fmt(avg)}</span>
                </div>
                <div style={{background:"#1e2d4a",borderRadius:99,height:5}}>
                  <div style={{background:cor,height:5,borderRadius:99,width:`${pct}%`,transition:"width .4s ease"}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — REGISTRAR
// ══════════════════════════════════════════════════════════════════════════════
const ORDEM_EMBALAGEM = [
  "Lata 250ml","Lata 269ml","Lata 350ml","Lata 473ml",
  "Long Neck 330ml","Long Neck 355ml",
  "Garrafa 600ml","Garrafa 1L",
  "Barril 5L","Barril 30L","Barril 50L",
];

function ordemEmb(emb) {
  const i = ORDEM_EMBALAGEM.indexOf(emb);
  return i === -1 ? 99 : i;
}

function embIcon(emb) {
  if (emb.startsWith("Lata"))      return "🥫";
  if (emb.startsWith("Long Neck")) return "🍺";
  if (emb.startsWith("Garrafa"))   return "🍶";
  if (emb.startsWith("Barril"))    return "🛢";
  return "📦";
}

function centavosToDisplay(c) {
  if (!c && c !== 0) return "";
  return (c / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TabRegistrar({regs,pdvs,addReg,delReg,importRegs}) {
  const [sel,setSel]         = useState({});
  const [pdvN,setPdvN]       = useState("");
  const [canal,setCanal]     = useState("");
  const [cid,setCid]         = useState("");
  const [dt,setDt]           = useState(today());
  const [fMrc,setFM]         = useState("Todas");
  const [usuario,setUsuario] = useState("");
  const [importInfo,setImportInfo] = useState(null);
  const [modalCSV, setModalCSV]   = useState(false);
  const [modalColar, setModalColar] = useState(false);
  const [textoColar, setTextoColar] = useState("");

  const todasMarcas = useMemo(()=>["Todas",...new Set(PRODUTOS.map(p=>p.marca))],[]);

  const grupos = useMemo(()=>{
    const prods = fMrc==="Todas" ? PRODUTOS : PRODUTOS.filter(p=>p.marca===fMrc);
    const g = {};
    prods.forEach(p=>{ if(!g[p.embalagem]) g[p.embalagem]=[]; g[p.embalagem].push(p); });
    Object.values(g).forEach(arr=>arr.sort((a,b)=>a.marca.localeCompare(b.marca)));
    return g;
  },[fMrc]);

  const embsOrdenadas = useMemo(()=>Object.keys(grupos).sort((a,b)=>ordemEmb(a)-ordemEmb(b)),[grupos]);
  const totalPreenchidos = Object.values(sel).filter(v=>v>0).length;

  const salvar = () => {
    const ok = Object.entries(sel).filter(([,v])=>v>0);
    if(!pdvN.trim()) return alert("Informe o PDV.");
    if(!ok.length) return alert("Preencha ao menos um preço.");
    ok.forEach(([id,centavos])=>addReg({id:Date.now()+Math.random(),produtoId:id,preco:centavos/100,pdv:pdvN,canal,cidade:cid,data:dt,usuario:usuario.trim()}));
    setSel({});
  };

  const importarTexto = () => {
    if(!textoColar.trim()) return;
    const novos = parseCSV(textoColar);
    if(!novos.length){ alert("Nenhum registro válido encontrado."); return; }
    importRegs(novos);
    setImportInfo({nome:"texto colado", qtd:novos.length});
    setTextoColar(""); setModalColar(false);
  };


  const handleImport = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const novos = parseCSV(ev.target.result);
      if(!novos.length){ alert("Nenhum registro válido encontrado no arquivo."); return; }
      importRegs(novos);
      setImportInfo({nome:file.name, qtd:novos.length});
    };
    reader.readAsText(file,"utf-8");
    e.target.value="";
  };

  const handlePrecoKey = (id, e) => {
    const key = e.key;
    if (!/^\d$/.test(key) && !["Backspace","Delete","Tab","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(key)) { e.preventDefault(); return; }
    setSel(s => {
      const atual = s[id] || 0;
      if (key==="Backspace"||key==="Delete") return {...s,[id]:Math.floor(atual/10)};
      if (/^\d$/.test(key)) { const novo = atual*10+parseInt(key); if(novo>99999) return s; return {...s,[id]:novo}; }
      return s;
    });
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {/* Salvar */}
        <Card style={{padding:"16px 20px",background:"#0d1a0f",border:"1px solid #1a3a1f"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Ico d={IC.dl} size={15} color="#4ade80"/><span style={{fontWeight:700,fontSize:13,color:"#4ade80"}}>Salvar base local</span></div>
          <div style={{fontSize:12,color:"#475569",marginBottom:12}}>Exibe o CSV para você copiar e salvar como <strong style={{color:"#94a3b8"}}>.csv</strong>.</div>
          <Btn onClick={()=>setModalCSV(true)} v="success" disabled={!regs.length} style={{width:"100%",justifyContent:"center",fontSize:13}}><Ico d={IC.dl} size={14} color="#fff"/>Ver CSV para copiar</Btn>
        </Card>
        <Card style={{padding:"16px 20px",background:"#0f1a2e",border:"1px solid #1a3060"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Ico d={IC.upload} size={15} color="#60a5fa"/><span style={{fontWeight:700,fontSize:13,color:"#60a5fa"}}>Carregar pesquisa anterior</span></div>
          <div style={{fontSize:12,color:"#475569",marginBottom:12}}>{importInfo?<span style={{color:"#4ade80"}}>✓ {importInfo.qtd} registros importados</span>:"Cole o CSV copiado anteriormente para continuar de onde parou."}</div>
          <Btn onClick={()=>setModalColar(true)} style={{width:"100%",justifyContent:"center",fontSize:13,background:"#3b82f622",color:"#60a5fa",border:"1px solid #3b82f644"}}><Ico d={IC.upload} size={14} color="#60a5fa"/>Colar CSV</Btn>
        </Card>
      </div>

      <Card>
        <div style={{fontWeight:700,marginBottom:14,color:"#94a3b8",fontSize:12,letterSpacing:.8,display:"flex",alignItems:"center",gap:8}}><Ico d={IC.store} size={13} color="#3b82f6"/>PONTO DE VENDA</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12}}>
          <Inp label="Pesquisador" value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="Nome do colaborador"/>
          <div>
            <label style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5,display:"block",marginBottom:4}}>PDV / Loja *</label>
            <input value={pdvN} onChange={e=>setPdvN(e.target.value)} list="pdv-dl" placeholder="Ex: Pão de Açúcar Centro"
              style={{background:"#0f1219",border:"1px solid #2a3148",borderRadius:8,color:"#e2e8f0",padding:"9px 12px",fontSize:14,outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <datalist id="pdv-dl">{pdvs.map(p=><option key={p.id} value={p.nome}/>)}</datalist>
          </div>
          <Sel label="Canal" value={canal} onChange={e=>setCanal(e.target.value)}><option value="">Selecione...</option>{CANAIS.map(c=><option key={c}>{c}</option>)}</Sel>
          <Inp label="Cidade" value={cid} onChange={e=>setCid(e.target.value)} placeholder="São Paulo - SP"/>
          <Inp label="Data" type="date" value={dt} onChange={e=>setDt(e.target.value)}/>
        </div>
      </Card>

      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flex:1,minWidth:180}}>
          <span style={{color:"#64748b",fontSize:12,whiteSpace:"nowrap"}}>Filtrar marca:</span>
          <Sel value={fMrc} onChange={e=>setFM(e.target.value)} style={{flex:1}}>{todasMarcas.map(m=><option key={m}>{m}</option>)}</Sel>
        </div>
        {totalPreenchidos>0&&<span style={{background:"#f59e0b22",color:"#f59e0b",border:"1px solid #f59e0b44",borderRadius:8,padding:"6px 14px",fontSize:13,fontWeight:700}}>{totalPreenchidos} preço{totalPreenchidos>1?"s":""} preenchido{totalPreenchidos>1?"s":""}</span>}
        <Btn onClick={()=>setSel({})} v="ghost">Limpar tudo</Btn>
      </div>

      {embsOrdenadas.map(emb=>{
        const ps = grupos[emb];
        const preenchidosNoGrupo = ps.filter(p=>(sel[p.id]||0)>0).length;
        return (
          <Card key={emb} style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:"1px solid #1e2d4a"}}>
              <span style={{fontSize:22}}>{embIcon(emb)}</span>
              <div style={{flex:1}}><span style={{fontWeight:800,fontSize:15,color:"#e2e8f0"}}>{emb}</span><span style={{color:"#475569",fontSize:12,marginLeft:8}}>{ps.length} marca{ps.length>1?"s":""}</span></div>
              {preenchidosNoGrupo>0&&<span style={{background:"#22c55e22",color:"#4ade80",border:"1px solid #22c55e44",borderRadius:6,padding:"3px 10px",fontSize:12,fontWeight:700}}>{preenchidosNoGrupo}/{ps.length}</span>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {ps.map(p=>{
                const preenchido = (sel[p.id]||0) > 0;
                return (
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,background:preenchido?"#0a1a0f":"#0f1219",border:`1px solid ${preenchido?"#22c55e44":"#1e2d3d"}`,borderRadius:10,padding:"10px 16px",transition:"all .15s"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,background:preenchido?"#4ade80":"#2a3148",transition:"background .2s"}}/>
                    <span style={{flex:1,fontWeight:700,fontSize:14,color:preenchido?"#e2e8f0":"#94a3b8"}}>{p.marca}</span>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{color:"#475569",fontSize:13,fontWeight:600}}>R$</span>
                      <input type="text" inputMode="numeric" placeholder="0,00"
                        value={centavosToDisplay(sel[p.id]||0)}
                        onKeyDown={e=>handlePrecoKey(p.id,e)}
                        onChange={()=>{}}
                        style={{background:"transparent",border:"none",borderBottom:`2px solid ${preenchido?"#22c55e":"#2a3148"}`,color:preenchido?"#f1f5f9":"#64748b",fontSize:16,fontWeight:800,width:90,outline:"none",padding:"2px 4px",textAlign:"right",transition:"border-color .15s",cursor:"text"}}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
        <Btn onClick={salvar} v="success" disabled={!totalPreenchidos||!pdvN.trim()} style={{padding:"12px 28px",fontSize:15}}>
          <Ico d={IC.check} size={16} color="#fff"/>Salvar{totalPreenchidos>0?` ${totalPreenchidos} preço${totalPreenchidos>1?"s":""}`:""} coleta
        </Btn>
      </div>

      {regs.length>0&&(
        <Card>
          <div style={{fontWeight:700,marginBottom:12,color:"#94a3b8",fontSize:12}}>ÚLTIMOS REGISTROS</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:280,overflowY:"auto"}}>
            {regs.slice(0,30).map(r=>{ const p=PRODUTOS.find(x=>x.id===r.produtoId)||{};
              return (
                <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0f1219",borderRadius:8,padding:"8px 12px"}}>
                  <div>
                    <span style={{fontWeight:600,fontSize:13}}>{p.marca} {p.embalagem}</span>
                    <span style={{color:"#64748b",fontSize:12,marginLeft:8}}>{r.pdv} · {r.data}</span>
                    {r.usuario&&<span style={{color:"#8b5cf6",fontSize:11,marginLeft:8}}>👤 {r.usuario}</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:"#4ade80",fontWeight:700,fontSize:14}}>{fmt(r.preco)}</span>
                    <button onClick={()=>delReg(r.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#64748b",display:"flex"}}><Ico d={IC.trash} size={14}/></button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Modal open={modalColar} onClose={()=>{setModalColar(false);setTextoColar("");}} title="📋 Colar CSV">
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"#0f1219",borderRadius:10,padding:"12px 16px",fontSize:12,color:"#64748b",lineHeight:1.6}}>Cole abaixo o conteúdo copiado do campo <strong style={{color:"#4ade80"}}>"Ver CSV para copiar"</strong> e clique em <strong style={{color:"#60a5fa"}}>Importar</strong>.</div>
          <textarea value={textoColar} onChange={e=>setTextoColar(e.target.value)} placeholder="Cole aqui o conteúdo CSV (Ctrl+V)..." style={{width:"100%",height:280,background:"#0a0d16",border:"1px solid #2a3148",borderRadius:10,color:"#e2e8f0",fontSize:11,fontFamily:"monospace",padding:"12px",boxSizing:"border-box",resize:"vertical",outline:"none",lineHeight:1.5}}/>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={importarTexto} disabled={!textoColar.trim()} v="primary" style={{padding:"10px 24px"}}><Ico d={IC.check} size={14} color="#fff"/>Importar</Btn>
            <Btn onClick={()=>{setModalColar(false);setTextoColar("");}} v="ghost" style={{padding:"10px 20px"}}>Cancelar</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={modalCSV} onClose={()=>setModalCSV(false)} title="📋 Copiar CSV">
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"#0f1219",borderRadius:10,padding:"12px 16px",fontSize:12,color:"#64748b",lineHeight:1.6}}><strong style={{color:"#e2e8f0"}}>Como salvar:</strong> clique em <strong style={{color:"#4ade80"}}>Copiar tudo</strong>, abra o Bloco de Notas, cole e salve com extensão <strong style={{color:"#f59e0b"}}>.csv</strong></div>
          <textarea id="csv-export-area" readOnly value={toCSV(regs)} onClick={e=>e.target.select()} style={{width:"100%",height:300,background:"#0a0d16",border:"1px solid #2a3148",borderRadius:10,color:"#94a3b8",fontSize:11,fontFamily:"monospace",padding:"12px",boxSizing:"border-box",resize:"vertical",outline:"none",lineHeight:1.5}}/>
          <Btn onClick={()=>{ const ta=document.getElementById("csv-export-area"); if(ta){ta.select();document.execCommand("copy");} }} v="success" style={{alignSelf:"flex-start",padding:"10px 24px"}}><Ico d={IC.check} size={14} color="#fff"/>Copiar tudo</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — COMPARATIVO
// ══════════════════════════════════════════════════════════════════════════════
function TabComp({regs}) {
  const [canal,setCanal] = useState("Todos");
  if(!regs.length) return <Empty t="Nenhum registro ainda."/>;

  const canaisComDados = useMemo(()=>{
    const cs = [...new Set(regs.map(r=>r.canal).filter(Boolean))].sort();
    return ["Todos",...cs];
  },[regs]);

  const regsFiltrados = useMemo(()=>canal==="Todos"?regs:regs.filter(r=>r.canal===canal),[regs,canal]);
  const pdvsFiltrados = useMemo(()=>[...new Set(regsFiltrados.map(r=>r.pdv))].sort(),[regsFiltrados]);

  const tabela = useMemo(()=>{
    return PRODUTOS.map(p=>{
      const rs = regsFiltrados.filter(r=>r.produtoId===p.id);
      const byPdv={};
      pdvsFiltrados.forEach(pdv=>{ const x=rs.filter(r=>r.pdv===pdv); if(x.length) byPdv[pdv]=Math.min(...x.map(r=>r.preco)); });
      const vs=Object.values(byPdv);
      return { ...p, byPdv, min:vs.length?Math.min(...vs):null, max:vs.length?Math.max(...vs):null, temDados:vs.length>0 };
    });
  },[regsFiltrados,pdvsFiltrados]);

  const embsNaTabela = useMemo(()=>[...new Set(PRODUTOS.map(p=>p.embalagem))].sort((a,b)=>ordemEmb(a)-ordemEmb(b)),[]);

  if(!pdvsFiltrados.length) return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <FiltroCanal canal={canal} setCanal={setCanal} canais={canaisComDados}/>
      <Empty t="Sem dados para o canal selecionado."/>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <FiltroCanal canal={canal} setCanal={setCanal} canais={canaisComDados} info={`${PRODUTOS.length} produtos · ${pdvsFiltrados.length} PDV${pdvsFiltrados.length>1?"s":""}`}/>
      <Card style={{overflowX:"auto",padding:0}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead>
            <tr style={{background:"#111827"}}>
              <th style={{padding:"12px 16px",textAlign:"left",color:"#64748b",fontWeight:600,fontSize:11,whiteSpace:"nowrap",borderBottom:"1px solid #1e2d4a",position:"sticky",left:0,background:"#111827",zIndex:1}}>PRODUTO</th>
              {pdvsFiltrados.map(pdv=><th key={pdv} style={{padding:"12px 14px",textAlign:"center",color:"#64748b",fontWeight:600,fontSize:11,whiteSpace:"nowrap",borderBottom:"1px solid #1e2d4a",minWidth:110}}>{pdv}</th>)}
              <th style={{padding:"12px 14px",textAlign:"center",color:"#4ade80",fontWeight:700,fontSize:11,borderBottom:"1px solid #1e2d4a",whiteSpace:"nowrap"}}>MÍN</th>
              <th style={{padding:"12px 14px",textAlign:"center",color:"#f87171",fontWeight:700,fontSize:11,borderBottom:"1px solid #1e2d4a",whiteSpace:"nowrap"}}>MÁX</th>
              <th style={{padding:"12px 14px",textAlign:"center",color:"#94a3b8",fontWeight:600,fontSize:11,borderBottom:"1px solid #1e2d4a"}}>Δ%</th>
            </tr>
          </thead>
          <tbody>
            {embsNaTabela.map(emb=>{
              const linhas = tabela.filter(p=>p.embalagem===emb);
              return (
                <>
                  <tr key={`sep-${emb}`}>
                    <td colSpan={pdvsFiltrados.length+4} style={{padding:"8px 16px",background:"#0d1117",borderBottom:"1px solid #1e2d4a"}}>
                      <span style={{fontSize:12,fontWeight:800,color:"#f59e0b",letterSpacing:.8,display:"flex",alignItems:"center",gap:6}}>{embIcon(emb)} {emb.toUpperCase()}<span style={{color:"#475569",fontWeight:400,fontSize:11}}>— {linhas.length} marca{linhas.length>1?"s":""}</span></span>
                    </td>
                  </tr>
                  {linhas.map((p,i)=>{
                    const d=(p.temDados&&p.min>0)?((p.max-p.min)/p.min*100):null;
                    const rowBg=i%2===0?"#0f1219":"#111827";
                    return (
                      <tr key={p.id} style={{background:rowBg,borderBottom:"1px solid #1a2235",opacity:p.temDados?1:0.45}}>
                        <td style={{padding:"10px 16px",whiteSpace:"nowrap",position:"sticky",left:0,background:rowBg,zIndex:1}}><span style={{fontWeight:700,color:p.temDados?"#e2e8f0":"#475569",fontSize:13}}>{p.marca}</span></td>
                        {pdvsFiltrados.map(pdv=>{ const v=p.byPdv[pdv]; return <td key={pdv} style={{padding:"10px 14px",textAlign:"center"}}>{v!=null?<span style={{color:v===p.min?"#4ade80":v===p.max?"#f87171":"#e2e8f0",fontWeight:v===p.min||v===p.max?800:400}}>{fmt(v)}</span>:<span style={{color:"#1e2d4a"}}>—</span>}</td>; })}
                        <td style={{padding:"10px 14px",textAlign:"center",color:"#4ade80",fontWeight:800}}>{p.temDados?fmt(p.min):<span style={{color:"#1e2d4a"}}>—</span>}</td>
                        <td style={{padding:"10px 14px",textAlign:"center",color:"#f87171",fontWeight:800}}>{p.temDados?fmt(p.max):<span style={{color:"#1e2d4a"}}>—</span>}</td>
                        <td style={{padding:"10px 14px",textAlign:"center"}}>{d!=null?<span style={{background:d>15?"#f59e0b22":d>5?"#3b82f622":"transparent",color:d>15?"#f59e0b":d>5?"#60a5fa":"#475569",fontWeight:d>5?700:400,borderRadius:6,padding:"2px 8px",fontSize:12}}>{d.toFixed(0)}%</span>:<span style={{color:"#1e2d4a",fontSize:12}}>—</span>}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function FiltroCanal({canal,setCanal,canais,info}) {
  const COR_CANAL = {"Supermercado":"#3b82f6","Hipermercado":"#8b5cf6","Atacado":"#f59e0b","Padaria/Mercearia":"#22c55e","Conveniência":"#06b6d4","Bar/Restaurante":"#f97316","Distribuidora":"#ec4899"};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{color:"#8892b0",fontSize:12,fontWeight:600,letterSpacing:.5,whiteSpace:"nowrap"}}>CANAL DO PDV</span>
        {info&&<span style={{color:"#475569",fontSize:12,marginLeft:4}}>{info}</span>}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {canais.map(c=>{ const sel=canal===c; const cor=c==="Todos"?"#64748b":(COR_CANAL[c]||"#64748b"); return <button key={c} onClick={()=>setCanal(c)} style={{background:sel?cor+"33":"#0f1219",border:`1px solid ${sel?cor:"#2a3148"}`,borderRadius:99,color:sel?cor:"#64748b",fontSize:13,fontWeight:sel?700:400,padding:"7px 18px",cursor:"pointer",transition:"all .15s"}}>{c}</button>; })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — HISTÓRICO
// ══════════════════════════════════════════════════════════════════════════════
function TabHist({regs}) {
  const [ps,setPS]=useState("");
  if(!regs.length) return <Empty t="Nenhum registro ainda."/>;
  const comDados=PRODUTOS.filter(p=>regs.some(r=>r.produtoId===p.id));
  const hist=useMemo(()=>!ps?[]:regs.filter(r=>r.produtoId===ps).sort((a,b)=>a.data.localeCompare(b.data)),[ps,regs]);
  const stats=useMemo(()=>{ const t=regs.length,pdvs=new Set(regs.map(r=>r.pdv)).size,pr=new Set(regs.map(r=>r.produtoId)).size,avg=regs.reduce((s,r)=>s+r.preco,0)/t; return {t,pdvs,pr,avg}; },[regs]);
  const mn=hist.length?Math.min(...hist.map(r=>r.preco)):0, mx=hist.length?Math.max(...hist.map(r=>r.preco)):1;
  const W=480,H=120;
  const pts=hist.map((r,i)=>{ const x=hist.length===1?W/2:(i/(hist.length-1))*W; const y=H-((r.preco-mn)/Math.max(mx-mn,.01))*(H-20)-10; return [x,y]; });
  const path=pts.map(([x,y],i)=>`${i===0?"M":"L"}${x},${y}`).join(" ");
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
        {[{l:"Registros",v:stats.t,c:"#3b82f6"},{l:"PDVs",v:stats.pdvs,c:"#22c55e"},{l:"Produtos",v:stats.pr,c:"#f59e0b"},{l:"Preço Médio",v:fmt(stats.avg),c:"#8b5cf6"}].map(s=>(
          <Card key={s.l} style={{textAlign:"center",padding:"16px 12px"}}><div style={{fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div><div style={{color:"#64748b",fontSize:12,marginTop:4}}>{s.l}</div></Card>
        ))}
      </div>
      <Card>
        <div style={{fontWeight:700,marginBottom:14,color:"#94a3b8",fontSize:12,letterSpacing:.5}}>EVOLUÇÃO DE PREÇO</div>
        <Sel value={ps} onChange={e=>setPS(e.target.value)} style={{marginBottom:16}}>
          <option value="">Selecione um produto...</option>
          {comDados.map(p=><option key={p.id} value={p.id}>{p.marca} — {p.embalagem} ({p.categoria})</option>)}
        </Sel>
        {ps&&hist.length>0&&(
          <>
            <div style={{overflowX:"auto"}}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:W,display:"block"}}>
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity=".25"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
                <path d={path+` L${pts[pts.length-1][0]},${H} L${pts[0][0]},${H} Z`} fill="url(#g1)"/>
                <path d={path} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
                {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={4} fill="#3b82f6" stroke="#0a0d16" strokeWidth={2}/>)}
              </svg>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:12,maxHeight:200,overflowY:"auto"}}>
              {hist.map(r=>(
                <div key={r.id} style={{display:"flex",justifyContent:"space-between",background:"#0f1219",borderRadius:8,padding:"8px 12px",fontSize:13}}>
                  <span style={{color:"#94a3b8"}}>{r.data} · {r.pdv}</span>
                  <span style={{fontWeight:700,color:r.preco===mn?"#4ade80":r.preco===mx?"#f87171":"#e2e8f0"}}>{fmt(r.preco)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — PDVs
// ══════════════════════════════════════════════════════════════════════════════
function TabPDVs({pdvs,addPDV,delPDV}) {
  const [n,setN]=useState(""); const [c,setC]=useState(""); const [ci,setCi]=useState("");
  const add=()=>{ if(!n.trim())return; addPDV({id:Date.now(),nome:n,canal:c,cidade:ci}); setN("");setC("");setCi(""); };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <Card>
        <div style={{fontWeight:700,marginBottom:14,color:"#94a3b8",fontSize:12,letterSpacing:.8,display:"flex",alignItems:"center",gap:8}}><Ico d={IC.plus} size={13} color="#3b82f6"/>CADASTRAR PDV</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:14}}>
          <Inp label="Nome da Loja *" value={n} onChange={e=>setN(e.target.value)} placeholder="Ex: Carrefour Paulista"/>
          <Sel label="Canal" value={c} onChange={e=>setC(e.target.value)}><option value="">Selecione...</option>{CANAIS.map(x=><option key={x}>{x}</option>)}</Sel>
          <Inp label="Cidade/Estado" value={ci} onChange={e=>setCi(e.target.value)} placeholder="São Paulo - SP"/>
        </div>
        <Btn onClick={add} v="primary" disabled={!n.trim()}><Ico d={IC.plus} size={14} color="#fff"/>Cadastrar PDV</Btn>
      </Card>
      {pdvs.length>0?(
        <Card>
          <div style={{fontWeight:700,marginBottom:12,color:"#94a3b8",fontSize:12}}>PDVs CADASTRADOS ({pdvs.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {pdvs.map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0f1219",borderRadius:10,padding:"12px 16px"}}>
                <div>
                  <div style={{fontWeight:600,color:"#e2e8f0"}}>{p.nome}</div>
                  <div style={{color:"#64748b",fontSize:12,display:"flex",gap:8,marginTop:3}}>{p.canal&&<Bdg label={p.canal} color="#3b82f6"/>}{p.cidade&&<span>{p.cidade}</span>}</div>
                </div>
                <Btn onClick={()=>delPDV(p.id)} v="danger" style={{padding:"7px 12px"}}><Ico d={IC.trash} size={13}/></Btn>
              </div>
            ))}
          </div>
        </Card>
      ):<Empty t="Cadastre PDVs para agilizar a coleta."/>}
    </div>
  );
}
