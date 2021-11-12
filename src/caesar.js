module.exports =
  function caesar(inputDataStr, isCoding) {
    let outputDataString = '';
    let currentIndex = null;
    const engUpAlph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const engLowAlph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const firstArrElement = 0;
    const lastArrElement = engUpAlph.length - 1;
    const delta = 1;
    const coding = 1;
    const decoding = 0;
    const inputDataArr = inputDataStr.split('');
    const charCode_A = 65;
    const charCode_Z = 90;
    const charCode_a = 97;
    const charCode_z = 122;

    const getCodingString = (arr, symbol) => {
      currentIndex = arr.findIndex((letter) => symbol === letter);
      currentIndex === lastArrElement ? outputDataString += arr[0] : outputDataString += arr[currentIndex + delta];
    };

    const getDecodingString = (arr, symbol) => {
      currentIndex = arr.findIndex((letter) => symbol === letter);
      currentIndex === firstArrElement ? outputDataString += arr[engUpAlph.length - 1] : outputDataString += arr[currentIndex - delta];
    };

    switch (isCoding) {
      case coding:
        inputDataArr.forEach((symbol) => {
          const charCode = symbol.charCodeAt();
          if (charCode >= charCode_A && charCode <= charCode_Z) {
            getCodingString(engUpAlph, symbol);
          } else if (charCode >= charCode_a && charCode <= charCode_z) {
            getCodingString(engLowAlph, symbol);
          } else {
            outputDataString += symbol;
          }
        });
        break;
      case decoding:
        inputDataArr.forEach((symbol) => {
          const charCode = symbol.charCodeAt();
          if (charCode >= charCode_A && charCode <= charCode_Z) {
            getDecodingString(engUpAlph, symbol);
          } else if (charCode >= charCode_a && charCode <= charCode_z) {
            getDecodingString(engLowAlph, symbol);
          } else {
            outputDataString += symbol;
          }
        });
        break;
      default:
        break;
    }

    return outputDataString;
  }