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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FdcApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fdcBaseUrl = process.env.FDC_API_URL;
const fdcApiKey = process.env.FDC_API_KEY;
class FdcApiService {
    static getFdcFoodDetails(foodId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${fdcBaseUrl}/food/${foodId}?api_key=${fdcApiKey}`);
                if (response.status == 200) {
                    console.log(`\nGET Food ${foodId} from FDC API: ${response.status} | ${response.statusText}`);
                    return response.data;
                }
            }
            catch (error) {
                let errorMessage = "";
                console.log(`\nGET Food ${foodId} from FDC API: ${error.response.status} | ${error.response.statusText}`);
                if (axios_1.default.isAxiosError(error)) {
                    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) && error.response.data.error) {
                        errorMessage += `ERROR: ${error.message}\n\t${error.response.data.error.code}\n\t${error.response.data.error.message}`;
                        console.error(errorMessage);
                    }
                }
                else {
                    errorMessage = `\nGET Food ${foodId} from FDC API: ${error.response.status} | ${error.response.statusText}`;
                }
                throw errorMessage;
            }
        });
    }
}
exports.FdcApiService = FdcApiService;
