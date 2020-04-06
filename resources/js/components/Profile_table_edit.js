import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea'
import DatePicker, { registerLocale } from 'react-datepicker'
import CurrencyInput from 'react-currency-input';
import CreatableSelect from 'react-select/creatable';

import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

import Highlighter from 'react-highlight-words';
import Confirm from '../components/elements/Confirm';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)


//let inputValue;
function formatOptionLabel ({label}, {inputValue}) {
    return (
      <Highlighter
        highlightClassName="HighlightClass"
        searchWords={[inputValue]}
        textToHighlight={label}
      />
    );
  }

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      //color: state.isSelected ? 'red' : 'blue',
      padding: "8px 10px",
      borderBottom:'1px solid #ddd'
    }),
    control: (provided, state) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        width: "100%",
        minHeight:30,
        borderRadius:0,
        borderWidth:1,
        padding:0,
        borderColor:"#ddd",
        boxShadow: "none"
    }),
    menu:(provided, state)=>({
        ...provided,
        zIndex:4,
        border:0,
        borderRadius:0,
    }),
    menuList:(provided, state)=>({
        ...provided,
        paddingTop:0,marginTop:0,paddingBottom:0,marginBottom:0
    }),
    dropdownIndicator:(provided, state)=>({
        ...provided,
        padding:5
    }),
    clearIndicator:(provided, state)=>({
        ...provided,
        padding:5
    }),
    
}
const promiseOptions = inputValue => {
    //if(inputValue){
        const url = `api/customers_select/${inputValue ? '?searchParam=' + inputValue : ''}`;
        return fetch(url)
             .then(response => response.json()) // my option list array?

    //}else{
    //    return []
    //}
};
class Profile_table_edit extends Component {
    constructor(props) {
        
        super(props);
        //Initialize the state in the constructor
        this.state = {
            newRecordDates:{},
            newRecord:{
                customer_id: this.props.customerID,
            },
            
            loging:false,
            errorRecord:{},
            filename:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeSelectAcync = this.handleChangeSelectAcync.bind(this)
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        

        this.addRecord = this.addRecord.bind(this)
        this._esc = this._esc.bind(this)
        this.addRecord_validate = this.addRecord_validate.bind(this)
        

        this.showConfirm = this.showConfirm.bind(this)
        this.setAnswer = this.setAnswer.bind(this)
    
        this.keyFunction = this.keyFunction.bind(this)
        this.setTableData = this.setTableData.bind(this)
        
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
    }
    keyFunction(event){
        if(sessionStorage.getItem("key_action")=="profile_table_edit"){
            if(event.keyCode === 27) {  
                this._esc()
            }
            if(event.keyCode === 13) {
                this.addRecord()
            }
        }
    }
    _esc(){
        const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));
        if(data_changed){//Выход наружу
            this.props.setAction(1)  
        }else{//Отмена изменений
            let oldRecord=this.state.oldRecord
            this.setState({newRecord:oldRecord})
            this.setTableData()
            if(this.fileInput!=undefined){
                this.fileInput.value = "";
                this.setState({filename:""})
            }

        }
    }

    setTableData(){
        let newRecord=this.state.newRecord
        let newRecordDates=this.state.newRecordDates
        
        let errorRecord=this.state.errorRecord
        for(let itm in this.props.columns){
            let elem=this.props.columns[itm]
            //Расставляем элементы для формы
            if(this.props.action==2){
                newRecord[elem.name]=""
                newRecord["files_list"]=[]
            }else{
                //console.log(elem.type)
                switch (elem.type){
                    case "selector":
                        newRecord[elem.name+"_id"]=this.props.rowData[elem.name+"_id"]
                        //console.log(newRecord)
                        //console.log("newRecord_id="+newRecord[elem.name+"_id"])
                    break;
                    case "date":
                        if(this.props.rowData[elem.name]){
                            let date_arr=this.props.rowData[elem.name].split("-");
                            let date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
                            
                            let date_str=date_value.getFullYear()+"."+(date_value.getMonth()+1)+"."+date_value.getDate();
                            newRecord[elem.name]=date_str
                            newRecordDates[elem.name]=date_value    
                        }
                    break;
                    case "double_date":
                        if(this.props.rowData[elem.name+"_from"]){
                            let date_arr=this.props.rowData[elem.name+"_from"].split("-");
                            let date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
                            
                            let date_str=date_value.getFullYear()+"."+(date_value.getMonth()+1)+"."+date_value.getDate();
                            newRecord[elem.name+"_from"]=date_str
                            newRecordDates[elem.name+"_from"]=date_value    
                        }
                        if(this.props.rowData[elem.name+"_to"]){
                            let date_arr=this.props.rowData[elem.name+"_to"].split("-");
                            let date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
                            
                            let date_str=date_value.getFullYear()+"."+(date_value.getMonth()+1)+"."+date_value.getDate();
                            newRecord[elem.name+"_to"]=date_str
                            newRecordDates[elem.name+"_to"]=date_value    
                        }
                        
                    break;
                    /*
                    case "files":
                        console.log(this.props.rowData)
                    break;
                    */
                    default:
                        newRecord[elem.name]=this.props.rowData[elem.name]?this.props.rowData[elem.name]:""
                }
            }
        }
        
        this.setState({newRecord:newRecord})
        this.setState({oldRecord:newRecord})
        this.setState(errorRecord)
        this.setState({"loading":true})
    }
    componentDidMount(){
        sessionStorage.setItem("key_action", "profile_table_edit")
        document.addEventListener("keydown", this.keyFunction, false);
        this.setTableData()
        
    }
    
    addRecord_validate(){
        //console.log(this.state.newRecord)
        
        let flag=true;
        let errorRecord=this.state.errorRecord
        for(let itm in this.props.columns){
            let elem=this.props.columns[itm];
            
            if(elem.required){
                switch (elem.type){
                    case "double_date":
                        if(!this.state.newRecord[elem.name+"_from"]){
                            flag=false
                            errorRecord[elem.name+"_from"]=true
                        }
                        if(!this.state.newRecord[elem.name+"_to"]){
                            flag=false
                            errorRecord[elem.name+"_to"]=true
                        }
                    break;
                    
                    case 'selector':
                        //console.log("!"+this.state.newRecord[elem.selector+"_id"]+"!")
                        if(!this.state.newRecord[elem.name+"_id"] && !this.state.newRecord[elem.name+"_name"]){
                            flag=false
                            errorRecord[elem.name]=true
                        }
                    break;
                    
                    default:
                        if(!this.state.newRecord[elem.name]){
                            flag=false
                            errorRecord[elem.name]=true
                        }
                    break;
                }   
            }
        }
        this.setState({errorRecord})
        return flag;
    }
    
    handleChangeFile(event){
        
        var input = document.querySelector('input[type="file"]')
        if(input){
            this.setState({
                newRecord:{
                    ...this.state.newRecord,
                    "file": input.files[0]
                }
            })
        }
        //console.log(input.files[0].name)
        this.setState({filename:input.files[0].name})
        
        console.log(this.state.newRecord)
        /*
        var data = new FormData()
        Object.keys(this.state.newRecord).map((item) => 
            //console.log(item+"="+this.state.newRecord[item])
            //data.append('file', input.files[0])
            data.append(item, this.state.newRecord[item])
        );
        
        var input = document.querySelector('input[type="file"]')
        data.append('file', input.files[0])
        //data.append('test',"test")

        fetch('api/test_upload', {
            method: 'POST',
            body: data
        })
        */
    }
    addRecord(){
        console.log(this.props)
        if(this.addRecord_validate()){
            let url_update='';
            let method='';
            if(this.props.action==2){   //Добавить новый
                url_update='api/'+this.props.url;
                method="post";
                var data = new FormData()
            }else{                      //Обновить
                url_update='api/'+this.props.url+"/"+this.props.rowData.id
                method="POST";
                
                var data = new FormData()
                data.append('_method', 'PUT')
            }
            
            /**--------------------------
            let uploadImage =  event.target.file;
            let form = new FormData()
            form.append('uploadImage',uploadImage)

            fetch(url_update, {
                method:method,
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: form,
            })
            .then(response => {
                return response.json();
            })
            /**--------------------------*/

            
            
            Object.keys(this.state.newRecord).map((item) => 
                //console.log(item+"="+this.state.newRecord[item])
                //data.append('file', input.files[0])
                data.append(item, this.state.newRecord[item])
            );
            
            var input = document.querySelector('input[type="file"]')
            if(input){
                //if(input.files[0]){
                    data.append('file', input.files[0])
                //}
            }

            fetch(url_update, {
                method:method,
                body: data
            })
            .then(response => {
                return response.json();
            })
            .then( data => {
                if(data.success){
                    let new_item=data["new_item"]
                    if(new_item){
                        let dictionary_name=data["new_item_dictionary"];
                        let dictionary_array=JSON.parse(sessionStorage.getItem(dictionary_name))
                        dictionary_array.push({value:new_item.id,label:new_item.name})
                        dictionary_array.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1);
                        sessionStorage.setItem(dictionary_name, JSON.stringify(dictionary_array))
                    }
                    this.props.setAction(1)
                }
            })
            /*
            fetch(url_update, {
                method:method,
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: data,
            })*/
            

            /*
            fetch(url_update, {
                method:method,
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                //body: JSON.stringify(this.state.newRecord)
                body: JSON.stringify(this.state.newRecord)
            })
            
            .then(response => {
                return response.json();
            })
            .then( data => {
                if(data.success){
                    let new_item=data["new_item"]
                    if(new_item){
                        let dictionary_name=data["new_item_dictionary"];
                        let dictionary_array=JSON.parse(sessionStorage.getItem(dictionary_name))
                        dictionary_array.push({value:new_item.id,label:new_item.name})
                        dictionary_array.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1);
                        sessionStorage.setItem(dictionary_name, JSON.stringify(dictionary_array))
                    }
                    this.props.setAction(1)
                }
            })
            */
            
        }
    }
    handleChangeDate(name,value){
        let date = new Date(value);
        let month=date.getMonth()+1;
        //if(month<10){month="0"+month;}
        //let date_str=date.getFullYear()+"."+month+"-"+date.getDate();
        //let date_str=date.getFullYear()+"."+month+"."+date.getDate();
        let date_str=date.getFullYear()+"."+month+"."+date.getDate();

        let newRecord=this.state.newRecord
        let newRecordDates=this.state.newRecordDates
        let errorRecord=this.state.errorRecord

        //newRecord[name]=date_str
        //newRecordDates[name]=value
        errorRecord[name]=false

        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: date_str
            }
        })
        this.setState({
            newRecordDates:{
                ...this.state.newRecordDates,
                [name]: value
            }
        })

        //this.setState({newRecord})
        //this.setState({newRecordDates})
        this.setState({errorRecord})
    }
    handleChange(event){
        const target = event.target;
        
        let errorRecord=this.state.errorRecord
        errorRecord[target.name]=false

        //let newRecord=this.state.newRecord
        //newRecord[target.name]=target.value
        //this.setState({newRecord})
        this.setState({errorRecord})

        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [target.name]: target.value
            }
        })

        //console.log(this.state)
    }
    handleChangeCurrency(name, value){
        //console.log(event)
        //let newRecord=this.state.newRecord
        let errorRecord=this.state.errorRecord
        errorRecord[name]=false
        this.setState({errorRecord})

        //newRecord[name]=value        
        //this.setState({newRecord})
        
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: value
            }
        })

    }
    handleChangeSelectAcync(newValue, actionMeta){
        let new_value=null
        let select_value_id=null
        let select_value_name=null

        //console.log(newValue)
        //console.log(actionMeta)
        
        switch (actionMeta.action){
            case "select-option":
                select_value_id=newValue.value
                select_value_name=newValue.label
            break;
            /*case "create-option":
                select_value_name=newValue.value
            break;
            */
            case "clear":
            break;
            default:
        }
        //console.log(actionMeta.name+"="+select_value_id+"="+select_value_name)
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [actionMeta.name+"_id"]: select_value_id,
                [actionMeta.name]: select_value_name
            }
        })
    }
    handleChangeSelect(newValue, actionMeta){
        let new_value=null
        //let newRecord=this.state.newRecord
        let errorRecord=this.state.errorRecord

        let select_value_id=null
        let select_value_name=null

        switch (actionMeta.action){
            case "select-option":
                select_value_id=newValue.value
                errorRecord[actionMeta.name]=false
            break;
            case "create-option":
                select_value_name=newValue.value
                errorRecord[actionMeta.name]=false
            break;
            case "clear":
    
            break;
            default:
        }
        //this.setState({newRecord})
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [actionMeta.name+"_id"]: select_value_id,
                [actionMeta.name+"_name"]: select_value_name
            }
        })
        this.setState({errorRecord})
    }
    options(selector){
        let dictionart_array=[];
        if(sessionStorage.getItem(selector)){
            dictionart_array=JSON.parse(sessionStorage.getItem(selector))
        }
        return dictionart_array
    }
    
    showConfirm(){
        this.setState({"showConfirm":true})
    }

    setAnswer(answer){
        sessionStorage.setItem("key_action", "profile_table_edit")
        if(answer){
            //Удаление записи
            fetch('api/'+this.props.url+"/"+this.props.rowData.id, {
                method:'delete',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                this.props.setAction(1)
                this.setState({"showConfirm":false})
            })
        }else{
            this.setState({"showConfirm":false})
        }
    }
    renderSwitch(item) {
        //console.log("action="+this.props.action)
        //console.log(this.props.params)
        switch(item.type) {
            case 'date':
                return <div className="wrp_itm_input">
                <div className="itm_caption">{item.title}</div>
                <DatePicker selected={this.state.newRecordDates[item.name]} className={(this.state.errorRecord[item.name]?"_error":"")} locale="ru" dateFormat="dd.MM.yyyy" onChange={(value)=>this.handleChangeDate(item.name,value)} />
            </div>
            case 'double_date':
                return <div className="wrp_itm_input">
                    <div className="wrp_itm_input_col">
                        <div className="itm_caption">{item.title_from}</div>
                        <DatePicker className={(this.state.errorRecord[item.name+"_from"]?"_error":"")} locale="ru" dateFormat="dd.MM.yyyy" selected={this.state.newRecordDates[item.name+"_from"]} onChange={(value)=>this.handleChangeDate(item.name+"_from",value)} />
                    </div>
                    <div className="wrp_itm_input_devider">-</div>
                    <div className="wrp_itm_input_col">
                        <div className="itm_caption">{item.title_to}</div>
                        <DatePicker className={(this.state.errorRecord[item.name+"_to"]?"_error":"")} locale="ru" dateFormat="dd.MM.yyyy" selected={this.state.newRecordDates[item.name+"_to"]} onChange={(value)=>this.handleChangeDate(item.name+"_to",value)} />                
                    </div>
                </div>
            case 'textarea':
                return <div className="wrp_itm_input">
                <div className="itm_caption">{item.title}</div>
                <TextareaAutosize name={item.name} className={"itm_textarea "+(this.state.errorRecord[item.name]?"_error":"")} value={this.state.newRecord[item.name]} onChange={this.handleChange}/>
            </div>
            case 'text':
                return <div className="wrp_itm_input">
                <div className="itm_caption">{item.title}</div>
                <input name={item.name} className={"itm_input "+(this.state.errorRecord[item.name]?"_error":"")} value={this.state.newRecord[item.name]} onChange={this.handleChange}/>
            </div>
            case 'currency':
                return <div className="wrp_itm_input">
                    <div className="itm_caption">{item.title}</div>
                    <CurrencyInput value={this.state.newRecord[item.name]} name={item.name} className={"itm_input "+(this.state.errorRecord[item.name]?"_error":"")}  precision={0} thousandSeparator={' '} allowEmpty={true} suffix={' Р'} 
                        onChange={(value)=>this.handleChangeCurrency(item.name,value)}
                    />
                </div>
            case 'selector':
                return <div className="wrp_itm_input">
                    <div className="itm_caption">{item.title}</div>
                    <CreatableSelect 
                        name={item.name}
                        
                        value={
                            this.options(item.name).find(op => {
                                return op.value === this.state.newRecord[item.name+"_id"]
                            })}
                        /*value={this.state.newRecord[item.name+"_id"]?
                            this.options(item.name).find(op => {
                                return op.value === this.state.newRecord[item.name+"_id"]
                            }):null}
                        */
                            
                        className={"itm_selector "+(this.state.errorRecord[item.name]?"_error":"")}
                        cacheOptions
                        defaultOptions
                        options={this.options(item.name)}
                        formatOptionLabel={formatOptionLabel}
                        styles={customStyles}
                        isClearable
                        onChange={this.handleChangeSelect}
                        placeholder={" - выберите - "}
                        formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                    />
                    
                </div>
            case 'selector_customer':
                return <div className="wrp_itm_input">
                    <div className="itm_caption">{item.title}</div>
                    <AsyncSelect
                        name={item.name}
                        className={"itm_selector "+(this.state.errorRecord[item.name]?"_error":"")}
                        value={{value:this.state.newRecord[item.name+"_id"],label:this.state.newRecord[item.name]}}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        placeholder={" - введите - "}
                        isClearable
                        cacheOptions
                        loadOptions={promiseOptions}
                        defaultOptions
                        //onInputChange={this.handleInputChange}
                        //onChange={this.handleChangeSelect}
                        onChange={this.handleChangeSelectAcync}
                    />
                    
                    
                </div>
            case 'files':
                var filelist=[]
                //if(this.props.rowData["files_list"]!=undefined){
                //if(typeof this.props.rowData["files_list"] !== "undefined"){
                    /*
                if(this.props.rowData.hasOwnProperty("files_list")){

                Object.keys(this.props.rowData.files_list).map((item) => 
                    filelist.push(
                    <div className="file_row">
                        <div className="file_row_caption">
                            <a href="{item.file_path}" >{item.file_name}</a>
                        </div>
                        <div className="file_row_del">Удалить</div>
                    </div>
                    )
                );
                    }
                    */
                var filelist=[]
                if(this.props.rowData){
                    if(this.props.rowData["files_list"]){
                        Object.keys(this.props.rowData.files_list).map((item) => 
                            //console.log(this.props.rowData.files_list[item])
                            //console.log(key)
                            
                            filelist.push(
                            <div className="file_row" key={item}>
                                <div className="file_row_caption">
                                    <a href={this.props.rowData.files_list[item].file_path} >{this.props.rowData.files_list[item].file_name}</a>
                                </div>
                                <div className="file_row_del">Удалить</div>
                            </div>
                            )
                            
                        )
                    }

                }
                //console.log(this.props.rowData)
                //if(!("files_list" in this.props.rowData)){
                    //console.log(this.props.rowData["files_list"])
                //}
                /*
                Object.keys(this.props.rowData.files_list).map((item) => 
                    console.log(item)
                )
                */
                return <div className="wrp_itm_input">
                    <div className="itm_caption">{item.title}</div>
                    <div className="wrp_files_list">
                        <div className="files_list">                      
                            {filelist}
                        </div>
                        <div className="wrp_inputfile">
                            <input className="inputfile" type="file" name="file" id="file" onChange={this.handleChangeFile} ref={ref => this.fileInput = ref}/>
                            <label for="file">Прикрепить файл...</label>
                            <div className="filename">{this.state.filename}</div>
                        </div>
                    </div>
                    
                </div>
            default:
                return '_error';
            
        }
    
      }
    render() {
        var form_items='';
        if(this.state.loading){
            form_items = 
                this.props.columns.map((item, key) =>
                <div className="frm_row" key={key}>
                    {this.renderSwitch(item)}
                </div>)
        }
        
        const caption=this.props.action==2?this.props.params.captionAdd:this.props.params.captionEdit
        const captionButton=this.props.action==2?this.props.params.captionAddButton:this.props.params.captionEditButton
        const deleteButton=this.props.action==3?<div  onClick={this.showConfirm} className="deleteRow">Удалить</div>:''
        const confirm=this.state.showConfirm?<Confirm setAnswer={this.setAnswer}/>:''

        const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));

        return (
            <div className="profile_info_edit">
                {confirm}
                <div className="wrp_profile_info_caption">
                    <div className="profile_info_caption">{caption}</div>
                    {deleteButton}
                </div>
                {form_items}
                
                <div className="wrap_btns">
                    <div className="btn btn_esc" onClick={this._esc}>
                        {data_changed?'Выход':'Отменить'} (Esc)
                    </div>
                    <div className={"btn btn_enter "+(data_changed?'unactive':'')} onClick={this.addRecord}>{captionButton} (Enter)</div>
                </div>
            </div>
        )
    }
}

export default Profile_table_edit;