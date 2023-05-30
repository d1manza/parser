const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config')
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

const Categories = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url_postfix: {
        type: DataTypes.STRING,
        allowNull: false
    },
    page_count: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    cashback_coef: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0.3
    }
}, {});

module.exports = Categories;
