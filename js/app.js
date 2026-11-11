(function () {
  const app = document.getElementById("app");
  const data = window.GRAMTALE;
  const STORE = "gramtale-done-v1";

  const state = {
    routeKey: "",
    screen: "home",
    grammar: null,
    level: null,
    genre: null,
    story: null,
    quizIndex: 0,
    phase: "ask",
    pick: null,
    retryPick: null,
    results: [],
    scrollTo: null,
    focusCode: null,
    focusGroup: null,
  };

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sentenceLines(value) {
    const text = String(value).trim();
    const protectedText = text.replace(/\b(Mr|Mrs|Ms|Dr|St)\./g, "$1\uE000");
    const sentences = protectedText.match(/[^.!?]+(?:[.!?]+["']?|$)/g) || [protectedText];
    return sentences
      .map((sentence) => esc(sentence.replace(/\uE000/g, ".").trim()))
      .filter(Boolean)
      .join("<br>");
  }

  function loadDone() {
    try {
      return JSON.parse(localStorage.getItem(STORE)) || [];
    } catch (error) {
      return [];
    }
  }

  function markDone(key) {
    const done = loadDone();
    if (!done.includes(key)) {
      done.push(key);
      try {
        localStorage.setItem(STORE, JSON.stringify(done));
      } catch (error) {
        /* 저장이 막혀도 이야기는 끝까지 읽을 수 있다. */
      }
    }
  }

  function storyKey(story) {
    return `${story.grammar}-${story.level}-${story.genre}`;
  }

  function formatOrder(code) {
    return code.split("").map((letter) => `(${letter})`).join(" – ");
  }

  function arrowIcon() {
    return `<span class="card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M7 17 17 7M9 7h8v8"/></svg></span>`;
  }

  function isBlank(beat) {
    return beat && beat.type === "blank";
  }

  function solution(beat) {
    if (!isBlank(beat)) return beat.answer;
    return String(beat.choices.indexOf(beat.blankAnswer));
  }

  function solutionLabel(beat) {
    return isBlank(beat) ? beat.blankAnswer : formatOrder(beat.answer);
  }

  function promptFor(beat) {
    return isBlank(beat)
      ? "빈칸에 들어갈 말로 가장 적절한 것을 고르시오."
      : "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.";
  }

  function hintFor(beat, picked) {
    if (picked) return "고른 답으로 확인할 수 있다.";
    return isBlank(beat) ? "①부터 ⑤ 중에서 알맞은 말을 고르세요." : "①부터 ⑤ 중에서 순서를 고르세요.";
  }

  function optionIndex(code) {
    return data.options.findIndex((letters) => letters.join("") === code);
  }

  function parse(path) {
    const parts = path.replace(/^\//, "").split("/").filter(Boolean);
    if (!parts.length) return { screen: "home" };
    const grammar = data.grammars.find((item) => item.id === parts[0]);
    if (!grammar) return { screen: "home" };
    if (parts.length === 1) return { screen: "level", grammar, level: 1 };
    const level = Number(parts[1]);
    if (![1, 2, 3].includes(level)) return { screen: "level", grammar, level: 1 };
    if (parts.length === 2) return { screen: "level", grammar, level };
    const genre = data.genres.find((item) => item.id === parts[2]);
    if (!genre) return { screen: "level", grammar, level };
    const story = data.stories.find(
      (item) => item.grammar === grammar.id && item.level === level && item.genre === genre.id
    );
    return { screen: "story", grammar, level, genre, story: story || null };
  }

  function beginStory(story) {
    state.story = story;
    state.quizIndex = 0;
    state.phase = "ask";
    state.pick = null;
    state.retryPick = null;
    state.results = [];
  }

  function currentBeat() {
    return state.story.beats[state.quizIndex];
  }

  function orderedText(beat) {
    const map = { A: beat.A, B: beat.B, C: beat.C };
    return beat.answer.split("").map((letter, index) => ({
      n: index + 1,
      letter,
      text: map[letter],
    }));
  }

  function setTitle() {
    if (state.screen === "home") document.title = "그램테일";
    else if (state.screen === "level") document.title = `${state.grammar.name} · 그램테일`;
    else if (state.story) document.title = `${state.story.title} · 그램테일`;
    else document.title = "그램테일";
  }

  function shell(body) {
    return `<div class="wrap wrap-${state.screen}">${body}</div>`;
  }

  function crumb() {
    if (state.screen === "home") return "";
    const bits = [`<button class="brand-mini" data-go="/"><img class="logo" src="/icon.png" alt="" /><span>그램테일</span></button>`];
    if (state.grammar) {
      bits.push(`<span>/</span><button data-go="/${state.grammar.id}">${esc(state.grammar.name)}</button>`);
    }
    if (state.level && state.screen !== "level") {
      bits.push(`<span>/</span><button data-go="/${state.grammar.id}/${state.level}">레벨 ${state.level}</button>`);
    }
    if (state.genre && state.screen === "story") {
      bits.push(`<span>/</span><b>${esc(state.genre.name)}</b>`);
    }
    return `<nav class="crumb">${bits.join("")}</nav>`;
  }

  function renderHome() {
    const items = data.grammars.map((grammar) => `
      <li>
        <button class="grammar-card interactive-card" data-go="/${grammar.id}">
          <span class="num">${grammar.index}</span>
          <strong>${esc(grammar.name)}</strong>
          ${arrowIcon()}
        </button>
      </li>`).join("");

    return `
      <header class="topbar">
        <span class="mark"><img class="logo" src="/icon.png" alt="" /><span>그램테일</span></span>
        <span class="top-note">STORY-BASED ENGLISH</span>
      </header>
      <section class="home-hero">
        <div class="hero-copy">
          <p class="hero-kicker"><span></span> 문법이 이야기가 되는 순간</p>
          <h1 class="home-title">읽다 보면,<br><em>문법이 보인다.</em></h1>
          <p class="lede">짧은 영어 이야기 속에서 문장을 고르고 다음 장면을 여세요.<br class="hero-break"> 외우기 전에 읽고, 문제를 풀며 자연스럽게 익힙니다.</p>
        </div>
        <aside class="hero-grammar">
          <div class="grammar-heading">
            <p class="kicker">CURRICULUM</p>
            <h2>문법을 골라 시작하세요.</h2>
          </div>
          <ol class="toc">${items}</ol>
        </aside>
      </section>`;
  }

  function renderLevel() {
    const grammar = state.grammar;
    const cards = data.levels.map((level) => `
      <button class="level-choice interactive-card ${state.level === level.id ? "selected" : ""}"
        data-action="select-level" data-level="${level.id}" aria-pressed="${state.level === level.id}">
        <span class="badge">${level.id}</span>
        <span>
          <span class="choice-en">LEVEL ${level.id}</span>
        </span>
      </button>`).join("");
    const books = genreCards();

    return `
      ${crumb()}
      <header class="choice-head">
        <p class="kicker">${esc(grammar.en)} · ${esc(grammar.grade)}</p>
        <h1>${esc(grammar.name)} 이야기 고르기</h1>
        <p class="sub">레벨과 장르를 한 번에 골라 바로 이야기를 시작하세요.</p>
      </header>
      <section class="selection-block">
        <div class="selection-label">
          <span>01</span>
          <div><b>레벨 선택</b><small>문장을 잇는 단서의 난이도</small></div>
        </div>
        <div class="level-selector">${cards}</div>
      </section>
      <section class="selection-block genre-selection">
        <div class="selection-label">
          <span>02</span>
          <div><b>장르 선택</b><small>LEVEL ${state.level} · 세 가지 이야기</small></div>
        </div>
        <div class="shelf">${books}</div>
      </section>`;
  }

  function genreCards() {
    const done = loadDone();
    return data.genres.map((genre) => {
      const key = `${state.grammar.id}-${state.level}-${genre.id}`;
      const sticker = done.includes(key) ? `<span class="done-sticker">완독</span>` : "";
      const story = data.stories.find(
        (item) => item.grammar === state.grammar.id && item.level === state.level && item.genre === genre.id
      );
      return `
        <button class="book book-${genre.id} interactive-card" data-go="/${state.grammar.id}/${state.level}/${genre.id}">
          <span class="book-index">0${data.genres.indexOf(genre) + 1}</span>
          <span class="book-copy">
            <span class="choice-en">${esc(genre.en.toUpperCase())}</span>
            <strong>${esc(genre.name)}</strong>
            <p class="story-title">${story ? esc(story.title) : "이야기 준비 중"}</p>
          </span>
          <span class="book-foot">${sticker}${arrowIcon()}</span>
        </button>`;
    }).join("");
  }

  function passageBlock(beat) {
    const lines = orderedText(beat).map((part) => `
      <p class="chunk-line"><b>${part.n}.</b> ${sentenceLines(part.text)}</p>`).join("");
    return `
      <div class="passage">
        <p class="lead-line">${sentenceLines(beat.lead)}</p>
        ${lines}
      </div>`;
  }

  function storyLog() {
    if (state.quizIndex > 0) return "";
    return `<p class="narration">${sentenceLines(state.story.intro)}</p>`;
  }

  function optionItems(beat) {
    if (isBlank(beat)) {
      return beat.choices.map((text, index) => ({
        code: String(index),
        label: text,
        mark: data.circled[index],
      }));
    }
    return data.options.map((letters, index) => {
      const code = letters.join("");
      return { code, label: formatOrder(code), mark: data.circled[index] };
    });
  }

  function optionButtons(beat, group, selected, locked) {
    const answer = solution(beat);
    return optionItems(beat).map((item) => {
      const classes = ["opt"];
      if (locked && item.code === answer) classes.push("correct");
      if (locked && selected === item.code && item.code !== answer) classes.push("wrong");
      const checked = !locked && selected === item.code;
      return `
        <button class="${classes.join(" ")}" role="radio" aria-checked="${checked ? "true" : "false"}"
          data-action="pick" data-group="${group}" data-code="${esc(item.code)}" ${locked ? "disabled" : ""}>
          <span class="circ">${item.mark}</span>
          <span class="order">${esc(item.label)}</span>
        </button>`;
    }).join("");
  }

  function questionCard(beat, group, selected) {
    const locked = group === "main" ? state.phase !== "ask" : state.phase !== "retry";
    const chunks = ["A", "B", "C"].map((letter) => `
      <article class="chunk">
        <span class="letter">${letter}</span>
        <p>${sentenceLines(beat[letter])}</p>
      </article>`).join("");
    const shake = group === "main" && state.phase !== "ask" && state.results[state.quizIndex] && !state.results[state.quizIndex].first;

    const passage = isBlank(beat)
      ? `<p class="en blank-line">${sentenceLines(beat.blank).replace("____", `<span class="gap" style="width:${Math.min(11, Math.max(2.4, beat.blankAnswer.length * 0.52))}em"></span>`)}</p>`
      : `<p class="en">${sentenceLines(beat.lead)}</p>`;
    return `
      <section class="quiz" id="${group === "main" ? "quiz" : "retry"}">
        <div class="lead">
          <span class="tag">${isBlank(beat) ? "지문" : "주어진 글"}</span>
          ${passage}
        </div>
        ${isBlank(beat) ? "" : `<div class="chunks">${chunks}</div>`}
        <div class="options ${shake ? "shake" : ""}" role="radiogroup" aria-label="${isBlank(beat) ? "빈칸에 들어갈 말" : "이어질 순서"}">
          ${optionButtons(beat, group, selected, locked)}
        </div>
      </section>`;
  }

  function renderQuiz() {
    const story = state.story;
    const beat = currentBeat();
    const result = state.results[state.quizIndex];
    let extra = "";

    if (state.phase === "ask") {
      extra = `
        <div class="actions">
          <button class="btn btn-primary" data-action="submit" ${state.pick ? "" : "disabled"}>정답 확인</button>
          <p class="hint">${hintFor(beat, state.pick)}</p>
        </div>`;
    }

    if (state.phase === "retry" || (state.phase === "done" && result && !result.first)) {
      extra += `
        <section class="explain" id="explain">
          <h3>정답은 ${esc(solutionLabel(beat))}</h3>
          <p>${esc(beat.explain)}</p>
        </section>
        <section class="retry-banner" id="retry-banner">
          <h3>다시 풀기</h3>
          <p>방금 확인한 문법을 새 문장에 적용해 보세요.</p>
        </section>
        ${questionCard(beat.retry, "retry", state.retryPick)}`;
    }

    if (state.phase === "retry") {
      extra += `
        <div class="actions">
          <button class="btn btn-primary" data-action="submit-retry" ${state.retryPick ? "" : "disabled"}>재도전 확인</button>
          <p class="hint">${hintFor(beat.retry, state.retryPick)}</p>
        </div>`;
    }

    if (state.phase === "done") {
      if (result.first) {
        extra += `
          <section class="good-note" id="reveal">
            <h3>정답은 ${esc(solutionLabel(beat))}</h3>
            <p class="grammar-line">${esc(beat.grammar)}</p>
          </section>`;
      } else {
        const retryBeat = beat.retry;
        const retryOk = result.retry;
        extra += `
          <section class="${retryOk ? "good-note" : "explain"}" id="retry-result">
            <h3>정답은 ${esc(solutionLabel(retryBeat))}</h3>
            ${retryOk
              ? `<p class="grammar-line">${esc(retryBeat.grammar)}</p>`
              : `<p>${esc(retryBeat.explain)}</p>`}
          </section>`;
      }
      const last = state.quizIndex === story.beats.length - 1;
      extra += `
        <div class="actions">
          <button class="btn btn-primary" data-action="next">${last ? "결말 읽기" : "다음 문제"}</button>
        </div>`;
    }

    const rails = [0, 1, 2].map((index) => {
      const graded = state.results[index];
      let cls = "seg";
      if (graded && (index < state.quizIndex || state.phase === "done" || state.phase === "ending")) {
        cls += graded.first ? " good" : " miss";
      } else if (index === state.quizIndex) cls += " now";
      return `<div class="${cls}"></div>`;
    }).join("");

    const showBridge = state.phase === "ask" || state.phase === "retry" || state.phase === "done";

    return `
      ${crumb()}
      <article class="sheet">
        <header class="story-head">
          <div>
            <h2>${esc(story.title)}</h2>
            <p class="en-title">${esc(story.titleEn)}</p>
          </div>
        </header>
        <div class="exam-meta">
          <span class="pill hot">${esc(state.grammar.name)}</span>
          <span class="pill">레벨 ${story.level}</span>
          <span class="pill">${esc(state.genre.name)}</span>
          <span class="pill">${state.phase === "ending" ? "결말" : `${state.quizIndex + 1} / 3`}</span>
        </div>
        <div class="rail" aria-hidden="true">${rails}</div>
        ${storyLog()}
        ${showBridge ? `<p class="narration">${sentenceLines(beat.bridge)}</p>` : ""}
        ${state.phase === "ending" ? "" : `
          <div class="q-label">
            <b>${state.quizIndex + 1}번</b>
          </div>
          <p class="prompt">${promptFor(beat)}</p>
          ${questionCard(beat, "main", state.pick)}
          ${extra}
        `}
      </article>`;
  }

  function renderEnding() {
    const story = state.story;
    const stamps = state.results.map((result, index) => {
      const kind = result.first ? "good" : result.retry ? "retry" : "miss";
      const label = result.first ? "정답" : result.retry ? "재도전 정답" : "해설 확인";
      return `<div class="stamp ${kind}"><span>${index + 1}번</span><strong>${label}</strong></div>`;
    }).join("");
    const firstCount = state.results.filter((result) => result.first).length;
    const summary = `첫 시도 ${firstCount} / 3 정답`;
    const recap = story.beats.map((beat) => {
      const answer = solutionLabel(beat);
      const sentence = beat.blank.replace("____", answer);
      return `
        <li>
          <strong>${esc(answer)}</strong>
          <span class="recap-copy">
            <span>${esc(sentence)}</span>
            <small>${esc(beat.grammar)}</small>
          </span>
        </li>`;
    }).join("");
    const full = `
      <p class="narration">${sentenceLines(story.intro)}</p>
      ${story.beats.map((beat) => `<p class="narration">${sentenceLines(beat.bridge)}</p>${passageBlock(beat)}`).join("")}
      <p class="narration">${sentenceLines(story.ending)}</p>`;

    return `
      ${crumb()}
      <article class="sheet">
        <p class="kicker">이야기 끝</p>
        <h2>${esc(story.title)}</h2>
        <p class="en-title">${esc(story.titleEn)}</p>
        <p class="sub">${summary}</p>
        <div class="stamps">${stamps}</div>
        <p class="end-label">이번에 완성한 문장</p>
        <ul class="recap">${recap}</ul>
        <p class="end-label">전체 이야기</p>
        ${full}
        <div class="actions">
          <button class="btn btn-primary" data-action="restart">이 이야기 다시</button>
          <button class="btn btn-ghost" data-go="/${story.grammar}/${story.level}">다른 장르</button>
          <button class="btn btn-ghost" data-go="/">다른 문법</button>
        </div>
      </article>`;
  }

  function renderMissing() {
    return `
      ${crumb()}
      <h2>이 이야기는 아직 서가에 없다</h2>
      <p class="sub">고른 문법과 레벨, 장르의 조합을 찾지 못했다.</p>
      <button class="btn btn-primary" data-go="/">목차로</button>`;
  }

  function render() {
    setTitle();
    let body = "";
    if (!data || !data.stories) body = `<p>이야기를 불러오지 못했다.</p>`;
    else if (state.screen === "home") body = renderHome();
    else if (state.screen === "level") body = renderLevel();
    else if (!state.story) body = renderMissing();
    else if (state.phase === "ending") body = renderEnding();
    else body = renderQuiz();

    const y = window.scrollY;
    app.innerHTML = shell(body);
    bindSurfaceInteractions();
    if (state.scrollTo === "top") window.scrollTo(0, 0);
    else if (state.scrollTo) {
      const target = document.getElementById(state.scrollTo);
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo(0, y);
    } else window.scrollTo(0, y);
    state.scrollTo = null;

    if (state.focusCode) {
      const button = app.querySelector(`[data-group="${state.focusGroup}"][data-code="${CSS.escape(state.focusCode)}"]`);
      if (button) button.focus({ preventScroll: true });
      state.focusCode = null;
    }
  }

  function gradeMain() {
    if (state.phase !== "ask" || !state.pick) return;
    const beat = currentBeat();
    const ok = state.pick === solution(beat);
    state.results[state.quizIndex] = { first: ok, retry: null };
    state.phase = ok ? "done" : "retry";
    state.scrollTo = ok ? "reveal" : "explain";
    render();
  }

  function bindSurfaceInteractions() {
    app.querySelectorAll(".interactive-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  function gradeRetry() {
    if (state.phase !== "retry" || !state.retryPick) return;
    const beat = currentBeat();
    state.results[state.quizIndex].retry = state.retryPick === solution(beat.retry);
    state.phase = "done";
    state.scrollTo = "retry-result";
    render();
  }

  function nextBeat() {
    if (state.quizIndex >= state.story.beats.length - 1) {
      state.phase = "ending";
      markDone(storyKey(state.story));
      state.scrollTo = "top";
      render();
      return;
    }
    state.quizIndex += 1;
    state.phase = "ask";
    state.pick = null;
    state.retryPick = null;
    state.scrollTo = "quiz";
    render();
  }

  app.addEventListener("click", (event) => {
    const go = event.target.closest("[data-go]");
    if (go) {
      const path = go.dataset.go || "/";
      if (location.pathname !== path) history.pushState({}, "", path);
      sync();
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "select-level") {
      const level = Number(button.dataset.level);
      if (![1, 2, 3].includes(level) || level === state.level) return;
      history.pushState({}, "", `/${state.grammar.id}/${level}`);
      state.level = level;
      state.routeKey = ["level", state.grammar.id, level, ""].join("|");
      render();
      return;
    }
    if (action === "pick") {
      const group = button.dataset.group;
      if (group === "main" && state.phase === "ask") state.pick = button.dataset.code;
      if (group === "retry" && state.phase === "retry") state.retryPick = button.dataset.code;
      state.focusCode = button.dataset.code;
      state.focusGroup = group;
      render();
      return;
    }
    if (action === "submit") gradeMain();
    if (action === "submit-retry") gradeRetry();
    if (action === "next") nextBeat();
    if (action === "restart") {
      beginStory(state.story);
      state.scrollTo = "top";
      render();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (state.screen !== "story" || state.phase === "ending" || state.phase === "done") return;
    const index = "12345".indexOf(event.key);
    if (index >= 0) {
      const beat = state.phase === "retry" ? currentBeat().retry : currentBeat();
      const code = isBlank(beat) ? String(index) : data.options[index].join("");
      if (!code) return;
      const group = state.phase === "retry" ? "retry" : "main";
      if (group === "main") state.pick = code;
      else state.retryPick = code;
      state.focusCode = code;
      state.focusGroup = group;
      render();
      return;
    }
    if (event.key === "Enter" && !event.target.closest("button")) {
      if (state.phase === "ask") gradeMain();
      if (state.phase === "retry") gradeRetry();
    }
  });

  function sync() {
    const next = parse(location.pathname);
    const routeKey = [next.screen, next.grammar && next.grammar.id, next.level, next.genre && next.genre.id].join("|");
    const changed = routeKey !== state.routeKey;
    state.routeKey = routeKey;
    state.screen = next.screen;
    state.grammar = next.grammar || null;
    state.level = next.level || null;
    state.genre = next.genre || null;
    if (next.screen === "story" && changed) beginStory(next.story || null);
    if (next.screen !== "story") state.phase = "ask";
    if (changed) state.scrollTo = "top";
    render();
  }

  window.addEventListener("popstate", sync);
  window.setTimeout(sync, Math.max(0, 900 - performance.now()));
})();
