// Rasmlarni assets/ papkasiga yuklab, yo‘llarini shu yerda yozing.
// Bo‘sh qoldirilgan surat o‘rnida nafis monogramma ko‘rinadi.
window.INVITATION = {
  groom: "Sardorbek",
  bride: "Gulsevar",
  venue: "Zulfiya",
  address: "Farg‘ona viloyati, Buvayda tumani",
  landmark: "18-maktab yaqinida",
  phone: "", // Tasdiqlangan raqamni yozing. Bo‘sh bo‘lsa ko‘rinmaydi.
  coordinates: { lat: 40.56867, lng: 71.12036 },
  parents: "",
  dressCode: "",
  program: [
    {time: "12:00", title: "Nikoh to‘yimiz boshlanishi", detail: "Aziz mehmonlarimizni kutamiz"},
    {time: "14:00", title: "Dastur yakuni", detail: "Quvonchimizga sherik bo‘lganingiz uchun rahmat"}
  ],
  photos: {
    hero: "assets/photo-hero.jpg",
    detail: "assets/photo-detail.jpg",
    story: "assets/photo-story.jpg"
  },
  music: "assets/music.mp3",
  siteUrl: "https://marufovv.github.io/asd/", // Joylangach to‘liq HTTPS havolasi. OG uchun index.html ni ham yangilang.
  apiBase: "", // Worker HTTPS manzili. Bo‘sh bo‘lsa Telegram draft havolasi ishlaydi.
  enableRsvp: false, // Oldingi xohishingizga ko‘ra RSVP ekrani chiqarilmaydi.
  telegram: "anthophile_dm",
  startsAt: "2026-10-25T12:00:00+05:00",
  endsAt: "2026-10-25T14:00:00+05:00"
};
