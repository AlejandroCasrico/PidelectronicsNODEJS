
const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/db');
const User = require('./users.model');


class Movement extends Model{}
async function connection(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('otra tabla creada')
    } catch (error) {
        console.error('fallo');
    }
}
connection()
Movement.init({
    id_movement:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    type_movement:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false

    },
    dateTime:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
},{
    sequelize,
    modelName:"movement"
});

Movement.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Movement;