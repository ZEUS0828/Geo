import { Router } from 'express';
import { 
    getGeos, 
    getGeoPorId, 
    postGeo, 
    putGeo, 
    patchGeo, 
    deleteGeo 
} from '../controladores/GeoCtrl.js';

const router = Router();

// Rutas para el manejo de Geo
router.get('/geo', getGeos);  // Obtener todos los registros de Geo
router.get('/geo/:id', getGeoPorId);  // Obtener un registro de Geo por ID
router.post('/geo', postGeo);  // Crear un nuevo registro de Geo
router.put('/geo/:id', putGeo);  // Actualizar un registro de Geo por ID
router.patch('/geo/:id', patchGeo);  // Actualizar parcialmente un registro de Geo por ID
router.delete('/geo/:id', deleteGeo);  // Eliminar un registro de Geo por ID

// Exportar las rutas
export default router;
