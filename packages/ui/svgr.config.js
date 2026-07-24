module.exports = {
  dimensions: true,
  filenameCase: "kebab",
  jsxRuntime: "classic",
  outDir: "./icons/output",
  prettier: false,
  ref: true,
  svgProps: { fill: "currentcolor" },
  template: (variables, { tpl }) => tpl`
      ${variables.imports};
      
      ${variables.interfaces};
     
      const ${variables.componentName} = (${variables.props}) => {
        
        return (
          ${variables.jsx}
        )  
      };

      ${variables.exports}
    `,
  titleProp: true,
  typescript: true,
};
