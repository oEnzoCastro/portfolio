/**
 * Which section is current (WORK-03), from where each section's heading is
 * on screen.
 *
 * A heading becomes current once it crosses a "reading line". The line sits
 * `offset` px below the top while there is plenty left to scroll. In the
 * last screen of the page it moves down towards the bottom of the viewport,
 * in step with the scroll: short final sections can never reach the top, so
 * this lets each of them become current in turn instead of all at once.
 *
 * @param tops      Each heading's top, in px from the top of the viewport, in page order.
 * @param offset    Where the line sits normally, in px from the top.
 * @param viewport  The viewport height.
 * @param remaining How far the page can still scroll down, in px.
 */
export function currentSection(
  tops: number[],
  offset: number,
  viewport: number,
  remaining: number,
): number {
  if (tops.length === 0) return -1;

  const progress = remaining >= viewport ? 0 : 1 - Math.max(remaining, 0) / viewport;
  const line = offset + progress * (viewport - offset);

  let current = 0;
  tops.forEach((top, index) => {
    if (top <= line) current = index;
  });
  return current;
}
