(() => {
  "use strict";

  /* =====================================================================
     YOUR CONTENT — edit these lists to update the site.
     Entries with `sample: true` are placeholders; replace or delete them.
     ===================================================================== */

  const PROJECTS = [
    { title: "This portfolio", glyph: "A_", tags: ["web"], status: "shipped", c: "#2F4BFF",
       desc: "I've made this personal website for myself"},
    { title: "An e-commerce website", glyph: "↗", tags: ["web"], status: "shipped", c: "#E0892B", sample: true,
      desc: "Built an e-commerce website, working with a team, for a retail store. The website has active users and we've made Rs.20k+ in revenue through the website.",
      link: "https://agarwalonline.in/" },
    { title: "Family business: growth & marketing", glyph: "%", tags: ["business"], status: "shipped", c: "#1F9D5A", sample: true,
      desc: "Business development and marketing work for our family business. Swap in a specific campaign, channel or result." },
    { title: "A website I built", glyph: "</>", tags: ["web"], status: "shipped", c: "#E0527A", sample: true,
      desc: "Describe a site you made: who it was for, what you built, and what you learned along the way." },
    { title: "Spanish flashcards", glyph: "ñ", tags: ["web", "experiment"], status: "shipped", c: "#C9950C",
      desc: "A tiny flip-card trainer for my Spanish vocab. Try it in the Hobbies tab." },
    { title: "Neuro × nutrition notes", glyph: "∿", tags: ["experiment"], status: "idea", c: "#8B5CF6", sample: true,
      desc: "An idea at the edge of neuroscience, nutrition and tech. Replace with one of your own experiments." }
  ];

  const EXPERIENCE = [
    { when: "Now", role: "Founder, in progress", org: "My own ventures",
      points: ["Working on my own business and startup ideas.",
               "Building websites and prototypes to test ideas quickly."],
      skills: ["Startups", "Product", "Research"] },
    { when: "Family business", role: "Business Development & Marketing", org: "Family business",
      points: ["Hands-on experience in business development and marketing.",
               "Real exposure to how a business actually works: customers, operations and decisions."],
      skills: ["Business development", "Marketing", "Operations"] },
    { when: "Ongoing", role: "Web builder", org: "Self-taught · personal projects",
      points: ["Building websites and little tools, self-taught.",
               "Learning by shipping. Every project teaches me something new."],
      skills: ["Web", "AI-assisted coding", "Design"] }
  ];

  const TOPICS = {
    tech: "#4F6BFF", business: "#E0892B", neuroscience: "#E0527A", psychology: "#8B5CF6",
    physiology: "#0EA5A4", nutrition: "#3FA34D", languages: "#C9950C"
  };

  const LEARNINGS = [
    { topic: "neuroscience", title: "Neurons that fire together wire together",
      body: "Hebbian learning: repeated co-activation strengthens the connection between neurons. It's why practising a skill over and over actually reshapes the brain." },
    { topic: "psychology", title: "Spacing beats cramming",
      body: "Reviewing something right before you'd forget it makes it stick far longer than one big study session. Perfect for Spanish vocab." },
    { topic: "business", title: "CAC only makes sense next to LTV",
      body: "What it costs to win a customer only matters relative to what that customer is worth over time. A 3:1 lifetime-value-to-acquisition-cost ratio is a common rule of thumb." },
    { topic: "nutrition", title: "Fibre, protein and fat keep you full",
      body: "They slow down how quickly the stomach empties, which is why a balanced plate gives steadier energy than a sugary snack." },
    { topic: "physiology", title: "Your brain takes out the trash while you sleep",
      body: "The glymphatic system clears metabolic waste from the brain much more actively during sleep. One more reason not to skip it." },
    { topic: "languages", title: "Ser vs. estar",
      body: "Both mean “to be”. Ser is for what something is (soy estudiante); estar is for how or where it is right now (estoy en casa)." },
    { topic: "tech", title: "CSS :has() is a parent selector",
      body: "A parent element can now style itself based on what's inside it, no JavaScript needed. Small thing, big “finally”." },
    { topic: "business", title: "Distribution is half the product",
      body: "A great product nobody hears about loses to a decent one everyone sees. Marketing isn't an afterthought." },
    { topic: "psychology", title: "Writing things down frees up your mind",
      body: "Working memory only holds a handful of things at once. Journaling offloads them, so there's room left to actually think." },
    { topic: "neuroscience", title: "Exercise helps grow new brain cells",
      body: "Aerobic exercise raises BDNF, a protein that supports the growth of neurons, especially in the hippocampus, which handles memory." }
  ];

  const GREETINGS = [["Hi", "english"], ["Hola", "español"], ["Namaste", "hindi"], ["Bonjour", "français"], ["Ciao", "italiano"], ["Konnichiwa", "日本語"]];
  const TYPED = ["build websites", "learn something new every day", "read non-fiction", "study how brains work",
                 "think about startups", "sketch, bake & travel", "love meeting new people"];
  const WORDS = [["la curiosidad", "curiosity"], ["aprender", "to learn"], ["construir", "to build"], ["el libro", "the book"],
                 ["el cerebro", "the brain"], ["hornear", "to bake"], ["viajar", "to travel"], ["la idea", "the idea"], ["¡Mucho gusto!", "Nice to meet you!"]];
  const PROMPTS = ["What surprised you today?", "What's one thing you learned this week?", "What would you build if you knew it couldn't fail?",
                   "Who did you enjoy talking to lately, and why?", "What's a small win you haven't celebrated yet?",
                   "What idea keeps coming back to you?", "What did your body need today?", "Where would you travel tomorrow, and what would you eat first?"];

  /* ===================================================================== */

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    t.style.animation = "none"; void t.offsetWidth; t.style.animation = "";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
  }

  /* ---------- tabs ---------- */
  const TABS = $$('[role="tab"]').map((b) => b.dataset.tab);
  let current = "home";

  function show(id, { push = true, focusTab = false } = {}) {
    if (!TABS.includes(id)) id = "home";
    current = id;
    $$('[role="tab"]').forEach((b) => {
      const on = b.dataset.tab === id;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      if (on) {
        const nav = b.parentElement;
        nav.scrollTo({ left: b.offsetLeft - nav.offsetLeft - (nav.clientWidth - b.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
        if (focusTab) b.focus();
      }
    });
    $$(".panel").forEach((p) => { p.hidden = p.id !== "panel-" + id; });
    window.scrollTo(0, 0);
    if (push) { try { history.pushState(null, "", "#" + id); } catch (e) { /* sandboxed */ } }
  }

  $(".tabs").addEventListener("click", (e) => {
    const b = e.target.closest('[role="tab"]'); if (b) show(b.dataset.tab);
  });
  $(".tabs").addEventListener("keydown", (e) => {
    const i = TABS.indexOf(current);
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    show(TABS[(map[e.key] + TABS.length) % TABS.length], { focusTab: true });
  });
  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]"); if (!g) return;
    e.preventDefault();
    show(g.dataset.go);
    if (g.dataset.hobby) focusHobby(g.dataset.hobby);
  });
  window.addEventListener("popstate", () => show(location.hash.slice(1), { push: false }));

  function focusHobby(key) {
    const tile = $("#hobby-" + key); if (!tile) return;
    setTimeout(() => {
      tile.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      tile.classList.add("flash");
      setTimeout(() => tile.classList.remove("flash"), 1600);
    }, 60);
  }

  /* ---------- theme ---------- */
  const savedTheme = store.get("theme");
  if (savedTheme) root.dataset.theme = savedTheme;
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function toggleTheme() {
    root.dataset.theme = isDark() ? "light" : "dark";
    store.set("theme", root.dataset.theme);
    document.dispatchEvent(new Event("themechange"));
  }
  $("#theme-toggle").addEventListener("click", toggleTheme);

  /* ---------- greeting + typewriter ---------- */
  let gi = 0;
  const hello = $("#hello"), helloLang = $("#hello-lang");
  function nextGreeting() {
    gi = (gi + 1) % GREETINGS.length;
    hello.textContent = GREETINGS[gi][0];
    helloLang.textContent = GREETINGS[gi][1];
    hello.classList.remove("swap"); void hello.offsetWidth; hello.classList.add("swap");
  }
  hello.addEventListener("click", nextGreeting);
  if (!reduced) setInterval(() => { if (current === "home" && !document.hidden) nextGreeting(); }, 4200);

  const typer = $("#typer");
  if (!reduced) {
    let ti = 0, ci = TYPED[0].length, deleting = true;
    const tick = () => {
      const word = TYPED[ti];
      if (deleting) {
        ci--;
        if (ci <= 0) { deleting = false; ti = (ti + 1) % TYPED.length; }
      } else {
        ci++;
        if (ci >= TYPED[ti].length) { deleting = true; typer.textContent = TYPED[ti]; return setTimeout(tick, 2000); }
      }
      typer.textContent = (deleting ? word : TYPED[ti]).slice(0, Math.max(ci, 0)) || "​";
      setTimeout(tick, deleting ? 38 : 70);
    };
    setTimeout(tick, 2400);
  }

  /* ---------- neuron canvas ---------- */
  (function neurons() {
    const cv = $("#neurons"), ctx = cv.getContext("2d");
    let w = 0, h = 0, nodes = [], mouse = null, col = {};
    const LINK = 92, REACH = 130;
    const readColors = () => { col = { ink: cssVar("--ink-2"), accent: cssVar("--accent"), hl: cssVar("--hl") }; };
    readColors();
    document.addEventListener("themechange", readColors);
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColors);

    function size() {
      const r = cv.getBoundingClientRect(); if (!r.width) return;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; cv.width = w * d; cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(72, Math.max(28, (w * h) / 3800)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: reduced ? 0 : (Math.random() - 0.5) * 0.4, vy: reduced ? 0 : (Math.random() - 0.5) * 0.4,
        r: 1.6 + Math.random() * 2.2, fire: 0
      }));
    }
    new ResizeObserver(size).observe(cv);

    const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    cv.addEventListener("pointermove", (e) => { mouse = pos(e); });
    cv.addEventListener("pointerleave", () => { mouse = null; });
    cv.addEventListener("click", (e) => {
      const p = pos(e);
      nodes.forEach((n) => { if (Math.hypot(n.x - p.x, n.y - p.y) < REACH * 1.4) n.fire = 1; });
    });

    function frame() {
      requestAnimationFrame(frame);
      if (!w || !cv.offsetWidth || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (mouse) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < REACH) { n.fire = Math.max(n.fire, 1 - d / REACH); n.x += (mouse.x - n.x) * 0.004; n.y += (mouse.y - n.y) * 0.004; }
        }
        if (!reduced && Math.random() < 0.0015) n.fire = 1;
        n.fire *= 0.965;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          const lit = Math.max(a.fire, b.fire);
          if (a.fire > 0.6 && b.fire < 0.1 && Math.random() < 0.03) b.fire = 0.85;
          else if (b.fire > 0.6 && a.fire < 0.1 && Math.random() < 0.03) a.fire = 0.85;
          ctx.globalAlpha = (1 - d / LINK) * (0.18 + lit * 0.7);
          ctx.strokeStyle = lit > 0.15 ? col.accent : col.ink;
          ctx.lineWidth = 0.8 + lit * 1.2;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        if (n.fire > 0.3) {
          ctx.globalAlpha = n.fire * 0.55; ctx.fillStyle = col.hl;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 6 * n.fire, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 0.45 + n.fire * 0.55;
        ctx.fillStyle = n.fire > 0.15 ? col.accent : col.ink;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- projects ---------- */
  const STATUS = { shipped: "shipped", building: "in progress", idea: "idea" };
  function renderProjects() {
    $("#project-grid").innerHTML = PROJECTS.map((p) => `
      <article class="project" style="--c:${p.c}">
        <div class="p-thumb" aria-hidden="true"><span>${esc(p.glyph)}</span></div>
        <div class="p-body">
          <p class="p-tags">${p.tags.map(esc).join(" · ")}</p>
          <h3>${esc(p.title)}${p.sample ? '<span class="sample">sample</span>' : ""}</h3>
          <p>${esc(p.desc)}</p>
          ${p.link ? `<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">Visit website ↗</a>` : ""}
        </div>
        <div class="p-foot"><span class="status ${p.status}">${STATUS[p.status]}</span></div>
      </article>`).join("");
  }
  renderProjects();

  /* ---------- experience + resume ---------- */
  $("#timeline").innerHTML = EXPERIENCE.map((x) => `
    <li>
      <p class="t-when">${esc(x.when)}</p>
      <h3>${esc(x.role)}</h3>
      <p class="t-org">${esc(x.org)}</p>
      <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="t-skills">${x.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
    </li>`).join("");
  $("#resume-experience").innerHTML = EXPERIENCE.map((x) => `
    <div class="r-item">
      <strong>${esc(x.role)}</strong>
      <span class="r-meta">${esc(x.org)} · ${esc(x.when)}</span>
      <p>${x.points.map(esc).join(" ")}</p>
    </div>`).join("");

  /* ---------- learnings ---------- */
  let learnTopic = "all";
  const learnSearch = $("#learn-search");
  $("#learn-filters").innerHTML = ["all", ...Object.keys(TOPICS)].map((t) =>
    `<button type="button" data-t="${t}" aria-pressed="${t === "all"}" style="--c:${TOPICS[t] || "transparent"}">${t === "all" ? "" : '<i class="swatch-dot"></i>'}${t}</button>`).join("");
  function renderLearnings() {
    const q = learnSearch.value.trim().toLowerCase();
    const list = LEARNINGS.filter((l) => (learnTopic === "all" || l.topic === learnTopic) &&
      (!q || (l.title + " " + l.body + " " + l.topic).toLowerCase().includes(q)));
    $("#learn-list").innerHTML = list.map((l) => `
      <li style="--c:${TOPICS[l.topic]}">
        <p class="l-topic"><i></i>${esc(l.topic)}</p>
        <div><h3>${esc(l.title)}</h3><p>${esc(l.body)}</p></div>
      </li>`).join("");
    $("#learn-empty").hidden = list.length > 0;
  }
  $("#learn-filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    learnTopic = b.dataset.t;
    $$("#learn-filters button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderLearnings();
  });
  learnSearch.addEventListener("input", renderLearnings);
  renderLearnings();

  /* ---------- sketchpad ---------- */
  const pad = $("#sketchpad"), pctx = pad.getContext("2d");
  const PENS = [["ink", "--ink"], ["blue", "--accent"], ["rose", "--rose"], ["highlighter", "--hl"]];
  let pen = PENS[1], drawing = false, last = null, doodled = false;
  $("#swatches").innerHTML = PENS.map(([n, v], i) =>
    `<button type="button" aria-label="${n} pen" aria-pressed="${i === 1}" data-i="${i}" style="--c:var(${v})"></button>`).join("");
  $("#swatches").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    pen = PENS[+b.dataset.i];
    $$("#swatches button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  });
  function sizePad() {
    const r = pad.getBoundingClientRect(); if (!r.width) return;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    const tmp = document.createElement("canvas");
    tmp.width = pad.width; tmp.height = pad.height;
    if (tmp.width && tmp.height) tmp.getContext("2d").drawImage(pad, 0, 0);
    pad.width = Math.round(r.width * d); pad.height = Math.round(r.height * d);
    pctx.setTransform(1, 0, 0, 1, 0, 0);
    if (tmp.width && tmp.height) pctx.drawImage(tmp, 0, 0);
    pctx.setTransform(d, 0, 0, d, 0, 0);
    pctx.lineCap = pctx.lineJoin = "round";
    if (!doodled) { doodled = true; drawDoodle(); }
  }
  function drawDoodle() {
    const x = 56, y = 64;
    pctx.strokeStyle = cssVar("--accent"); pctx.lineWidth = 2.4; pctx.globalAlpha = 1;
    pctx.beginPath(); pctx.arc(x, y, 22, Math.PI * 0.78, Math.PI * 2.22);
    pctx.lineTo(x + 9, y + 30); pctx.lineTo(x - 9, y + 30); pctx.closePath(); pctx.stroke();
    [[36], [42]].forEach(([dy]) => { pctx.beginPath(); pctx.moveTo(x - 8, y + dy); pctx.lineTo(x + 8, y + dy); pctx.stroke(); });
    pctx.beginPath(); pctx.moveTo(x - 6, y + 4); pctx.quadraticCurveTo(x, y - 12, x + 6, y + 4); pctx.stroke();
    [[-1, -1], [0, -1.3], [1, -1], [-1.3, 0], [1.3, 0]].forEach(([dx, dy]) => {
      pctx.beginPath(); pctx.moveTo(x + dx * 30, y + dy * 30); pctx.lineTo(x + dx * 38, y + dy * 38); pctx.stroke();
    });
    document.fonts.ready.then(() => {
      pctx.fillStyle = cssVar("--ink-2"); pctx.font = '700 26px "Caveat", cursive';
      pctx.fillText("curious? draw here :)", x + 42, y + 12);
    });
  }
  new ResizeObserver(sizePad).observe(pad);
  const pt = (e) => { const r = pad.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function stroke(a, b, pressure) {
    const hl = pen[0] === "highlighter";
    pctx.globalAlpha = hl ? 0.45 : 1;
    pctx.strokeStyle = cssVar(pen[1]);
    pctx.lineWidth = hl ? 16 : 2 + (pressure || 0.5) * 2.5;
    pctx.beginPath(); pctx.moveTo(a.x, a.y); pctx.lineTo(b.x, b.y); pctx.stroke();
    pctx.globalAlpha = 1;
  }
  pad.addEventListener("pointerdown", (e) => {
    drawing = true; last = pt(e); pad.setPointerCapture(e.pointerId);
    stroke(last, { x: last.x + 0.1, y: last.y }, e.pressure);
  });
  pad.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pt(e); stroke(last, p, e.pressure); last = p;
  });
  ["pointerup", "pointercancel"].forEach((ev) => pad.addEventListener(ev, () => { drawing = false; }));
  $("#sketch-clear").addEventListener("click", () => {
    pctx.save(); pctx.setTransform(1, 0, 0, 1, 0, 0); pctx.clearRect(0, 0, pad.width, pad.height); pctx.restore();
  });

  /* ---------- flashcards + journal ---------- */
  let wi = 0;
  const card = $("#flashcard");
  function setWord() {
    card.classList.remove("flipped");
    setTimeout(() => {
      $("#fc-front").textContent = WORDS[wi][0];
      $("#fc-back").textContent = WORDS[wi][1];
      $("#fc-count").textContent = `${wi + 1} / ${WORDS.length}`;
    }, reduced ? 0 : 180);
  }
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  $("#fc-next").addEventListener("click", () => { wi = (wi + 1) % WORDS.length; setWord(); });
  $("#fc-count").textContent = `1 / ${WORDS.length}`;

  let pi = 0;
  $("#journal-next").addEventListener("click", () => {
    pi = (pi + 1) % PROMPTS.length;
    const el = $("#journal-prompt");
    el.textContent = PROMPTS[pi];
    el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap");
  });

  /* ---------- command palette ---------- */
  const labels = { home: "Home", projects: "Projects", experience: "Work Experience", resume: "Resume",
                   recommendations: "Recommendations", learnings: "Learnings", hobbies: "Hobbies" };
  const COMMANDS = [
    ...TABS.map((t) => ({ label: labels[t], hint: "tab", run: () => show(t) })),
    { label: "Toggle dark mode", hint: "theme", keys: "light night", run: () => { toggleTheme(); toast(isDark() ? "Lights off." : "Lights on."); } },
    { label: "Leave a doodle", hint: "hobby", keys: "sketch draw", run: () => { show("hobbies"); focusHobby("sketch"); } },
    { label: "Practise Spanish", hint: "hobby", keys: "flashcard language español", run: () => { show("hobbies"); focusHobby("spanish"); } },
    { label: "Show me a random learning", hint: "learnings", keys: "til fact", run: () => {
      const l = LEARNINGS[Math.floor(Math.random() * LEARNINGS.length)];
      show("learnings"); learnSearch.value = l.title; renderLearnings();
    } },
    { label: "Say hola", hint: "fun", keys: "hello greeting", run: () => { show("home"); nextGreeting(); } }
  ];
  const cmdk = $("#cmdk"), cInput = $("#cmdk-input"), cList = $("#cmdk-list");
  let matches = [], sel = 0, lastFocus = null;
  function renderCmds() {
    const q = cInput.value.trim().toLowerCase();
    matches = COMMANDS.filter((c) => !q || (c.label + " " + c.hint + " " + (c.keys || "")).toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(matches.length - 1, 0));
    cList.innerHTML = matches.length
      ? matches.map((c, i) => `<li role="option" id="cmd-${i}" data-i="${i}" aria-selected="${i === sel}">${esc(c.label)}<small>${esc(c.hint)}</small></li>`).join("")
      : '<li aria-disabled="true">No matches. Try “resume” or “doodle”.</li>';
    cInput.setAttribute("aria-activedescendant", matches.length ? "cmd-" + sel : "");
    const s = cList.querySelector('[aria-selected="true"]'); if (s) s.scrollIntoView({ block: "nearest" });
  }
  function openCmd() { lastFocus = document.activeElement; cmdk.hidden = false; cInput.value = ""; sel = 0; renderCmds(); cInput.focus(); }
  function closeCmd() { cmdk.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function runCmd(i) { const c = matches[i]; if (!c) return; closeCmd(); c.run(); }
  $("#cmdk-open").addEventListener("click", openCmd);
  cmdk.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) return closeCmd();
    const li = e.target.closest("li[data-i]"); if (li) runCmd(+li.dataset.i);
  });
  cInput.addEventListener("input", () => { sel = 0; renderCmds(); });
  cInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(matches.length, 1); renderCmds(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + matches.length) % Math.max(matches.length, 1); renderCmds(); }
    else if (e.key === "Enter") { e.preventDefault(); runCmd(sel); }
  });
  document.addEventListener("keydown", (e) => {
    const typing = e.target.matches("input, textarea");
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.hidden ? openCmd() : closeCmd(); }
    else if (e.key === "/" && !typing && cmdk.hidden) { e.preventDefault(); openCmd(); }
    else if (e.key === "Escape" && !cmdk.hidden) closeCmd();
  });

  /* ---------- boot ---------- */
  show(location.hash.slice(1) || "home", { push: false });
  console.log("%cHola, fellow curious person. Press / to jump anywhere.", "font: 600 14px sans-serif; color: #2F4BFF");
})();
