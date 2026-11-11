(function (root) {
  const PRESENT = {
    buys: ["buy", "buying", "bought"],
    eats: ["eat", "eating", "ate"],
    knows: ["know", "knowing", "knew"],
    watches: ["watch", "watching", "watched"],
    goes: ["go", "going", "went"],
    says: ["say", "saying", "said"],
    leaves: ["leave", "leaving", "left"],
    hears: ["hear", "hearing", "heard"],
    turns: ["turn", "turning", "turned"],
    uses: ["use", "using", "used"],
    sits: ["sit", "sitting", "sat"],
    comes: ["come", "coming", "came"],
    feeds: ["feed", "feeding", "fed"],
    walks: ["walk", "walking", "walked"],
    checks: ["check", "checking", "checked"],
    opens: ["open", "opening", "opened"],
    covers: ["cover", "covering", "covered"],
    slows: ["slow", "slowing", "slowed"],
    rings: ["ring", "ringing", "rang"],
    waits: ["wait", "waiting", "waited"],
    forgets: ["forget", "forgetting", "forgot"],
    saves: ["save", "saving", "saved"],
    answers: ["answer", "answering", "answered"],
    studies: ["study", "studying", "studied"],
    helps: ["help", "helping", "helped"],
    enters: ["enter", "entering", "entered"],
    trusts: ["trust", "trusting", "trusted"],
    blames: ["blame", "blaming", "blamed"],
    runs: ["run", "running", "ran"],
    believes: ["believe", "believing", "believed"],
    starts: ["start", "starting", "started"],
    falls: ["fall", "falling", "fell"],
    talks: ["talk", "talking", "talked"],
    looks: ["look", "looking", "looked"],
    disappears: ["disappear", "disappearing", "disappeared"],
    records: ["record", "recording", "recorded"],
    arrives: ["arrive", "arriving", "arrived"],
    stands: ["stand", "standing", "stood"],
    wears: ["wear", "wearing", "wore"],
    stops: ["stop", "stopping", "stopped"],
    wakes: ["wake", "waking", "woke"],
    cuts: ["cut", "cutting", "cut"],
    throws: ["throw", "throwing", "threw"],
    tells: ["tell", "telling", "told"],
    sees: ["see", "seeing", "saw"],
    has: ["have", "having", "had"],
    does: ["do", "doing", "did"],
    plays: ["play", "playing", "played"],
    reads: ["read", "reading", "read"],
    writes: ["write", "writing", "wrote"],
    takes: ["take", "taking", "took"],
    makes: ["make", "making", "made"],
    keeps: ["keep", "keeping", "kept"],
    meets: ["meet", "meeting", "met"],
    feels: ["feel", "feeling", "felt"],
    needs: ["need", "needing", "needed"],
    wants: ["want", "wanting", "wanted"],
    likes: ["like", "liking", "liked"],
    lives: ["live", "living", "lived"],
    works: ["work", "working", "worked"],
    calls: ["call", "calling", "called"],
    tries: ["try", "trying", "tried"],
    stays: ["stay", "staying", "stayed"],
    follows: ["follow", "following", "followed"],
    asks: ["ask", "asking", "asked"],
    gives: ["give", "giving", "gave"],
    finds: ["find", "finding", "found"],
    thinks: ["think", "thinking", "thought"],
    gets: ["get", "getting", "got"],
    puts: ["put", "putting", "put"],
    lets: ["let", "letting", "let"],
    seems: ["seem", "seeming", "seemed"],
    means: ["mean", "meaning", "meant"],
  };

  const PAST = {
    went: ["went", "go", "goes", "didn't go", "going"],
    saw: ["saw", "see", "sees", "didn't see", "seeing"],
    took: ["took", "take", "takes", "didn't take", "taking"],
    came: ["came", "come", "comes", "didn't come", "coming"],
    found: ["found", "find", "finds", "didn't find", "finding"],
    said: ["said", "say", "says", "didn't say", "saying"],
    hid: ["hid", "hide", "hides", "didn't hide", "hiding"],
    told: ["told", "tell", "tells", "didn't tell", "telling"],
    shut: ["shut", "close", "closes", "didn't shut", "shutting"],
    held: ["held", "hold", "holds", "didn't hold", "holding"],
    began: ["began", "begin", "begins", "didn't begin", "beginning"],
    left: ["left", "leave", "leaves", "didn't leave", "leaving"],
    wrote: ["wrote", "write", "writes", "didn't write", "writing"],
    heard: ["heard", "hear", "hears", "didn't hear", "hearing"],
    slept: ["slept", "sleep", "sleeps", "didn't sleep", "sleeping"],
    caught: ["caught", "catch", "catches", "didn't catch", "catching"],
    understood: ["understood", "understand", "understands", "didn't understand", "understanding"],
    did: ["did", "do", "does", "didn't do", "doing"],
    had: ["had", "have", "has", "didn't have", "having"],
    got: ["got", "get", "gets", "didn't get", "getting"],
    made: ["made", "make", "makes", "didn't make", "making"],
    kept: ["kept", "keep", "keeps", "didn't keep", "keeping"],
    met: ["met", "meet", "meets", "didn't meet", "meeting"],
    felt: ["felt", "feel", "feels", "didn't feel", "feeling"],
    thought: ["thought", "think", "thinks", "didn't think", "thinking"],
    brought: ["brought", "bring", "brings", "didn't bring", "bringing"],
    gave: ["gave", "give", "gives", "didn't give", "giving"],
    forgot: ["forgot", "forget", "forgets", "didn't forget", "forgetting"],
    spoke: ["spoke", "speak", "speaks", "didn't speak", "speaking"],
    tied: ["tied", "tie", "ties", "didn't tie", "tying"],
    stood: ["stood", "stand", "stands", "didn't stand", "standing"],
    ran: ["ran", "run", "runs", "didn't run", "running"],
    ate: ["ate", "eat", "eats", "didn't eat", "eating"],
    knew: ["knew", "know", "knows", "didn't know", "knowing"],
    was: ["was", "were", "is", "are", "been"],
    were: ["were", "was", "are", "is", "been"],
  };

  const REGULAR = {
    looked: "look", searched: "search", remembered: "remember", stopped: "stop",
    arrived: "arrive", stayed: "stay", opened: "open", pressed: "press", belonged: "belong",
    explained: "explain", closed: "close", checked: "check", watered: "water", locked: "lock",
    played: "play", failed: "fail", reached: "reach", called: "call", unplugged: "unplug",
    backed: "back", practiced: "practice", waited: "wait", started: "start", turned: "turn",
    asked: "ask", walked: "walk", wanted: "want", used: "use", moved: "move",
  };

  const COMPARE = {
    longer: ["long", "longer", "the longest", "more long", "as long as"],
    shorter: ["short", "shorter", "the shortest", "more short", "as short as"],
    louder: ["loud", "louder", "the loudest", "more loud", "as loud as"],
    nearer: ["near", "nearer", "the nearest", "more near", "as near as"],
    older: ["old", "older", "the oldest", "more old", "as old as"],
    colder: ["cold", "colder", "the coldest", "more cold", "as cold as"],
    warmer: ["warm", "warmer", "the warmest", "more warm", "as warm as"],
    bigger: ["big", "bigger", "the biggest", "more big", "as big as"],
    smaller: ["small", "smaller", "the smallest", "more small", "as small as"],
    thicker: ["thick", "thicker", "the thickest", "more thick", "as thick as"],
    heavier: ["heavy", "heavier", "the heaviest", "more heavy", "as heavy as"],
    lighter: ["light", "lighter", "the lightest", "more light", "as light as"],
    easier: ["easy", "easier", "the easiest", "more easy", "as easy as"],
    harder: ["hard", "harder", "the hardest", "more hard", "as hard as"],
    better: ["good", "better", "the best", "more good", "as good as"],
    worse: ["bad", "worse", "the worst", "more bad", "as bad as"],
    later: ["late", "later", "the latest", "more late", "as late as"],
    earlier: ["early", "earlier", "the earliest", "more early", "as early as"],
    clearer: ["clear", "clearer", "the clearest", "more clear", "as clear as"],
    brighter: ["bright", "brighter", "the brightest", "more bright", "as bright as"],
    emptier: ["empty", "emptier", "the emptiest", "more empty", "as empty as"],
    safer: ["safe", "safer", "the safest", "more safe", "as safe as"],
    darker: ["dark", "darker", "the darkest", "more dark", "as dark as"],
    closer: ["close", "closer", "the closest", "more close", "as close as"],
    deeper: ["deep", "deeper", "the deepest", "more deep", "as deep as"],
    braver: ["brave", "braver", "the bravest", "more brave", "as brave as"],
  };

  const ER = ["longer", "shorter", "louder", "nearer", "older", "colder", "warmer", "bigger", "smaller", "thicker", "heavier", "lighter", "easier", "harder", "better", "worse", "later", "earlier", "clearer", "brighter", "emptier", "safer", "darker", "closer", "deeper", "braver", "faded"];
  const EST = ["longest", "shortest", "loudest", "nearest", "oldest", "coldest", "warmest", "biggest", "smallest", "thickest", "heaviest", "lightest", "easiest", "hardest", "best", "worst", "latest", "earliest", "clearest", "brightest", "safest", "closest", "deepest", "bravest"];

  function rotate(choices, answer, seed) {
    const index = choices.indexOf(answer);
    const spot = Math.abs(seed) % choices.length;
    const shift = (spot - index + choices.length) % choices.length;
    return choices.map((_, item) => choices[(item - shift + choices.length) % choices.length]);
  }

  function sentencesOf(item) {
    return [item.lead, item.A, item.B, item.C].filter(Boolean);
  }

  function firstMatch(sentences, pattern) {
    const hits = [];
    for (const sentence of sentences) {
      const match = sentence.match(pattern);
      if (!match) continue;
      const token = match[0];
      const count = sentence.split(token).length - 1;
      hits.push({ sentence, match, count });
    }
    return hits.find((hit) => hit.count === 1) || null;
  }

  function beBlank(item) {
    const lines = sentencesOf(item);
    const negative = firstMatch(lines, /\b(isn't|aren't|is not|are not)\b/);
    const positive = firstMatch(lines, /\b(am|is|are)\b/);
    const found = negative || positive;
    if (!found) return null;
    const answer = found.match[1];
    const choices = answer === "is not" || answer === "are not"
      ? ["is not", "are not", "is", "are", "isn't"]
      : answer === "isn't" || answer === "aren't"
        ? ["isn't", "aren't", "is", "are", "am"]
        : ["is", "are", "am", "isn't", "aren't"];
    return {
      blank: found.sentence.replace(found.match[0], "____"),
      choices,
      answer,
    };
  }

  function presentBlank(item) {
    const negative = firstMatch(sentencesOf(item), /\b(doesn't|don't|does not|do not)\b/);
    if (negative) {
      const answer = negative.match[1];
      const choices = answer.includes("not")
        ? ["does not", "do not", "is not", "are not", "did not"]
        : ["doesn't", "don't", "isn't", "aren't", "didn't"];
      return {
        blank: negative.sentence.replace(negative.match[0], "____"),
        choices,
        answer,
      };
    }
    const verbs = Object.keys(PRESENT).sort((a, b) => b.length - a.length);
    const found = firstMatch(sentencesOf(item), new RegExp(`\\b(${verbs.join("|")})\\b`));
    if (!found) return null;
    const answer = found.match[1];
    const [base, ing, past] = PRESENT[answer];
    return {
      blank: found.sentence.replace(found.match[0], "____"),
      choices: [answer, base, `${ing}`, past, `doesn't ${base}`],
      answer,
    };
  }

  function pastBlank(item) {
    const negative = firstMatch(sentencesOf(item), /\b(did not|didn't)\b/);
    if (negative) {
      const answer = negative.match[1];
      return {
        blank: negative.sentence.replace(negative.match[0], "____"),
        choices: answer === "didn't"
          ? ["didn't", "don't", "doesn't", "wasn't", "hasn't"]
          : ["did not", "do not", "does not", "was not", "had not"],
        answer,
      };
    }
    const irregular = Object.keys(PAST).sort((a, b) => b.length - a.length);
    const irregularHit = firstMatch(sentencesOf(item), new RegExp(`\\b(${irregular.join("|")})\\b`));
    if (irregularHit) {
      const answer = irregularHit.match[1];
      const forms = PAST[answer];
      const choices = answer === "was" || answer === "were"
        ? forms
        : [forms[0], forms[1], forms[2], forms[4], `to ${forms[1]}`];
      return {
        blank: irregularHit.sentence.replace(irregularHit.match[0], "____"),
        choices,
        answer,
      };
    }
    const known = Object.keys(REGULAR).sort((a, b) => b.length - a.length);
    const regular = firstMatch(sentencesOf(item), new RegExp(`\\b(${known.join("|")})\\b`));
    if (!regular) return null;
    const answer = regular.match[1];
    const base = REGULAR[answer];
    const third = /(?:s|sh|ch|x|o)$/.test(base) ? `${base}es` : base.endsWith("y") && !/[aeiou]y$/.test(base) ? `${base.slice(0, -1)}ies` : `${base}s`;
    const ing = base.endsWith("e") && !base.endsWith("ee") ? `${base.slice(0, -1)}ing` : `${base}ing`;
    return {
      blank: regular.sentence.replace(regular.match[0], "____"),
      choices: [answer, base, third, ing, `to ${base}`],
      answer,
    };
  }

  function compareBlank(item) {
    const lines = sentencesOf(item);
    const more = firstMatch(lines, /\bmore [a-z]+ than\b/);
    if (more) {
      const phrase = more.match[0].replace(/ than$/, "");
      const adjective = phrase.replace(/^more /, "");
      const near = adjective.length <= 5 ? `${adjective}er` : `most ${adjective}`;
      return {
        blank: more.sentence.replace(phrase, "____"),
        choices: [phrase, near, `the most ${adjective}`, adjective, `as ${adjective} as`],
        answer: phrase,
      };
    }
    const less = firstMatch(lines, /\bless [a-z]+\b/);
    if (less) {
      const phrase = less.match[0];
      const adjective = phrase.replace(/^less /, "");
      return {
        blank: less.sentence.replace(phrase, "____"),
        choices: [phrase, `more ${adjective}`, `${adjective}er`, `the most ${adjective}`, adjective],
        answer: phrase,
      };
    }
    const most = firstMatch(lines, /\bthe most [a-z]+\b/);
    if (most) {
      const phrase = most.match[0];
      const adjective = phrase.replace(/^the most /, "");
      return {
        blank: most.sentence.replace(phrase, "____"),
        choices: [phrase, `more ${adjective}`, adjective, `most ${adjective}`, `as ${adjective} as`],
        answer: phrase,
      };
    }
    const as = firstMatch(lines, /\bas [a-z]+ as\b/);
    if (as) {
      const phrase = as.match[0];
      const adjective = phrase.split(" ")[1];
      return {
        blank: as.sentence.replace(phrase, "____"),
        choices: [phrase, `${adjective}er than`, `more ${adjective} than`, `the most ${adjective}`, adjective],
        answer: phrase,
      };
    }
    const est = firstMatch(lines, new RegExp(`\\bthe (${EST.join("|")})\\b`));
    if (est) {
      const phrase = est.match[0];
      const word = est.match[1];
      const forms = COMPARE[word.replace(/est$/, "er")] || COMPARE[`${word.slice(0, -3)}er`];
      const choices = forms || [phrase, word, `more ${word}`, `as ${word} as`, word.replace(/est$/, "")];
      return {
        blank: est.sentence.replace(phrase, "____"),
        choices,
        answer: choices.includes(phrase) ? phrase : choices[0],
      };
    }
    const er = firstMatch(lines, new RegExp(`\\b(${ER.join("|")})\\b(?=[^.!?]*\\bthan\\b)`));
    if (er && COMPARE[er.match[1]]) {
      const word = er.match[1];
      return {
        blank: er.sentence.replace(word, "____"),
        choices: COMPARE[word],
        answer: word,
      };
    }
    return null;
  }

  function modalBlank(item) {
    const found = firstMatch(sentencesOf(item), /\b(must not|must|should|can't|cannot|can)\b/);
    if (!found) return null;
    const answer = found.match[1] === "cannot" ? "can't" : found.match[1];
    const source = found.match[1] === "cannot" ? "cannot" : answer;
    return {
      blank: found.sentence.replace(source, "____"),
      choices: ["can", "can't", "must", "must not", "should"],
      answer,
    };
  }

  const BUILD = {
    be: beBlank,
    present: presentBlank,
    past: pastBlank,
    compare: compareBlank,
    modal: modalBlank,
  };

  function reason(grammar, answer) {
    if (grammar === "be") {
      if (answer === "are" || answer === "aren't" || answer === "are not") return "둘 이상인 주어에는 are를 사용해요.";
      if (answer === "am") return "주어가 I일 때는 am을 사용해요.";
      if (String(answer).includes("not") || String(answer).includes("n't")) return "부정의 뜻을 나타내려면 not이 포함된 형태가 필요해요.";
      return "한 사람이나 하나의 사물을 나타내는 주어에는 is를 사용해요.";
    }
    if (grammar === "present") {
      if (String(answer).startsWith("does")) return "한 사람을 주어로 한 현재 부정문에는 does not 또는 doesn't를 사용해요.";
      if (String(answer).startsWith("do")) return "I, you 또는 복수 주어의 현재 부정문에는 do not 또는 don't를 사용해요.";
      return `반복되는 일이나 현재의 사실에서 3인칭 단수 주어 뒤에는 ${answer}를 사용해요.`;
    }
    if (grammar === "past") {
      if (String(answer).startsWith("did")) return "과거의 부정은 did not으로 만들고, 뒤의 동사는 원형으로 사용해요.";
      if (answer === "was") return "한 사람이나 하나의 사물의 과거 상태에는 was를 사용해요.";
      if (answer === "were") return "둘 이상인 주어의 과거 상태에는 were를 사용해요.";
      return `과거에 끝난 일을 나타내므로 ${answer}처럼 과거형을 사용해요.`;
    }
    if (grammar === "compare") {
      if (String(answer).startsWith("the most") || /^the [a-z]+est$/.test(answer)) return "셋 이상을 비교해 가장 두드러진 하나를 말할 때는 최상급을 사용해요.";
      if (String(answer).startsWith("as ")) return "두 대상의 정도가 같을 때는 as와 as 사이에 원급을 사용해요.";
      if (String(answer).startsWith("less") || String(answer).startsWith("more")) return "긴 형용사를 비교할 때는 앞에 more나 less를 사용해요.";
      return `두 대상을 비교하는 문장이므로 ${answer}처럼 비교급을 사용해요.`;
    }
    if (answer === "can't") return "할 수 없다는 뜻을 나타내려면 can't를 사용해요.";
    if (answer === "can") return "할 수 있다는 뜻을 나타내려면 can을 사용해요.";
    if (answer === "must") return "반드시 해야 하는 일을 나타내려면 must를 사용해요.";
    if (answer === "must not") return "하면 안 되는 일을 나타내려면 must not을 사용해요.";
    return "조언하거나 권할 때는 should를 사용해요.";
  }

  function detailedExplanation(grammar, made) {
    const answer = made.answer;
    const sentence = made.blank.replace("____", answer);
    const opening = `정답은 ${answer}이다. 문장을 완성하면 “${sentence}”가 된다.`;

    if (grammar === "be") {
      if (answer === "am") {
        return `${opening} am은 주어가 I일 때만 쓰는 현재형이다. is는 한 사람이나 하나의 사물, are는 둘 이상인 주어와 연결하므로 이 자리에는 맞지 않는다.`;
      }
      if (answer === "are" || answer === "aren't" || answer === "are not") {
        return `${opening} 빈칸과 연결되는 주어가 둘 이상이므로 are 계열이 필요하다. is는 단수 주어에 쓰고, am은 I와만 쓰므로 제외한다. 문장이 부정이면 not이 포함된 형태를 골라야 한다.`;
      }
      return `${opening} 빈칸과 연결되는 주어가 한 사람이나 하나의 사물이므로 is 계열이 필요하다. are는 복수 주어, am은 I와 쓰는 형태이며, 긍정과 부정도 문장의 뜻에 맞춰 구분해야 한다.`;
    }

    if (grammar === "present") {
      if (String(answer).startsWith("does")) {
        return `${opening} 주어가 한 명인 현재형 부정문이므로 does not 또는 doesn't를 쓴다. does 뒤에는 동사원형이 오며, don't와 과거형 didn't는 이 문장의 주어와 시제에 맞지 않는다.`;
      }
      if (String(answer).startsWith("do")) {
        return `${opening} I, you 또는 복수 주어의 현재형 부정에는 do not 또는 don't를 쓴다. does not은 3인칭 단수, did not은 과거를 나타내므로 제외한다.`;
      }
      return `${opening} 반복되는 일이나 현재의 사실을 말하고, 주어가 3인칭 단수이므로 동사에 -s 또는 -es가 붙은 ${answer}가 필요하다. 동사원형과 과거형, -ing형은 같은 자리에 올 수 없다.`;
    }

    if (grammar === "past") {
      if (answer === "was") {
        return `${opening} 주어가 한 명이고 이미 지난 상황을 말하므로 be동사의 단수 과거형 was를 쓴다. were는 복수 주어와 쓰고, is와 are는 현재형이라 시간 기준에 맞지 않는다.`;
      }
      if (answer === "were") {
        return `${opening} 주어가 둘 이상이고 이미 지난 상황을 말하므로 be동사의 복수 과거형 were를 쓴다. was는 단수 주어와 쓰고, is와 are는 현재형이다.`;
      }
      if (String(answer).startsWith("did")) {
        return `${opening} 과거의 부정은 did not 또는 didn't로 만들고, 그 뒤의 동사는 원형으로 둔다. do not과 does not은 현재 시제이므로 맞지 않는다.`;
      }
      return `${opening} 장면이 이미 끝난 일을 말하므로 동사의 과거형 ${answer}가 필요하다. 동사원형과 3인칭 단수형은 현재를, -ing형은 진행 중인 동작을 나타내므로 이 문장의 시간과 맞지 않는다.`;
    }

    if (grammar === "compare") {
      if (String(answer).startsWith("the ") || String(answer).startsWith("the most")) {
        return `${opening} 셋 이상 가운데 가장 두드러진 하나를 고르는 문장이므로 the가 포함된 최상급을 쓴다. 두 대상을 비교하는 -er 또는 more 형태만으로는 범위 전체의 ‘가장’을 나타낼 수 없다.`;
      }
      if (String(answer).startsWith("as ")) {
        return `${opening} 두 대상의 정도가 같다는 뜻이므로 as + 원급 + as 구조가 필요하다. -er than과 more는 한쪽이 더 크거나 강하다는 뜻이라 문맥과 다르다.`;
      }
      if (String(answer).startsWith("more ") || String(answer).startsWith("less ")) {
        return `${opening} 긴 형용사의 정도를 비교하므로 형용사 앞에 more 또는 less를 둔다. the most는 최상급이고, 형용사에 -er를 바로 붙인 형태는 이 단어에 맞지 않는다.`;
      }
      return `${opening} than을 기준으로 두 대상을 비교하므로 비교급 ${answer}가 필요하다. 원급은 비교를 만들지 못하고, the가 붙은 최상급은 셋 이상에서 하나를 고를 때 쓴다.`;
    }

    if (answer === "can" || answer === "can't") {
      return `${opening} 문맥에서 가능한지 불가능한지를 판단해야 하므로 ${answer}가 알맞다. can과 can't 뒤에는 주어와 관계없이 동사원형이 오며, 의무를 나타내는 must와 조언을 나타내는 should는 뜻이 다르다.`;
    }
    if (answer === "must" || answer === "must not") {
      return `${opening} 문맥이 강한 의무나 금지를 나타내므로 ${answer}가 필요하다. can은 가능, should는 조언을 나타내며, 모든 조동사 뒤에는 동사원형을 쓴다.`;
    }
    return `${opening} 강한 의무가 아니라 조언을 나타내는 문장이므로 should가 알맞다. can은 가능, must는 반드시 해야 하는 의무를 뜻하며, should 뒤에는 동사원형이 온다.`;
  }

  function applyBlank(grammar, item, seed) {
    const made = BUILD[grammar](item);
    if (!made || new Set(made.choices).size !== 5 || !made.choices.includes(made.answer)) return false;
    const why = reason(grammar, made.answer);
    item.type = "blank";
    item.blank = made.blank;
    item.choices = rotate(made.choices, made.answer, seed);
    item.blankAnswer = made.answer;
    item.explain = detailedExplanation(grammar, made);
    item.grammar = why;
    return true;
  }

  const EN = {
    "be|1|romance": {
      i: "It is Monday, and it is raining. A yellow umbrella stands at the classroom door. Jun wants to know if it belongs to Mina, the new student.",
      e: "Mina says a quiet thank you. The yellow umbrella finds its owner, and the two of them open the art club door together.",
      b: [
        "Before Jun picks up the umbrella, he reads the name.",
        "Jun opens the art room door. Mina is by the window.",
        "The umbrella is back in Mina's hand. Only Jun's sleeve is still wet.",
      ],
    },
    "be|1|mystery": {
      i: "After school, a key is on the hallway floor. Harin lost the radio club key, and the radio room door is locked.",
      e: "Harin puts the key in her pocket and turns on the radio room light. The lost-key case ends in ten minutes.",
      b: [
        "Harin reads the tag on the key ring first.",
        "Harin is not in the radio room. Only a bag points toward the gym.",
        "The key comes back into Harin's hand.",
      ],
    },
    "be|1|horror": {
      i: "During night study, only locker 3 is cold. Seo reads the note on the handle and looks down the hall.",
      e: "Seo starts to get angry, then laughs. Locker 3 is just a locker again. She keeps only the note.",
      b: [
        "The handle is wet, and the note is short.",
        "A low voice behind her says Seo's name.",
        "A small speaker sits on the locker. Only the power light is on.",
      ],
    },
    "be|2|romance": {
      i: "Two name tags are on the festival desk. Mina's tag is neat. Jun's tag is blank. The line leads to the photo booth.",
      e: "The photo tag says JUN. The two of them are still shy, but the blank is gone.",
      b: [
        "Jun stands at the desk and cannot take out a pen.",
        "Jun is at the end of the line, and his tag is still white.",
        "The shutter clicks, and both of them stay in the same photo.",
      ],
    },
    "be|2|mystery": {
      i: "One face is missing from the class photo on the board. The camera is gone from the drawer too. Harin marks the empty place first.",
      e: "Doyun asks to take the photo again. In the next picture, the empty spot in the back row is filled.",
      b: [
        "Harin points at the gap in the back row.",
        "The drawer has no camera, and the space under the desk looks odd.",
        "Doyun is in the music room with a flute in his arms.",
      ],
    },
    "be|2|horror": {
      i: "It is night, but the science room light is still on. Seo sees a person-shaped shadow in the window and stops.",
      e: "The light goes out, and the science room is quiet. Seo writes that the shadow was a coat. A teacher's mark goes on the wire.",
      b: [
        "The hall is dark, but the science room window is white.",
        "The coat idea feels safe, but the switch is strange.",
        "The wire cover under the window is open.",
      ],
    },
    "be|3|romance": {
      i: "A rumor grows in front of the student-council photo. The class says the loud president is Jun. Mina says nothing.",
      e: "Mina hosts the festival. Jun turns the pages beside her. The secret was not pride. It was preparation.",
      b: [
        "Jun sees himself in the middle of the photo and smiles awkwardly.",
        "Mina's desk is neat, but one page of her notebook is full.",
        "Only the host line on the festival script is empty.",
      ],
    },
    "be|3|mystery": {
      i: "A beaker breaks in the science room. Three students are inside, and one person is in the hall. Everyone looks at everyone else.",
      e: "Nobody is punished. The only thing on the floor is Doyun's strawberry milk, and the heavy door closes slowly.",
      b: [
        "Three people stop beside the broken glass.",
        "Doyun is frozen in the hall with a phone in his hand.",
        "Today's science-room log has two lines.",
      ],
    },
    "be|3|horror": {
      i: "On the day the bathroom mirror looks old, Seo counts people first. Five students are real. Six are in the mirror.",
      e: "The number in the mirror matches the room now. The poster goes back to the art room, and a deliberate laugh stays in the hall.",
      b: [
        "Five people stand at the sinks, but the mirror brings one more.",
        "That face is familiar from somewhere.",
        "The bathroom door is half open, and a hard board leans behind it.",
      ],
    },
    "present|1|romance": {
      i: "Every lunch, one bottle of strawberry milk moves to the front of the store fridge. Jun takes it, but he does not know who moves it.",
      e: "The next day the strawberry milk is in front again. This time Jun does not only look down. He greets Mina.",
      b: [
        "Today, too, Mina reaches the store first.",
        "Mina knows Jun's habit, but she does not say so.",
        "On Friday the strawberry milk is gone.",
      ],
    },
    "present|1|mystery": {
      i: "Every morning, one sample bread disappears from the baking-club table. The crumbs point to the courtyard, not the front gate.",
      e: "The birds get their own bag now. The sample bread stays on the table, and Doyun writes his name in the log.",
      b: [
        "The baking-club log repeats the same time.",
        "The crumbs lead inside, not toward the gate.",
        "Doyun sits on the bench with a paper bag on his knees.",
      ],
    },
    "present|1|horror": {
      i: "Every night at nine, a song plays from the empty radio room. The whisper always says Seo's name.",
      e: "The timer goes off. In the Wednesday practice room, Seo sees a script that says her name. The night is quiet again.",
      b: [
        "Tonight, too, the speaker turns on at nine.",
        "The whisper always stops on the same sentence.",
        "A small timer sits behind the radio.",
      ],
    },
    "present|2|romance": {
      i: "Every Friday, Jun leaves a letter in Mina's locker. Mina does not read the letters. She answers with small actions instead.",
      e: "The Friday letter does not stay overnight anymore. Mina reads it and sends back a short reply.",
      b: [
        "On Friday morning, a white envelope shows in the locker slot.",
        "Instead of opening the letter, Mina has another habit.",
        "On Sunday night, Mina picks up the oldest letter in the box.",
      ],
    },
    "present|2|mystery": {
      i: "Three people describe the lost badge. All three repeat the same line every day, but their routes do not match.",
      e: "The badge is inside the lost-and-found. The three lines were habits that grew into lies. The badge goes back to its owner.",
      b: [
        "Harin asks the same question for three days.",
        "Jun, the third witness, sounds too neat.",
        "Harin checks the back of the lost-and-found, not the words.",
      ],
    },
    "present|2|horror": {
      i: "When Seo walks the hall, footsteps follow three steps behind at the same speed. She looks back and sees nobody. It happens every night.",
      e: "The footsteps stop. From today, cloth covers the science-club wheels, and Seo does not measure the space behind her.",
      b: [
        "Today Seo changes her speed on purpose.",
        "Nobody is there, but the sound is sharp outside the science room.",
        "When the cart stays still, the night hall goes quiet.",
      ],
    },
    "present|3|romance": {
      i: "At festival rehearsal, Mina and Jun share the same cue. When one drops a line, the other fills it. It keeps happening.",
      e: "The cue works in the show too. In front of the applause, they only bow at the same time.",
      b: [
        "When Mina swallows a line, Jun's next line comes early.",
        "They never talk about this rhythm off the stage.",
        "On show day, the light comes on later than planned.",
      ],
    },
    "present|3|mystery": {
      i: "The science-room key log shows the same time every day. Harin follows the repeated action, not the spoken story.",
      e: "The person with the key is Doyun. He is not stealing. He waters the plants every day. The log closes on that habit.",
      b: [
        "The stamp on the log points to just after lunch.",
        "Harin always sees the same damp spot on the watering-can handle.",
        "The science teacher reads the log and does not get angry.",
      ],
    },
    "present|3|horror": {
      i: "When Seo turns the hall lights off, they come back on after three seconds. Nobody touches the switch, and the order is the same every night.",
      e: "The lights stay off now. A cover sits on the sensor, and the school forgets the night on time.",
      b: [
        "Seo takes her hand off the switch and counts to three.",
        "Even when Seo stands still, the stair light turns on alone.",
        "With a cover on it, the sensor stops chasing the hall.",
      ],
    },
    "past|1|romance": {
      i: "Yesterday after school, only Jun and Mina were on the field. The ball rolled to the goal, and the words came a little later.",
      e: "The field grew small in the bus window. Mina kept yesterday's goal as a story for the dinner table.",
      b: [
        "Practice started in front of the goal.",
        "After the goal, Jun could not speak at once.",
        "On the way home, Mina stopped at the gate.",
      ],
    },
    "past|1|mystery": {
      i: "Last evening the science-room window was open. Rain came in over a notebook, and one glove stayed on the floor.",
      e: "The glove belonged to Doyun, the night-duty student. He came to close the window and dropped one glove. The notebook could dry on the rack.",
      b: [
        "Harin looked at the window before the wet notebook.",
        "A small name tape was inside the glove.",
        "Harin put the notebook on the rack and checked the window.",
      ],
    },
    "past|1|horror": {
      i: "Last night Seo took an empty elevator. She pressed 2, but the doors opened on an empty fourth floor.",
      e: "The fourth floor was the festival storage room. A balloon rolled out and blocked the sensor. Seo tied the balloon and went down to the first floor.",
      b: [
        "Seo pressed 2, and the elevator went up after the doors closed.",
        "When the doors opened, the hall had no person, only a balloon.",
        "A gold festival ribbon was still on the balloon string.",
      ],
    },
    "past|2|romance": {
      i: "Jun borrowed Mina's poetry book and did not return it on time. A sentence he wrote was tucked in as a bookmark.",
      e: "Mina got the book back and copied the bookmark sentence into her notebook. The late return ended as an apology, and the next book came back on time.",
      b: [
        "When the overdue notice appeared, Jun went to his locker.",
        "Jun almost tore the sentence out, then stopped.",
        "Before Mina put the book in her bag, she kept the bookmark apart.",
      ],
    },
    "past|2|mystery": {
      i: "On Monday, only Doyun's mark was gone from the attendance book. Harin followed who took the book, and when.",
      e: "Jun took the book. He did not mean to erase the mark. He wiped spilled water, and the box blurred. The mark was written again.",
      b: [
        "Harin opened the morning duty log first.",
        "Jun said he never put the attendance book in his bag.",
        "The teacher made a new mark beside the blurred box.",
      ],
    },
    "past|2|horror": {
      i: "Before dawn yesterday, the elevator log moved from the fourth floor to the first. People said nobody rode it. Seo laid the log over the hall camera.",
      e: "Nobody rode it. The wind pushed the storage door into the button, and the camera caught only a balloon's shadow. The log was not a passenger.",
      b: [
        "The log said the fourth-floor button was pressed at 4:12.",
        "A silver shape rolled to the height of the button.",
        "Seo locked the window and tied the balloon to a chair leg.",
      ],
    },
    "past|3|romance": {
      i: "The day after the festival, the prop box on stage was empty. Only Mina's ribbon turned up in Jun's bag. The order explained the feeling.",
      e: "The ribbon came back to Mina. Jun had it not to hide it, but because his hands kept the box safe before the rain.",
      b: [
        "Mina opened the box, and only the ribbon space was empty.",
        "The two of them sat side by side on the stage stairs.",
        "The next day the ribbon was back in the box.",
      ],
    },
    "past|3|mystery": {
      i: "The science room was supposed to stay closed yesterday. Still, the plants had water. Harin measured the time between the locked door and the wet soil.",
      e: "The teacher opened the door, and Doyun watered the plants. Both acts were allowed, but the missing order made them look suspicious.",
      b: [
        "The lock was shut in the morning, but the pots were damp.",
        "At lunch, Doyun came to find Harin.",
        "Harin wrote the order back into the empty boxes.",
      ],
    },
    "past|3|horror": {
      i: "On Saturday the school was supposed to be empty. Still, the radio-room recorder played once at dawn. Seo read the timestamps in past order.",
      e: "It was not a ghost. After the power returned, the machine continued a paused file, and that file was Friday's play practice.",
      b: [
        "The recorder screen still showed 2:03 a.m.",
        "In the afternoon Seo checked the radio-room door herself.",
        "Harin taped the pause button in place.",
      ],
    },
    "compare|1|romance": {
      i: "Two notes are on the desk. Jun's note is short. Mina's note is longer. The length speaks first.",
      e: "Jun reads the long note slowly. His answer does not need to be longer than the short note. A seat beside Mina is enough.",
      b: [
        "Jun puts his own note down first.",
        "In chorus practice, the two voices stand side by side.",
        "In the festival photo, the two of them smile side by side.",
      ],
    },
    "compare|1|mystery": {
      i: "After the rain, two footprints are in the flower-bed mud. The second print is deeper than the first. Harin measures the depth first.",
      e: "The deep print came from a heavy bag. The owner was Doyun, moving sheet music. The flower-bed case closes there.",
      b: [
        "Harin compares the depth with a twig, not a ruler.",
        "Inside the black bag, the music is a thick stack.",
        "Doyun stands at the edge of the mud with the music in both arms.",
      ],
    },
    "compare|1|horror": {
      i: "On the night Seo is alone in the hall, the whisper comes closer every hour. The first hour is far. The next hour is nearer.",
      e: "The closer voice was not a ghost. It was the stage speaker. A rehearsal timer raised the volume one step every hour.",
      b: [
        "At nine, the voice comes from the end of the stairs.",
        "At eleven, the voice is almost in the same hall.",
        "Seo presses the last mark on the timer.",
      ],
    },
    "compare|2|romance": {
      i: "Jun hesitates between a long letter and a short sentence. An honest line reaches Mina better than a fancy one.",
      e: "Jun hands her the short sentence. Mina keeps that line longer than the long letter.",
      b: [
        "Jun's notebook has more crossed-out lines than clean ones.",
        "Mina's reply chooses a question over a compliment.",
        "Jun stops the joke and leaves only the true sentence.",
      ],
    },
    "compare|2|mystery": {
      i: "Two ways lead to the gym. The alley looks short, but it is more dangerous than the main road. Harin compares safety before distance.",
      e: "Harin takes the long main road. She checks the short alley's footprints the next day, and the safe road goes into the case note first.",
      b: [
        "The road splits at the end of the field.",
        "The first story at the alley and the second story do not match.",
        "Harin reaches the gym by the main road, then opens the map.",
      ],
    },
    "compare|2|horror": {
      i: "On the night check, the second floor is colder than the first. The air toward the basement feels worse than the second floor. Seo compares before she goes down.",
      e: "The coldest air was an open basement vent. Seo stays on the first floor and does not go down. The vent is closed the next day.",
      b: [
        "Seo holds the back of her hand to the air at the stairs.",
        "The basement handle is colder than the second-floor rail.",
        "The next day the facilities teacher points at the basement vent.",
      ],
    },
    "compare|3|romance": {
      i: "At the gate, Jun thinks of three choices: a long speech, a joke, and a quiet thank you. The bravest one is the shortest.",
      e: "Jun says thank you. Of the three moments, that line is the bravest. Mina's answer is shorter than his joke, and it is enough.",
      b: [
        "In the rain, Jun lines up three sentences in his head.",
        "Under the awning, they set their bags side by side.",
        "When the bus comes, they each step back only once.",
      ],
    },
    "compare|3|mystery": {
      i: "At the lunch when the badge disappeared, there are three alibis. Harin sorts the believable line from the detailed one.",
      e: "The most believable line is Mina's alibi. In front of a record as clear as the camera, the exaggerated story loses its force.",
      b: [
        "Harin writes the three students' words on one page.",
        "When the three times sit side by side, the order appears.",
        "The rumor grows, and the real reason gets smaller.",
      ],
    },
    "compare|3|horror": {
      i: "Of the three classrooms on the same hall, only the music room feels old. Seo does not go in. She measures the difference at the doors.",
      e: "The oldest room was only a quiet instrument closet. The rumor was the most exaggerated part of the night, and the door opens with a teacher.",
      b: [
        "Three doors stand in a row on one side of the hall.",
        "Only the music-room handle clings to the hand.",
        "Seo takes her hand off the handle and returns to the middle of the hall.",
      ],
    },
    "modal|1|romance": {
      i: "A song plays behind the gym. Mina can hear the words. Jun, out on the field, cannot.",
      e: "Jun cannot read the one sentence on the receipt out loud. Even a nod is enough. Mina can tell.",
      b: [
        "The speaker faces the back of the gym, and the field is too far.",
        "There is one pen in Mina's pocket.",
        "At the gate, Jun opens a small receipt.",
      ],
    },
    "modal|1|mystery": {
      i: "The drawer with the badge will not open. Harin cannot break the lock, but she can slide a ruler into the gap.",
      e: "The drawer opens without a key. The badge is inside, and Harin can move the case forward without breaking anything.",
      b: [
        "The gap beside the drawer is only as wide as a ruler.",
        "Inside the drawer, the badge is in a cloth bag.",
        "At the lost-and-found window, Doyun opens his bag.",
      ],
    },
    "modal|1|horror": {
      i: "The back hall is dark. Seo cannot see the locker beside her. She can see only the far exit light.",
      e: "Seo follows only the light she can see and reaches the lobby. She can pass the dark hall, and she can find the exit without looking back.",
      b: [
        "From the middle of the hall, the floor under her feet disappears.",
        "On the tenth step, a low machine sound comes from the side.",
        "The lobby under the exit light is bright.",
      ],
    },
    "modal|2|romance": {
      i: "Jun's letter is one day late. At the gate he decides that what he can hide and what he must say are different.",
      e: "Jun says he is late first. An honest line comes before a perfect sentence, and Mina understands that order.",
      b: [
        "Yesterday's date is written on the corner of the letter.",
        "Jun folds the long apology and puts it in his pocket.",
        "Before Mina takes the letter, she hears only Jun's first sentence.",
      ],
    },
    "modal|2|mystery": {
      i: "The science-room door is hot. Students must not open it. They must find a teacher. Harin trusts the rule before her hand.",
      e: "The door stays closed. The teacher's glove checks the handle, and the students learn why they had to wait in the hall.",
      b: [
        "The paint on the handle is swollen.",
        "At the end of the hall, a teacher comes over with gloves on.",
        "The heater plug is half out of the socket inside the door.",
      ],
    },
    "modal|2|horror": {
      i: "The air going down to the basement is cold. The sign says she must stay on the first floor. Seo reads the rule before she moves her feet.",
      e: "Seo stays on the first floor. The stairs are checked the next day, and the word must on the sign keeps its place.",
      b: [
        "A handwritten sign hangs on the stair door.",
        "Wind comes up through the gap, and the light does not go down.",
        "The teacher meets Seo on the first floor with a flashlight.",
      ],
    },
    "modal|3|romance": {
      i: "Jun can see Mina across the road. He cannot cross before the light is green, and the book must change hands on the far sidewalk.",
      e: "The book is passed on the sidewalk. The rule opens the chance, and the advice keeps that chance safe.",
      b: [
        "The traffic light is still red.",
        "On the far sidewalk, Mina steps aside to make room.",
        "The cafe awning is one block away from the road.",
      ],
    },
    "modal|3|mystery": {
      i: "The evidence bag is open. Harin can touch it only after she puts gloves on, and she should take a photo before she moves it.",
      e: "The badge is logged while it is sealed. The rule stops the hand, and the right order protects the evidence.",
      b: [
        "The mouth of the bag on the desk is open.",
        "Once the photo is taken, the badge's place becomes a record.",
        "The teacher sets the sealed bag beside the logbook.",
      ],
    },
    "modal|3|horror": {
      i: "One rule is painted on the old hall wall: you must not look back. She can get out only if she keeps that rule, and she should count only the exit lights.",
      e: "Seo reaches the lobby without looking back. The must in the rule opens the way, and the lights she counted become the exit.",
      b: [
        "After the flashlight dies, only the wall letters show under the exit light.",
        "There are three exit lights, and they end at the lobby's glass door.",
        "The lobby inside the glass door is as bright as day.",
      ],
    },
  };

  root.GRAMTALE.stories.forEach((story, index) => {
    const pack = EN[`${story.grammar}|${story.level}|${story.genre}`];
    if (pack) {
      story.intro = pack.i;
      story.ending = pack.e;
      pack.b.forEach((line, beatIndex) => {
        story.beats[beatIndex].bridge = line;
      });
    }
    story.beats.forEach((beat, beatIndex) => {
      applyBlank(story.grammar, beat, index * 7 + beatIndex + 3);
      applyBlank(story.grammar, beat.retry, index * 11 + beatIndex + 7);
    });
  });
})(typeof window !== "undefined" ? window : globalThis);
