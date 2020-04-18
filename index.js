
const codes = require('./codes.json');


exports.getLabel = function getLabel(code, idna2003, idna2008) {

    const table = codes.find(item => item[0] === idna2003 && item[1] === idna2008);

    if (!table) {
        throw new Error('table is not exists');
    }

    const labels = Object.keys(table[2]);

    for (let i = 0; i < labels.length; i++) {

        if (table[2][labels[i]].find(item => typeof item === 'number'
            ? item === code : (code >= item[0] && code <= item[1]))) {
            return labels[i];
        }

    }

    return 'UNDEF';

};

