import React, { Component } from 'react';
import Confirm from '../elements/Confirm';
class Dictionary extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            //url_index:'/api/property_'+this.props.url,

            loading:false,
            deleteId:0,
            deleteKey:-1
            //dictionary: [],
            //dictionary_old: [],
            //dictionary_items:[]
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.keyFunction = this.keyFunction.bind(this)
        this._esc = this._esc.bind(this)
        this._save = this._save.bind(this)

        this.showConfirm = this.showConfirm.bind(this)
        this.setAnswer = this.setAnswer.bind(this)

        /*
        this.escMethod = this.escMethod.bind(this);
        this.enterMethod = this.enterMethod.bind(this);
        this.renderDictionary = this.renderDictionary.bind(this)
        */
    }

    showConfirm(){
        this.setState({"showConfirm":true})
    }
    setAnswer(answer){
        sessionStorage.setItem("key_action", "dictionary")
        if(answer){
            //Удаление записи
            //this.showConfirm(false)
            //Удаление записи
            let deleteid=this.state.newRecord[this.state.deleteKey].value

            fetch('/api/properties/'+this.props.url+'/'+deleteid, {
                method:'delete',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((data)=>{
                sessionStorage.setItem(this.props.url, JSON.stringify(data))
                data[data.length]={value:0,label:"",action:"add"}
                this.setState({oldRecord:JSON.stringify(data)})
                this.setState({newRecord:data})
            })
           
        }else{
            //this.setState({"showConfirm":false})
            //this.showConfirm(false)
        }
        this.setState({"showConfirm":false})
        
    }

    _save(){
        fetch('/api/properties/'+this.props.url, {
            method:'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newRecord)

        })
        .then(response => response.json())
        .then((data)=>{
            sessionStorage.setItem(this.props.url, JSON.stringify(data))
            data[data.length]={value:0,label:"",action:"add"}
            this.setState({oldRecord:JSON.stringify(data)})
            this.setState({newRecord:data})
        })
    }
    _esc(){
        //console.log("esc")
        let old_value=JSON.parse(this.state.oldRecord)
        //old_value[old_value.length]={value:0,name:"",action:"add"}
        this.setState({newRecord:old_value})
    }

    keyFunction(event){
        //console.log(sessionStorage.getItem("key_action"))
        if(sessionStorage.getItem("key_action")=="dictionary"){
            if(event.keyCode === 27) {  
                this._esc()
            }
            if(event.keyCode === 13) {
                this._save()
            }
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
    }

    componentDidMount() {
        sessionStorage.setItem("key_action", "dictionary")
        
        document.addEventListener("keydown", this.keyFunction, false);

        let url_index='/api/properties/'+this.props.url
        fetch(url_index)
            .then(response => response.json())
            .then((data)=>{
                //console.log(data)
                data[data.length]={value:0,label:"",action:"add"}

                this.setState({oldRecord:JSON.stringify(data)})
                this.setState({newRecord:data})
                this.setState({"loading":true})
            })
    } 

    delItem(key){
        
        let newRecord=this.state.newRecord
        //console.log()
        //deleteId
        //this.setState({deleteId:newRecord[key].value})
        this.setState({deleteKey:key})
        
        this.showConfirm(true)
/*
        newRecord.splice(key, 1); 
        this.setState({newRecord:newRecord})
*/        
    }

    handleChange(event,key){
        //console.log(key)
        
        let newRecord=this.state.newRecord
        console.log(key)
        if(newRecord[key].action=="add"){
            //data[key]={id:0,name:event.target.value}
            newRecord[key]={value:0,label:event.target.value,action:"added"}
            newRecord[key+1]={value:0,label:"",action:"add"}
        }else{
            newRecord[key].label=event.target.value
            //newRecord[key]={value:newRecord[key].value,label:event.target.value,action:"edited"}
        }
        this.setState({newRecord:newRecord})
        
    }
    render() { 
        const data_changed=(JSON.stringify(this.state.newRecord)===this.state.oldRecord);
        let records=[]
        const confirm=this.state.showConfirm?<Confirm setAnswer={this.setAnswer}/>:''

        if(this.state.loading){
            //console.log(this.state.newRecord)
            this.state.newRecord.map((item,key)=>{
                records.push(
                    <div className="property_item_row" key={key}>
                        <input 
                            placeholder={item.value?"":"Добавить значение"}
                            type="text" 
                            className="property_item" 
                            key={item.value} 
                            onChange={(event)=>this.handleChange(event,key)} 
                            value={item.label} 
                        />
                        {item.action!="add"?
                        <div className="del_dictionary_itm">
                            <span className="del_dictionary_itm_val" onClick={()=>this.delItem(key)}>Удалить</span>
                        </div>:''}
                    </div>
                )
            })
            
        }
            
        return (
            <div className="profile_info_dict">
                <div className="dictonary_caption">Настройки справочника "{this.props.caption}"</div>
                <div className="dictonary_outer">
                    {confirm}
                    <div className="profile_info_wrapper">
                        {records}
                    </div>
                    <div className="dictonary_buttons">
                
                        <div className="wrap_btns dictonary_buttons_info">
                            <div className="btn btn_esc" onClick={this._esc}>
                                {data_changed?'Выход':'Отменить'} (Esc)
                            </div>
                            <div className={"btn btn_enter "+(data_changed?'unactive':'')} onClick={this._save}>Сохранить (Enter)</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dictionary;