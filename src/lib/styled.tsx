import type { ComponentProps, ElementType } from "react";

export function styled<T extends ElementType>(
  Tag: T,
  baseClass: string | undefined,
  displayName: string,
) {
  function Styled({
    className,
    ...props
  }: ComponentProps<T> & { className?: string }) {
    const Component: ElementType = Tag;
    const classes = [baseClass, className].filter(Boolean).join(" ");
    return <Component className={classes || undefined} {...props} />;
  }
  Styled.displayName = displayName;
  return Styled;
}
