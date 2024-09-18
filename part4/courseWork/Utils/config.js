const logger = require("./logger");
require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URL;

logger.info(`PORT: ${PORT}`);
logger.info(`URL: ${MONGODB_URI}`);

module.exports = {
  MONGODB_URI,
  PORT,
};
