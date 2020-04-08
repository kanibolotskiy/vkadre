import React, { Component } from 'react';

import FlexigridItem from '../components/elements/FlexigridItem';
import Profile from '../components/Profile'
import Organization from '../components/Organization'
import Links from '../components/Links'
import Polygraf from '../components/Polygraf'
import Visit from '../components/Visit'

import Header from '../components/elements/Header';
import {DelayInput} from 'react-delay-input';

import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/style.css';

class Customers extends Component {
    constructor(props) {
        super(props);
        //Initialize the state in the constructor
        this.state = {
            letterLight:false,
            searchName:"",
            stateActive:1,
            showInfo:false,
            //customerID:0,
            stateSelected:{
                stateActiveProfile:1,
                stateActiveOrganization:1,
            },
            updateTableFlag:false,
            customerData:[]
        }
        this.updateData = this.updateData.bind(this)
        //this.escFunction = this.escFunction.bind(this)
        this.showProfile = this.showProfile.bind(this)
        this.keyFunction = this.keyFunction.bind(this)
        this.keyFunctionUp = this.keyFunctionUp.bind(this)
        

        this.closeInfo = this.closeInfo.bind(this)
        this.updateTable = this.updateTable.bind(this)
        this.updateTableFlagFunction = this.updateTableFlagFunction.bind(this)
        this.newCustomer = this.newCustomer.bind(this)

        this.nameChange = this.nameChange.bind(this)
                
    }
    componentDidMount(){
        sessionStorage.setItem("key_action", "customers")
        document.addEventListener("keydown", this.keyFunction, false);
        //document.addEventListener("keyup", this.keyFunctionUp, false);
    }
    
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
        //document.removeEventListener("keyup", this.keyFunctionUp, false);
    }
    keyFunctionUp(){
        this.setState({letterLight:false})
    }
    keyFunction(event){
        //console.log(sessionStorage.getItem("key_action"))
        /*
        console.log(event.altKey)
        if (event.altKey) {
            if(!this.state.letterLight){
                this.setState({letterLight:true})
            }
        }
        */

        if(sessionStorage.getItem("key_action")=="customers"){
            //console.log(event.keyCode)
            /*
            if (event.altKey && event.keyCode == 65) {
                alert('Shift + A');                
            }*/
            if(event.keyCode === 27) {
                //Do whatever when esc is pressed
                //console.log("customers_esc")
                //Скрываем Profile_Info
                //this.setState({stateActive:0})
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
        //console.log(stateActive)
        this.setState({stateActive:stateActive})
    }
    
    
    /*
    showProfile(val){
        //console.log(val)
        //this.setState({customerID:val})
        this.setState({customerData:val})
        if(!this.state.stateActive){
            this.setState({stateActive:1})
        }
        //
    }
    */
    showProfile(customerData){
        this.setState({customerData:customerData})
        this.setState({showInfo:true})
        /*console.log(this.state.stateActive)
        if(!this.state.stateActive){
            this.setState({stateActive:1})
        }*/
        //console.log(customerData)
    }

    closeInfo(){
        //console.log("closeInfo_cust")
        this.setState({customerID:0})
        this.setState({showInfo:false})
        sessionStorage.setItem("key_action","customers")

    }
    updateTable(){
        //console.log("set update")
        //this.refs.FlexigridItem.myfunc
        //this.refs.child.getAlert()
        this.setState({updateTableFlag:true})
    }
    updateTableFlagFunction(){
        this.setState({updateTableFlag:false})
    }
    newCustomer(){
        //console.log("newCustomer")
        this.setState({customerID:0})
        this.setState({showInfo:true})
        this.setState({customerData:[]})
    }
    //
    nameChange(event){
        //console.log(event.target.value)
        this.setState({searchName:event.target.value})
    }
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <div className="wrp_finder">
                    <div className="btn" onClick={this.newCustomer}><span className={this.state.letterLight?"_red ":""}>С</span>оздать</div>
                    <div className="wrp_finder_input">
                        <DelayInput
                            className="finder_input"
                            minLength={2}
                            delayTimeout={300}
                            onChange={event => this.setState({searchName: event.target.value})} 
                        />
                    </div>
                    <div className="filter_caption"><span className="_red">Ф</span>ильтры</div>
                </div>
                <div className="wrapper_content">
                    <FlexigridItem
                        searchName={this.state.searchName}
                        url="customers"
                        caption="test" 
                        clickData={this.showProfile}
                        updateTableFlag={this.state.updateTableFlag}
                        updateTableFlagFunction={this.updateTableFlagFunction}
                    />
                </div>
                
                {this.state.showInfo?
                    <div className="block_info">
                        <div className="tab_list">
                            <div onClick={()=>this.setInfo(1)} className={this.state.stateActive==1? 'active':''}>Профиль</div>
                            <div onClick={()=>this.setInfo(2)} className={this.state.stateActive==2? 'active':''}>В организации</div>
                            <div onClick={()=>this.setInfo(3)} className={this.state.stateActive==3? 'active':''}>Связи</div>
                            <div onClick={()=>this.setInfo(4)} className={this.state.stateActive==4? 'active':''}>Полиграф</div>
                            <div onClick={()=>this.setInfo(5)} className={this.state.stateActive==5? 'active':''}>Посещения</div>
                        </div>
                        
                        {this.state.stateActive==1 && this.state.showInfo? 
                            <Profile 
                                closeInfo={this.closeInfo} 
                                //customerID={this.state.customerID} 
                                customerData={this.state.customerData}
                                selected={this.state.stateSelected.stateActiveProfile} 
                                updateData = {this.updateData}
                                updateTable={this.updateTable}

                            />:''}
                        {this.state.stateActive==2 && this.state.showInfo? 
                            <Organization 
                                closeInfo={this.closeInfo} 
                                //customerID={this.state.customerID} 
                                customerData={this.state.customerData}
                                selected={this.state.stateSelected.stateActiveOrganization} 
                                updateData = {this.updateData}
                                updateTable={this.updateTable}
                            />:''}
                        {this.state.stateActive==3 && this.state.showInfo? 
                            <Links 
                                closeInfo={this.closeInfo} 
                                //customerID={this.state.customerData.id} 
                                //customerData={this.state.customerData}
                                customerData={this.state.customerData}
                                updateData = {this.updateData}/>:''}
                        {this.state.stateActive==4 && this.state.showInfo? 
                            <Polygraf 
                                closeInfo={this.closeInfo} 
                                //customerID={this.state.customerData.id} 
                                customerData={this.state.customerData}
                                updateData = {this.updateData}
                            />:''}
                        {this.state.stateActive==5 && this.state.showInfo? 
                            <Visit 
                                closeInfo={this.closeInfo} 
                                //customerID={this.state.customerData.id} 
                                customerData={this.state.customerData}
                                updateData = {this.updateData}
                            />:''}
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