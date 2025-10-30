module.exports = {
  default: {
    require: ["./features/step-definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["./features/**/*.feature"],
    format: ["progress"],
  },
};