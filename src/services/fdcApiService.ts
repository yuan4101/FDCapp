import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const fdcBaseUrl = process.env.FDC_API_URL || "https://api.nal.usda.gov/fdc/v1";
const fdcApiKey = process.env.FDC_API_KEY || "f2yYSvUmglsLdPDheaMWwpg6ca5lYJlHLtB0gcv3";

interface FdcError {
  code: string;
  message: string;
}

export class FdcApiService {
  static async getFdcFoodDetails(foodId: string) {
    
    try {
      const response = await axios.get(`${fdcBaseUrl}/food/${foodId}?api_key=${fdcApiKey}`);
      if (response.status == 200) {
        console.log(`\nGET Food ${foodId} from FDC API: ${response.status} | ${response.statusText}`);
        return response.data;
      }
    } catch (error: any) {
      let errorMessage:string = "";
      console.log(`\nGET Food ${foodId} from FDC API: ${error.response.status} | ${error.response.statusText}`);
      if (axios.isAxiosError(error)) {
        if (error.response?.data && error.response.data.error) {
          errorMessage += `ERROR: ${error.message}\n\t${error.response.data.error.code}\n\t${error.response.data.error.message}`;
          console.error(errorMessage);
        }
      }
      else {
        errorMessage = `\nGET Food ${foodId} from FDC API: ${error.response.status} | ${error.response.statusText}`;
      }
      throw errorMessage;
    }
  }
}
