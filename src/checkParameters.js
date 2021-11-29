module.exports =
  function checkParameters(parameters, errorParameters) {
    const argv = { ...parameters };
    delete argv.i;
    delete argv.o;
    delete argv.c;

    for (let key in argv) {
      process.stderr.write(errorParameters);
      process.exit(5);
    }
  }