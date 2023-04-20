import React from "react"

class Form extends React.Component {
    render(){
    return (
        < form>
        <div className='block'>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">{this.props.pasword}</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Напиши тут тот самый пароль-_-'></input>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
        <label className="form-check-label" htmlFor="exampleCheck1">{this.props.net}</label>
      </div>
      <div>
        <h2>{this.props.title}</h2>
        <h6>По всем вопросам обращаться на почту-
          antohka803@gmail.com
        </h6>
      </div>
      <button type="submit" className="btn btn-primary" >{this.props.text}</button> </div>

    </form>
    )
}}

export default Form