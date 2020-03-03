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
            //stateActive:this.props.selected
        }
    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveProfile')
    }
    componentDidMount(){
        console.log(this.props.selected)
        console.log(this.props.customerID)
    }
    render() { 
        return (
            <div>
                <div className="tab_blocks">
                    <div className="tab_blocks_header">
                        <div onClick={()=>this.setInfo(1)} className={this.props.selected==1? 'active':''}>Основное</div>
                        <div onClick={()=>this.setInfo(2)} className={this.props.selected==2? 'active':''}>Трудовая книжка</div>
                        <div onClick={()=>this.setInfo(3)} className={this.props.selected==3? 'active':''}>Имущество</div>
                        <div onClick={()=>this.setInfo(4)} className={this.props.selected==4? 'active':''}>Кредиты</div>
                        <div onClick={()=>this.setInfo(5)} className={this.props.selected==5? 'active':''}>Мед. карта</div>
                    </div>
                    <div className="btn">Печать</div>
                </div>
                {this.props.selected==1? <Profile_base customerID={this.props.customerID} />:''}
                {this.props.selected==2? <Profile_history />:''}
                {this.props.selected==3? <Profile_property/>:''}
                {this.props.selected==4? <Profile_credits/>:''}
                {this.props.selected==5? <Profile_med/>:''}
                
            </div>
        )
    }
}

export default Profile;
/*

*/