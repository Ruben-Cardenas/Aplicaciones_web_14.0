import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routers';

const app = express();//crenado un objeto del servidor express
const port = 3000;//puerto en el que va a correr el servidor

app.use(express.json())//middleware para que el servidor pueda recibir json
app.use(morgan('dev'))//middleware para ver las peticiones que llegan al servidor
app .use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`El servedor esta en el puerto:${port}`);//mensaje que indica que el servidor esta corriendo
  console.log("El servidor esta en el puerto:",port);//mensaje que indica la url del servidor
});//inicia el servidor y escucha en el puerto 3000

