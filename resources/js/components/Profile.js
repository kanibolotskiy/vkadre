import React, { Component } from 'react';
import Profile_base from './Profile_base'
import Profile_table from './Profile_table'

class Profile extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            stateAction:1,
            profileTables:[
                {
                    name:"Трудовая книжка",
                    button:"Доб. запись",
                    selected:2,
                    url:'customer_history',
                    columns:[
                        {name:'date', title:'Дата', type:'date', required:true, align: 'left', width:100 },
                        {name:'record', title:'Запись', type:'textarea', required:true, align: 'left', width:100},
                        {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        {columnName: 'date', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление записи в трудовую книжку',
                        captionEdit:'Редактирование записи в трудовой книжке',
                        captionAddButton:'Добавить запись',
                        captionEditButton:'Изменить запись',
                    }
                },
                {
                    name:"Имущество",
                    button:"Доб. имущество",
                    selected:3,
                    url:'customer_property',
                    columns:[
                        {name:'typeproperty', title:'Тип', type:'selector', required:true, align: 'left', width:100 },
                        {name:'property', title:'Имущество', type:'textarea', required:true, align: 'left', width:100},
                        {name:'summa', title:'Стоимость', type:'currency', required:false, align: 'left', width:100},
                        {name:'date', title:'Дата приобретения', type:'date', required:false, align: 'left', width:100},
                        {name:'comment', title:'Комментарий', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        { columnName: 'typeproperty_name', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление имущества',
                        captionEdit:'Редактирование имущества',
                        captionAddButton:'Добавить имущество',
                        captionEditButton:'Изменить имущество',
                    }
                },
                {
                    name:"Кредиты",
                    button:"Доб. кредит",
                    selected:4,
                    url:'customer_credit',
                    columns:[
                        { name: 'typecredit', title: 'Тип', type:'selector', required:true, align: 'left', width:100 },
                        { name: 'summa', title: 'Сумма', type:'currency', required:true, align: 'left', width:100 },
                        { name: 'srok', title: 'Срок кредита' , type:'text', required:true, align: 'left', width:100 },
                        { name: 'summa_month', title: 'Месячный платеж' , type:'currency', required:true, align: 'left', width:100 },
                        { name: 'date', title: 'Дата закрытия', type:'date', required:true, align: 'left', width:100 }
                    ],
                    sortOrder:[
                        { columnName: 'typecredit_name', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление кредита',
                        captionEdit:'Редактирование кредита',
                        captionAddButton:'Добавить кредит',
                        captionEditButton:'Изменить кредит',
                    }
                },
                {
                    name:"Мед. карта",
                    button:"Доб. запись",
                    selected:5,
                    url:'customer_medical',
                    columns:[
                        { name: 'date', title: 'Дата внесения', type:'date', required:true, align: 'left', width:100  },
                        { name: 'memo', title: 'Заметка', type:'textarea', required:true, align: 'left', width:100  },
                    ],
                    sortOrder:[
                        { columnName: 'date', direction: 'desc' }
                    ],
                    params:{
                        captionAdd:'Добавление записи в медицинскую книжку',
                        captionEdit:'Редактирование записи в медицинской книжке',
                        captionAddButton:'Добавить запись',
                        captionEditButton:'Изменить запись',
                    }
                },
                
            ]
            //stateActive:this.props.selected
        }
        this.changeState = this.changeState.bind(this)
        this.setAction = this.setAction.bind(this)
    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveProfile')
        this.setState({stateAction:1})
    }
    setAction(stateAction=1){
        this.setState({stateAction:stateAction})
    }
    componentDidMount(){
        
    }
    changeState(){
        
    }
    render() { 

        const tab_blocks_header = []    //Вкладки профиля
        const tab_btns = []             //Кнопки добавления
        const block_tables = []         //Кнопки добавления

        for (const [index, item] of this.state.profileTables.entries()) {
            tab_blocks_header.push(
                <div key={index+1} onClick={()=>this.setInfo(item.selected)} className={this.props.selected==item.selected? 'active':''}>{item.name}</div>
            )
            tab_btns.push(
                this.props.selected==item.selected?<div key={index} className="btn" onClick={()=>this.setAction(2)}>{item.button}</div>:'' 
            )
            block_tables.push(
                this.props.selected==item.selected? 
                    <Profile_table key={index}
                        customerID={this.props.customerID} 
                        stateAction={this.state.stateAction} 
                        setAction={this.setAction}
                        url={item.url}
                        columns={item.columns}
                        sortOrder={item.sortOrder}
                        params={item.params}
                    />:''
            )
        }

        return (
            <div>
                <div className="tab_blocks">
                    <div className="tab_blocks_header">
                        <div key={0} onClick={()=>this.setInfo(1)} className={this.props.selected==1? 'active':''}>Основное</div>
                        {tab_blocks_header}
                    </div>
                    <div className="btns">
                        {tab_btns}
                        <div className="btn">Печать</div>
                    </div>
                </div>
                {this.props.selected==1? <Profile_base customerID={this.props.customerID} />:''}

                {block_tables}
   

            </div>
        )
    }
}
/*

                {this.props.selected==2? <Profile_history customerID={this.props.customerID} stateAction={this.state.stateAction} setAction={this.setAction}/>:''}
                {this.props.selected==3? <Profile_property customerID={this.props.customerID} stateAction={this.state.stateAction} setAction={this.setAction}/>:''}
                {this.props.selected==4? <Profile_credits customerID={this.props.customerID} stateAction={this.state.stateAction} setAction={this.setAction}/>:''}
                {this.props.selected==5? <Profile_med customerID={this.props.customerID} stateAction={this.state.stateAction} setAction={this.setAction}/>:''}
             
*/                
export default Profile;
/*

*/