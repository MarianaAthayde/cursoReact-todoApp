import React from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';

export default props => {

    const keyHandle = (e) => {
        switch (e.key) {
            case 'Enter': e.shiftKey ? props.handleSearch() : props.handleAdd(); break;
        }
    }

    return (
        <div role='form' className='todoForm'>
            <Grid cols='12 9 10'>
                <input id='description' className='form-control' placeholder='Adicione uma tarefa'
                    value={props.description}
                    onChange={props.handleChange}
                    onKeyUp={keyHandle}></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={props.handleAdd}></IconButton>
                <IconButton style='info' icon='search' onClick={props.handleSearch}></IconButton>
            </Grid>
        </div>
    )
};