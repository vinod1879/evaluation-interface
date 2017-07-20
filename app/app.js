
function configure(app) {
    require('./services/user.service')(app);
}

module.exports = configure;
