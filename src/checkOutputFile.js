module.exports =
  function checkOutputFile(file, errorOutput, errorDouble) {
    const minLength = 5;
    if (file) {
      if (typeof file === 'object') {
        process.stderr.write(errorDouble);
        process.exit(4);
      }

      if (typeof file === 'boolean') {
        process.stderr.write(errorOutput);
        process.exit(2);
      }

      if (file.length < minLength || file.slice(-4) !== '.txt') {
        process.stderr.write(errorOutput);
        process.exit(2);
      }
    }
  }
