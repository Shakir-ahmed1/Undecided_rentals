const express = require('express');
const morgan = require('morgan');
const { connectDb } = require('./api/config/database');
require('./api/helpers/envPath');

const userRoutes = require('./api/routes/User');

const app = express();
app.use(morgan('tiny'));
app.use([express.json(), express.urlencoded({ extended: true })]);

// routes
app.use('/api/users', userRoutes);

connectDb().then(app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at port ${process.env.PORT}`);
}));