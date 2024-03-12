
const sequelize = require('../db/db');
async function getAllMovements(req,res){
    try {
        const movements = await sequelize.query('Call getALLMovements()');
        const [result] = movements;
        if(!result || result.length === 0)return res.status(404).json({message:"failed to retriever data"});
        res.status(200).json({
            message:"Obtained data",
            obj:movements
        })
    } catch (error) {
        res.status(500).json({
            message:"Something happened"
        })
    } 
}
async function deposit(req, res) {
    try {
        const { user_id, amount } = req.body;
        await sequelize.query('CALL Transaction(?, ?)', {
            replacements: [user_id, amount]
        });
        res.status(200).json({ message: 'Movement success.' });
    } catch (error) {
        res.status(500).json({ message: 'Error to make the movement.' });
    }
}
async function retiro(req,res){
    try {
        const {user_id,amount} = req.body;
        await sequelize.query('Call retiro(?,?)',{
            replacements:[user_id,amount]
        })
        res.status(200).json({ message: 'Movement success.' });
    } catch (error) {
        res.status(500).json({ message: 'Error to make the movement.' });
    }
}
module.exports = {
    getAllMovements,
    deposit,
    retiro
}