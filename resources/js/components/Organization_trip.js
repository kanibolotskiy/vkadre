import React, { Component } from 'react';
import styles from '../styles/style.css';

class Organization_trip extends Component {
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
                Командировки
            </div>
        )
    }
}

export default Organization_trip;