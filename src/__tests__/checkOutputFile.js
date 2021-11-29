const { exec } = require('child_process');
const checkOutputFile = require('../checkOutputFile');

describe("Check input file testings", () => {
  const errorOutput = 'Error with code 2: output file is not found...\n';
  const errorDouble = 'Error with code 4: double parameters, check parameters please...\n';
  const wrongOutputStr = 'out.xt';
  const wrongOutput = null;
  const correctOutputStr = 'output.txt';
  const wrongOutputBool = true;
  const wrongOutputObj = { o: 'output.txt' };
  const commandStrDataWrongOutput = 'node index.js -c C1-C0-A -o out.txt';
  const commandStrDataDoubleOutput = 'node index.js -c C1-C0-A -o output.txt -o o.txt';
  const outputErrorCode = 2;
  const doubleErrorCode = 4;

  jest.mock('../checkOutputFile', () => ({
    file: () => wrongOutputStr
  }));

  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((err) => err);

  it("Should return undefined", () => {
    expect(checkOutputFile(wrongOutput, null, null)).toBeUndefined();
  });

  it("Should show error with code 2", () => {
    checkOutputFile(wrongOutputStr, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(outputErrorCode);
  });

  it("Should return undefined", () => {
    expect(checkOutputFile(correctOutputStr, null, null)).toBeUndefined();
  });

  // Error scenarios #4
  it('Should show parameters error - Error scenarios #4', () => {
    exec(commandStrDataWrongOutput, (error, stdout, stderr) => {
      expect(stderr).toBe(errorOutput);
    });
  });

  it("Should show error with code 4", () => {
    checkOutputFile(wrongOutputObj, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(doubleErrorCode);
  });

  it("Should show error with code 1", () => {
    checkOutputFile(wrongOutputBool, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(outputErrorCode);
  });

  it('Should show double parameters error', () => {
    exec(commandStrDataDoubleOutput, (error, stdout, stderr) => {
      expect(stderr).toBe(errorDouble);
    });
  });
});
