const connectToDB = require('./config/db.config');
require('dotenv').config({ path: './.env' });

const app = require('./app');

connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});