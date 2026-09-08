/* ==========================================================================
   Dubai Coating Limited -- project list

   EDIT HERE ONLY. Every project tile, every case-study modal and the sector
   filter are built from this array by `main.js`. Both the English page and the
   Arabic page read this same file.

   TO ADD A PROJECT
   1. Put the photo in `assets/img/projects/` as a lowercase-hyphen `.jpeg`.
   2. Copy the block below, paste it where the project belongs in the order,
      and fill every field.
   3. Reload the browser. The tile and its sector filter appear on their own.

       {
         img:   'file-name.jpeg',
         w:     348, h: 252,              // the photo's real pixel size
         area:  '12,345',                 // square metres, no unit
         year:  '2024' or '2024-2025',
         name:  { en: 'Project name', ar: '' },
         cat:   { en: 'New building', ar: '' },
         owner: { en: 'Client name', ar: '' },
         alt:   { en: 'What the photo shows', ar: '' },
         scope: { en: 'One sentence on the work.', ar: '' }
       }

   RULES
   - `cat` must reuse one of the categories already in use, or the filter grows
     a new chip. Current set: FPSO conversion, New building,
     Internal tank refurbishment.
   - `area` and `year` carry no language. Western digits are standard for UAE
     industrial work, in Arabic as well as English.
   - An empty `ar` string falls back to the `en` one, so the Arabic page stays
     readable while the translation is outstanding.
   - The "Client" and "Programme" paragraphs in the modal are written from
     `owner` and `year`. Do not write them by hand.

   Source: reference/company-profile/dcl-company-profile.pdf, "NOTABLE
   PROJECTS", pages 2-5. The profile lists 19; these are the six the client
   leads with. The other 13 photos stay in assets/img/projects/ -- add one back
   by copying its facts out of the profile into a new object here.
   ========================================================================== */

var PROJECTS = [
  {
    img: 'fpso-baobab-ivoirien-mv10.jpeg',
    w: 345, h: 252,
    area: '155,000',
    year: '2025-2026',
    name: { en: 'FPSO Baobab Ivoirien MV10', ar: '' },
    cat: { en: 'FPSO conversion', ar: 'تحويل FPSO' },
    owner: { en: 'MODEC Management Services Pte. Ltd.', ar: '' },
    alt: { en: 'FPSO Baobab Ivoirien MV10 in dry dock', ar: '' },
    scope: {
      en: 'Surface preparation, blasting and coating of 155,000 m² as part of the FPSO Baobab Ivoirien MV10 conversion.',
      ar: 'تجهيز الأسطح، وأعمال السفع الرملي، والطلاء لمساحة 155,000 متر مربع ضمن مشروع تحويل وحدة FPSO Baobab Ivoirien MV10.'
    }
  },
  {
    img: 'ti-asia-and-ti-africa.jpeg',
    w: 383, h: 278,
    area: '1,000,000',
    year: '2011-2012',
    name: { en: 'TI Asia & TI Africa', ar: '' },
    cat: { en: 'Internal tank refurbishment', ar: 'تجديد الخزانات الداخلية' },
    owner: { en: 'Euronav', ar: '' },
    alt: { en: 'TI Asia or TI Africa crude carrier at sea', ar: '' },
    scope: {
      en: 'Internal tank refurbishment totalling 1,000,000 m² across the TI Asia and TI Africa ultra-large crude carriers.',
      ar: 'تجديد الخزانات الداخلية بمساحة إجمالية تبلغ 1,000,000 متر مربع عبر ناقلتي النفط الخام العملاقتين TI Asia وTI Africa.'
    }
  },
  {
    img: 'borwin-3-hvdc-platform.jpeg',
    w: 394, h: 278,
    area: '220,000',
    year: '2016-2018',
    name: { en: 'Borwin 3 HVDC Platform', ar: '' },
    cat: { en: 'New building', ar: 'إنشاء جديد' },
    owner: { en: 'TenneT', ar: '' },
    alt: { en: 'Borwin 3 HVDC platform during transport', ar: '' },
    scope: {
      en: 'Surface preparation, blasting and coating of 220,000 m² for the Borwin 3 HVDC platform.',
      ar: 'تجهيز الأسطح، وأعمال السفع الرملي، والطلاء لمساحة 220,000 متر مربع لمنصة BorWin 3 HVDC.'
    }
  },
  {
    img: 'fpso-atlanta.jpeg',
    w: 349, h: 289,
    area: '153,244',
    year: '2023-2024',
    name: { en: 'FPSO Atlanta', ar: '' },
    cat: { en: 'FPSO conversion', ar: 'تحويل FPSO' },
    owner: { en: 'Yinson / Enauta', ar: '' },
    alt: { en: 'FPSO Atlanta on the water', ar: '' },
    scope: {
      en: 'Surface preparation, blasting and coating of 153,244 m² as part of the FPSO Atlanta conversion.',
      ar: 'تجهيز الأسطح، وأعمال السفع الرملي، والطلاء لمساحة 153,244 مترًا مربعًا ضمن مشروع تحويل وحدة FPSO Atlanta.'
    }
  },
  {
    img: 'prelude-flng-turret.jpeg',
    w: 383, h: 277,
    area: '45,000',
    year: '2014-2015',
    name: { en: 'Prelude FLNG Turret', ar: 'برج Prelude FLNG' },
    cat: { en: 'New building', ar: 'إنشاء جديد' },
    owner: { en: 'Shell', ar: '' },
    alt: { en: 'Prelude FLNG turret at the shipyard', ar: '' },
    scope: {
      en: 'Surface preparation, blasting and coating of 45,000 m² for the Prelude FLNG turret.',
      ar: 'تجهيز الأسطح، وأعمال السفع الرملي، والطلاء لمساحة 45,000 متر مربع لبرج Prelude FLNG.'
    }
  },
  {
    img: 'baynouna-class-corvette.jpeg',
    w: 383, h: 278,
    area: '38,000',
    year: '2015',
    name: { en: 'Baynouna Class Corvette', ar: 'كورفيت فئة بينونة' },
    cat: { en: 'New building', ar: 'إنشاء جديد' },
    owner: { en: 'UAE Navy, Abu Dhabi', ar: 'القوات البحرية الإماراتية – أبوظبي' },
    alt: { en: 'Baynouna Class Corvette outside the shipyard', ar: '' },
    scope: {
      en: 'Surface preparation, blasting and coating of 38,000 m² for the Baynouna Class Corvette new build.',
      ar: 'تجهيز الأسطح، وأعمال السفع الرملي، والطلاء لمساحة 38,000 متر مربع ضمن مشروع إنشاء كورفيت من فئة بينونة.'
    }
  }
];
