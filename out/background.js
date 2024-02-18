console.log('background working');

function getCookie(name) {
	return new Promise((resolve, reject) => {
		chrome.cookies.get({ name, url: 'https://www.instagram.com/' }, function cookies(cookie) {
			if (cookie !== null) resolve(cookie.value)
			reject()
		})
	})
}

function checkStatus(response) {
	if (response.ok) return response

	const error = new Error(`HTTP Error ${response.statusText}`)
	error.status = response.status
	error.response = response
	throw error
}

function toText(response) {
	return response.text()
}

function parseJSON(response) {
	return JSON.parse(response)
}

