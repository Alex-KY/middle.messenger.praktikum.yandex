const sanitizeHTML = require('sanitize-html');

export default function sanitize (html: string) {
  return sanitizeHTML(html, {
    allowedTags: false,
    allowedAttributes: false
  });
}
