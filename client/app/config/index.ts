let server = 'http://localhost:5000/';
const siteVersion = 'v0.1'

if (process.env.NODE_ENV === "production") {
	server = 'https://wts-lite-server.onrender.com/';
	console.log(process.env);
}

export { server, siteVersion };