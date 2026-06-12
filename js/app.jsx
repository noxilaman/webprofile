/* ============================================================
   ROOT APP
   ============================================================ */
const { useState: rUseState, useEffect: rUseEffect } = React;

const LS_DATA = "webprofile.data.v3";
const LS_LANG = "webprofile.lang.v1";

function loadData() {
  try {
    const raw = localStorage.getItem(LS_DATA);
    if (raw) { const p = JSON.parse(raw); if (p && p.profile) return p; }
  } catch (e) {}
  return JSON.parse(JSON.stringify(window.DEFAULT_DATA));
}

function App() {
  const [data, setData] = rUseState(loadData);
  const [lang, setLang] = rUseState(() => localStorage.getItem(LS_LANG) || "en");
  const [adminOpen, setAdminOpen] = rUseState(false);

  rUseEffect(() => {
    try { localStorage.setItem(LS_DATA, JSON.stringify(data)); } catch (e) {}
  }, [data]);
  rUseEffect(() => { localStorage.setItem(LS_LANG, lang); }, [lang]);
  rUseEffect(() => { document.documentElement.lang = lang; }, [lang]);

  /* keyboard: Esc closes admin */
  rUseEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setAdminOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function hireMe() {
    window.location.href = `mailto:${data.profile.email}?subject=${encodeURIComponent("Opportunity for " + data.profile.name)}`;
  }
  function downloadCV() {
    setAdminOpen(false);
    window.print();
  }
  function resetData() {
    setData(JSON.parse(JSON.stringify(window.DEFAULT_DATA)));
  }

  return (
    <React.Fragment>
      <NavBar data={data} lang={lang} setLang={setLang} onHire={hireMe} />
      <main>
        <Hero data={data} lang={lang} onHire={hireMe} onCV={downloadCV} />
        <Summary data={data} lang={lang} />
        <Work data={data} lang={lang} />
        <Projects data={data} lang={lang} />
        <Skills data={data} lang={lang} />
        <Certificates data={data} lang={lang} />
        <Side data={data} lang={lang} />
        <Contact data={data} lang={lang} />
      </main>
      <Footer data={data} lang={lang} />

      <button className="admin-fab mono" onClick={() => setAdminOpen(true)} title="Edit content">
        <span className="accent">❯</span>_ edit
      </button>

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={data}
        setData={setData}
        onReset={resetData}
      />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
