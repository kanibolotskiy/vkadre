import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
      this.state = {
        pathname:props.location.pathname,
        user: props.userData,
        isLoggedIn: props.userIsLoggedIn
      };
      this.logOut = this.logOut.bind(this);
  }
  componentDidMount(){
      console.log(this.state.pathname)
  }
  // 1.2
  logOut() {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }
  // 1.3
  render() {
    const aStyle = {
      cursor: 'pointer'
    };
    
    return (
        <header>
            <nav className="navbar">
                <ul>
                    <li><Link to="/" className={this.state.pathname=="/"?"active":""}>Сотрудники</Link></li>
                    <li><Link to="/changes/" className={this.state.pathname=="/changes/"?"active":""}>Изменения</Link></li>
                    <li><Link to="/properties/" className={this.state.pathname=="/properties/"?"active":""}>Настройки</Link></li>
                    <li>Выход</li>
                </ul>
            </nav>
        </header>
    )
  }
}
export default withRouter(Header)
/*
<li><Link to="/">Index</Link></li>
          {this.state.isLoggedIn ? 
           <li className="has-sub"><Link to="/dashboard">Dashboard</Link></li> : ""}
          {!this.state.isLoggedIn ?
            <li><Link to="/login">Login</Link> | <Link to="/register">Register</Link></li> : ""}
    
 */