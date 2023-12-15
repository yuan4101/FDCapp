"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodController_1 = require("../controllers/foodController");
const router = express_1.default.Router();
router.get('/food/:foodId', foodController_1.FoodController.getFdcFoodDetails);
exports.default = router;
