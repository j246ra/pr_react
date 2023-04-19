import client from "./client";

export default function test(headers){
  const hello = () => client.get('/test', {headers});

  return {hello};
}