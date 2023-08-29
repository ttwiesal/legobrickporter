const axios = require('axios');
jest.mock('axios');

global.cliArguments = {
  apiKey: '123',
};

const converter = require('./convert-to-bricklinkid.js');
describe('convert-to-bricklinkid.js', () => {
  it('should extract quantity and sku from order', async () => {
    const order = {
      items: [
        { quantity: 1, sku: '6022359', price: 12.49 },
        { quantity: 2, sku: '6092588', price: 14.99 },
      ],
    };

    axios.get.mockResolvedValue({
      data: {
        part: {
          part_num: '10509pr0001',
          external_ids: {
            BrickLink: ['10352c01pb01'],
            BrickOwl: ['32303'],
            Brickset: ['10509'],
            LDraw: ['10509p01'],
            LEGO: ['10509'],
          },
        },
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const expected = [
      {
        quantity: 1,
        id: '10352c01pb01',
      },
      {
        quantity: 2,
        id: '10352c01pb01',
      },
    ];
    const actual = await converter.parseOrder(order);
    expect(actual).toStrictEqual(expected);
  });
});
