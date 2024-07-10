import axios from "axios"
import { nextTick } from "vue";

export function register(form, router, callback = () => {}) {
	axios.post(import.meta.env.VITE_BACKEND_URL + 'auth/sign-up', form.value)
		.then(res => {
			router.push({ name: 'login' })
		})
		.catch(err => {
			callback(err);
		})
}

export function login(form, router, errorCallback = () => {}, successCallback = () => {}) {
	axios.post(import.meta.env.VITE_BACKEND_URL + 'auth/login', form.value)
		.then(res => {
			setItemWithExpiry('token', res.data.data.token, res.data.data.expiresIn)
			loadCart();
			successCallback();
			router.push({ name: 'home' })
		})
		.catch(err => {
			errorCallback(err);
		})
}

function loadCart() {
	axios({
		method: 'get',
		url: import.meta.env.VITE_BACKEND_URL + 'cart',
		headers:{
			Authorization: `Bearer ${getToken()}`
		}
	})
}

export function logout(router, callback = () => {}) {
	localStorage.removeItem('token')
	nextTick(() => {
		callback();
		router.push({ name: 'login' })
	})
}

export function getToken(router) {
	const tokenStr = localStorage.getItem('token')
	if (!tokenStr) {
		router.push({ name: 'login' })
		return null
	}
	const token = JSON.parse(tokenStr)
	const now = new Date()
	if (now.getTime() > token.expiry) {
		localStorage.removeItem('token')
		router.push({ name: 'login' })
		return null
	}
	if (token.expiry - now.getTime() < 1000) {
		refreshToken(token.value)
	}
	return token.value
}

export function hasToken() {
	const tokenStr = localStorage.getItem('token')
	if (tokenStr === null) {
		return false
	}
	return true
}

function refreshToken(token) {
	axios({
		method: 'post',
		url: import.meta.env.VITE_BACKEND_URL + 'token/refresh-token',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	.then(res => {
		setItemWithExpiry('token', res.data.data.token, res.data.data.expiresIn)
	})
	.catch(err => {
		console.log(err)
	})
}

function setItemWithExpiry(key, value, ttl) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
}