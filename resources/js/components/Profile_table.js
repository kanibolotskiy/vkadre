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
                <div style={{display: this.props.stateAction==1 ? 'block' : 'none' }}>
                    <FlexigridItem 
                        customerID={this.props.customerID}
                        url={this.props.url}
                        columns={this.props.columns}
                        clickRowData={this.clickRowData}
                        //columns_order={this.state.columns_order}
                        //columns_sort={this.state.columns_sort}
                    />
                </div>
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

export default Profile_table;