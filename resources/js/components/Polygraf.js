import React, { Component } from 'react';
import Profile_table from './Profile_table'

class Polygraf extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            stateActive:1,
            stateAction:1,
            item:{
                name:"Полиграф",
                button:"Доб. сзязь",
                selected:2,
                url:'customer_polygraf',
                columns:[
                    {name:'date', title:'Дата проверки', type:'date', required:true, align: 'left', width:100 },
                    {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    {name:'tester', title:'Проводил', type:'selector_customer', required:false, align: 'left', width:100},
                    {name:'files', title:'Результат проверки', type:'files', required:false, align: 'left', width:100 },
                ],
                sortOrder:[
                    {columnName: 'date', direction: 'DESC' }
                ],
                params:{
                    captionAdd:'Добавление проверки на полиграфе',
                    captionEdit:'Редактирование проверки на полиграфе',
                    captionAddButton:'Добавить проверку',
                    captionEditButton:'Изменить проверку',
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
        if(sessionStorage.getItem("key_action")=="polygraf"){
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
        sessionStorage.setItem("key_action", "polygraf")
        document.addEventListener("keydown", this.keyFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyFunction, false);
    }

    render() { 
        return (
            <div>
                <div className="tab_blocks _right">
                    <div className="btns">
                        <div className="btn" onClick={()=>this.setAction(2)}>Добавить проверку</div>
                        <div className="btn">Печать</div>
                    </div>
                </div>
                <Profile_table
                    customerID={this.props.customerData.id}
                    //customerData={this.props.customerData}
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

export default Polygraf;
/*

*/