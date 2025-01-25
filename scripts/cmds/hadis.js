module.exports = {
  config: {
    name: "hadis",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    category: "knowledge",
    guide: {
      en: "Use this command to get a random hadith in Bangla with its Arabic text, translation, and source."
    }
  },
  onStart: async function ({ message }) {
    // হাদিসের তালিকা
    const hadiths = [
      {
        text: "যে ব্যক্তি মানুষের কৃতজ্ঞতা প্রকাশ করে না, সে আল্লাহর কৃতজ্ঞতাও প্রকাশ করে না।",
        arabic: "مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ",
        source: "তিরমিজি ১৯৫৪"
      },
      {
        text: "তোমাদের মধ্যে সর্বোত্তম ব্যক্তি হলো সেই ব্যক্তি, যে কুরআন শেখে এবং অন্যকে শেখায়।",
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        source: "বুখারি ৫০২৭"
      },
      {
        text: "দুনিয়া হলো মুমিনের জন্য কারাগার এবং কাফিরের জন্য জান্নাত।",
        arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
        source: "মুসলিম ২৯৫৬"
      },
      {
        text: "যে ব্যক্তি তার ভাইয়ের জন্য দোয়া করে, ফেরেশতা বলে: আমিন, এবং তোমার জন্যও একই দোয়া।",
        arabic: "إِذَا دَعَا الرَّجُلُ لِأَخِيهِ بِظَهْرِ الْغَيْبِ قَالَ الْمَلَكُ: آمِينَ، وَلَكَ بِمِثْلٍ",
        source: "মুসলিম ২৭৩২"
      },
      {
        text: "মুমিনের ইমানের পূর্ণতা হলো তার উত্তম চরিত্রে।",
        arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
        source: "তিরমিজি ১১৬২"
      },
      {
        text: "সৎ কাজের ফলাফল জান্নাত।",
        arabic: "الْجَنَّةُ هِيَ ثَمَرَةُ الأَعْمَالِ الصَّالِحَةِ",
        source: "তিরমিজি ২৫৫৩"
      },
      {
        text: "যে ব্যক্তি আল্লাহর জন্য বিনয়ী হয়, আল্লাহ তাকে উন্নতি দান করেন।",
        arabic: "مَنْ تَوَاضَعَ لِلَّهِ رَفَعَهُ اللَّهُ",
        source: "মুসলিম ২৫৮৮"
      },
      {
        text: "সর্বোত্তম দান হলো যখন তুমি স্বয়ং সম্পদশালী।",
        arabic: "أَفْضَلُ الصَّدَقَةِ أَنْ تَصَدَّقَ وَأَنْتَ صَحِيحٌ شَحِيحٌ",
        source: "বুখারি ২৭৩৮"
      },
      {
        text: "তোমরা সহজ করো, কঠিন করো না। আনন্দ দাও, ভীত করো না।",
        arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا",
        source: "বুখারি ৬১২৫"
      },
      {
        text: "যে ব্যক্তি মানুষের প্রতি রহম করে না, তার প্রতি আল্লাহও রহম করেন না।",
        arabic: "مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ",
        source: "বুখারি ৬০১৩"
      },
      {
        text: "তোমার প্রতিবেশীর প্রতি সদয় হও।",
        arabic: "أَحْسِنُوا إِلَى جِيرَانِكُمْ",
        source: "তিরমিজি ১৯৪৩"
      },
      {
        text: "যে ব্যক্তি ন্যায় বিচার করে, আল্লাহ তাকে ভালোবাসেন।",
        arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
        source: "মুসলিম ১৮২৭"
      },
      {
        text: "তোমরা সত্যবাদী হও, কারণ সত্য ভালো কাজের দিকে নির্দেশ করে।",
        arabic: "عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
        source: "বুখারি ৬০৯৪"
      },
      {
        text: "যে ব্যক্তি তার পিতামাতাকে সম্মান করে, তার জান্নাতে প্রবেশ সহজ হয়।",
        arabic: "مَنْ أَكْرَمَ وَالِدَيْهِ دَخَلَ الْجَنَّةَ",
        source: "তিরমিজি ১৮৯৮"
      },
      {
        text: "নিশ্চয়ই আল্লাহ পবিত্র এবং তিনি পবিত্র বস্তু গ্রহণ করেন।",
        arabic: "إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا",
        source: "মুসলিম ১০১৫"
      }
    ];

    // রেনডমভাবে একটি হাদিস নির্বাচন
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];

    // রেসপন্স তৈরি
    const response = `📖 *হাদিস:*\n"${randomHadith.text}"\n\n🕌 *আরবি:* ${randomHadith.arabic}\n📄 *সূত্র:* ${randomHadith.source}`;

    // বার্তা পাঠানো
    message.reply(response);
  }
};
