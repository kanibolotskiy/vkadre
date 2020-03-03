import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/elements/Header';

class Changes extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {

        }
    }
    render() {
        return (
            <div >
                <Header/>
                Изменения
            </div>
        );
    }
}
 
export default Changes;
