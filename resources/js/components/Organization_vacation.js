import React, { Component } from 'react';
import styles from '../styles/style.css';

class Organization_vacation extends Component {
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
                Отпуска
            </div>
        )
    }
}

export default Organization_vacation;