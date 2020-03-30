import React, { Component } from 'react';
import Profile_table from './Profile_table'

class Links extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            stateActive:1,
            stateAction:1,
            item:{
                name:"Связи",
                button:"Доб. сзязь",
                selected:2,
                url:'customer_link',
                columns:[
                    {name:'typelink', title:'Тип связи', type:'selector', required:true, align: 'left', width:100 },
                    {name:'linked_customer', title:'ФИО', type:'link', required:false, align: 'left', width:100},
                    {name:'comment', title:'Комментарий', type:'textarea', required:false, align: 'left', width:100},
                    {name:'date', title:'Дата добавления', type:'date', required:false, align: 'left', width:100 },
                ],
                sortOrder:[
                    {columnName: 'date', direction: 'ASC' }
                ],
                params:{
                    captionAdd:'Добавление связи',
                    captionEdit:'Редактирование связи',
                    captionAddButton:'Добавить связь',
                    captionEditButton:'Изменить связь',
                }
            }
        }
        this.setAction = this.setAction.bind(this)
    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveProfile')
        this.setState({stateAction:1})
    }
    setAction(stateAction=1){
        this.setState({stateAction:stateAction})
    }
    render() { 
        return (
            <div>
                <div className="tab_blocks _right">
                    <div className="btns">
                        <div className="btn" onClick={()=>this.setAction(2)}>Создать связь</div>
                        <div className="btn">Печать</div>
                    </div>
                </div>
                <Profile_table
                    customerID={this.props.customerID} 
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

export default Links;
/*

*/