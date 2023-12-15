"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const fdcApiService_1 = require("../services/fdcApiService");
class FoodController {
    static getFdcFoodDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foodId = req.params.foodId;
            try {
                const foodDetails = yield fdcApiService_1.FdcApiService.getFdcFoodDetails(foodId);
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
                    let nutrients = '';
                    for (let index = 0; index < cantidadNutrientes; index++) {
                        const element = foodNutrients[index];
                        if (element.amount || (element.amount == 0 && !element.loq)) {
                            console.log("\t", element.nutrient.name, element.amount, element.nutrient.unitName);
                        }
                        else if (element.loq) {
                            console.log("\t", element.nutrient.name, `<${element.loq}`, element.nutrient.unitName);
                        }
                        else {
                            console.log("\n", element.nutrient.name);
                        }
                    }
                    console.log('\nNutrientes del alimento:', cantidadNutrientes);
                    return res.json({ nutrients }); // Devuelve solo la información de los nutrientes en la respuesta JSON
                }
                else {
                    //return res.json(foo);
                    return res.status(500).json({ error: 'La respuesta de la API no contiene información de nutrientes' });
                }
            }
            catch (error) {
                let errorMessage = "Error al obtener detalles del alimento desde la API de FDC";
                res.status(500).json({ errorMessage, error });
            }
        });
    }
}
exports.FoodController = FoodController;
