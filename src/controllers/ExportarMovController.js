

const Movement = require('../models/movements.models');
const ExcelJS = require('exceljs');

exports.exportMovExcel = async (req, res) => {
    try {
       
        const movimientos = await Movement.findAll();

      
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Movimientos');

      
        worksheet.columns = [
            { header: 'ID', key: 'id_movement' },
            { header: 'Tipo de Movimiento', key: 'type_movement' },
            { header: 'Cantidad', key: 'amount' },
            { header: 'Fecha y Hora', key: 'dateTime' },
        ];

        movimientos.forEach(movimiento => {
            worksheet.addRow({
                id_movement: movimiento.id_movement,
                type_movement: movimiento.type_movement,
                amount: movimiento.amount,
                dateTime: movimiento.dateTime
            });
        });

 
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=movimientos.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al exportar movimientos a Excel:', error);
        res.status(500).send('Error al exportar movimientos a Excel');
    }
};