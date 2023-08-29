const parseToXml = (data) => {
  const content = data.reduce((acc, item) => {
    const { id, quantity, color } = item;
    return `${acc}<ITEM><COLOR>${color}</COLOR><ITEMTYPE>P</ITEMTYPE><ITEMID>${id}</ITEMID><QTY>${quantity}</QTY><CONDITION>N</CONDITION></ITEM>\n`;
  }, '');
  return `<INVENTORY>${content}</INVENTORY>`;
};

const generateBricklinkXml = (data) => {
  const content = parseToXml(data);

  return content;
};

module.exports = generateBricklinkXml;
