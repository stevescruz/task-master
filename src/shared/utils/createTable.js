const Table = require('cli-table3');

function createTable(propertiesArray, dataArray) {
    const propertiesNoDuplicates = new Set(propertiesArray);
    
    const table = new Table({
        head: [...propertiesNoDuplicates],
    });

    const mappedDataArray = dataArray.map((object) => {
        return [...propertiesNoDuplicates].reduce((acc, property) => {
            if (property in object) {
                acc.push(object[property]);
            return acc;
            }
            return acc;
        }, []);
    });

    mappedDataArray.forEach(arrayWithValues => {
        table.push(arrayWithValues);
    })

    return table;
}

module.exports = createTable;