/**
 * Business facts. Anything marked TODO(client) is unconfirmed — leave it null
 * and the UI simply omits it rather than showing a guess.
 */
// Exact pin of the Google Business Profile listing (from the client's share link).
const MAP_PIN = '11.0018212,77.0284481';

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
  // First number is the one every Call button dials.
  phones: [
    { tel: '+919488337429', display: '94883 37429' },
    { tel: '+919363137429', display: '93631 37429' },
  ],
  whatsapp: '919363137429',
  email: 'sriswarnabairava@gmail.com',
  // Matches the Google Business Profile listing.
  address: {
    lines: ['D.R. City Centre, 48, Kamarajar Road', 'Opp. Singanallur Bus Stand, TNHB Housing Unit', 'Singanallur, Coimbatore, Tamil Nadu 641005'],
    street: 'D.R. City Centre, 48, Kamarajar Road, Opp. Singanallur Bus Stand, Singanallur',
    locality: 'Coimbatore',
    region: 'Tamil Nadu',
    postalCode: '641005',
  },
  /**
   * Where callback requests are POSTed (JSON body, sent as text/plain to avoid a CORS
   * preflight — works with a Google Apps Script web app writing to a Sheet).
   * TODO(client): set once the lead sheet/CRM is decided. While null, a callback
   * request is sent as a pre-filled WhatsApp message instead, so no lead is lost.
   */
  leadEndpoint: null,
  // TODO(client): opening hours, GBP review link.
  hours: null,
  mapEmbedUrl: `https://maps.google.com/maps?q=${MAP_PIN}&z=17&output=embed`,
  // Opens the business listing itself (reviews, hours, directions).
  mapsUrl: 'https://maps.app.goo.gl/GNp9NBiWph69gUTj8',
  reviewsUrl: null,
};
