import React, { Component } from 'react';
import FlexigridItem from '../components/elements/FlexigridItem_item';

class Profile_med extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            showtable:1,
            columns:[
                { name: 'date', title: 'Дата внесения' },
                { name: 'memo', title: 'Заметка' },
            ],
            columnExt:[
                { columnName: 'date', align: 'left',width:100},
                { columnName: 'memo', align: 'left',width:200},
            ],
            columnWidth:[
                { columnName: 'date',width:100 },
                { columnName: 'memo',width:100 },
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
                        url='/api/customer_medical/'
                        columns={this.state.columns}
                        columnExt={this.state.columnExt}
                        columnWidth={this.state.columnWidth}
                    />
                :''}
                {this.state.showtable==2?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Добавление записи в мед. карту</div>
                    </div>
                :''}
                {this.state.showtable==3?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Изменение записи в мед. карте</div>
                    </div>
                :''}
            </div>
        )
    }
}

export default Profile_med;