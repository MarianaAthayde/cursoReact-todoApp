import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export function handleChange(description) {
    return ({
        type: 'DESCRIPTION_CHANGE',
        payload: description
    });
};

export function handleEditItem(item) {
    return [
        {
            type: 'EDIT_ITEM_CHANGE',
            payload: item
        },
        handleChange(item ? item.description : '')
    ];
};

export function updateList() {
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const filter = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createdAt${filter}`)
            .then(resp => {
                dispatch({
                    type: 'UPDATE_LIST',
                    payload: resp.data
                })
            })
            .catch(error => {
                alert('Falha na atualização da lista de tarefas!');
                console.log(error);
            });
    }
};

export function add(description) {
    return (dispatch, getState) => {
        const editItem = getState().todo.editItem;
        if (editItem) {
            axios.put(`${URL}/${editItem._id}`, { description })
                .then(resp => {
                    alert('Tarefa atualizada com sucesso!');
                    return dispatch(handleEditItem(null));
                })
                .then(resp => dispatch(updateList()))
                .catch(error => {
                    alert('Erro ao incluir tarefa!');
                    console.log(error);
                });
        } else {
            axios.post(URL, { description })
                .then(resp => {
                    alert('Tarefa incluída com sucesso!');
                    return dispatch({ type: 'TODO_ADD', payload: resp.data });
                })
                .then(resp => dispatch(updateList()))
                .catch(error => {
                    alert('Erro ao incluir tarefa!');
                    console.log(error);
                });
        }
    };
}

export function update(description) {
    return dispatch => {
        axios.put(URL, { description })
            .then(resp => {
                alert('Tarefa incluída com sucesso!');
                return dispatch({ type: 'TODO_ADD', payload: resp.data });
            })
            .then(resp => dispatch(updateList()))
            .catch(error => {
                alert('Erro ao incluir tarefa!');
                console.log(error);
            });
    };
}

export function remove(item) {
    return dispatch => {
        axios.delete(`${URL}/${item._id}`)
            .then(resp => {
                alert('Sucesso na exclusão de tarefas!');
                return dispatch(updateList());
            })
            .catch(error => {
                alert('Erro na exclusão de tarefa!');
                console.log(error);
            });
    }
}

export function handleStatus(item) {
    return dispatch => {
        axios.put(`${URL}/${item._id}`, { done: !item.done })
            .then(resp => {
                return dispatch(updateList());
            })
            .catch(error => {
                alert('Erro na alteração de tarefa!');
                console.log(error);
            });
    }
}