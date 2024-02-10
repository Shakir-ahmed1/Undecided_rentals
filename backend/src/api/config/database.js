const { connect } = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`db connection failure: ${error}`);
  }
};

module.exports = { connectDb };
