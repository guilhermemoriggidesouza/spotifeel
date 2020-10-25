# amrHextoText
Simple converter text to hex and hex to text

## Installation

###  npm
```shell
npm i amrhextotext --save
```

###  git
```shell
git clone https://github.com/voltican/amrHextoText.git
```

##  Usage
```shell
const text = 'test text'
const hex = '746573742074657874'

const convert = require('amrhextotext')

//convert text to hex
let hexSample = convert.textToHex(text)
//Result: 746573742074657874

//Convert hex to text
let textSample = convert.hexToUtf8(hex)
//Result: test text
```

## License
This software is licensed under the MIT License.
