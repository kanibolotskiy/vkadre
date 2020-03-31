import React, { Component } from 'react';

import FlexigridItem from '../components/elements/FlexigridItem';
import Profile from '../components/Profile'
import Organization from '../components/Organization'
import Links from '../components/Links'
import Polygraf from '../components/Polygraf'
import Visit from '../components/Visit'

import Header from '../components/elements/Header';

import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/style.css';

class Customers extends Component {
    constructor(props) {
        super(props);
        //Initialize the state in the constructor
        this.state = {
            stateActive:0,
            //customerID:0,
            stateSelected:{
                stateActiveProfile:1,
                stateActiveOrganization:1,
            },
            products: [],
        }
        this.updateData = this.updateData.bind(this)
        //this.escFunction = this.escFunction.bind(this)
        this.showProfile = this.showProfile.bind(this)
        this.keyFunction = this.keyFunction.bind(this)
        

    }
    componentDidMount(){
        sessionStorage.setItem("key_action", "customers")
        document.addEventListener("keydown", this.keyFunction, false);
    }
    
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
    }
    keyFunction(event){
        if(sessionStorage.getItem("key_action")=="customers"){
            if(event.keyCode === 27) {
                //Do whatever when esc is pressed
                console.log("customers_esc")
                //Скрываем Profile_Info
                this.setState({stateActive:0})
            }
        }
    }

    escMethod(){
        
    }

    updateData(val,name) {
        let data=this.state.stateSelected
        data[name]=val
        this.setState({stateSelected:data})
    }

    setInfo(stateActive){
        this.setState({stateActive:stateActive})
    }
    
    
    
    showProfile(val){
        //console.log(val)
        this.setState({customerID:val})
        if(!this.state.stateActive){
            this.setState({stateActive:1})
        }
        //

    }
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <div className="wrp_finder">
                    <div className="btn" onClick={()=>this.setInfo(1)}><span className="_red">С</span>оздать</div>
                    <div className="wrp_finder_input">
                        <input className="finder_input"/>
                    </div>
                    <div className="filter_caption"><span className="_red">Ф</span>ильтры</div>
                </div>
                <div className="wrapper_content">
                    <FlexigridItem 
                        url="customers"
                        caption="test" 
                        clickData={this.showProfile}
                    />
                </div>
                
                {this.state.stateActive>0?
                    <div className="block_info">
                        <div className="tab_list">
                            <div onClick={()=>this.setInfo(1)} className={this.state.stateActive==1? 'active':''}>Профиль</div>
                            <div onClick={()=>this.setInfo(2)} className={this.state.stateActive==2? 'active':''}>В организации</div>
                            <div onClick={()=>this.setInfo(3)} className={this.state.stateActive==3? 'active':''}>Связи</div>
                            <div onClick={()=>this.setInfo(4)} className={this.state.stateActive==4? 'active':''}>Полиграф</div>
                            <div onClick={()=>this.setInfo(5)} className={this.state.stateActive==5? 'active':''}>Посещения</div>
                        </div>
                        
                        {this.state.stateActive==1? <Profile customerID={this.state.customerID} selected={this.state.stateSelected.stateActiveProfile} updateData = {this.updateData}/>:''}
                        {this.state.stateActive==2? <Organization customerID={this.state.customerID} selected={this.state.stateSelected.stateActiveOrganization} updateData = {this.updateData}/>:''}
                        {this.state.stateActive==3? <Links customerID={this.state.customerID} updateData = {this.updateData}/>:''}
                        {this.state.stateActive==4? <Polygraf customerID={this.state.customerID} updateData = {this.updateData}/>:''}
                        {this.state.stateActive==5? <Visit customerID={this.state.customerID} updateData = {this.updateData}/>:''}
                    </div>
                :''}
            </div>
            
        )
    }
}

export default Customers;

/*
<FlexigridItem />
*/