import React, { Component } from 'react';
import IconButton from '../template/iconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChange, handleEditItem, updateList, remove, handleStatus } from '../actions/todoAction';

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || [];

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
                        onClick={() => props.handleStatus(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='undo' hide={!item.done}
                        onClick={() => props.handleStatus(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='edit'
                        onClick={() => props.handleEditItem(item)}>
                    </IconButton>
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => props.remove(item)}>
                    </IconButton>
                </td>
            </tr>
        ));
    };

    return (
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
    );
};

function mapStateToProps(state) {
    return ({
        list: state.todo.list
    })
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleChange, handleEditItem, updateList, remove, handleStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)