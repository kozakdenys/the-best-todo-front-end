module.exports = {
    env: {
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    overrides: [
        {
            files: ["src/**/*"]
        }
    ]
};
