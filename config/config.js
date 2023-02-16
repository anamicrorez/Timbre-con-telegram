const dotenv = require("dotenv");

dotenv.config();

module.exports = class Config {
  static TOKEN = process.env.TOKEN;
};
