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
                        onSubmit={() => {
                            this.setState({ login: true });
                        }}
                        text='УЗРИ'
                        title='Регистраций Нет!'
                        net='Зачем тебе проверять?'
                        pasword='Пороль: 1234'
                    />
                </div>
            );
        }
    }
}

export default App;
