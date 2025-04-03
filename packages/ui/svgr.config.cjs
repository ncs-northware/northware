module.exports = {
  dimensions: true,
  svgProps: { fill: "{fill}", stroke: "{stroke}" },
  jsxRuntime: "classic",
  ref: true,
  typescript: true,
  prettier: false,
  filenameCase: "kebab",
  titleProp: true,
  template: ({ imports, componentName, jsx, exports }, { tpl }) => {
    return tpl`
  ${imports};

  interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill' | 'stroke'> {
    /**
     * @default "currentColor"
     */
    fill?: (string & {});
    stroke?: (string & {});
  }
  
  const ${componentName} = ({ fill: fillProp = "currentColor", stroke: strokeProp, ...props }: IconProps, ref: Ref<SVGSVGElement>) => {

    const title = "${componentName}";
    const titleId = "${componentName}";
    const fill = fillProp
    const stroke = strokeProp

    return (
      ${jsx}
    );
  };
   
  ${exports};
  `;
  },
};
