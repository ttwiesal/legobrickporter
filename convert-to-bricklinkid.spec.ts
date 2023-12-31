const axios = require('axios');
jest.mock('axios');

global.cliArguments = {
  apiKey: '123',
};

const converter = require('./convert-to-bricklinkid.js');
describe('convert-to-bricklinkid.js', () => {
  it('should extract quantity and sku from order', async () => {
    const order = {
      data: {
        orderDetailsV2: {
          orderNumber: 'T416400100',
          status: 'In Warehouse',
          date: '2023-08-28T20:57:16.114Z',
          itemGroups: [
            {
              items: [
                { quantity: 1, sku: '6022359', price: 12.49 },
                { quantity: 2, sku: '6092588', price: 14.99 },
              ],
            },
            {
              items: [
                { quantity: 3, sku: '6022359', price: 12.49 },
                { quantity: 4, sku: '6092588', price: 14.99 },
              ],
            },
          ],
        },
      },
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
        color: {
          external_ids: {
            BrickLink: { ext_ids: ['1'] },
            BrickOwl: ['11'],
            Brickset: ['1'],
            LDraw: ['0'],
            LEGO: ['1'],
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
        color: '1',
      },
      {
        quantity: 2,
        id: '10352c01pb01',
        color: '1',
      },
      {
        quantity: 3,
        id: '10352c01pb01',
        color: '1',
      },
      {
        quantity: 4,
        id: '10352c01pb01',
        color: '1',
      },
    ];
    const actual = await converter.parseOrder(order);
    expect(actual).toStrictEqual(expected);
  });
});
