import React, { Component } from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { handleChange, updateList, add } from '../actions/todoAction';

const URL = 'http://localhost:3003/api/todos';

class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.keyHandle = this.keyHandle.bind(this);
    }

    keyHandle(e) {
        switch (e.key) {
            case 'Enter': e.shiftKey ? this.props.updateList() : this.props.add(this.props.description); break;
        }
    };

    componentWillMount() {
        this.props.updateList();
    }

    render() {
        return (
            <div role='form' className='todoForm' >
                <Grid cols='12 9 10'>
                    <input id='description' className='form-control' placeholder='Adicione uma tarefa'
                        value={this.props.description}
                        onChange={(event) => this.props.handleChange(event.target.value)}
                        onKeyUp={this.keyHandle}
                    ></input>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={() => this.props.add(this.props.description)}></IconButton>
                    <IconButton style='info' icon='search' onClick={this.props.updateList}></IconButton>
                </Grid>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return ({
        description: state.todo.description
    })
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleChange, updateList, add }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)