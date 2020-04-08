const INITIAL_STATE = { description: '', list: [], editItem: null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'DESCRIPTION_CHANGE':
            return { ...state, description: action.payload };
        case 'EDIT_ITEM_CHANGE':
            return { ...state, editItem: action.payload };
        case 'UPDATE_LIST':
            return { ...state, list: action.payload };
        case 'TODO_ADD':
            return { ...state, description: '' };
        default:
            return state;
    }
};