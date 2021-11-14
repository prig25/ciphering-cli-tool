const fs = require('fs');

module.exports =
  function checkInputFile(file, errorInput, errorDouble, callback) {
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
  }