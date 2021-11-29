const { exec } = require('child_process');
const checkInputFile = require('../checkInputFile');

describe("Check input file testings", () => {
  const errorInput = 'Error with code 1: input file is not found...\n';
  const errorDouble = 'Error with code 4: double parameters, check parameters please...\n';
  const wrongInputStr = 'inp.xt';
  const wrongInput = null;
  const correctInputStr = 'input.txt';
  const wrongInputBool = true;
  const wrongInputObj = { i: 'input.txt' };
  const commandStrDataWrongInput = 'node index.js -c C1-C0-A -i index.txt';
  const commandStrDataDoubleInput = 'node index.js -c C1-C0-A -i index.txt -i input.txt';
  const inputErrorCode = 1;
  const doubleErrorCode = 4;

  jest.mock('../checkInputFile', () => ({
    file: () => wrongInputStr
  }));

  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((err) => err);

  it("Should return undefined", () => {
    expect(checkInputFile(wrongInput, null, null)).toBeUndefined();
  });

  it("Should show error with code 1", () => {
    checkInputFile(wrongInputStr, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(inputErrorCode);
  });

  it("Should return undefined", () => {
    expect(checkInputFile(correctInputStr, null, null)).toBeUndefined();
  });

  // Error scenarios #3
  it('Should show parameters error - Error scenarios #3', () => {
    exec(commandStrDataWrongInput, (error, stdout, stderr) => {
      expect(stderr).toBe(errorInput);
    });
  });

  it("Should show error with code 4", () => {
    checkInputFile(wrongInputObj, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(doubleErrorCode);
  });

  it("Should show error with code 1", () => {
    checkInputFile(wrongInputBool, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(inputErrorCode);
  });

  it('Should show double parameters error', () => {
    exec(commandStrDataDoubleInput, (error, stdout, stderr) => {
      expect(stderr).toBe(errorDouble);
    });
  });
});
