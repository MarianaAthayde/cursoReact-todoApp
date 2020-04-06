import React from 'react';
import IconButton from '../template/iconButton';

export default props => {

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
                        onClick={() => props.handleMarkAsDone(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='undo' hide={!item.done}
                        onClick={() => props.handleMarkAsPending(item)}>
                    </IconButton>
                    <IconButton style='warning' icon='edit'
                        onClick={() => props.handleEdit(item)}>
                    </IconButton>
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => props.handleRemove(item)}>
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