const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { connectDb } = require('./api/config/database');
const openapiSpecification = require('./swagger/swaggerConfig');
const userRoutes = require('./api/routes/User');
const userProfileRoutes = require('./api/routes/profile');
const locationRoutes = require('./api/routes/location');
const houseRoutes = require('./api/routes/house');
const amenityRoutes = require('./api/routes/amenity');
const postHousePhotos = require('./api/routes/housePhotos');
const searchRoutes = require('./api/routes/search');
const reviewRoutes = require('./api/routes/review');

const app = express();
app.use(morgan('tiny'));
app.use([express.json(), express.urlencoded({ extended: true })]);
app.use(cookieParser());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(cors({ origin: 'http://localhost:3000' }));
// routes
app.use('/api/users', [userRoutes, userProfileRoutes]);
app.use('/api/', [locationRoutes, amenityRoutes, houseRoutes, searchRoutes, postHousePhotos, reviewRoutes]);
// app.use(erroHandler);
app.get('/api/static/uploads/:imageName', (req, res) => {
  const { imageName } = req.params;
  return res.sendFile(path.join(__dirname, `../uploads/${imageName}`));
});

connectDb().then(app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at port ${process.env.PORT}`);
}));
