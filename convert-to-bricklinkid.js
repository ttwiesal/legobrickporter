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

    return { bricklinkId: res.data.part.external_ids.BrickLink[0], color: res.data.color.external_ids.BrickLink.ext_ids[0] };
  } catch (error) {
    console.error(error);
    return { bricklinkId: null, color: null };
  }
};

const convert = async (order) => {
  const itemGroups = order.orderDetailsV2.itemGroups;

  const items = itemGroups.reduce((acc, itemGroup) => {
    return [...acc, ...itemGroup.items];
  }, []);

  const convertedOrder = [];

  for (let orderItem of items) {
    const { bricklinkId, color } = await loadBricklinkid(orderItem.sku);
    if (bricklinkId) convertedOrder.push({ id: bricklinkId, color, quantity: orderItem.quantity });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return convertedOrder;
};

const parseOrder = ({ data }) => {
  return convert(data);
};

module.exports = { parseOrder };
