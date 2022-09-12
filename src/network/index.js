import ajax from "./request";

const BASE_URL = 'https://tuapi.eees.cc'

export const getRandomImage = () => {
  return ajax('/api1/api.php', {
    type: "url",
    category: "dongman"
  }) 
}