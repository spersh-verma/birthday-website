// ╔══════════════════════════════════════════════════════════════════════╗
// ║  🎂 BIRTHDAY WEBSITE TEMPLATE — CONFIGURATION FILE                 ║
// ║  Edit ONLY this file to personalize the website for your person!   ║
// ╚══════════════════════════════════════════════════════════════════════╝

export const config = {
  // ─── General ──────────────────────────────────────────────────────────
  /** Name shown in the navigation bar and throughout the site */
  siteName: "Your Name",
  /** Browser tab title */
  siteTitle: "Happy Birthday!",
  /** Session storage key (no need to change unless you have conflicts) */
  sessionKey: "bday_auth",

  // ─── Music ────────────────────────────────────────────────────────────
  /** Background music that plays after the captcha is cleared */
  backgroundMusic: "/cake_music.mp3",
  /** Volume for background music (0.0 – 1.0) */
  backgroundMusicVolume: 0.25,
  /** Music that plays during the candle-blowing countdown */
  candleMusic: "/bg_music.mp4",
  /** Volume for candle music (0.0 – 1.0) */
  candleMusicVolume: 0.7,

  // ─── Intro Section ────────────────────────────────────────────────────
  /** The big question on the first screen */
  introQuestion: "IS IT SOMEONE'S\nBIRTHDAY?",
  /** Date displayed on the second screen */
  introDate: "1st Jan 2026",
  /** Title text on the second screen */
  introTitle: "It's Their Birthday!!",
  /** Main photo displayed in the intro polaroid */
  introPhoto: "/pic3.png",
  /** Alt text for the intro photo */
  introPhotoAlt: "Birthday Star",
  /** Caption under the intro polaroid */
  introPhotoCaption: "The birthday star",
  /** Text inside the pink pill badge */
  introPill: "BIRTHDAY STAR",

  // ─── Captcha Section ──────────────────────────────────────────────────
  /** Title of the captcha challenge */
  captchaTitle: "Wait! Are you really the birthday person? 🤨",
  /** Subtitle / instruction text */
  captchaSubtitle: "Which of these stickers define your personality? (select 4)",
  /** 3x3 grid of captcha images — set isCorrect: true for the right answers */
  captchaImages: [
    { id: 1, image: "/captcha1.jpg", isCorrect: false },
    { id: 2, image: "/captcha2.jpg", isCorrect: true },
    { id: 3, image: "/captcha3.jpg", isCorrect: false },
    { id: 4, image: "/captcha4.jpg", isCorrect: true },
    { id: 5, image: "/captcha5.jpg", isCorrect: false },
    { id: 6, image: "/captcha6.jpg", isCorrect: true },
    { id: 7, image: "/captcha7.jpg", isCorrect: false },
    { id: 8, image: "/captcha8.jpg", isCorrect: true },
    { id: 9, image: "/captcha9.jpg", isCorrect: false },
  ],
  /** Error message on first wrong attempt */
  captchaFailMessage: "Verification Failed: Try again!",
  /** Error message on repeated wrong attempts */
  captchaFailMessageRepeat: "Think again! Maybe from a different perspective :)",
  /** Hint stickers that appear after 3+ failed attempts */
  captchaHints: [
    "🤧 hint 1",
    "👉 hint 2",
    "🧠 hint 3",
    "🔁 hint 4",
  ],

  // ─── Who Section ──────────────────────────────────────────────────────
  /** Section heading */
  whoTitle: "WHO ARE THEY?",
  /** Photo of the birthday person */
  whoPhoto: "/pic2.png",
  /** Alt text for the photo */
  whoPhotoAlt: "Birthday Person",
  /** Caption under the photo */
  whoPhotoCaption: "The legend",
  /** Bio paragraph — describe the birthday person here */
  whoBio:
    "Write a short, fun bio about the birthday person here. Talk about their quirks, " +
    "what makes them special, their habits, and why they're amazing. " +
    "Make it personal and heartfelt! 💖",

  // ─── Compliment Section ───────────────────────────────────────────────
  /** Section heading */
  complimentTitle: "Time for some compliments!",
  /** Subtitle */
  complimentSubtitle: "Today you deserve some 💫",
  /** Compliments revealed one-by-one on each button click */
  compliments: [
    "Compliment #1 — Write something nice! 🌞",
    "Compliment #2 — Another kind word! 😌",
    "Compliment #3 — One more heartfelt message! 🙇🏻",
  ],
  /** Message shown when user clicks more than 3 times */
  complimentAnnoyedMessage: "That's all for today! 😂",
  /** Reaction images: [default, click1, click2, click3, annoyed] */
  complimentImages: [
    "/compliment.png",
    "/compliment1.png",
    "/compliment2.png",
    "/compliment3.png",
    "/click3.png",
  ],

  // ─── Photo Book Section ───────────────────────────────────────────────
  /** Section heading */
  photoBookTitle: "WHAT LIES AHEAD",
  /** Subtitle */
  photoBookSubtitle: "A small peek at the future.",
  /** Pages of the interactive photo book */
  photoBookPages: [
    { src: "/you_here.png", caption: "A new chapter begins ✨" },
    { src: "/graduation.png", caption: "Graduation awaits 🎓" },
    { src: "/job.png", caption: "Big things are coming 💼" },
    { src: "/meet.jpg", caption: "We'll meet soon 💖" },
    { src: "/pillow.png", caption: "Fun times ahead 🐒" },
    { src: "/delicious.jpg", caption: "Feasts await us 🤤" },
  ],

  // ─── Finale Section ───────────────────────────────────────────────────
  /** Heading above the cake */
  finaleHeading: "BLOW OUT THE CANDLES",
  /** Subtitle */
  finaleSubtitle: "Make a wish!",
  /** Cake GIF/image */
  cakeImage: "/repo-cake.gif",
  /** Dancing GIFs that appear after blowing candles [left, right] */
  dancingGifs: ["/dance1.gif", "/dance2.gif"],

  // ─── Tribute Section ──────────────────────────────────────────────────
  /** Section heading */
  tributeTitle: "THE ONE WHO STAYED",
  /** The heartfelt message */
  tributeText:
    "Write your heartfelt birthday message here. Talk about your journey together, " +
    "your favorite memories, and what they mean to you. Make it count — " +
    "this is the emotional core of the website. 💝",
  /** Group/friendship photo */
  tributePhoto: "/group-photo.jpg",
  /** Alt text */
  tributePhotoAlt: "Our memories",
  /** Caption under the photo */
  tributePhotoCaption: "Our favorite photo together",

  // ─── Closing Section ──────────────────────────────────────────────────
  /** Two lines for the big closing heading */
  closingHeadingLine1: "Happy Birthday to the",
  closingHeadingLine2: "most amazing person!",
  /** Subtitle under the heading */
  closingSubtitle: "Wishing you endless joy and happiness.",

  // ─── Navigation ───────────────────────────────────────────────────────
  /** Logo text in the top-left nav bar */
  navLogo: "BDAY",
};
