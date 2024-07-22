const {logEvents} = require('../middlewares/logEvents');

exports.errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLogs.txt');

    // Write a fucntion to send mail incase an error occures

    res.status(500).send(`${err.name}: ${err.message}`);
}