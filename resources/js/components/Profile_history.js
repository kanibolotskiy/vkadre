import React, { Component } from 'react';
import styles from '../styles/style.css';

class Profile_history extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
        }
    }
    render() { 
        return (
            <div className="profile_info">
                Трудовая книжка
            </div>
        )
    }
}

export default Profile_history;