import React, { Component } from 'react';
import styles from '../styles/style.css';
import FlexigridItem from '../components/elements/FlexigridItem_item';

class Profile_history extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            showtable:1,
            columns:[
                { name: 'date', title: 'Дата' },
                { name: 'record', title: 'Запись' },
                { name: 'base', title: 'Основание' }
            ],
            columnExt:[
                { columnName: 'date', align: 'left',width:100},
                { columnName: 'record', align: 'left',width:200},
                { columnName: 'base', align: 'left',width:200},
            ],
            columnWidth:[
                { columnName: 'date',width:100 },
                { columnName: 'record',width:100 },
                { columnName: 'base',width:100 },
            ]
        }
        this._editRecord = this._editRecord.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
    }
    _editRecord(){
        this.setState({showtable:3})
    }
    render() { 
        return (
            <div className="profile_info">
                {this.state.showtable==1?
                    <FlexigridItem 
                        customerID={this.props.customerID} 
                        clickData={this._editRecord} 
                        url='/api/customer_history/'
                        columns={this.state.columns}
                        columnExt={this.state.columnExt}
                        columnWidth={this.state.columnWidth}
                    />
                :''}
                {this.state.showtable==2?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Добавление записи в трудовую книжку</div>
                    </div>
                :''}
                {this.state.showtable==3?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Изменение записи в трудовой книжке</div>
                    </div>
                :''}
            </div>
        )
    }
}

export default Profile_history;