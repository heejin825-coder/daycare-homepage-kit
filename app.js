/* 홈페이지를 그려 주는 파일입니다. 내용은 content.js 에서 바꾸세요. (이 파일은 고치지 않아도 됩니다) */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const S = SITE;
const on = (k) => S[k] && S[k].show;
const tel = (p) => `tel:${String(p).replace(/[^0-9]/g, "")}`;
const instaId = S.links.instagram ? S.links.instagram.replace(/\/+$/, "").split("/").pop() : "";
const ext = 'target="_blank" rel="noopener"';

// 칸 머리: 작은 이름표 + 큰 제목 + 설명
function head(label, title, text) {
  return `<div class="sec-head reveal">
    ${label ? `<span class="pill">${esc(label)}</span>` : ""}
    <h2>${esc(title)}</h2>
    ${text ? `<p>${esc(text)}</p>` : ""}
  </div>`;
}

const btn = {
  phone: (t = "전화 문의") => S.phone ? `<a class="btn btn-peach" href="${tel(S.phone)}">📞 ${esc(t)}</a>` : "",
  insta: (t = "인스타그램 보기") => S.links.instagram ? `<a class="btn btn-white" href="${esc(S.links.instagram)}" ${ext}>📸 ${esc(t)}</a>` : "",
  waitlist: (t = "아이사랑 입소대기") => S.links.waitlist ? `<a class="btn btn-mint" href="${esc(S.links.waitlist)}" ${ext}>🖥 ${esc(t)}</a>` : "",
  bot: (t = "양육상담 하늘이") => on("chatbot") && S.chatbot.link ? `<a class="btn btn-sky" href="${esc(S.chatbot.link)}" ${ext}>💬 ${esc(t)}</a>` : "",
};

const sections = [];

/* ---------- 맨 위 첫 화면 ---------- */
{
  const h = S.hero;
  const name = esc(S.name);
  const hl = h.highlight && S.name.includes(h.highlight)
    ? name.replace(esc(h.highlight), `<em>${esc(h.highlight)}</em>`) : name;
  sections.push({
    id: "top", menu: "",
    html: `<section class="hero" id="top">
      <div class="hero-bg" style="background-image:url('${esc(h.photo)}')"></div>
      <div class="hero-tint"></div>
      <div class="wrap hero-in">
        ${h.badge ? `<span class="hero-badge">${esc(h.badge)}</span>` : ""}
        <h1>${S.subName ? `${esc(S.subName)} ` : ""}${hl}</h1>
        ${h.slogan ? `<p class="hero-slogan">${esc(h.slogan)}</p>` : ""}
        ${h.text ? `<p class="hero-text">${esc(h.text)}</p>` : ""}
        ${h.sub ? `<p class="hero-sub">${esc(h.sub)}</p>` : ""}
        <div class="hero-btns">${btn.phone()}${btn.waitlist()}${btn.insta()}</div>
      </div>
    </section>`,
  });
}

/* ---------- 어린이집 소개 ---------- */
if (on("about")) {
  const a = S.about;
  const info = [
    S.hours && { icon: "🕐", k: "운영 시간", v: S.hours },
    { icon: "🏫", k: "유형", v: `${S.subName ? S.subName + " " : ""}어린이집` },
    S.address && { icon: "📍", k: "주소", v: S.address, note: on("location") ? S.location.mapPlaceNote : "" },
    S.phone && { icon: "📞", k: "대표 전화", v: S.phone, href: tel(S.phone) },
  ].filter(Boolean);
  sections.push({
    id: "about", menu: "소개",
    html: `<section class="block" id="about"><div class="wrap about">
      <div class="about-photo reveal"><img src="${esc(a.photo)}" alt="${esc(S.name)}"></div>
      <div class="about-body reveal">
        <span class="pill">${esc(a.label)}</span>
        <h2>${esc(a.title)}</h2>
        ${a.text.map((t) => `<p>${esc(t)}</p>`).join("")}
        <div class="info-grid">${info.map((i) => `<div class="info-card">
          <span class="ic">${i.icon}</span><small>${esc(i.k)}</small>
          ${i.href ? `<a href="${i.href}"><b class="hl">${esc(i.v)}</b></a>` : `<b>${esc(i.v)}</b>`}
          ${i.note ? `<span class="note">${esc(i.note)}</span>` : ""}
        </div>`).join("")}</div>
      </div>
    </div></section>`,
  });
}

/* ---------- 원장 인사말 ---------- */
if (on("greeting")) {
  const g = S.greeting;
  sections.push({
    id: "greeting", menu: "인사말",
    html: `<section class="block bg-peach" id="greeting"><div class="wrap">
      ${head(g.label, g.title)}
      <div class="greet-card reveal">
        <h3>${esc(g.headline)}</h3>
        <p class="greet-text">${esc(g.text)}</p>
        <p class="sign">— ${esc(g.sign)}</p>
        ${S.links.instagram ? `<div class="greet-insta"><a class="insta-btn" href="${esc(S.links.instagram)}" ${ext}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor"/></svg>인스타그램에서 더 보기 <small>@${esc(instaId)}</small></a></div>` : ""}
      </div>
      <div class="value-grid">${g.highlights.map((h) => `<div class="value-card reveal">
        <span class="ic">${esc(h.icon)}</span><b>${esc(h.big)}</b><span>${esc(h.small)}</span>
      </div>`).join("")}</div>
    </div></section>`,
  });
}

/* ---------- 시설 안내 ---------- */
if (on("facility")) {
  const f = S.facility;
  sections.push({
    id: "facility", menu: "시설안내",
    html: `<section class="block" id="facility"><div class="wrap">
      ${head(f.label, f.title, f.text)}
      <div class="cards">${f.items.map((it) => `<div class="card zoom reveal" data-src="${esc(it.photo)}" data-text="${esc(it.name)}">
        <div class="card-img"><img src="${esc(it.photo)}" alt="${esc(it.name)}"></div>
        <div class="card-body"><h4>${esc(it.name)}</h4>${it.text ? `<p>${esc(it.text)}</p>` : ""}</div>
      </div>`).join("")}</div>
    </div></section>`,
  });
}

/* ---------- 반 소개 ---------- */
if (on("classes")) {
  const c = S.classes;
  sections.push({
    id: "classes", menu: "반 소개",
    html: `<section class="block bg-mint" id="classes"><div class="wrap">
      ${head(c.label, c.title, c.text)}
      <div class="cards">${c.items.map((it) => `<div class="card reveal${it.photo ? " zoom" : ""}" data-src="${esc(it.photo)}" data-text="${esc(it.name)} (${esc(it.age)})">
        <div class="card-img">${it.photo ? `<img src="${esc(it.photo)}" alt="${esc(it.name)} 교실">` : `<span class="card-icon">${esc(it.icon)}</span>`}</div>
        <div class="card-body"><h4>${esc(it.icon)} ${esc(it.name)} <span class="age">${esc(it.age)}</span></h4><p>${esc(it.text)}</p></div>
      </div>`).join("")}</div>
    </div></section>`,
  });
}

/* ---------- 놀이 현황 (인스타그램) ---------- */
if (on("play")) {
  const p = S.play;
  let feed;
  if (p.elfsightId) {
    feed = `<div class="feed reveal"><div class="elfsight-app-${esc(p.elfsightId)}" data-elfsight-app-lazy></div></div>`;
  } else if (p.posts && p.posts.length) {
    feed = `<div class="posts">${p.posts.map((u) => `<div class="post reveal"><blockquote class="instagram-media" data-instgrm-permalink="${esc(u)}" data-instgrm-version="14"><a href="${esc(u)}" ${ext}>인스타그램에서 보기</a></blockquote></div>`).join("")}</div>`;
  } else {
    feed = `<a class="insta-card reveal" href="${esc(S.links.instagram)}" ${ext}>
      <span class="insta-logo"><svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor"/></svg></span>
      <b>@${esc(instaId)}</b>
      <span>${esc(S.name)}의 놀이 현황을<br>인스타그램에서 매일 만나 보세요</span>
      <span class="insta-go">팔로우하고 놀이 소식 받기 →</span>
    </a>`;
  }
  sections.push({
    id: "play", menu: "놀이 현황", hl: true,
    html: `<section class="block bg-lav" id="play"><div class="wrap">
      ${head(p.label, p.title, p.text)}
      ${feed}
      ${S.links.instagram ? `<div class="center-btns">${btn.insta("인스타그램에서 더 보기")}</div>` : ""}
    </div></section>`,
  });
}

/* ---------- 입소 안내 ---------- */
if (on("enroll")) {
  const e = S.enroll;
  sections.push({
    id: "enroll", menu: "입소안내", hl: true,
    html: `<section class="block" id="enroll"><div class="wrap">
      ${head(e.label, e.title, e.text)}
      <div class="steps">${e.steps.map((s, i) => `<div class="step reveal">
        <span class="num">${i + 1}</span><h4>${esc(s.name)}</h4><p>${esc(s.text)}</p>
      </div>`).join("")}</div>
      <div class="hours-card reveal">
        <h4>🕐 보육 시간</h4>
        <div class="hours">${e.hours.map((h) => `<div><span>${esc(h.name)}</span><b>${esc(h.time)}</b></div>`).join("")}</div>
        ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
      </div>
      <div class="center-btns">${btn.waitlist("아이사랑 바로가기")}${btn.phone("입소 상담 전화")}</div>
    </div></section>`,
  });
}

/* ---------- 오시는 길 ---------- */
if (on("location")) {
  const L = S.location;
  const q = encodeURIComponent(L.mapPlace ? `서귀포 ${L.mapPlace}` : S.address);
  const rows = [
    { icon: "📍", k: "주소", v: S.address, note: L.mapPlaceNote },
    S.phone && { icon: "📞", k: "대표 전화", v: S.phone, href: tel(S.phone) },
    S.fax && { icon: "📠", k: "팩스", v: S.fax },
    S.hours && { icon: "🕐", k: "운영 시간", v: S.hours },
  ].filter(Boolean);
  sections.push({
    id: "location", menu: "오시는 길",
    html: `<section class="block bg-sky" id="location"><div class="wrap">
      ${head(L.label, L.title)}
      <div class="loc">
        <div class="loc-info reveal">
          ${rows.map((r) => `<div class="loc-row"><span class="ic">${r.icon}</span><div><small>${esc(r.k)}</small>
            ${r.href ? `<a href="${r.href}"><b class="hl">${esc(r.v)}</b></a>` : `<b>${esc(r.v)}</b>`}
            ${r.note ? `<span class="note">${esc(r.note)}</span>` : ""}</div></div>`).join("")}
          <div class="map-links">
            <a class="btn btn-kakao btn-sm" href="https://map.kakao.com/?q=${q}" ${ext}>🗺 카카오맵 보기</a>
            <a class="btn btn-naver btn-sm" href="https://map.naver.com/p/search/${q}" ${ext}>🗺 네이버지도 보기</a>
          </div>
        </div>
        ${L.showMap ? `<div class="map reveal"><iframe loading="lazy" src="https://maps.google.com/maps?q=${q}&z=17&output=embed" title="지도"></iframe>
          <div class="map-bubble" aria-hidden="true"><span class="mb-sun">☀️</span><span class="mb-cloud">☁️</span>${L.mapLabel ? `<small>${esc(L.mapLabel)}</small>` : ""}<b>${esc(S.name)}</b>${L.mapPlaceNote ? `<em>${esc(L.mapPlaceNote)}</em>` : ""}<span class="mb-sprout">🌱</span></div></div>` : ""}
      </div>
    </div></section>`,
  });
}

/* ---------- 문의하기 ---------- */
if (on("contact")) {
  const c = S.contact;
  sections.push({
    id: "contact", menu: "문의",
    html: `<section class="block bg-mint" id="contact"><div class="wrap">
      <div class="contact-box reveal">
        <span class="pill">${esc(c.label)}</span>
        <h2>${esc(c.title)}</h2>
        <p>${esc(c.text)}</p>
        <div class="center-btns">${btn.phone()}${btn.insta("인스타그램 DM")}${btn.bot()}</div>
        <p class="contact-nums">대표전화 <b>${esc(S.phone)}</b>${S.fax ? ` <span>|</span> 팩스 <b>${esc(S.fax)}</b>` : ""}</p>
      </div>
    </div></section>`,
  });
}

/* ---------- 화면에 그리기 ---------- */
document.getElementById("main").innerHTML = sections.map((s) => s.html).join("");
document.getElementById("navList").innerHTML = sections.filter((s) => s.menu)
  .map((s) => `<li><a href="#${s.id}"${s.hl ? ' class="nav-hl"' : ""}>${esc(s.menu)}</a></li>`).join("");
document.getElementById("navCta").innerHTML = S.phone ? `<a class="btn btn-peach btn-sm" href="${tel(S.phone)}">📞 전화 문의</a>` : "";

document.title = S.name;
document.querySelector('meta[name="description"]').content = S.description;
document.getElementById("brandName").textContent = S.name;
document.getElementById("brandSub").textContent = S.subName;
if (S.logo) document.getElementById("brandLogo").innerHTML = `<img src="${esc(S.logo)}" alt="">`;

document.getElementById("footName").textContent = `🌱 ${S.subName ? S.subName + " " : ""}${S.name}`;
document.getElementById("footInfo").innerHTML = `${esc(S.address)}<br>대표전화 ${esc(S.phone)}${S.fax ? ` · 팩스 ${esc(S.fax)}` : ""}`;
document.getElementById("footCopy").textContent = `© ${new Date().getFullYear()} ${S.name}. All rights reserved.`;
const footIcons = [
  S.links.instagram && { u: S.links.instagram, i: "📸", t: "인스타그램" },
  S.links.blog && { u: S.links.blog, i: "📝", t: "블로그" },
  S.links.cafe && { u: S.links.cafe, i: "☕", t: "카페·밴드" },
  S.links.waitlist && { u: S.links.waitlist, i: "🖥", t: "아이사랑 입소대기" },
  S.phone && { u: tel(S.phone), i: "📞", t: "전화" },
].filter(Boolean);
document.getElementById("footLinks").innerHTML = footIcons
  .map((f) => `<a href="${esc(f.u)}" ${f.u.startsWith("tel:") ? "" : ext} title="${esc(f.t)}" aria-label="${esc(f.t)}">${f.i}</a>`).join("");

/* ---------- 외부 위젯 불러오기 (인스타그램) ---------- */
const loadScript = (src) => { const s = document.createElement("script"); s.src = src; s.async = true; document.body.appendChild(s); };
if (on("play") && S.play.elfsightId) loadScript("https://elfsightcdn.com/platform.js");
else if (on("play") && S.play.posts && S.play.posts.length) loadScript("https://www.instagram.com/embed.js");

/* ---------- 움직임 ---------- */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("solid", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const lb = document.getElementById("lightbox");
document.querySelectorAll(".zoom").forEach((el) => el.addEventListener("click", () => {
  lb.querySelector("img").src = el.dataset.src;
  lb.querySelector("p").textContent = el.dataset.text;
  lb.classList.add("open");
}));
lb.addEventListener("click", () => lb.classList.remove("open"));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { lb.classList.remove("open"); closePopup(); } });

/* ---------- 처음 열 때 안내창 (아이사랑) ---------- */
let closePopup = () => {};
if (on("popup")) {
  const P = S.popup;
  const today = new Date().toISOString().slice(0, 10);
  let hidden = false;
  try { hidden = localStorage.getItem("popupHideDate") === today; } catch (e) { /* 저장 안 되는 브라우저 */ }
  if (!hidden) {
    const wrap = document.createElement("div");
    wrap.className = "popup";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-label", P.title);
    wrap.innerHTML = `<div class="popup-box">
      <button class="popup-x" type="button" aria-label="닫기">×</button>
      <div class="popup-art">🏡</div>
      <span class="pill">아이사랑 보육포털</span>
      <h3>${esc(P.title)}</h3>
      <p>${esc(P.text)}</p>
      <a class="btn btn-mint popup-go" href="${esc(P.link)}" ${ext}>🖥 ${esc(P.button)} →</a>
      <div class="popup-foot">
        <button type="button" class="popup-today">오늘 하루 보지 않기</button>
        <button type="button" class="popup-close">닫기</button>
      </div>
    </div>`;
    document.body.appendChild(wrap);
    closePopup = () => { wrap.classList.remove("open"); setTimeout(() => wrap.remove(), 300); };
    setTimeout(() => wrap.classList.add("open"), 400);
    wrap.querySelector(".popup-x").addEventListener("click", closePopup);
    wrap.querySelector(".popup-close").addEventListener("click", closePopup);
    wrap.querySelector(".popup-today").addEventListener("click", () => {
      try { localStorage.setItem("popupHideDate", today); } catch (e) { /* 무시 */ }
      closePopup();
    });
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closePopup(); });
  }
}

/* ---------- 마우스 반짝이 (content.js 의 sparkle: true 일 때) ---------- */
if (S.sparkle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const shapes = ["★", "✦", "✧", "⋆", "✨"];
  const colors = ["#f6c445", "#ffd86b", "#ff9fb8", "#9fd3ff", "#b8e986", "#ffffff"];
  let last = 0, count = 0;
  const spark = (x, y, burst) => {
    if (count > 60) return;
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 14 + Math.random() * 16;
    const ang = Math.random() * Math.PI * 2, dist = (burst ? 40 : 18) + Math.random() * (burst ? 40 : 26);
    el.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;color:${colors[Math.floor(Math.random() * colors.length)]};` +
      `--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist + 14}px;--rot:${(Math.random() - .5) * 240}deg;animation-duration:${700 + Math.random() * 500}ms`;
    document.body.appendChild(el);
    count++;
    el.addEventListener("animationend", () => { el.remove(); count--; });
  };
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - last < 25) return;
    last = now;
    spark(e.clientX, e.clientY, false);
  }, { passive: true });
  window.addEventListener("pointerdown", (e) => {
    for (let i = 0; i < 8; i++) spark(e.clientX, e.clientY, true);
  }, { passive: true });
}

/* ---------- 양육상담 챗봇 하늘이 ---------- */
if (on("chatbot") && S.chatbot.link) {
  const bot = document.createElement("div");
  bot.className = "haneul";
  bot.innerHTML = `<a class="haneul-link" href="${esc(S.chatbot.link)}" ${ext} aria-label="양육상담 챗봇 하늘이 열기">
      <span class="haneul-bubble">${esc(S.chatbot.message)}</span>
      <img src="${esc(S.chatbot.image)}" alt="하늘이">
    </a>
    <button class="haneul-close" type="button" aria-label="하늘이 숨기기">×</button>`;
  document.body.appendChild(bot);
  bot.querySelector(".haneul-close").addEventListener("click", () => bot.remove());

  const still = !S.chatbot.roam || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const place = (x, y) => { bot.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`; };
  const home = () => {
    const r = bot.getBoundingClientRect();
    return [window.innerWidth - r.width - 16, window.innerHeight - r.height - 16];
  };
  const bubbleH = () => bot.querySelector(".haneul-bubble").offsetHeight + 12;
  const start = () => {
    bot.style.transition = "none";
    place(...home());
    requestAnimationFrame(() => requestAnimationFrame(() => { bot.style.transition = ""; bot.classList.add("on"); }));
  };
  const img = bot.querySelector("img");
  if (img.complete) start(); else { img.addEventListener("load", start); img.addEventListener("error", start); }

  if (still) {
    window.addEventListener("resize", () => place(...home()));
  } else {
    let paused = false, timer;
    const wander = () => {
      clearTimeout(timer);
      if (!paused && bot.isConnected) {
        const r = bot.getBoundingClientRect();
        const maxX = Math.max(8, window.innerWidth - r.width - 8);
        const minY = 80 + bubbleH();
        const maxY = Math.max(minY, window.innerHeight - r.height - 8);
        const x = 8 + Math.random() * (maxX - 8);
        const y = minY + Math.random() * (maxY - minY);
        bot.classList.toggle("flip", x < (parseFloat(bot.dataset.x) || 0));
        bot.dataset.x = x;
        place(x, y);
      }
      timer = setTimeout(wander, 5000 + Math.random() * 2500);
    };
    bot.addEventListener("pointerenter", () => { paused = true; bot.classList.add("hold"); });
    bot.addEventListener("pointerleave", () => { paused = false; bot.classList.remove("hold"); timer = setTimeout(wander, 1500); });
    window.addEventListener("resize", wander);
    timer = setTimeout(wander, 2500);
  }
}
