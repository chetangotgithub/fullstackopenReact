const logger = require("./logger");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

logger.info(`PORT: ${PORT}`);
logger.info(`URL: ${MONGODB_URL}`);

module.exports = {
  MONGODB_URL,
  PORT,
};
