module.exports = {
  dimensions: true,
  outDir: "./src/icons/output",
  svgProps: { fill: "currentcolor" },
  jsxRuntime: "classic",
  ref: true,
  typescript: true,
  prettier: false,
  filenameCase: "kebab",
  titleProp: true,
  template: (variables, { tpl }) => {
    return tpl`
      ${variables.imports};
      
      ${variables.interfaces};
     
      const ${variables.componentName} = (${variables.props}) => {
        
        return (
          ${variables.jsx}
        )  
      };

      ${variables.exports}
    `;
  },
};
