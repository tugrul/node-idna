
# node-idna

This library helps to identify flag of unicode character by IDNA protocol.

https://www.icann.org/resources/pages/idna-protocol-2012-02-25-en

## Installation

### NPM

`npm install --save idna`

### Yarn

`yarn add idna`

## Usage

```javascript
const idna = require('idna');

console.log(idna.getLabel(49, true, true));
```