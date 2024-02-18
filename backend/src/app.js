const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./api/config/database');
const openapiSpecification = require('./swagger/swaggerConfig');
const userRoutes = require('./api/routes/User');
const userProfileRoutes = require('./api/routes/profile');

const app = express();
app.use(morgan('tiny'));
app.use([express.json(), express.urlencoded({ extended: true })]);
app.use(cookieParser());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(cors({ origin: 'http://localhost:3001' }));

// routes
app.use('/api/users', [userRoutes, userProfileRoutes]);
// app.use(erroHandler);

connectDb().then(app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at port ${process.env.PORT}`);
}));
