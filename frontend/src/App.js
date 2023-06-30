import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Main from './mainPapka/Main';
import { login } from './api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { login: false, id: null, token: null };
    }
    render() {
        if (this.state.login) {
            return <Main userId={this.state.id} />;
        } else {
            return (
                <div className='app'>
                    <Form
                        onSubmit={async (password) => {
                            console.log('password', password);
                            if (password === '') {
                                alert(
                                    'Сказано ввести пароль, топишь потыкать клавиши, которые я сказала ранее,по буквам...',
                                );
                            } else if (password === '1234') {
                                alert('Наебала, объебала) Вспоминай пароль!');
                            } else {
                                const response = await login(password);
                                if (response.error) {
                                    alert(response.error);
                                } else {
                                    alert('welcome epta!');
                                    this.setState({
                                        login: true,
                                        id: response.id,
                                        token: response.token,
                                    });
                                }
                            }
                        }}
                        text='УЗРИ'
                        title='Регистраций Нет!'
                        net='Зачем тебе проверять?'
                        pasword='Пароль: 1234'
                    />
                </div>
            );
        }
    }
}

export default App;
