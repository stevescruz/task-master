const Table = require('tty-table');

const TableColorEnum = require('../enums/TableColorEnum');

function createTable(propertiesArray, dataArray) {
    const propertiesNoDuplicates = new Set(propertiesArray);
    
    const HeaderProperties = [...propertiesNoDuplicates].map((property) => {
        return {
            value: property,
            headerColor: TableColorEnum.HEADER,
            color: property.toLowerCase() === 'id' ? TableColorEnum.ID : TableColorEnum.ROW,
        };
    });

    const rows = dataArray;
    
    const tableOutput = new Table(HeaderProperties, rows).render();
    return tableOutput;
}

module.exports = createTable;