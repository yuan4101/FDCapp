import express from 'express';
import { FoodController } from '../controllers/foodController';

const router = express.Router();

router.get('/food/:foodId', FoodController.getFdcFoodDetails);

export default router;
