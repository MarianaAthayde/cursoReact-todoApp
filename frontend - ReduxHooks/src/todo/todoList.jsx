import React, { Component, Fragment } from 'react';
import IconButton from '../template/iconButton';
import { useSelector, useDispatch } from 'react-redux';
import { handleEditItem, remove, handleStatus } from '../actions/todoAction';

export default props => {
    const listRedux = useSelector(state => state.todo.list);
    const dispatch = useDispatch();

    function handleStatusF(item) {
        dispatch(handleStatus(item));
    }

    function handleEditItemF(item) {
        dispatch(handleEditItem(item));
    }

    function removeF(item) {
        dispatch(remove(item));
    }

    const renderRows = () => {
        const list = listRedux || [];

        return list.map(item => (
            <tr key={item._id}>
                <td>
                    {item.description}
                </td>
                <td>
                    {JSON.stringify(item.done)}
                </td>
                <td>
                    <IconButton style='success' icon='check' hide={item.done}
                        onClick={() => handleStatusF(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='undo' hide={!item.done}
                        onClick={() => handleStatusF(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='edit'
                        onClick={() => handleEditItemF(item)}>
                    </IconButton>
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => removeF(item)}>
                    </IconButton>
                </td>
            </tr>
        ));
    };

    return (
        <Fragment>
            {props.children}
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            Descrição
                    </th>
                        <th>
                            Status
                    </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </Fragment>
    );
};