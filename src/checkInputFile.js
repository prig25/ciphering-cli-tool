const fs = require('fs');

module.exports =
  function checkInputFile(file, errorInput, errorDouble) {
    const inputName = 'input.txt';
    if (file) {
      if (typeof file === 'string') {
        if (file !== inputName) {
          process.stderr.write(errorInput);
          process.exit(1);
        }
      } else if (typeof file === 'boolean') {
        process.stderr.write(errorInput);
        process.exit(1);
      } else if (typeof file === 'object') {
        process.stderr.write(errorDouble);
        process.exit(4);
      }
    }
  }