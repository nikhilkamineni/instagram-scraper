require('dotenv').config();
const server = require('./server.js');

describe('Server.js test suite', () => {
  test('Server smoke test', () => {
    expect(server).toBeDefined();
    expect(server.listening).toBe(true);
    expect(server.address().port).toEqual(Number(process.env.PORT));
  });
});
