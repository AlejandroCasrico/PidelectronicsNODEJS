
const User = require('../models/users.model')
async function auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const isValidPassword = await user.comparePassword(password);
  
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      res.json({ rol: user.rol }); 
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  
}
module.exports = {
    auth
}