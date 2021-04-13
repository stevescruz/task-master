const ncp = require('ncp');

const { promisify } = require('util');
const copy = promisify(ncp);

async function copyFile(source, target) {
    return copy(source, target, {
        clobber: false,
    });
}

module.exports = copyFile;