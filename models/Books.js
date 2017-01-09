'use strict'
module.exports = function(sequelize, DataTypes) {

    var Book = sequelize.define('Book', {
        book_id: {
            type: DataTypes.INTEGER,
            field: 'book_id',
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            field: 'title'
        },
        author: {
            type: DataTypes.STRING,
            field: 'author'
        },
        genre: {
            type: DataTypes.STRING,
            field: 'genre'
        },
        year: {
            type: DataTypes.INTEGER,
            field: 'year'
        },
        pages: {
            type: DataTypes.INTEGER,
            field: 'pages'
        },
        publisher: {
            type: DataTypes.STRING,
            field: 'publisher'
        }
    }, {
        timestamps: false,
        tableName: 'books',
        classMethods: {
            associate: function(models) {
                Book.hasMany(models.Reference)
            }
        }
    });

    return Book;
}
