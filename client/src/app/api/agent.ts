import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Router/Routes";
import { url } from "inspector";
import { request } from "http";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErorr: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErorr.push(data.errors[key]);
            }
          }
          throw modelStateErorr.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const ErrorTesting = {
  get400Error: () => requests.get("bugs/bad-request"),
  get401Error: () => requests.get("bugs/unauthorized"),
  get404Error: () => requests.get("bugs/not-found"),
  get500Error: () => requests.get("bugs/server-error"),
  getValidationError: () => requests.get("bugs/validation-error"),
};

const agent = {
  Catalog,
  ErrorTesting,
  Basket
};

export default agent;
