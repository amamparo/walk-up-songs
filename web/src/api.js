import env from './env'

const url = path => `${env.apiBaseUrl}${path}`

export const get = async path => {
	return (await fetch(url(path))).json()
}

export const del = async path => {
	await fetch(url(path), {
		method: 'DELETE'
	})
}
