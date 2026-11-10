(function (root) {
  root.GRAMTALE = {
    options: [
      ["A", "C", "B"],
      ["B", "A", "C"],
      ["B", "C", "A"],
      ["C", "A", "B"],
      ["C", "B", "A"],
    ],
    circled: ["①", "②", "③", "④", "⑤"],
    grammars: [
      {
        id: "be",
        index: "01",
        name: "be동사",
        en: "am · is · are",
        grade: "중1",
        blurb: "누구인지, 어떤 상태인지. 하나면 is, 여럿이면 are.",
        samples: {
          1: "The umbrella is yellow.",
          2: "There are two tags. One is blank.",
          3: "The president is not Jun. She is Mina.",
        },
      },
      {
        id: "present",
        index: "02",
        name: "일반동사",
        en: "simple present",
        grade: "중1",
        blurb: "습관과 사실. 셋으로 끝나는 주어에는 -s를 붙인다.",
        samples: {
          1: "Mina buys milk every lunch.",
          2: "She doesn't tell him, but she saves his seat.",
          3: "If the bell rings, Jun always waits.",
        },
      },
      {
        id: "past",
        index: "03",
        name: "과거시제",
        en: "simple past",
        grade: "중1–2",
        blurb: "이미 끝난 일. -ed와 went, saw, took를 시간 순서로 읽는다.",
        samples: {
          1: "Yesterday Mina opened the door.",
          2: "Jun went back and saw the note.",
          3: "After she left, the light went out.",
        },
      },
      {
        id: "compare",
        index: "04",
        name: "비교급·최상급",
        en: "comparatives",
        grade: "중2",
        blurb: "더 ~한, 가장 ~한. than 앞의 대상이 먼저 나와야 한다.",
        samples: {
          1: "Her note is longer than his.",
          2: "This path is more dangerous than the main road.",
          3: "This clue is the most important of the three.",
        },
      },
      {
        id: "modal",
        index: "05",
        name: "조동사",
        en: "can · must · should",
        grade: "중2",
        blurb: "할 수 있다, 해야 한다, 하는 편이 좋다. 의미가 순서를 정한다.",
        samples: {
          1: "Mina can hear the song. Jun can't.",
          2: "You must stop. You should call a teacher.",
          3: "They must leave the bags before they can exit.",
        },
      },
    ],
    levels: [
      {
        id: 1,
        name: "레벨 1",
        title: "신호가 분명한 글",
        blurb: "First, Then, So, Finally처럼 순서를 가리키는 말이 또렷하다.",
      },
      {
        id: 2,
        name: "레벨 2",
        title: "대명사와 역접",
        blurb: "it, she, they가 누구를 받는지, However가 무엇을 뒤집는지 본다.",
      },
      {
        id: 3,
        name: "레벨 3",
        title: "문법과 논리를 함께",
        blurb: "부정, 비교 대상, 조동사의 뜻이 맞아야 다음 문장이 이어진다.",
      },
    ],
    genres: [
      {
        id: "romance",
        name: "로맨스",
        en: "Romance",
        blurb: "마음, 오해, 작은 용기.",
      },
      {
        id: "mystery",
        name: "추리",
        en: "Mystery",
        blurb: "단서와 알리바이.",
      },
      {
        id: "horror",
        name: "공포",
        en: "Horror",
        blurb: "가까워지는 소리.",
      },
    ],
    stories: [],
  };
})(typeof window !== "undefined" ? window : globalThis);
