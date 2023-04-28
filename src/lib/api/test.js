import client from "./client";

export default function test(headers, responseInterceptor, errorInterceptor){
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
  const hello = () => client.get('/test', {headers});

  return {hello};
}
