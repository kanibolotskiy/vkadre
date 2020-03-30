import React, { Component } from 'react';
import FlexigridItem from '../components/elements/FlexigridItem_item';
import Profile_table_edit from '../components/Profile_table_edit';

class Profile_table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateAction:this.props.stateAction,
            //columns_order:['date','record','base'],
            columns_sort:[{ columnName: 'id', direction: 'ASC' }],
        }
        this._editRecord = this._editRecord.bind(this)
        this.setAction = this.setAction.bind(this)
        this.clickRowData = this.clickRowData.bind(this)        

    }
    componentDidMount(){
        //console.log("ok")
        //console.log(this.props)
    }
    _editRecord(){
        //this.setState({showtable:3})
    }
    
    setAction(action){
        //console.log("action="+action)
        this.props.setAction(action)
    }
    
    
    clickRowData(rowData){
        if(!this.props.params["deniedEdit"]){
            this.props.setAction(3)
            this.setState({rowData})
        }
    }
    
    render() { 
        return (
            <div>                
                {this.props.stateAction==1?
                    <FlexigridItem 
                        customerID={this.props.customerID}
                        url={this.props.url}
                        columns={this.props.columns}
                        clickRowData={this.clickRowData}
                        //columns_order={this.state.columns_order}
                        //columns_sort={this.state.columns_sort}
                    />
                :''}
                {this.props.stateAction>1?
                    <Profile_table_edit 
                        action={this.props.stateAction}
                        rowData={this.state.rowData}
                        columns={this.props.columns}
                        params={this.props.params}
                        customerID={this.props.customerID}
                        url={this.props.url}
                        setAction={this.setAction}

                        //setAction={this.setAction}
                    />
                :''}
            </div>
        )
    }
}
/*
columnExt={this.state.columnExt}
columnWidth={this.state.columnWidth}

                {this.state.showtable==1?
                    <FlexigridItem/>
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
                
<FlexigridItem 
                
                        customerID={this.props.customerID} 
                        clickData={this._editRecord} 
                        url='/api/customer_history/'
                        columns={this.state.columns}
                        columnExt={this.state.columnExt}
                        columnWidth={this.state.columnWidth}
                    />

 */
export default Profile_table;