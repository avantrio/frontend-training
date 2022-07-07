
export const normaliseObjectArray = (array) => {
    const result = {byId:{}, allIds:[]}
    const byId = array.reduce((_byId, item) => {
        const newById = {..._byId}
        newById[item.id] = item;
        return newById;
    }, {});
    result.byId = byId;
    result.allIds = Object.keys(byId).map(id=>parseInt(id));
    return result;
};