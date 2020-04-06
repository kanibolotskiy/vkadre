import React, { Component } from 'react';
import Profile_table from './Profile_table'

class Visit extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            stateActive:1,
            stateAction:1,
            item:{
                name:"Посещения",
                selected:2,
                url:'customer_visit',
                columns:[
                    {name:'date', title:'Дата', type:'date', required:true, align: 'left', width:100 },
                    {name:'time_arrival', title:'Время прихода', type:'text', required:false, align: 'left', width:100},
                    {name:'time_leaving', title:'Время ухода', type:'text', required:false, align: 'left', width:100},
                    {name:'duration', title:'Длительность', type:'text', required:false, align: 'left', width:100 },
                ],
                sortOrder:[
                    {columnName: 'date', direction: 'ASC' }
                ],
                params:{
                    deniedEdit:true
                }
            }
        }
        this.setAction = this.setAction.bind(this)
        this.keyFunction = this.keyFunction.bind(this)
        this._esc = this._esc.bind(this)
        

    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveProfile')
        this.setState({stateAction:1})
    }
    setAction(stateAction=1){
        this.setState({stateAction:stateAction})
    }
    keyFunction(event){
        if(sessionStorage.getItem("key_action")=="visit"){
            if(event.keyCode === 27) {  
                this._esc()
            }
            if(event.keyCode === 13) {
                
            }
        }
    }
    _esc(){
        this.props.closeInfo()
    }
    componentDidMount() {
        sessionStorage.setItem("key_action", "visit")
        document.addEventListener("keydown", this.keyFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyFunction, false);
    }
    render() { 
        return (
            <div>
                <Profile_table
                    customerID={this.props.customerData.id}
                    stateAction={this.state.stateAction} 
                    setAction={this.setAction}
                    url={this.state.item.url}
                    columns={this.state.item.columns}
                    sortOrder={this.state.item.sortOrder}
                    params={this.state.item.params}
                />
            </div>
        )
    }
}

export default Visit;
/*

*/