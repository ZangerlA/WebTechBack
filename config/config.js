var env = require('dotenv').config()

const {PORT, DB_HOST, DB_USERNAME, DB_PASSWORD} = process.env;

module.exports = {
	"development": {
		"username": DB_USERNAME,
		"password": DB_PASSWORD,
		"database": "TeamkillLocalDB_dev",
		"host": DB_HOST,
		"dialect": "postgres",
	},
	"test": {
		"username": DB_USERNAME,
		"password": DB_PASSWORD,
		"database": "TeamkillLocalDB_test",
		"host": DB_HOST,
		"dialect": "postgres"
	},
	"production": {
		"username": DB_USERNAME,
		"password": DB_PASSWORD,
		"database": "TeamkillLocalDB_prod",
		"host": DB_HOST,
		"dialect": "postgres"
	}
}
