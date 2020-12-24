const Sequelize = require('sequelize')
const UserModel = require('./user')

const sequelize = new Sequelize(
    /*
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    */
    DATABASE = TeamkillLocalDB,
    DATABASE_USER = postgres,
    DATABASE_PASSWORD = karibik1,
    {
        dialect: 'postgres',
    },
);

const models = {
    User: UserModel
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = {
    models: models,
    sequelize: sequelize
}
