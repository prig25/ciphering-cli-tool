const fs = require('fs');
const argv = require('minimist')(process.argv);
const createCaesarStream = require('./src/caesarStream');
const createAtbashStream = require('./src/atbashStream');
const createRot8Stream = require('./src/rot8Stream');
const checkConfig = require('./src/checkConfig');
const checkInputFile = require('./src/checkInputFile');
const checkOutputFile = require('./src/checkOutputFile');
const checkParameters = require('./src/checkParameters');

delete argv['_'];

const errorInput = 'Error with code 1: input file not found...\n';
const errorOutput = 'Error with code 2: output file is not .txt format...\n';
const errorConfig = 'Error with code 3: error -c, check configs please...\n';
const errorDouble = 'Error with code 4: double parameters, check parameters please...\n';
const errorParameters = 'Error with code 5: wrong parameters... Should be only -c, -i and -o...\n';

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
