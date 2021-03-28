const middleware = {}

middleware['api'] = require('..\\resources\\nuxt\\middleware\\api.js')
middleware['api'] = middleware['api'].default || middleware['api']

export default middleware
