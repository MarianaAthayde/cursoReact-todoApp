import React, { Component, useEffect } from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleChange, updateList, add } from '../actions/todoAction';

const URL = 'http://localhost:3003/api/todos';

function TodoForm(props) {
    // constructor(props) {
    //     super(props);

    //     this.keyHandle = this.keyHandle.bind(this);
    // }

    useEffect(() => {
        props.updateList();
        return;
    },
        []
    );

    const description = useSelector(state => state.todo.description);

    // keyHandle(e) {
    //     switch (e.key) {
    //         case 'Enter': e.shiftKey ? this.props.updateList() : this.props.add(description); break;
    //     }
    // };

    return (
        <div role='form' className='todoForm' >
            <Grid cols='12 9 10'>
                <input id='description' className='form-control' placeholder='Adicione uma tarefa'
                    value={description}
                    onChange={(event) => props.handleChange(event.target.value)}
                // onKeyUp={this.keyHandle}
                ></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={() => props.add(description)}></IconButton>
                <IconButton style='info' icon='search' onClick={props.updateList}></IconButton>
            </Grid>
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleChange, updateList, add }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoForm)