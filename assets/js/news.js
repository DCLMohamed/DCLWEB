/* ==========================================================================
   Dubai Coating Limited -- news and events

   EDIT HERE ONLY. Every entry on `news.html` is built from this array by
   `main.js`. An empty array renders a plain "nothing published yet" line, so
   the page is safe to ship with no posts at all.

   TO ADD A POST
   1. Copy the block below and paste it at the TOP of the array. Newest first;
      nothing sorts the list for you.
   2. Fill every field. Delete the `placeholder: true` line.
   3. Reload the browser.

       {
         date:  '2026-09-14',             // ISO, so it sorts and reads plainly
         title: { en: 'Headline', ar: '' },
         body:  { en: 'One or two sentences.', ar: '' },
         img:   'assets/img/company/some-photo.jpg',   // optional, omit if none
         alt:   { en: 'What the photo shows', ar: '' }  // required with `img`
       }

   RULES
   - An empty `ar` string falls back to the `en` one, the same way the project
     list works.
   - No invented news. Every entry comes from DCL.
   - `placeholder: true` marks the sample entry below. It renders with a visible
     warning so it can never be published by accident. Delete it once real
     entries exist.
   ========================================================================== */

var NEWS = [
  {
    placeholder: true,
    date: '2026-08-28',
    title: { en: 'Sample entry — replace before launch', ar: '' },
    body: {
      en: 'This entry shows how a post renders. DCL has not supplied any news ' +
          'or events yet. Delete this block, or the page will publish it.',
      ar: ''
    }
  }
];
