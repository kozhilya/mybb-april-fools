window.AprilJokes.disableAll();

window.AprilJokes.jokes.cursor.disableAll();

window.AprilJokes.settings = {
  core: {
    enabled: true,
    chance: 100,
  },

  shake: {
    enabled: true,
    chance: 1,
    directions: ["top", "left", "bottom", "left"],
    force: 0.5,
    selector: "[id^=pun]",
    interval: 100,
  },

  mirror: {
    enabled: false,
    chance: 30,
  },

  carnival: {
    enabled: true,
    chance: 30,
    selector: 'img[src*="/avatars/"]',
    variant_chance: 20,
    variants: {
      "sepia({0}%)": 100,
      "saturate({0}%)": 100,
      "hue-rotate({0}deg)": 360,
      "invert({0}%)": 100,
    },
  },

  humanitarian_hell: {
    enabled: true,
    chance: 20,
    selector: ".post-content",
  },

  crazy_letters: {
    enabled: true,
    chance: 20,
    selector: ".pa-author a",
  },

  letter_chaos: {
    enabled: true,
    chance: 20,
    selector: ".post-content",
    shuffle_chance: 50,
  },

  cursor: {
    enabled: true,
    chance: 100,
    effects: {
      rainbow: {
        enabled: true,
        weight: 50,
        length: 20,
        size: 3,
        colors: [
          "#9400D3",
          "#4B0082",
          "#0000FF",
          "#00FF00",
          "#FFFF00",
          "#FF7F00",
          "#FF0000",
        ],
      },
      springy_emoji: {
        enabled: true,
        weight: 50,
        emoji: "🤪",
      },
      emoji: {
        enabled: true,
        weight: 50,
        emoji: ["🔥", "🐬", "🦆"],
      },
      fairy_dust: {
        enabled: true,
        weight: 50,
        colors: ["#ff0000", "#00ff00", "#0000ff"],
      },
      ghost: {
        enabled: true,
        weight: 50,
      },
      trailing: {
        enabled: true,
        weight: 50,
        particles: 15,
        rate: 0.4,
        baseImageSrc: null,
      },
      text_flag: {
        enabled: true,
        weight: 50,
        text: "С днём смеха!",
        color: "#000000",
        font: "monospace",
        textSize: 12,
        gap: 14,
      },
      following_dot: {
        enabled: true,
        weight: 50,
        color: "#323232a6",
      },
      bubbles: {
        enabled: true,
        weight: 50,
      },
      snowflake: {
        enabled: false,
        weight: 50,
      },
      clock: {
        enabled: true,
        weight: 50,
        dateColor: (string = "blue"),
        faceColor: (string = "black"),
        secondsColor: (string = "red"),
        minutesColor: (string = "black"),
        hoursColor: (string = "black"),
      },
    },
  },

  stupid_title: {
    enabled: true,
    chance: 20,
    gender_resolver: null,
    rude: false,
    change_frequency: 5,
    schemas: {
      "{adj} {noun}{p}": 10,
      "{noun} {adj}{p}": 3,
      "{adj}, {adj} {noun}{p}": 10,
      "{adj} и очень {adj} {noun}{p}": 10,
      "{adj} {noun} {verb}{p}": 10,
      "{adj} {noun} {adv} {verb}{p}": 5,
      "{adj} {noun} {verb} {place}{p}": 5,
      "{adj} {noun} {adv} {verb} {place}{p}": 5,
    },
    variants: {
      adj: {
        ...window.AprilJokes.settings.stupid_title.variants.adj,
        ...BuildStupdiTitleVariant(true, "скромный, шутливый, !грубый"),
        ...BuildStupdiTitleVariant(false, "скромная, шутливая, !грубая"),
      },
      noun: { ...window.AprilJokes.settings.stupid_title.variants.noun },
      verb: { ...window.AprilJokes.settings.stupid_title.variants.verb },
      place: { ...window.AprilJokes.settings.stupid_title.variants.place },
      adv: { ...window.AprilJokes.settings.stupid_title.variants.adv },
      p: { ...window.AprilJokes.settings.stupid_title.variants.p },
    },
  },

  inverted_scroll: {
    enabled: true,
    chance: 10,
  },

  latinization: {
    enabled: true,
    chance: 10,
    selector: '.post-content',
    ruToEn: {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
      'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
      'ш': 'sh', 'щ': 'shch', 'ъ': 'ie', 'ы': 'y', 'ь': '',
      'э': 'e', 'ю': 'u', 'я': 'ya',
    },
    enToRu: {
      'a': 'а', 'b': 'б', 'c': 'с', 'd': 'д', 'e': 'е',
      'f': 'ф', 'gh': 'ж', 'g': 'г', 'h': 'х', 'i': 'и',
      'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
      'o': 'о', 'p': 'п', 'q': 'кью', 'r': 'р', 's': 'с',
      't': 'т', 'u': 'ю', 'v': 'в', 'w': 'в', 'x': 'кс',
      'y': 'ы', 'z': 'з',
    },
  },

  fresh_grass: {
    enabled: true,

    chance: 100,

    keepDistance: 200,
    maxVelocity: 500,
    minVelocity: 20,
    tickPerSecond: 50,
    gravity: 20,
    correctionForce: 0.8,
    mouseForceMax: 5000,
    mouseForcePow: 5,
    mass: 1,
    collisionElasticity: 0.9,
  }
};
