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
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        contact_email: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pwHash: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });
    User.associate = models => {
        //TODO add dependencies
        //ex. User.hasMany(models.someModel);
    };

    return User;
};

module.exports =  user;
