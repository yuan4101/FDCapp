import e, { Request, Response } from 'express';
import { FdcApiService } from '../services/fdcApiService';

interface FoodData {
  totalServings: number,
  servings: string[][],
  proximates: string[],
  carbohydrates: string[],
  minerals: string[],
  vitaminsAndOtherComponents: string[],
  lipids: string[],
  totalNutrients: number,
  [key: string]: any
};

export class FoodController {
  static async getFdcFoodDetails(req: Request, res: Response) {
    const foodId = req.params.foodId;

    try {
      const foodDetails = await FdcApiService.getFdcFoodDetails(foodId);

      let foodData: FoodData = {
        totalServings: 0,
        servings: [],
        proximates: [],
        carbohydrates: [],
        minerals: [],
        vitaminsAndOtherComponents: [],
        lipids: [],
        totalNutrients: 0
      };

      if (foodDetails && foodDetails.foodNutrients) {

        if (foodDetails.foodPortions) {
          const foodPortions = foodDetails.foodPortions;
          foodData.totalServings = foodPortions.length;

          console.log('\nPorciones:', foodData.totalServings);
          for (let index = 0; index < foodData.totalServings; index++) {
            const element = foodPortions[index];
            console.log("\t", element.gramWeight + " " + element.modifier + " " + element.measureUnit.name);
            foodData.servings.push([element.gramWeight, element.modifier + " " + element.measureUnit.name]);
          }
        }

        const foodNutrients = foodDetails.foodNutrients;
        foodData.totalNutrients = foodNutrients.length;
        let currentTitle: string;
        currentTitle = "";

        for (let index = 0; index < foodData.totalNutrients; index++) {
          const element = foodNutrients[index];

          if (element.amount == null && element.loq == null) {
            console.log("\n", element.nutrient.name);
            if (element.nutrient.name == "Proximates") {
              element.nutrient.name = "proximates";
            } else if (element.nutrient.name == "Carbohydrates") {
              element.nutrient.name = "carbohydrates"
            } else if (element.nutrient.name == "Minerals") {
              element.nutrient.name = "minerals"
            } else if (element.nutrient.name == "Vitamins and Other Components") {
              element.nutrient.name = "vitaminsAndOtherComponents"
            } else if (element.nutrient.name == "Lipids") {
              element.nutrient.name = "lipids"
            } 
            currentTitle = element.nutrient.name;
          }

          if (element.amount || (element.amount == 0 && !element.loq)) {
            console.log("\t", element.nutrient.name, element.amount, element.nutrient.unitName)
            foodData[currentTitle].push(`${element.nutrient.name} ${element.amount} ${element.nutrient.unitName}`);
          }
          else if (element.loq) {
            console.log("\t", element.nutrient.name, `<${element.loq}`, element.nutrient.unitName)
            foodData[currentTitle].push(`${element.nutrient.name} <${element.loq} ${element.nutrient.unitName}`);
          }
        }
        console.log('\nNutrientes del alimento:', foodData.totalNutrients);

        //return res.json({ nutrients }); // Devuelve solo la información de los nutrientes en la respuesta JSON
        console.log("------------------------------------------------------------------");
        console.log(foodData);
        return res.json({ foodData }); 
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
