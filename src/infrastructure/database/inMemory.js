// In memory database, performing only reading and updating a fixed cart (id suppressed)
const init = ({ logger }) => {
  const db = {
    carts: [{ items: [], totalPrice: 0 }],
  };

  const read = async (collectionName) => {
    logger.debug(`Reading ${collectionName} with id: 1`);
    return db[collectionName][0];
  };

  const update = async (collectionName, data) => {
    logger.debug(`Updating ${collectionName} with id: 1 with data: ${JSON.stringify(data)}`);
    db[collectionName][0] = data;
    return data;
  };

  return {
    read,
    update,
  };
};

module.exports = init;
