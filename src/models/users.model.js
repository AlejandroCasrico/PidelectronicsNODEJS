
const { Model,DataTypes }= require('sequelize');
 const bcrypt = require('bcrypt');
 const sequelize = require('../db/db');

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

connectToDatabase();
class User extends Model {}
    User.init({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(10),
            set(value){
                const hashedPassword = bcrypt.hashSync(value,10);
                this.setDataValue('password',hashedPassword);
            }

        },rol:{
            type:DataTypes.ENUM("Client","admin"),
            allowNull:false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }

    },{
        sequelize,
        modelName:"User"
    })

    User.prototype.comparePassword = async function(candidatePassword) {
        return candidatePassword === this.password;
      };

    module.exports = User;