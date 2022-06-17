export const applyDrag = (arr, dragResult, noRemove = true) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	// let itemToAdd = payload;
	let itemToAdd = Object.assign({}, payload);

	if (!noRemove) {
		if (removedIndex !== null) {
			itemToAdd = result.splice(removedIndex, 1)[0];
		}
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};

export const generateItems = (count, creator) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(creator(i));
	}
	return result;
};
