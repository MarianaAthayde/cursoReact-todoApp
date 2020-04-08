import React, { useEffect } from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, updateList, add } from '../actions/todoAction';

export default props => {
    const description = useSelector(state => state.todo.description);
    const dispatch = useDispatch();

    useEffect(() => {
        updateListF();
        return;
    },
        []
    );

    function handleChangeF(value) {
        dispatch(handleChange(value));
    }

    function addF(description) {
        dispatch(add(description));
    }

    function updateListF() {
        dispatch(updateList());
    }

    function keyHandle(e) {
        switch (e.key) {
            case 'Enter': e.shiftKey ? updateListF() : addF(description); break;
        }
    };

    return (
        <div role='form' className='todoForm' >
            {props.children}
            <Grid cols='12 9 10'>
                <input id='description' className='form-control' placeholder='Adicione uma tarefa'
                    value={description}
                    onChange={(event) => handleChangeF(event.target.value)}
                    onKeyUp={(event) => keyHandle(event)}
                ></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={() => addF(description)}></IconButton>
                <IconButton style='info' icon='search' onClick={() => updateListF()}></IconButton>
            </Grid>
        </div>
    )
};