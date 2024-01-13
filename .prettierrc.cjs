module.exports = {
    arrowParens: "always",
    printWidth: 80,
    singleQuote: false,
    jsxSingleQuote: false,
    semi: true,
    trailingComma: "all",
    tabWidth: 2,
    plugins: [
      require.resolve("@ianvs/prettier-plugin-sort-imports"),
      require.resolve("prettier-plugin-tailwindcss"),
    ],
    // @ianvs/prettier-plugin-sort-imports
    importOrder: [
      "^(react/(.)$)|^(react$)|^(react-native(.)$)",
      "^(next/(.)$)|^(next$)",
      "^(expo(.)$)|^(expo$)",
      "<THIRD_PARTY_MODULES>",
      "^~/(.*)$",
      "^[./]",
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderMergeDuplicateImports: true,
    importOrderCombineTypeAndValueImports: true,
    // prettier-plugin-tailwindcss
    tailwindConfig: "./tailwind.config.js",
  };