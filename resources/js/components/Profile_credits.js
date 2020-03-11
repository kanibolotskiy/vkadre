import React, { Component } from 'react';
import FlexigridItem from '../components/elements/FlexigridItem_item';

class Profile_credits extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            showtable:1,
            columns:[
                { name: 'typecredit', title: 'Тип' },
                { name: 'summa', title: 'Сумма'},
                { name: 'srok', title: 'Срок кредита' },
                { name: 'summa_month', title: 'Месячный платеж' },
                { name: 'date', title: 'Дата закрытия' }
            ],
            columnExt:[
                { columnName: 'typecredit', align: 'left',width:100},
                { columnName: 'summa', align: 'left',width:200},
                { columnName: 'srok', align: 'left',width:200},
                { columnName: 'summa_month', align: 'left',width:200},
                { columnName: 'date', align: 'left',width:200},
            ],
            columnWidth:[
                { columnName: 'typecredit',width:100 },
                { columnName: 'summa',width:100 },
                { columnName: 'srok',width:100 },
                { columnName: 'summa_month',width:100 },
                { columnName: 'date',width:100 },
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
                        url='/api/customer_kredit/'
                        columns={this.state.columns}
                        columnExt={this.state.columnExt}
                        columnWidth={this.state.columnWidth}
                    />
                :''}
                {this.state.showtable==2?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Добавление кредита</div>
                    </div>
                :''}
                {this.state.showtable==3?
                    <div className="profile_info_edit">
                        <div className="profile_info_edit_caption">Изменение кредита</div>
                    </div>
                :''}
            </div>
        )
    }
}

export default Profile_credits;