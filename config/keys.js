if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config.keys');
} else {
    module.exports = require('./config.keys.dev');
}
