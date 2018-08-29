import { SERVER_URL } from '../config/server-config'
import Axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

export default class HttpUtility {
  public static headers = { 'Content-Type': 'application/json' }

  public static get (url: string): AxiosPromise<any> {
    let fullUrl = HttpUtility.getFullUrl(url)
    return Axios.get(fullUrl, HttpUtility.requestOptionsArgs)
          .catch(HttpUtility.handleError)
  }

  public static post (url: string, data: any): AxiosPromise<any> {
    let fullUrl = HttpUtility.getFullUrl(url)
    return Axios.post(fullUrl, data, HttpUtility.requestOptionsArgs)
          .catch(HttpUtility.handleError)
  }

  public static get requestOptionsArgs (): AxiosRequestConfig {
    return {
      headers: HttpUtility.headers,
      withCredentials: true
    }
  }

  public static setAuthHeader (userid: string, password: string) {
    HttpUtility.removeAuthHeader()
    HttpUtility.headers['Authorization'] = 'Basic ' + btoa(userid + ':' + password)
  }

  public static removeAuthHeader () {
    delete HttpUtility.headers['Authorization']
  }

  public static getFullUrl (url: string): string {
    return SERVER_URL + url
  }

  public static handleError (error: any): Promise<any> {
    console.debug('An error occurred', error) // for debug purposes only
    alert(error.message)
    return Promise.reject(error.message || error)
  }
}

export interface DataToPost {
  header: string
  content: string
}
