const fs = require('fs');
const createCaesarStream = require('./src/caesarStream');
const createAtbashStream = require('./src/atbashStream');
const createRot8Stream = require('./src/rot8Stream');
const checkConfig = require('./src/checkConfig');
const checkInputFile = require('./src/checkInputFile');
const checkOutputFile = require('./src/checkOutputFile');
const checkParameters = require('./src/checkParameters');

const errorInput = 'Error with code 1: input file is not found...\n';
const errorOutput = 'Error with code 2: output file is not found...\n';
const errorConfig = 'Error with code 3: error -c, check configs please...\n';
const errorDouble = 'Error with code 4: double parameters, check parameters please...\n';
const errorParameters = 'Error with code 5: wrong parameters... Should be only -c, -i and -o...\n';

const argvArr = process.argv.slice(2);
const argv = {};
for (let i = 0; i < argvArr.length; i += 2) {
  if (Object.keys(argv).some(key => key === argvArr[i].slice(-1))) {
    process.stderr.write(errorDouble);
    process.exit(4);
  } else {
    argv[argvArr[i].slice(-1)] = argvArr[i + 1];
  }
}

checkParameters(argv, errorParameters);

checkInputFile(argv.i, errorInput, errorDouble);

checkOutputFile(argv.o, errorOutput, errorDouble);

checkConfig(argv.c, errorConfig, errorDouble);

const inputFile = argv.i;
const outputFile = argv.o;
const configs = argv.c.split('-');

const cipherNumber = 0;
const codingNumber = 1;
const warningStdin = `Completed, check ${outputFile} file... For exit click ctrl+c... For resume send other text...\n`;

const readStream = inputFile && fs.createReadStream(inputFile);
const writeStream = outputFile && fs.createWriteStream(outputFile);

let codingStream = readStream || process.stdin.on('data', () => {
  writeStream && process.stdout.write(warningStdin);
});

configs?.forEach((config) => {
  switch (config[cipherNumber]) {
    case 'C':
      codingStream = codingStream.pipe(createCaesarStream(config[codingNumber]));
      break;
    case 'A':
      codingStream = codingStream.pipe(createAtbashStream());
      break;
    case 'R':
      codingStream = codingStream.pipe(createRot8Stream(config[codingNumber]));
      break;
    default:
      break;
  }
});

writeStream ? codingStream.pipe(writeStream) : codingStream.pipe(process.stdout);
