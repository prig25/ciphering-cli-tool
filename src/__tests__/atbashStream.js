const fs = require('fs');
const createAtbashStream = require('../atbashStream');

describe("Atbash testings", () => {
  const inputData = 'This is secret. Message about "_" symbol!';

  it("Should be undefined", () => {
    const atbashStreame = createAtbashStream();
    const outputData = (error, data) => data;
    const outputAtbashStreame = atbashStreame._transform(inputData, null, outputData);
    expect(outputAtbashStreame).toBeUndefined();
  });
});
