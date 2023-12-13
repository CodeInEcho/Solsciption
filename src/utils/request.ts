import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios'

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosHeaders;
}
const instance = axios.create({
    baseURL: 'https://mainnet.helius-rpc.com/?api-key=873f7197-bc42-43de-88dc-81c8884f69c4',
    headers: {
        'Content-Type': 'application/json'
    }
});

// request
instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptors
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: any) => {
        const res = error.response;
        // if (res.status === 400 || res.status === 409) toast({ variant: "error", title: "提示: 系统错误", description: res.data.message });
        // if (res.data.code === 401 && res.config.url !== '/auth/session') toast({ variant: "error", title: "提示: 系统错误", description: '请登录后重试' });
        return Promise.reject(error);
    }
);

export default instance;