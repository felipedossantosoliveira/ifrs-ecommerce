import axios from "axios"

export function login(form, router) {
	axios.post(import.meta.env.VITE_BACKEND_URL + 'auth/login', form.value)
		.then(res => {
			setItemWithExpiry('token', res.data.data.token, res.data.data.expiresIn)
			router.push({ name: 'home' })
		})
		.catch(err => {
			console.log(err)
		})
}

export function logout(router, refresh = false) {
	localStorage.removeItem('token')
	if (refresh) {
		router.push({ name: 'login' })
	}
}

function getToken(router) {
	const tokenStr = localStorage.getItem('token')
	if (!tokenStr) {
		router.push({ name: 'login' })
		return null
	}
	const token = JSON.parse(tokenStr)
	const now = new Date()
	if (now.getTime() > token.expiry) {
		localStorage.removeItem(key)
		router.push({ name: 'login' })
		return null
	}
	if (token.expiry - now.getTime() < 1000) {
		refreshToken(token.value)
	}
	return token.value
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