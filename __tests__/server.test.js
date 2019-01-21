require('dotenv').config();

describe('Server.js test suite', () => {
  test('PORT environment var is being read correctly', () => {
    expect(process.env.PORT).toBeDefined();
  });
});
