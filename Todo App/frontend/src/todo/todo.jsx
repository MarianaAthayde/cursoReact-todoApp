import React, { Component } from 'react';
import axios from 'axios';
import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            list: [],
            editItem: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.refresh();
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?sort=createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description: description, list: resp.data }));
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value });
    }

    handleAdd() {
        const description = this.state.description
        if (this.state.editItem) {
            axios.put(`${URL}/${this.state.editItem._id}`, { description: this.state.description })
                .then(resp => {
                    this.setState({ ...this.state, description: '', editItem: null });
                    alert('ToDo alterado com sucesso!');
                    this.refresh();
                })
                .catch(error => console.log('Erro ao tentar alterar tarefa!'));
        } else {
            axios.post(URL, { description })
                .then(resp => {
                    alert('ToDo adicionado com sucesso!');
                    this.refresh();
                })
                .catch(error => console.log('Erro ao tentar adicionar tarefas!'));
        }
    }

    handleRemove(item) {
        axios.delete(`${URL}/${item._id}`)
            .then(resp => {
                alert('Item removido com sucesso!');
                this.refresh();
            })
            .catch(erro => {
                alert('Ocorreu um erro ao remover o item!');
                console.log(erro);
            })
    }

    handleMarkAsDone(item) {
        axios.put(`${URL}/${item._id}`, { ...item, done: true })
            .then(resp => {
                alert('Item atualizado com sucesso!');
                this.refresh(this.state.description);
            })
            .catch(erro => {
                alert('Ocorreu um erro ao atualizar o item!');
                console.log(erro);
            });
    }

    handleMarkAsPending(item) {
        axios.put(`${URL}/${item._id}`, { ...item, done: false })
            .then(resp => {
                alert('Item atualizado com sucesso!');
                this.refresh(this.state.description);
            })
            .catch(erro => {
                alert('Ocorreu um erro ao atualizar o item!');
                console.log(erro);
            });
    }

    handleEdit(item) {
        this.setState({ ...this.state, editItem: item, description: item.description });
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}></TodoForm>
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleEdit={this.handleEdit}></TodoList>
            </div>
        )
    }
}
