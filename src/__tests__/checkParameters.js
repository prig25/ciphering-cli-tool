const { exec } = require('child_process');
const checkParameters = require('../checkParameters');

describe("CheckParameters testings", () => {
  const errorParameters = 'Error with code 5: wrong parameters... Should be only -c, -i and -o...\n';
  const commandWrongParameters = 'node index.js -c C1-C0-A -i input.txt -o output.txt -q Error';
  const wrongParameters = { c: 'C1-C0-A', i: 'input.txt', o: 'output.txt', q: 'Error' };
  const correctParameters = { c: 'C1-C0-A', i: 'input.txt', o: 'output.txt' };
  const errorParametersNumber = 5;

  jest.mock('../checkParameters', () => ({
    parameters: () => wrongParameters
  }));

  const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((err) => err);

  it("Should show error with code 5", () => {
    checkParameters(wrongParameters, null);
    expect(mockProcessExit).toHaveBeenCalledWith(errorParametersNumber);
  });

  it('Should show parameters error', () => {
    exec(commandWrongParameters, (error, stdout, stderr) => {
      expect(stderr).toBe(errorParameters);
    });
  });

  it("Should return undefined", () => {
    expect(checkParameters(correctParameters, null)).toBeUndefined();
  });
});
