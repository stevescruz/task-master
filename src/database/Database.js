const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');

class Database {
    constructor(filename) {
        this.OPTIONS = {
            encoding: 'utf8',
        }

        if (!filename) {
            throw new Error('It is not possible to create a Database object without providing a .json filename.');
        }

        this.filepath = join(__dirname, '..', 'data', filename);
    }

    async readFileContent() {
        const content = await readFile(this.filepath, { encoding: this.OPTIONS.encoding });

        return content ? JSON.parse(content) : [];
    }

    async writeFileContent(content) {
        await writeFile(this.filepath, JSON.stringify(content), { encoding: this.OPTIONS.encoding });
    }

    async clearFile() {
        await writeFile(this.filepath, JSON.stringify('[]'), { encoding: this.OPTIONS.encoding })
    }
}

module.exports = Database;