import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import { FoodController } from './controllers/foodController';
import { FdcApiService } from './services/fdcApiService';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use('/', router);

/*Redirigir
app.get('/', (req: Request, res: Response) => {
  res.redirect('food/326698');
});
*/

app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});


const mensaje: string = "¡Welcome!";
console.log(mensaje);