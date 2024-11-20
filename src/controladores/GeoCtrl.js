import { conmysql } from '../db.js';

// Obtener todos los registros de Geo
export const getGeos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Geo');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar registros de Geo" });
    }
};

// Obtener un registro de Geo por ID
export const getGeoPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Geo WHERE id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            id: 0,
            message: "Registro de Geo no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo registro de Geo
export const postGeo = async (req, res) => {
    try {
        const { latitude, longitude, title, description } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO Geo (latitude, longitude, title, description) VALUES (?, ?, ?, ?)',
            [latitude, longitude, title, description]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar un registro de Geo
export const putGeo = async (req, res) => {
    try {
        const { id } = req.params;
        const { latitude, longitude, title, description } = req.body;
        const [result] = await conmysql.query(
            'UPDATE Geo SET latitude = ?, longitude = ?, title = ?, description = ? WHERE id = ?',
            [latitude, longitude, title, description, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Registro de Geo no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM Geo WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un registro de Geo
export const patchGeo = async (req, res) => {
    try {
        const { id } = req.params;
        const { latitude, longitude, title, description } = req.body;
        const [result] = await conmysql.query(
            `UPDATE Geo SET 
                latitude = IFNULL(?, latitude), 
                longitude = IFNULL(?, longitude), 
                title = IFNULL(?, title), 
                description = IFNULL(?, description) 
            WHERE id = ?`,
            [latitude, longitude, title, description, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Registro de Geo no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM Geo WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un registro de Geo
export const deleteGeo = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Geo WHERE id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: "No se pudo eliminar el registro de Geo"
        });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
