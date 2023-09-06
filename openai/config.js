import * as dotenv from 'dotenv';
dotenv.config();

export default {
    API_KEY : process.env.OPENAI_API_KEY,
    MODEL : "text-davinci-003",
    ATTEMPS : 2,
}