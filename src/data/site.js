/**
 * Business facts. Anything marked TODO(client) is unconfirmed — leave it null
 * and the UI simply omits it rather than showing a guess.
 */
export const site = {
  name: {
    en: 'Sri Swarnabairava Associates',
    ta: 'ஸ்ரீ ஸ்வர்ண பைரவா அசோசியேட்ஸ்',
  },
  // Two-line lockup used in the header, mirroring the logo's wordmark.
  nameLines: {
    en: ['Sri Swarnabairava', 'Associates'],
    ta: ['ஸ்ரீ ஸ்வர்ண பைரவா', 'அசோசியேட்ஸ்'],
  },
  shortName: 'SSA',
  city: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
  phones: [
    { tel: '+919363137429', display: '93631 37429' },
    { tel: '+919629777429', display: '96297 77429' },
  ],
  // TODO(client): confirm which number is on WhatsApp.
  whatsapp: '919363137429',
  email: 'sriswarnabairava@gmail.com',
  // TODO(client): street address, opening hours, Google Maps link, GBP review link.
  address: null,
  /**
   * Where callback requests are POSTed (JSON body, sent as text/plain to avoid a CORS
   * preflight — works with a Google Apps Script web app writing to a Sheet).
   * TODO(client): set once the lead sheet/CRM is decided. While null, a callback
   * request is sent as a pre-filled WhatsApp message instead, so no lead is lost.
   */
  leadEndpoint: null,
  hours: null,
  mapEmbedUrl: null,
  reviewsUrl: null,
};
