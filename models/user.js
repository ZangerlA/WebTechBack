//Model for users. The model is an abstract view on a schema.

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        username: {
            type: DataTypes.String,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        mail: {
            type: DataTypes.String,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    User.associate = models => {
        //TODO add dependencies
        //ex. User.hasMany(models.SomeModel);
    };

    return User;
};

export default user;
