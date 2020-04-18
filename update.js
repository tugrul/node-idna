
const axios = require('axios');
const fs = require('fs');
const Aline = require('aline');
const stream = require('stream');
const util = require('util');
const finished = util.promisify(stream.finished);

const definitions = [
    {
        url: 'https://www.icann.org/en/resources/idn/fast-track/idna-protocol-2003-2008.txt',
        idna2003: true, idna2008: true
    },
    {
        url: 'https://www.icann.org/en/resources/idn/fast-track/idna-protocol-2003.txt',
        idna2003: true, idna2008: false
    },
    {
        url: 'https://www.icann.org/en/resources/idn/fast-track/idna-protocol-2008.txt',
        idna2003: false, idna2008: true
    }
];


async function update({url, idna2003, idna2008}) {

    const {data} = await axios.get(url, {responseType: 'stream'});

    const flags = {};

    const parser = new stream.Writable({
        write(chunk, encoding, callback) {

            let index = 0;

            while (index > -1) {
                const prevIndex = index;
                index = chunk.indexOf('\n', index);

                const line = chunk.slice(prevIndex, index > -1 ? index++ : chunk.length);

                if (line.length === 0) {
                    continue;
                }

                const [code, type] = line.toString().split(' : ');

                const list = flags[type] || (flags[type] = []);

                list.push(parseInt('0x' + code));
            }

            callback();

        }, final(callback) {
            Object.keys(flags).forEach(type => {

                const codes = [];
                let target;

                flags[type].forEach(code => {

                    if (!target) {
                        target = [code, code];
                        return;
                    }

                    if ((target[1] + 1) !== code) {
                        if (target[0] === target[1]) {
                            codes.push(target[0]);
                        } else {
                            codes.push(target);
                        }

                        target = [code, code];
                    } else {
                        target[1] = code;
                    }
                });

                flags[type] = codes;

            });

            callback();
        }
    });

    await finished(data.pipe(new Aline()).pipe(parser));

    return [idna2003, idna2008, flags];

}

Promise.all(definitions.map(update))
    .then(data => fs.promises.writeFile('./codes.json', JSON.stringify(data)))
    .then(() => console.log('final'));

