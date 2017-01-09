'use strict'
module.exports = function(sequelize, DataTypes) {

    var Reference = sequelize.define('Reference', {
        BookBookId: {
            type: DataTypes.INTEGER,
            field: 'BookBookId',
            value:"Book",
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        explanation: {
            type: DataTypes.STRING,
            field: 'explanation'
        },
        link: {
            type: DataTypes.STRING,
            field: 'link'
        },
    }, {
        timestamps: false,
        tableName: 'references',
        classMethods: {
            associate: function(models) {
                Reference.belongsTo(models.Book, {
                    onDelete: "CASCADE",
                });
            }
        }

    });
    Reference.removeAttribute('id');

    return Reference;
}
