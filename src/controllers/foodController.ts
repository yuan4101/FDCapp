import e, { Request, Response } from 'express';
import { FdcApiService } from '../services/fdcApiService';
import { error } from 'console';

interface FoodData {
  servings: string[][],
  nutrients: string[][],
  totalServings: number,
  totalNutrients: number
};

export class FoodController {
  static async getFdcFoodDetails(req: Request, res: Response) {
    const foodId = req.params.foodId;

    try {
      const foodDetails = await FdcApiService.getFdcFoodDetails(foodId);

      let foodData: FoodData = {
        servings: [],
        nutrients: [],
        totalServings: 0,
        totalNutrients: 0
      };

      if (foodDetails && foodDetails.foodNutrients){

        // Servings
        if (foodDetails.foodPortions) {
          const foodPortions = foodDetails.foodPortions;
          foodData.totalServings = foodPortions.length;
          console.log("\n");
          for (let index = 0; index < foodData.totalServings; index++) {
            const element = foodPortions[index];
            if (element.modifier == undefined) {
              console.log("\t", element.gramWeight + " " + element.measureUnit.name);
              foodData.servings.push([element.gramWeight, element.measureUnit.name]);
            } else{
              console.log("\t", element.gramWeight + " " + element.modifier + " " + element.measureUnit.name);
              foodData.servings.push([element.gramWeight, element.modifier + " " + element.measureUnit.name]);
            }
          }
          console.log('Servings:', foodData.totalServings);
        } else {
          foodData.totalServings = 1;
          console.log('Servings: ', foodData.totalServings);
          console.log("\t", "100 g");
          foodData.servings.push(['100', 'g'])
        }

        // Nutrients
        const foodNutrients = foodDetails.foodNutrients;
        foodData.totalNutrients = foodNutrients.length;

        let categoryList: string[] = [];
        let category = '';

        for (let index = 0; index < foodData.totalNutrients; index++) {
          const element = foodNutrients[index];

          if (element.nutrient.isNutrientLabel) {
            category = element.nutrient.name
            categoryList.push(category);
            console.log("\n", category);
          } else if (element.amount || (element.amount == 0 && !element.loq)) {
            console.log("\t", element.nutrient.name, element.amount, element.nutrient.unitName)
            foodData["nutrients"].push([category, `${element.nutrient.name}`, `${element.amount}`, `${element.nutrient.unitName}`]);
          }
          else if (element.loq) {
            console.log("\t", element.nutrient.name, `<${element.loq}`, element.nutrient.unitName)
            foodData["nutrients"].push([category, `${element.nutrient.name}`, `${element.loq}`, `<${element.nutrient.unitName}`]);
          }
        }
        if (categoryList.length == 0)
          throw new Error("\nLas categorias no se cargaron correctamente");
        foodData.totalNutrients -= categoryList.length;
        console.log('\nNutrients: ', foodData.totalNutrients);

        console.log("------------------------------------------------------------------");
        console.log(foodData);
        return res.json({foodDetails});
      }

    } catch (error: any) {
      res.status(500).json({message: error.message, error: error});
    }
  }
}
