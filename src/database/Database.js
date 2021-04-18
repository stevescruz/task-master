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
        const content = await readFile(this.filepath, {
            encoding: this.OPTIONS.encoding,
        });

        let parsedContent;

        try {
            if (!content) {
                this.clearFile();
            }
            parsedContent = content ? JSON.parse(content) : [];
        } catch (error) {
            this.clearFile();
            throw new Error(`The ${this.filepath} file contains invalid JSON. Its content has been reset.\nTry again!`);
        }

        return parsedContent;
    }

    async writeFileContent(content) {
        if (!content) {
            throw new Error('Cannot write on a file without providing content for the operation.');
        }

        await writeFile(this.filepath, JSON.stringify(content, null, 2), {
            encoding: this.OPTIONS.encoding,
        });
    }

    async clearFile() {
        await this.writeFileContent([]);
    }
}

module.exports = Database;