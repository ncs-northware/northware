import type { SVGProps } from "react";
import { type Ref, forwardRef } from "react";
interface IconProps extends Omit<SVGProps<SVGSVGElement>, "fill" | "stroke"> {
  /**
   * @default "currentColor"
   */
  fill?: string & {};
  stroke?: string & {};
}
const SvgShadcnui = (
  { fill: fillProp = "currentColor", stroke: strokeProp, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  const title = "SvgShadcnui";
  const titleId = "SvgShadcnui";
  const fill = fillProp;
  const stroke = strokeProp;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      ref={ref}
      aria-labelledby={titleId}
      {...props}
    >
      <title id={titleId}>{title}</title>
      <path d="M22.219 11.784 11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305" />
    </svg>
  );
};
const ForwardRef = forwardRef(SvgShadcnui);
export default ForwardRef;
