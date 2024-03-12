const router = require('express').Router();
const userController = require('../controllers/UserController');
const movementController = require('../controllers/movementController');
const ExportController = require('../controllers/ExportarMovController')

//routes for users 
router.get('/users',userController.getUsers)
router.post('/users',userController.CreateUser);
//routes for movements
router.get('/movements',movementController.getAllMovements)
router.post('/movements',movementController.deposit);
router.post('/movements/retiro',movementController.retiro);

router.get('/excel-export',ExportController.exportMovExcel)

module.exports = router;