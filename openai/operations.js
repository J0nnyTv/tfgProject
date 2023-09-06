import { Configuration, OpenAIApi } from 'openai';
import config from './config.js';

const configuration = new Configuration({
    apiKey: config.API_KEY,
  });
const openai = new OpenAIApi(configuration);
  
export async function makeRequest (prompt) {
    const completionParams = {
        model: config.MODEL,
        n: config.ATTEMPS,
        prompt,
    }
    try{
        const completion = await openai.createCompletion(completionParams);
        console.log(completion.data.choices[0].text);
    }
    catch(error){
        console.error(error.message);
    }
}