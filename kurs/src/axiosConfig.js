import axios from 'axios'
const token = localStorage.getItem('token')
export const aFetchInstance = axios.create({
  baseURL: 'http://kurs:81/api/',
  headers: { 'Authorization': 'Bearer '+ token },
});
export const aFetch = async (url) => {
  try {
    const response = await aFetchInstance.get(url)
    console.log(response)
    return response.data.data ?? response.data
  } catch (e) {
    console.log(e)
  }
}
export const aFetchPut = async (url) => {
  try {
    const response = await aFetchInstance.put(url)
    console.log(response)
    return response.data.data ?? response.data
  } catch (e) {
    console.log(e)
  }
}
export const aFetchPatch = async (url) => {
  try {
    const response = await aFetchInstance.patch(url)
    console.log(response)
    return response.data.data ?? response.data
  } catch (e) {
    console.log(e)
  }
}
export const aFetchDelete = async (url) => {
  try {
    const response = await aFetchInstance.delete(url)
    console.log(response)
    return response.data.data ?? response.data
  } catch (e) {
    console.log(e)
  }
}
export const aFetchPost = async (url,body) => {
  try {
    const response = await aFetchInstance.post(url,body)
    return response.data
  }catch(e){
    console.log(e)
    return e
  }
}
