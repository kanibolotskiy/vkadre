import React, { Component } from 'react';
import FlexigridItem from '../components/elements/FlexigridItem_item';

class Profile_credits extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            showtable:1,
            columns:[
                { name: 'typeproperty_id', title: 'Тип' },
                { name: 'property', title: 'Имущество'},
                { name: 'summa', title: 'Стоимость' },
                { name: 'date', title: 'Дата приобретения' },
                { name: 'comment', title: 'Комментарий' }
            ],
            columnExt:[
                { columnName: 'typeproperty_id', align: 'left',width:100},
                { columnName: 'property', align: 'left',width:200},
                { columnName: 'summa', align: 'left',width:200},
                { columnName: 'date', align: 'left',width:200},
                { columnName: 'comment', align: 'left',width:200},
            ],
            columnWidth:[
                { columnName: 'typeproperty_id',width:100 },
                { columnName: 'property',width:100 },
                { columnName: 'summa',width:100 },
                { columnName: 'date',width:100 },
                { columnName: 'comment',width:100 },
            ]
        }
        this._editRecord = this._editRecord.bind(this)
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
                        url='/api/customer_property/'
                        columns={this.state.columns}
                        columnExt={this.state.columnExt}
                        columnWidth={this.state.columnWidth}
                    />
                :''}
                {this.state.showtable==2?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Добавление имущества</div>
                    </div>
                :''}
                {this.state.showtable==3?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Изменение имущества</div>
                    </div>
                :''}
            </div>
        )
    }
}

export default Profile_credits;