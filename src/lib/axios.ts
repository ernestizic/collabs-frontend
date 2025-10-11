import { logout } from "@/utils/api/auth";
import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 10000,
	headers: { "Content-Type": "application/json", Accept: "application/json" },
	withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function onFulfilled(response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function onRejected(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		if (error.response.status === 401 && window.location.pathname !== "/login") {
			// logout
			logout();
		}

		return Promise.reject(error);
	}
);
