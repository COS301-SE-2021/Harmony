const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@base-color": "#f44336" },
    },
  })
);
