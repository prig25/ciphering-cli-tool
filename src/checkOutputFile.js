module.exports =
  function checkOutputFile(file, errorOutput, errorDouble) {
    const outputName = 'output.txt';
    if (file) {
      if (typeof file === 'object') {
        process.stderr.write(errorDouble);
        process.exit(4);
      } else if (file !== outputName || typeof file === 'boolean') {
        process.stderr.write(errorOutput);
        process.exit(2);
      }
    }
  }
