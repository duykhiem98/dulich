
import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from "react-native";

let headers = {
  Authorization: '',
  'Content-Type': 'application/json',
  'Cookie': 'JSESSIONID=3B96EAB24590868FDE20F41970F1F780'
};
export const Fetch = axios.create({
  baseURL:'https://admin.vntravelguideapp.com/' , // khai báo domain cho hàm Fetch
  headers,
  timeout: 10000
}); // baseURL: Core.baseUrl


Fetch.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('error ', error.response?.config?.url);
  console.log('error response ', error?.response?.data);
  if (error.message === 'Network Error') {
    Alert.alert("Không có mạng internet");
    return Promise.resolve({error});
  }
  if (error?.response?.data && typeof error?.response?.data === "string") {
    // ToastService.showError(error?.response?.data || '')
    if (error?.response?.config?.method && error?.response?.config?.method === 'get') {
      Alert.alert(error?.response?.data || '')
    }
  } else if (error?.response?.data?.Message) {
    if (error?.response?.config?.method && error?.response?.config?.method === 'get') {
      Alert.alert(error?.response?.data?.Message || '')
    }
    // ToastService.showError(error?.response?.data?.Message || '')
  } else if (typeof error?.response === "string") {
    // ToastService.showError(error?.response || '')
    if (error?.response?.config?.method && error?.response?.config?.method === 'get') {
      Alert.alert(error?.response || '')
    }
  }
  if (error?.response?.status === 401) {
    revokeToken();
    Alert.alert('Hết phiên làm việc', 'Vui lòng đăng nhập lại');
    return Promise.resolve({error});
  }
  if (error.code === 'ECONNABORTED') {
    Alert.alert('Hết thời gian xử lý');
    return Promise.resolve({error});
  }
  return Promise.resolve({error});
});

export const updateFetchToken = (_token: string) => {
  Fetch.defaults.headers['Authorization'] = `Bearer ${_token}`;
};

export const updateFetchNotify = (_token: string) => {
  Fetch.defaults.headers['Notify-Id'] = `${_token}`;
};

export const revokeToken = () => {
  Fetch.defaults.headers['Authorization'] = ``;

};
