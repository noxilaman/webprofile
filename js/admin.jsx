/* ============================================================
   ADMIN BACKEND  —  edit every section, photo, JSON export/import
   ============================================================ */
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

/* immutable deep-set by path array, e.g. set(obj, ["profile","role","en"], v) */
function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const clone = Array.isArray(obj) ? obj.slice() : { ...obj };
  clone[head] = setIn(obj ? obj[head] : undefined, rest, value);
  return clone;
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---- field atoms ---- */
function Field({ label, value, onChange, area, placeholder, mono }) {
  const C = area ? "textarea" : "input";
  return (
    <label className="af">
      <span className="af-label mono">{label}</span>
      <C className={"af-input" + (mono ? " mono" : "")} value={value || ""} placeholder={placeholder || ""}
         rows={area ? 3 : undefined} onChange={e => onChange(e.target.value)} />
    </label>
  );
}
function BiField({ label, value, onChange, area }) {
  const v = value || {};
  return (
    <div className="af-bi">
      <span className="af-label mono">{label}</span>
      <div className="af-bi-row">
        <div className="af-bi-cell">
          <span className="af-lang mono">EN</span>
          {area
            ? <textarea className="af-input" rows="3" value={v.en || ""} onChange={e => onChange({ ...v, en: e.target.value })} />
            : <input className="af-input" value={v.en || ""} onChange={e => onChange({ ...v, en: e.target.value })} />}
        </div>
        <div className="af-bi-cell">
          <span className="af-lang mono">TH</span>
          {area
            ? <textarea className="af-input" rows="3" value={v.th || ""} onChange={e => onChange({ ...v, th: e.target.value })} />
            : <input className="af-input" value={v.th || ""} onChange={e => onChange({ ...v, th: e.target.value })} />}
        </div>
      </div>
    </div>
  );
}
function CSVField({ label, value, onChange }) {
  return (
    <Field label={label + " (comma-separated)"} mono value={(value || []).join(", ")}
      onChange={v => onChange(v.split(",").map(s => s.trim()).filter(Boolean))} />
  );
}

/* image upload → base64 dataURL, with optional generative-motif picker */
function ImageField({ image, motif, onImage, onMotif }) {
  const inputId = "imgf-" + Math.random().toString(36).slice(2, 8);
  function onFile(e) {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onImage(reader.result);
    reader.readAsDataURL(f);
    e.target.value = "";
  }
  return (
    <div className="imgf">
      <span className="af-label mono">Card image</span>
      <div className="imgf-row">
        <div className="imgf-prev">
          {image
            ? <img src={image} alt="" />
            : <span className="mono dim">{`auto · ${motif || "motif"}`}</span>}
        </div>
        <div className="imgf-ctl">
          <label className="abtn sm" htmlFor={inputId}>Upload image</label>
          <input id={inputId} type="file" accept="image/*" hidden onChange={onFile} />
          {image && <button className="abtn ghost sm" onClick={() => onImage(null)}>Use generated</button>}
          {!image && onMotif && (
            <select className="af-input mono imgf-sel" value={motif || ""} onChange={e => onMotif(e.target.value)}>
              <option value="">auto</option>
              {window.VIZ_MOTIFS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          )}
        </div>
      </div>
      <p className="imgf-note mono dim">Upload a screenshot/photo, or pick a generated motif.</p>
    </div>
  );
}

/* list item wrapper with move/delete */
function Item({ children, onUp, onDown, onDel, title }) {
  return (
    <div className="ai">
      <div className="ai-bar">
        <span className="ai-title mono">{title}</span>
        <div className="ai-ctl mono">
          <button onClick={onUp} title="move up">↑</button>
          <button onClick={onDown} title="move down">↓</button>
          <button className="del" onClick={onDel} title="delete">✕</button>
        </div>
      </div>
      <div className="ai-body">{children}</div>
    </div>
  );
}

function listOps(arr, set, blank) {
  return {
    add: () => set([...(arr || []), clone(blank)]),
    del: (i) => set(arr.filter((_, j) => j !== i)),
    up: (i) => { if (i === 0) return; const a = arr.slice();[a[i - 1], a[i]] = [a[i], a[i - 1]]; set(a); },
    down: (i) => { if (i === arr.length - 1) return; const a = arr.slice();[a[i], a[i + 1]] = [a[i + 1], a[i]]; set(a); },
    upd: (i, key, val) => set(arr.map((it, j) => j === i ? { ...it, [key]: val } : it)),
  };
}

/* ============================================================ */
function AdminPanel({ open, onClose, data, setData, onReset }) {
  const [tab, setTab] = aUseState("profile");
  const fileRef = aUseRef(null);
  const photoRef = aUseRef(null);

  const d = data;
  const setProfile = (k, v) => setData(setIn(d, ["profile", k], v));

  /* ---------- export / import ---------- */
  function exportJSON() {
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `profile-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  }
  function importJSON(e) {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed.profile) throw new Error("missing profile");
        setData(parsed);
      } catch (err) { alert("Invalid profile JSON: " + err.message); }
    };
    reader.readAsText(f);
    e.target.value = "";
  }
  function uploadPhoto(e) {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setProfile("photo", reader.result);
    reader.readAsDataURL(f);
    e.target.value = "";
  }

  const tabs = [
    ["profile", "profile"], ["metrics", "metrics"], ["work", "work"],
    ["projects", "projects"], ["skills", "skills"], ["certs", "certificates"],
    ["side", "side"], ["data", "import/export"],
  ];

  return (
    <React.Fragment>
      <div className={"admin-scrim" + (open ? " show" : "")} onClick={onClose} />
      <aside className={"admin" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="admin-head">
          <div className="mono"><span className="accent">❯</span> admin.console</div>
          <button className="admin-x" onClick={onClose}>esc ✕</button>
        </div>

        <div className="admin-tabs mono">
          {tabs.map(([k, label]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{label}</button>
          ))}
        </div>

        <div className="admin-scroll">
          {tab === "profile" && (
            <div className="admin-sec">
              <div className="photo-row">
                <div className="photo-prev">
                  {d.profile.photo
                    ? <img src={d.profile.photo} alt="" />
                    : <span className="mono">{d.profile.initials || "··"}</span>}
                </div>
                <div className="photo-ctl">
                  <button className="abtn" onClick={() => photoRef.current.click()}>Upload photo</button>
                  {d.profile.photo && <button className="abtn ghost" onClick={() => setProfile("photo", null)}>Remove</button>}
                  <input ref={photoRef} type="file" accept="image/*" hidden onChange={uploadPhoto} />
                </div>
              </div>
              <Field label="Name" value={d.profile.name} onChange={v => setProfile("name", v)} />
              <div className="af-grid2">
                <Field label="Handle" mono value={d.profile.handle} onChange={v => setProfile("handle", v)} />
                <Field label="Initials" mono value={d.profile.initials} onChange={v => setProfile("initials", v)} />
              </div>
              <BiField label="Role" value={d.profile.role} onChange={v => setProfile("role", v)} />
              <BiField label="Pitch (hero)" area value={d.profile.pitch} onChange={v => setProfile("pitch", v)} />
              <BiField label="Summary" area value={d.profile.summary} onChange={v => setProfile("summary", v)} />
              <BiField label="Availability" value={d.profile.availability} onChange={v => setProfile("availability", v)} />
              <BiField label="Location" value={d.profile.location} onChange={v => setProfile("location", v)} />
              <BiField label="Education" value={d.profile.education} onChange={v => setProfile("education", v)} />
              <label className="af-check mono">
                <input type="checkbox" checked={!!d.profile.available} onChange={e => setProfile("available", e.target.checked)} />
                Show "available" status
              </label>
              <div className="af-grid2">
                <Field label="Email" mono value={d.profile.email} onChange={v => setProfile("email", v)} />
                <Field label="Phone" mono value={d.profile.phone} onChange={v => setProfile("phone", v)} />
              </div>
              <div className="af-grid2">
                <Field label="LinkedIn" mono value={d.profile.linkedin} onChange={v => setProfile("linkedin", v)} />
                <Field label="GitHub" mono value={d.profile.github} onChange={v => setProfile("github", v)} />
              </div>
              <Field label="Website" mono value={d.profile.website} onChange={v => setProfile("website", v)} />
            </div>
          )}

          {tab === "metrics" && (() => {
            const ops = listOps(d.profile.metrics, v => setProfile("metrics", v), { value: "00", label: { en: "Label", th: "หัวข้อ" } });
            return (
              <div className="admin-sec">
                {d.profile.metrics.map((m, i) => (
                  <Item key={i} title={`metric ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                    <Field label="Value" mono value={m.value} onChange={v => ops.upd(i, "value", v)} />
                    <BiField label="Label" value={m.label} onChange={v => ops.upd(i, "label", v)} />
                  </Item>
                ))}
                <button className="abtn add" onClick={ops.add}>+ add metric</button>
              </div>
            );
          })()}

          {tab === "work" && (() => {
            const ops = listOps(d.work, v => setData(setIn(d, ["work"], v)),
              { company: "Company", role: { en: "Role", th: "ตำแหน่ง" }, period: "20XX — 20XX", location: { en: "City", th: "เมือง" }, current: false, highlights: [{ en: "", th: "" }], stack: [] });
            return (
              <div className="admin-sec">
                {d.work.map((w, i) => {
                  const hl = listOps(w.highlights, v => ops.upd(i, "highlights", v), { en: "", th: "" });
                  return (
                    <Item key={i} title={w.company || `job ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                      <Field label="Company" value={w.company} onChange={v => ops.upd(i, "company", v)} />
                      <BiField label="Role" value={w.role} onChange={v => ops.upd(i, "role", v)} />
                      <div className="af-grid2">
                        <Field label="Period" mono value={w.period} onChange={v => ops.upd(i, "period", v)} />
                        <BiField label="Location" value={w.location} onChange={v => ops.upd(i, "location", v)} />
                      </div>
                      <label className="af-check mono">
                        <input type="checkbox" checked={!!w.current} onChange={e => ops.upd(i, "current", e.target.checked)} /> Current role
                      </label>
                      <div className="sub-label mono">highlights</div>
                      {w.highlights.map((h, j) => (
                        <div className="mini-item" key={j}>
                          <BiField label={`• ${j + 1}`} area value={h} onChange={v => ops.upd(i, "highlights", w.highlights.map((x, k) => k === j ? v : x))} />
                          <button className="mini-del" onClick={() => hl.del(j)}>✕</button>
                        </div>
                      ))}
                      <button className="abtn add sm" onClick={hl.add}>+ highlight</button>
                      <CSVField label="Stack" value={w.stack} onChange={v => ops.upd(i, "stack", v)} />
                    </Item>
                  );
                })}
                <button className="abtn add" onClick={ops.add}>+ add job</button>
              </div>
            );
          })()}

          {tab === "projects" && (() => {
            const ops = listOps(d.projects, v => setData(setIn(d, ["projects"], v)),
              { name: "Project", client: "", role: { en: "", th: "" }, tagline: { en: "", th: "" }, description: { en: "", th: "" }, impact: { en: "", th: "" }, tags: [], year: "2026" });
            return (
              <div className="admin-sec">
                {d.projects.map((pr, i) => (
                  <Item key={i} title={pr.name || `project ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                    <div className="af-grid2">
                      <Field label="Name" value={pr.name} onChange={v => ops.upd(i, "name", v)} />
                      <Field label="Year" mono value={pr.year} onChange={v => ops.upd(i, "year", v)} />
                    </div>
                    <Field label="Client" value={pr.client} onChange={v => ops.upd(i, "client", v)} />
                    <BiField label="Role" value={pr.role} onChange={v => ops.upd(i, "role", v)} />
                    <BiField label="Tagline" value={pr.tagline} onChange={v => ops.upd(i, "tagline", v)} />
                    <BiField label="Description" area value={pr.description} onChange={v => ops.upd(i, "description", v)} />
                    <BiField label="Impact" value={pr.impact} onChange={v => ops.upd(i, "impact", v)} />
                    <CSVField label="Tags" value={pr.tags} onChange={v => ops.upd(i, "tags", v)} />
                    <ImageField image={pr.image} motif={pr.motif} onImage={v => ops.upd(i, "image", v)} onMotif={v => ops.upd(i, "motif", v)} />
                  </Item>
                ))}
                <button className="abtn add" onClick={ops.add}>+ add project</button>
              </div>
            );
          })()}

          {tab === "skills" && (() => {
            const ops = listOps(d.skills, v => setData(setIn(d, ["skills"], v)),
              { group: { en: "Group", th: "กลุ่ม" }, items: [] });
            return (
              <div className="admin-sec">
                {d.skills.map((g, i) => (
                  <Item key={i} title={window.pick(g.group, "en") || `group ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                    <BiField label="Group" value={g.group} onChange={v => ops.upd(i, "group", v)} />
                    <CSVField label="Items" value={g.items} onChange={v => ops.upd(i, "items", v)} />
                  </Item>
                ))}
                <button className="abtn add" onClick={ops.add}>+ add group</button>
              </div>
            );
          })()}

          {tab === "certs" && (() => {
            const ops = listOps(d.certificates, v => setData(setIn(d, ["certificates"], v)),
              { name: "Certificate", issuer: "Issuer", year: "2026", id: "" });
            return (
              <div className="admin-sec">
                {d.certificates.map((c, i) => (
                  <Item key={i} title={c.name || `cert ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                    <Field label="Name" value={c.name} onChange={v => ops.upd(i, "name", v)} />
                    <div className="af-grid2">
                      <Field label="Issuer" value={c.issuer} onChange={v => ops.upd(i, "issuer", v)} />
                      <Field label="Year" mono value={c.year} onChange={v => ops.upd(i, "year", v)} />
                    </div>
                    <Field label="Credential ID" mono value={c.id} onChange={v => ops.upd(i, "id", v)} />
                  </Item>
                ))}
                <button className="abtn add" onClick={ops.add}>+ add certificate</button>
              </div>
            );
          })()}

          {tab === "side" && (() => {
            const ops = listOps(d.side, v => setData(setIn(d, ["side"], v)),
              { name: "Project", type: { en: "Type", th: "ประเภท" }, description: { en: "", th: "" }, link: "" });
            return (
              <div className="admin-sec">
                {d.side.map((s, i) => (
                  <Item key={i} title={s.name || `side ${i + 1}`} onUp={() => ops.up(i)} onDown={() => ops.down(i)} onDel={() => ops.del(i)}>
                    <Field label="Name" value={s.name} onChange={v => ops.upd(i, "name", v)} />
                    <BiField label="Type" value={s.type} onChange={v => ops.upd(i, "type", v)} />
                    <BiField label="Description" area value={s.description} onChange={v => ops.upd(i, "description", v)} />
                    <Field label="Link" mono value={s.link} onChange={v => ops.upd(i, "link", v)} />
                  </Item>
                ))}
                <button className="abtn add" onClick={ops.add}>+ add side project</button>
              </div>
            );
          })()}

          {tab === "data" && (
            <div className="admin-sec">
              <div className="data-card">
                <div className="data-card-title mono accent">Export</div>
                <p className="data-p">Download all content as a JSON file you can back up or move to another machine.</p>
                <button className="abtn" onClick={exportJSON}>⤓ Export profile.json</button>
              </div>
              <div className="data-card">
                <div className="data-card-title mono accent">Import</div>
                <p className="data-p">Load a previously exported JSON file. This replaces all current content.</p>
                <button className="abtn" onClick={() => fileRef.current.click()}>⤒ Import JSON</button>
                <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importJSON} />
              </div>
              <div className="data-card danger">
                <div className="data-card-title mono">Reset</div>
                <p className="data-p">Restore the original sample content. Your changes will be lost.</p>
                <button className="abtn ghost" onClick={() => { if (confirm("Reset all content to defaults?")) onReset(); }}>↺ Reset to defaults</button>
              </div>
              <p className="data-note mono dim">Changes auto-save to this browser. Use Export to keep a portable copy.</p>
            </div>
          )}
        </div>
      </aside>
    </React.Fragment>
  );
}

window.AdminPanel = AdminPanel;
