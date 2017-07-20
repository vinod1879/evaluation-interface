
function configure(app) {
    require('./services/user.service')(app);
    require('./services/document.service')(app);
}

module.exports = configure;
