/**
 * The current year, for the footer.
 *
 * With Cache Components, `new Date()` during prerender fails the build (its
 * value would change on every request). "use cache" computes it once and
 * keeps it with the static page; every deploy rebuilds the site, so the
 * year moves on with the first deploy of a new year.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
