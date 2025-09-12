import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDocsIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: 2
  }} viewBox="0 0 513 512" fill="currentcolor" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path d="M.35 0h512v512H.35z" style={{
      fill: "none"
    }} /><path d="M236.35 17.547a40 40 0 0 1 40 0l176.506 101.906a40 40 0 0 1 20 34.641v203.812a40 40 0 0 1-20 34.641L276.35 494.453a40 40 0 0 1-40 0L59.844 392.547a40 40 0 0 1-20-34.641V154.094a40 40 0 0 1 20-34.641z" style={{
      fill: "none"
    }} /><clipPath id="docs-icon_svg__a"><path d="M236.35 17.547a40 40 0 0 1 40 0l176.506 101.906a40 40 0 0 1 20 34.641v203.812a40 40 0 0 1-20 34.641L276.35 494.453a40 40 0 0 1-40 0L59.844 392.547a40 40 0 0 1-20-34.641V154.094a40 40 0 0 1 20-34.641z" /></clipPath><g clipPath="url(#docs-icon_svg__a)"><path d="M236.35 17.547a40 40 0 0 1 40 0l176.506 101.906a40 40 0 0 1 20 34.641v203.812a40 40 0 0 1-20 34.641L276.35 494.453a40 40 0 0 1-40 0L59.844 392.547a40 40 0 0 1-20-34.641V154.094a40 40 0 0 1 20-34.641z" style={{
        fill: "#38bdf8"
      }} /><path d="m256.35 506 216.5-125V131l-216.5 125z" style={{
        fill: "#0ea5e9"
      }} /><path d="m256.35 6 216.5 125v250l-216.5-125z" style={{
        fill: "#38abee"
      }} /><path d="M256.35 6 39.85 131v250l216.5-125z" style={{
        fill: "#38aaf1"
      }} /><path d="M39.85 131v250l216.5 125V256z" style={{
        fill: "#0ea5f2"
      }} /></g><path d="M181.35 106c-31.055 0-56.25 25.195-56.25 56.25v187.5c0 31.055 25.195 56.25 56.25 56.25h187.5c10.371 0 18.75-8.379 18.75-18.75s-8.379-18.75-18.75-18.75V331c10.371 0 18.75-8.379 18.75-18.75v-187.5c0-10.371-8.379-18.75-18.75-18.75zm0 225h150v37.5h-150c-10.371 0-18.75-8.379-18.75-18.75S170.979 331 181.35 331m18.75-140.625c0-5.156 4.219-9.375 9.375-9.375h112.5c5.156 0 9.375 4.219 9.375 9.375s-4.219 9.375-9.375 9.375h-112.5c-5.156 0-9.375-4.219-9.375-9.375m9.375 28.125h112.5c5.156 0 9.375 4.219 9.375 9.375s-4.219 9.375-9.375 9.375h-112.5c-5.156 0-9.375-4.219-9.375-9.375s4.219-9.375 9.375-9.375" style={{
      fill: "#fff",
      fillRule: "nonzero"
    }} /></svg>;
};
const ForwardRef = forwardRef(SvgDocsIcon);
export default ForwardRef;