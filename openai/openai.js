/*https://www.youtube.com/watch?v=EJW4Vl9azRM&ab_channel=DanisableProgramacio*/

import { makeRequest } from "./operations.js";

async function start(prompt){
  if(!prompt){
    console.log("Prompt no reconocido / no hay prompt");
  }else{
    await makeRequest(prompt);
  }
}