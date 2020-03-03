import React, { Component } from 'react';
import styles from '../styles/style.css';

import Organization_base from './Organization_base'
import Organization_trip from './Organization_trip'
import Organization_hospital from './Organization_hospital'
import Organization_vacation from './Organization_vacation'
import Organization_encouragement from './Organization_encouragement'

/*import Profile_base from './Profile_base'
import Profile_history from './Profile_history'
import Profile_property from './Profile_property'
import Profile_credits from './Profile_credits'
import Profile_med from './Profile_med'
*/
class Organization extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
        }
    }
    componentDidMount(){
        if(!this.state.stateActive){
            this.setState({stateActive:1});
        }
    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveOrganization')
    }
    render() { 
        return (
            <div>
                <div className="tab_blocks">
                    <div className="tab_blocks_header">
                        <div onClick={()=>this.setInfo(1)} className={this.props.selected==1? 'active':''}>Основное</div>
                        <div onClick={()=>this.setInfo(2)} className={this.props.selected==2? 'active':''}>Командировки</div>
                        <div onClick={()=>this.setInfo(3)} className={this.props.selected==3? 'active':''}>Больничные</div>
                        <div onClick={()=>this.setInfo(4)} className={this.props.selected==4? 'active':''}>Отпуск</div>
                        <div onClick={()=>this.setInfo(5)} className={this.props.selected==5? 'active':''}>Поощрения</div>
                    </div>
                    <div className="btn">Печать</div>
                </div>
                {this.state.stateActive==1? <Organization_base/>:''}
                {this.state.stateActive==2? <Organization_trip/>:''}
                {this.state.stateActive==3? <Organization_hospital/>:''}
                {this.state.stateActive==4? <Organization_vacation/>:''}
                {this.state.stateActive==5? <Organization_encouragement/>:''}
                
            </div>
        )
    }
}

export default Organization;
/*

*/