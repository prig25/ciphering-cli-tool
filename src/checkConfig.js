module.exports =
  function checkConfig(configs, errorConfig, errorDouble) {
    if (configs && typeof configs === 'string') {
      configs.split('-').forEach((config) => {
        if (config === 'C1' || config === 'C0' || config === 'A' || config === 'R1' || config === 'R0') {
        } else {
          process.stderr.write(errorConfig);
          process.exit(3);
        }
      });
    } else if (typeof configs === 'object') {
      process.stderr.write(errorDouble);
      process.exit(4);
    } else {
      process.stderr.write(errorConfig);
      process.exit(3);
    }
  }