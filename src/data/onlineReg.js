/**
 * Which deeds Tamil Nadu registers online (status as of October 2026).
 *   online  — presence-less: first sale of layout plots/flats & TNHB (17 Aug 2026),
 *             bank/NBFC loan mortgages (15 Sep 2026)
 *   partial — paperless, but a visit for biometrics/admission may be needed:
 *             settlement, release, partition, revocation (15 Oct 2026)
 *   office  — not yet covered
 * Re-check against tnreginet.gov.in before each content update.
 */
export const deedTypes = [
  {
    id: 'first-sale-plot',
    status: 'online',
    label: { en: 'New plot (first sale)', ta: 'புதிய மனை (முதல் விற்பனை)' },
    detail: {
      en: 'First sale of a plot in an approved layout is registered fully online since 17 Aug 2026.',
      ta: 'அங்கீகரிக்கப்பட்ட மனைப்பிரிவில் மனையின் முதல் விற்பனை 17 ஆக. 2026 முதல் முழுமையாக ஆன்லைனில் பதிவாகிறது.',
    },
    service: 'online-registration',
  },
  {
    id: 'first-sale-flat',
    status: 'online',
    label: { en: 'New flat (first sale)', ta: 'புதிய அடுக்ககம் (முதல் விற்பனை)' },
    detail: {
      en: 'First sale of a flat from the builder is registered fully online since 17 Aug 2026.',
      ta: 'கட்டுநரிடமிருந்து அடுக்ககத்தின் முதல் விற்பனை 17 ஆக. 2026 முதல் முழுமையாக ஆன்லைனில் பதிவாகிறது.',
    },
    service: 'online-registration',
  },
  {
    id: 'mortgage',
    status: 'online',
    label: { en: 'Bank loan mortgage', ta: 'வங்கிக் கடன் அடமானம்' },
    detail: {
      en: 'Bank and NBFC loan mortgages can be registered online without an office visit since 15 Sep 2026.',
      ta: 'வங்கி/NBFC கடன் அடமானங்களை 15 செப். 2026 முதல் அலுவலகம் செல்லாமல் ஆன்லைனில் பதிவு செய்யலாம்.',
    },
    service: 'mortgage-deed',
  },
  {
    id: 'tnhb',
    status: 'online',
    label: { en: 'TNHB house / plot', ta: 'TNHB வீடு / மனை' },
    detail: {
      en: 'Tamil Nadu Housing Board sale documents are registered online.',
      ta: 'தமிழ்நாடு வீட்டுவசதி வாரிய விற்பனை ஆவணங்கள் ஆன்லைனில் பதிவாகின்றன.',
    },
    service: 'online-registration',
  },
  {
    id: 'family',
    status: 'partial',
    label: { en: 'Settlement / partition / release', ta: 'செட்டில்மென்ட் / பாகப்பிரிவினை / விடுதலை' },
    detail: {
      en: 'Filed paperless since 15 Oct 2026, but parties may still need one visit for biometrics or admission.',
      ta: '15 அக். 2026 முதல் காகிதமில்லா முறையில் சமர்ப்பிக்கலாம்; ஆனால் கைரேகை அல்லது ஒப்புதலுக்கு ஒருமுறை செல்ல வேண்டியிருக்கலாம்.',
    },
    service: 'document-registration',
  },
  {
    id: 'resale',
    status: 'office',
    label: { en: 'Resale property', ta: 'மறுவிற்பனைச் சொத்து' },
    detail: {
      en: 'Resale deeds still need a visit to the Sub-Registrar office. We prepare everything so it is one short visit.',
      ta: 'மறுவிற்பனைப் பத்திரங்களுக்கு இன்னும் சார்பதிவாளர் அலுவலகம் செல்ல வேண்டும். ஒரே குறுகிய வருகையாக இருக்க அனைத்தையும் தயார் செய்கிறோம்.',
    },
    service: 'document-registration',
  },
  {
    id: 'poa',
    status: 'office',
    label: { en: 'Power of attorney', ta: 'அதிகாரப் பத்திரம்' },
    detail: {
      en: 'Power of attorney still needs an office visit. We draft it and book the slot.',
      ta: 'அதிகாரப் பத்திரத்திற்கு இன்னும் அலுவலகம் செல்ல வேண்டும். வரைவு செய்து நேரத்தை முன்பதிவு செய்கிறோம்.',
    },
    service: 'document-registration',
  },
];
