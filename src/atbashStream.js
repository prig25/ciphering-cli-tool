const { Transform } = require('stream');

module.exports =
  function createAtbashStream() {
    return new Transform({
      transform(inputDataStr, enc, callback) {
        let outputDataString = '';
        let currentIndex = null;
        let atbashIndex = null;
        const engUpAlph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const engLowAlph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const lastArrElement = engUpAlph.length - 1;
        const inputDataArr = inputDataStr.toString().split('');
        const charCode_A = 65;
        const charCode_Z = 90;
        const charCode_a = 97;
        const charCode_z = 122;

        const getAtbashString = (arr, symbol) => {
          currentIndex = arr.findIndex((letter) => symbol === letter);
          atbashIndex = Math.abs(lastArrElement - currentIndex);
          outputDataString += arr[atbashIndex];
        };

        inputDataArr.forEach((symbol) => {
          const charCode = symbol.charCodeAt();
          if (charCode >= charCode_A && charCode <= charCode_Z) {
            getAtbashString(engUpAlph, symbol);
          } else if (charCode >= charCode_a && charCode <= charCode_z) {
            getAtbashString(engLowAlph, symbol);
          } else {
            outputDataString += symbol;
          }
        });

        callback(null, outputDataString);
      }
    });
  }