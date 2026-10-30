/** Build a wa.me deep link with a pre-filled message. Safe to use at build time and in the browser. */
export function waLink(number, text = '') {
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${number}${query}`;
}
