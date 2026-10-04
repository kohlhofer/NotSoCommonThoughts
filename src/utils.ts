export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // Frontmatter dates parse as UTC midnight; format them in UTC so a build
    // in a western time zone does not show the previous day.
    timeZone: 'UTC'
  });
}

// Category pages live at lowercase, hyphenated URLs:
// "Artificial Intelligence" becomes /category/artificial-intelligence/.
export function categorySlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function categoryUrl(tag: string): string {
  return `/category/${categorySlug(tag)}/`;
}
