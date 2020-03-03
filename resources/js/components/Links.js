import React, { Component } from 'react';
import styles from '../styles/style.css';
import Profile_base from './Profile_base'
import Profile_history from './Profile_history'
import Profile_property from './Profile_property'
import Profile_credits from './Profile_credits'
import Profile_med from './Profile_med'

class Profile extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            stateActive:1
        }
    }
    setInfo(stateActive){
        this.setState({stateActive:stateActive})
    }
    render() { 
        return (
            <div>
                Связи
            </div>
        )
    }
}

export default Profile;
/*

*/