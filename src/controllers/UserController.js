
const sequelize = require('../db/db')
const bcrypt = require('bcrypt');
async function getUsers(req,res){
    try {
        const users= await sequelize.query('Call getAllUsers()');
        const [result] = users;
        if(!result || result.length === 0)return res.status(404).json({message:"failed to retriever data"});
        res.status(200).json({
            message:"obtained data",
            obj:users
        })
    } catch (error) {
        res.status(500).json({
            message:"Something happened"
        })
    }
}
async function CreateUser(req, res) {
    try {
        const { name, lastName, email, password, rol } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sequelize.query('Call altaUsers(?,?,?,?,?)', {
            replacements: [name, lastName, email, hashedPassword, rol]
        });
        
        console.log(result);
        res.status(200).json({ message: "User inserted successfully", obj: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = {
    CreateUser,
    getUsers
}