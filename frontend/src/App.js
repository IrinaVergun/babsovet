import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Main from './mainPapka/Main';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { login: false };
    }
    render() {
        if (this.state.login) {
            return <Main />;
        } else {
            return (
                <div className='app'>
                    <Form
                        onSubmit={(password) => {
                            console.log('password', password);
                            if (password === '') {
                                alert(
                                    'Сказано ввести пароль, топишь потыкать клавиши, которые я сказала ранее,по буквам...',
                                );
                            } else if (password === '1234') {
                                alert('Наебала, объебала) Вспоминай пароль!');
                            } else {
                                this.setState({ login: true });
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
