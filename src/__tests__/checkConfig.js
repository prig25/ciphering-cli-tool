const { exec } = require('child_process');
const checkConfig = require('../checkConfig');

describe("CheckConfig testings", () => {
  const errorConfig = 'Error with code 3: error -c, check configs please...\n';
  const errorDouble = 'Error with code 4: double parameters, check parameters please...\n';
  const commandStrDataWrongDouble = 'node index.js -c C1-C0-A -c C1';
  const commandStrDataWrongConfig = 'node index.js -c C1-C2-A';
  const commandNumberDataWrongConfig = 'node index.js -c 5';
  const commandDataUndefinedConfig = 'node index.js -i input.txt -o output.txt';
  const configErrorCode = 3;
  const doubleErrorCode = 4;
  const configObj = { c: ['C1-C0-A', 'C1'] };
  const configStrWrong = 'C1-C1-A2';
  const configStrCorrect = 'C1-C0-A';
  const configNumberWrong = 5;

  jest.mock('../checkConfig', () => ({
    configs: () => configStrWrong
  }));

  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((err) => err);

  it("Should show error with code 4", () => {
    checkConfig(configObj, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(doubleErrorCode);
  });

  // Error scenarios #1
  it('Should show double config error - Error scenarios #1', () => {
    exec(commandStrDataWrongDouble, (error, stdout, stderr) => {
      expect(stderr).toBe(errorDouble);
    });
  });

  it("Should show error with code 3", () => {
    checkConfig(configStrWrong, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(configErrorCode);
  });

  // Error scenarios #5
  it('Should show config error - Error scenarios #5', () => {
    exec(commandStrDataWrongConfig, (error, stdout, stderr) => {
      expect(stderr).toBe(errorConfig);
    });
  });

  it("Should show error with code 3", () => {
    checkConfig(configNumberWrong, null, null);
    expect(mockProcessExit).toHaveBeenCalledWith(configErrorCode);
  });

  it('Should show config error', () => {
    exec(commandNumberDataWrongConfig, (error, stdout, stderr) => {
      expect(stderr).toBe(errorConfig);
    });
  });

  // Error scenarios #2
  it('Should show config error  - Error scenarios #2', () => {
    exec(commandDataUndefinedConfig, (error, stdout, stderr) => {
      expect(stderr).toBe(errorConfig);
    });
  });

  it("Should return undefined", () => {
    expect(checkConfig(configStrCorrect, null, null)).toBeUndefined();
  });
});
