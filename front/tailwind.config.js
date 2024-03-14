const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        microsoft: "Microsoft YaHei"
      }
    }
  },
  color: {
    ...colors
  }
};
