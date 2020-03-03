import React, { Component } from 'react';
import styles from '../styles/style.css';

class Profile_property extends Component {
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
                Имущество
            </div>
        )
    }
}

export default Profile_property;