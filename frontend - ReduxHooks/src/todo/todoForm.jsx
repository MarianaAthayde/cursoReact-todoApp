import React, { Component, useEffect } from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChange, updateList, add } from '../actions/todoAction';

const URL = 'http://localhost:3003/api/todos';

export default function TodoForm(props) {
    // constructor(props) {
    //     super(props);

    //     this.keyHandle = this.keyHandle.bind(this);
    // }


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