/* ============================================================
   DISPLAY SECTIONS
   ============================================================ */
const { useState, useEffect, useRef } = React;

function ui(key, lang) { return window.pick(window.UI_STRINGS[key], lang); }

/* ---- small atoms ---- */
function SectionHead({ index, kicker, title, lang }) {
  return (
    <div className="sec-head">
      <div className="sec-kicker">
        <span className="mono dim">{`// ${index}`}</span>
        <span className="mono accent">{kicker}</span>
      </div>
      <h2 className="sec-title">{title}</h2>
    </div>
  );
}

function Avatar({ profile }) {
  if (profile.photo) {
    return <img className="avatar-img" src={profile.photo} alt={profile.name} />;
  }
  return <div className="avatar-mono">{profile.initials || "··"}</div>;
}

/* ---- top nav ---- */
function NavBar({ data, lang, setLang, onHire }) {
  const p = data.profile;
  const labels = window.UI_STRINGS.nav[lang] || window.UI_STRINGS.nav.en;
  const ids = ["work", "projects", "skills", "certs", "side", "contact"];
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand mono">
          <span className="accent">❯</span> {p.handle}
          <span className="caret" />
        </a>
        <nav className="nav-links mono">
          {labels.map((l, i) => (
            <a key={ids[i]} href={`#${ids[i]}`}>{l}</a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-toggle mono" role="group" aria-label="language">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "th" ? "on" : ""} onClick={() => setLang("th")}>TH</button>
          </div>
          <button className="btn btn-primary mono" onClick={onHire}>{ui("hireMe", lang)}</button>
        </div>
      </div>
    </header>
  );
}

/* ---- hero ---- */
function Hero({ data, lang, onHire, onCV }) {
  const p = data.profile;
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" />
      <div className="hero-inner">
        <div className="hero-left">
          <div className={"avail mono " + (p.available ? "is-on" : "is-off")}>
            <span className="dot" />
            {window.pick(p.availability, lang)}
          </div>
          <h1 className="hero-name">{p.name}</h1>
          <div className="hero-role mono accent">{window.pick(p.role, lang)}</div>
          <p className="hero-pitch">{window.pick(p.pitch, lang)}</p>
          <div className="hero-actions">
            <button className="btn btn-primary mono" onClick={onHire}>{ui("hireMe", lang)}</button>
            <button className="btn btn-ghost mono" onClick={onCV}>⤓ {ui("downloadCV", lang)}</button>
          </div>
          <div className="hero-meta mono dim">
            <span>◎ {window.pick(p.location, lang)}</span>
            {p.education && <span>◇ {window.pick(p.education, lang)}</span>}
          </div>
        </div>

        <div className="hero-right">
          <div className="term-card">
            <div className="term-bar">
              <span className="tdot r" /><span className="tdot y" /><span className="tdot g" />
              <span className="term-title mono">~/whoami</span>
            </div>
            <div className="term-body">
              <div className="avatar-wrap"><Avatar profile={p} /></div>
              <div className="term-lines mono">
                <div><span className="dim">$</span> whoami</div>
                <div className="accent">{p.name.toLowerCase().replace(/\s+/g, "_")}</div>
                <div><span className="dim">$</span> cat role.txt</div>
                <div className="wrap">{window.pick(p.role, lang)}</div>
                <div><span className="dim">$</span> status<span className="caret" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics">
        {p.metrics.map((m, i) => (
          <div className="metric" key={i}>
            <div className="metric-val">{m.value}</div>
            <div className="metric-label mono dim">{window.pick(m.label, lang)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- summary strip ---- */
function Summary({ data, lang }) {
  return (
    <section className="summary">
      <span className="mono accent quote-mark">/*</span>
      <p>{window.pick(data.profile.summary, lang)}</p>
      <span className="mono accent quote-mark end">*/</span>
    </section>
  );
}

/* ---- work history ---- */
function Work({ data, lang }) {
  return (
    <section className="block" id="work">
      <SectionHead index="01" kicker="work_history" title={ui("sec_work", lang)} lang={lang} />
      <div className="timeline">
        {data.work.map((w, i) => (
          <div className={"tl-item" + (w.current ? " current" : "")} key={i}>
            <div className="tl-node" />
            <div className="tl-card">
              <div className="tl-top">
                <div>
                  <div className="tl-role">{window.pick(w.role, lang)}</div>
                  <div className="tl-co mono accent">{w.company}</div>
                </div>
                <div className="tl-meta mono dim">
                  <div className="tl-period">{w.period}</div>
                  <div>◎ {window.pick(w.location, lang)}</div>
                </div>
              </div>
              <ul className="tl-points">
                {w.highlights.map((h, j) => (
                  <li key={j}><span className="bullet accent mono">▹</span>{window.pick(h, lang)}</li>
                ))}
              </ul>
              {w.stack && w.stack.length > 0 && (
                <div className="chips">
                  {w.stack.map((s, k) => <span className="chip mono" key={k}>{s}</span>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- projects ---- */
function Projects({ data, lang }) {
  return (
    <section className="block" id="projects">
      <SectionHead index="02" kicker="proud_projects" title={ui("sec_proj", lang)} lang={lang} />
      <div className="proj-grid">
        {data.projects.map((pr, i) => (
          <article className="proj-card" key={i}>
            <window.ProjectViz project={pr} index={i} />
            <div className="proj-body">
              <div className="proj-head mono">
                <span className="dim">{`{ `}</span>
                <span className="proj-name">{pr.name}</span>
                <span className="proj-year dim">{pr.year}</span>
              </div>
              {(pr.client || pr.role) && (
                <div className="proj-meta mono dim">
                  {pr.client}{pr.client && pr.role ? " · " : ""}{window.pick(pr.role, lang)}
                </div>
              )}
              <div className="proj-tagline mono accent">{window.pick(pr.tagline, lang)}</div>
              <p className="proj-desc">{window.pick(pr.description, lang)}</p>
              <div className="proj-impact">
                <span className="mono dim impact-label">{ui("impact", lang)}</span>
                <span className="impact-val mono">{window.pick(pr.impact, lang)}</span>
              </div>
              <div className="chips">
                {pr.tags.map((t, k) => <span className="chip mono" key={k}>{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---- skills ---- */
function Skills({ data, lang }) {
  return (
    <section className="block" id="skills">
      <SectionHead index="03" kicker="skills.json" title={ui("sec_skills", lang)} lang={lang} />
      <div className="skills-grid">
        {data.skills.map((g, i) => (
          <div className="skill-group" key={i}>
            <div className="skill-group-title mono accent">{window.pick(g.group, lang)}</div>
            <div className="chips wrap-chips">
              {g.items.map((it, k) => <span className="chip lg mono" key={k}>{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- certificates ---- */
function Certificates({ data, lang }) {
  return (
    <section className="block" id="certs">
      <SectionHead index="04" kicker="certificates" title={ui("sec_certs", lang)} lang={lang} />
      <div className="cert-list">
        {data.certificates.map((c, i) => (
          <div className="cert-row" key={i}>
            <div className="cert-badge mono">✓</div>
            <div className="cert-main">
              <div className="cert-name">{c.name}</div>
              <div className="cert-sub mono dim">{c.issuer}{c.id ? ` · ${c.id}` : ""}</div>
            </div>
            <div className="cert-year mono accent">{c.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- side work ---- */
function Side({ data, lang }) {
  return (
    <section className="block" id="side">
      <SectionHead index="05" kicker="side_projects" title={ui("sec_side", lang)} lang={lang} />
      <div className="side-grid">
        {data.side.map((s, i) => {
          const href = s.link ? (s.link.startsWith("http") ? s.link : `https://${s.link}`) : null;
          const Tag = href ? "a" : "div";
          const props = href ? { href, target: "_blank", rel: "noreferrer" } : {};
          return (
            <Tag className={"side-card" + (href ? " is-link" : "")} key={i} {...props}>
              <div className="side-type mono accent">{window.pick(s.type, lang)}</div>
              <div className="side-name">{s.name}</div>
              <p className="side-desc">{window.pick(s.description, lang)}</p>
              {s.link && <div className="side-link mono dim">↗ {s.link}</div>}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* ---- contact ---- */
function Contact({ data, lang }) {
  const p = data.profile;
  const links = [
    { k: "email", v: p.email, href: `mailto:${p.email}`, icon: "✉" },
    { k: "linkedin", v: p.linkedin, href: `https://${p.linkedin}`, icon: "in" },
    { k: "github", v: p.github, href: `https://${p.github}`, icon: "⌥" },
    { k: "website", v: p.website, href: `https://${p.website}`, icon: "◎" },
  ].filter(l => l.v);
  return (
    <section className="block contact" id="contact">
      <SectionHead index="06" kicker="contact" title={ui("sec_contact", lang)} lang={lang} />
      <p className="contact-blurb">{ui("contactBlurb", lang)}</p>
      <a className="contact-mail mono" href={`mailto:${p.email}`}>{p.email}</a>
      <div className="contact-links mono">
        {links.map(l => (
          <a key={l.k} href={l.href} target="_blank" rel="noreferrer">
            <span className="ci">{l.icon}</span>{l.v}
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer({ data, lang }) {
  return (
    <footer className="footer mono dim">
      <span>© {new Date().getFullYear()} {data.profile.name}</span>
      <span className="accent">❯ built from the command line</span>
    </footer>
  );
}

Object.assign(window, {
  NavBar, Hero, Summary, Work, Projects, Skills, Certificates, Side, Contact, Footer,
});
