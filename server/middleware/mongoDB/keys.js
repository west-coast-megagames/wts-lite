const config = require('config');

const dbName = config.get('dbName');
const connectString =
  // "mongodb+srv://admin:2OA8yBjRkRRll27r@cluster0.bqp3z.mongodb.net/" +
  `mongodb+srv://Admin:hB4wnymy0OXlUaIe@cluster0.zvg7q1d.mongodb.net/?appName=Cluster0${dbName}`;

module.exports = {
	mongoURI: connectString
};