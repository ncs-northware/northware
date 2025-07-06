import type { SVGProps } from "react";
import { forwardRef, type Ref } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShadcnuiIcon = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
  ref: Ref<SVGSVGElement>
) => {
  return (
    <svg
      aria-labelledby={titleId}
      fill="currentcolor"
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M22.219 11.784 11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305" />
    </svg>
  );
};
const ForwardRef = forwardRef(SvgShadcnuiIcon);
export default ForwardRef;
