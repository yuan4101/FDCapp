import { Request, Response } from 'express';
import { FdcApiService } from '../services/fdcApiService';

export class FoodController {
  static async getFdcFoodDetails(req: Request, res: Response) {
    const foodId = req.params.foodId;
    try {
      const foodDetails = await FdcApiService.getFdcFoodDetails(foodId);

      if (foodDetails && foodDetails.foodNutrients) {

        if (foodDetails.foodPortions) {
          const foodPortions = foodDetails.foodPortions;
          const cantidadPorciones = foodPortions.length;

          for (let index = 0; index < cantidadPorciones; index++) {
            const element = foodPortions[index];
            console.log(element.gramWeight, element.modifier, element.measureUnit.name);
          }
          console.log('\nPorciones:', cantidadPorciones);
        }

        const foodNutrients = foodDetails.foodNutrients;
        let cantidadNutrientes = foodNutrients.length;
        let nutrients:string = '';

        for (let index = 0; index < cantidadNutrientes; index++) {
          const element = foodNutrients[index];
          if (element.amount || (element.amount == 0 && !element.loq)) {
            console.log("\t", element.nutrient.name, element.amount, element.nutrient.unitName)
          }
          else if (element.loq) {
            console.log("\t", element.nutrient.name, `<${element.loq}`, element.nutrient.unitName)
          }
          else {
            console.log("\n", element.nutrient.name);
          }
        }
        console.log('\nNutrientes del alimento:', cantidadNutrientes);

        return res.json({ nutrients }); // Devuelve solo la información de los nutrientes en la respuesta JSON
      } else {
        //return res.json(foo);
        return res.status(500).json({ error: 'La respuesta de la API no contiene información de nutrientes' });
      }
    } catch (error) {
      let errorMessage:string = "Error al obtener detalles del alimento desde la API de FDC"
      res.status(500).json({ errorMessage, error });
    }
  }
}
