import React, { Component } from 'react';
import styles from '../styles/style.css';

class Organization_hospital extends Component {
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
                Больничные
            </div>
        )
    }
}

export default Organization_hospital;