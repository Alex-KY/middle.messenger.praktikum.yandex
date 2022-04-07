import sanitizeHtml from 'sanitize-html';

export default function sanitize (html: string) {
  return sanitizeHtml(html, {
    allowedTags: false,
    allowedAttributes: false
  });
}
