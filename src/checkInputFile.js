const fs = require('fs');

module.exports =
  function checkInputFile(file, errorInput, errorDouble, callback) {
    const minLength = 5;
    const errorInputFormat = 'Error with code 6: input file is not .txt format...\n';
    typeof file === 'string' && fs.access(file, (error) => {
      if (error) {
        process.stderr.write(errorInput);
        process.exit(1);
      }
    });

    if (typeof file === 'boolean') {
      process.stderr.write(errorInput);
      process.exit(1);
    }

    if (typeof file === 'object') {
      process.stderr.write(errorDouble);
      process.exit(4);
    }

    if (file && (file.length < minLength || file.slice(-4) !== '.txt')) {
      process.stderr.write(errorInputFormat);
      process.exit(6);
    }
  }