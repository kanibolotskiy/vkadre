import React, { Component } from 'react';
import Organization_base from './Organization_base'
import Profile_table from './Profile_table'


class Organization extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            stateAction:1,
            profileTables:[
                {
                    name:"Коммандировки",
                    button:"Доб. запись",
                    selected:2,
                    url:'customer_btrip',
                    columns:[
                        {name:'date', title:'Даты',title_from:'Дата начала коммандировки',title_to:'Дата завершения коммандировки', type:'double_date', required:true, align: 'left', width:100 },
                        {name:'place', title:'Место коммандировки', type:'textarea', required:true, align: 'left', width:100},
                        {name:'goal', title:'Цель', type:'textarea', required:false, align: 'left', width:100},
                        {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        {columnName: 'date', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление коммандировки',
                        captionEdit:'Редактирование коммандировки',
                        captionAddButton:'Добавить коммандировку',
                        captionEditButton:'Изменить коммандировку',
                    }
                },
                {
                    name:"Больничные",
                    button:"Доб. запись",
                    selected:3,
                    url:'customer_hospital',
                    columns:[
                        {name:'date', title:'Даты',title_from:'Дата начала больничного',title_to:'Дата завершения больничного', type:'double_date', required:true, align: 'left', width:100 },
                        {name:'cause', title:'Причина', type:'textarea', required:true, align: 'left', width:100},
                        {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        {columnName: 'date', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление больничного',
                        captionEdit:'Редактирование больничного',
                        captionAddButton:'Добавить больничный',
                        captionEditButton:'Изменить больничный',
                    }
                },
                {
                    name:"Отпуск",
                    button:"Доб. запись",
                    selected:4,
                    url:'customer_vacation',
                    columns:[
                        {name:'date', title:'Даты',title_from:'Дата начала отпуска',title_to:'Дата завершения отпуска', type:'double_date', required:true, align: 'left', width:100 },
                        {name:'typevacation', title:'Тип', type:'selector', required:true, align: 'left', width:100},
                        {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        {columnName: 'date', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление отпуска',
                        captionEdit:'Редактирование отпуска',
                        captionAddButton:'Добавить отпуск',
                        captionEditButton:'Изменить отпуск',
                    }
                },
                {
                    name:"Поощрения",
                    button:"Доб. запись",
                    selected:5,
                    url:'customer_promotion',
                    columns:[
                        {name:'date', title:'Дата', type:'date', required:true, align: 'left', width:100 },
                        {name:'comment', title:'Комментарий', type:'textarea', required:true, align: 'left', width:100},
                        {name:'base', title:'Основание', type:'textarea', required:false, align: 'left', width:100},
                    ],
                    sortOrder:[
                        {columnName: 'date', direction: 'ASC' }
                    ],
                    params:{
                        captionAdd:'Добавление поощрения',
                        captionEdit:'Редактирование поощрения',
                        captionAddButton:'Добавить поощрение',
                        captionEditButton:'Изменить поощрение',
                    }
                },

                
                
            ]
            //stateActive:this.props.selected
        }
        this.changeState = this.changeState.bind(this)
        this.setAction = this.setAction.bind(this)
    }
    setInfo(stateActive){
        this.props.updateData(stateActive,'stateActiveOrganization')
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
                        <div onClick={()=>this.setInfo(1)} className={this.props.selected==1? 'active':''}>Основное</div>
                        {tab_blocks_header}
                    </div>
                    <div className="btns">
                        {tab_btns}
                        <div className="btn">Печать</div>
                    </div>
                </div>
                {this.props.selected==1? <Organization_base customerID={this.props.customerID} />:''}
                {block_tables}
                
            </div>
        )
    }
}

export default Organization;
/*
{this.state.stateActive==2? <Organization_trip/>:''}
                {this.state.stateActive==3? <Organization_hospital/>:''}
                {this.state.stateActive==4? <Organization_vacation/>:''}
                {this.state.stateActive==5? <Organization_encouragement/>:''}
*/