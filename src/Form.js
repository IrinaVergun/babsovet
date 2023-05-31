import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paswordtext: '',
            FactKlickOnGalky: '',
        };
        this.handlePaswordlChange = this.handlePaswordlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FactKlickOnGalky = this.FactKlickOnGalky.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log('form is submited. Pasword value is', this.state.paswordtext);
        this.props.onSubmit();
    }

    handlePaswordlChange(event) {
        console.log(' paswordtext was changed', this);
        this.setState({ paswordtext: event.target.value });
    }

    FactKlickOnGalky(event) {
        console.log('клик был', event.target.checked);
        this.setState({ KlickonGalky: event.target.checked });
    }

    render() {
        const type = this.state.KlickonGalky ? 'text' : 'password';

        return (
            <form onSubmit={this.handleSubmit}>
                <div className='block'>
                    <div className='mb-3'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            {this.props.pasword}
                        </label>
                        <input
                            type={type}
                            className='form-control'
                            id='exampleInputPassword1'
                            placeholder='Напиши тут тот самый пароль-_-'
                            value={this.state.paswordtext}
                            onChange={this.handlePaswordlChange}
                        ></input>
                    </div>
                    <div className='mb-3 form-check'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            id='exampleCheck1'
                            value={this.state.KlickonGalky}
                            onChange={this.FactKlickOnGalky}
                        ></input>
                        <label className='form-check-label' htmlFor='exampleCheck1'>
                            {this.props.net}
                        </label>
                    </div>
                    <div>
                        <h2>{this.props.title}</h2>
                        <h6>По всем вопросам обращаться на почту- antohka803@gmail.com</h6>
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        {this.props.text}
                    </button>{' '}
                </div>
            </form>
        );
    }
}

export default Form;
