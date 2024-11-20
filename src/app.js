import express from 'express';
import geoRoutes from './routes/Geo.routes.js';  // Asegúrate de que la ruta del archivo sea correcta

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para Geo
app.use('/api', geoRoutes);  // Esto asigna las rutas de Geo bajo el prefijo '/api'

// Manejo de errores o rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
