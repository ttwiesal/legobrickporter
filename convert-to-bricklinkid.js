const axios = require('axios');

const apiKey = global.cliArguments.apiKey;

const loadBricklinkid = async (sku) => {
  try {
    const url = `https://rebrickable.com/api/v3/lego/elements/${sku}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `key ${apiKey}`,
      },
    });

    if (res.status === 200) {
      console.log(res.status);
    }

    return res.data.part.external_ids.BrickLink[0];
  } catch (error) {
    console.error(error);
  }
};

const convert = async (order) => {
  const convertedOrder = [];

  for (orderItem of order.slice(0, 5)) {
    const id = await loadBricklinkid(orderItem.sku);
    convertedOrder.push({ id, quantity: orderItem.quantity });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return convertedOrder;
};

const parseOrder = ({ items }) => {
  return convert(items);
};

module.exports = { parseOrder };
