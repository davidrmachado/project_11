const getCurrencies = async () => {
  const API_END_POINT = 'https://economia.awesomeapi.com.br/json/all';
  const request = await (await fetch(API_END_POINT)).json();
  return request;
};

export default getCurrencies;
