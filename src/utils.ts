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