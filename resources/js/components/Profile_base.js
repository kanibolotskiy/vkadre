import React, { Component } from 'react';
import styles from '../styles/style.css';
import Loader from './elements/Loader';
import Suggestion_item from './elements/Suggestion_item';
//import Autocomplete  from 'react-autocomplete';

//import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Highlighter from 'react-highlight-words';

import PhoneInput from 'react-phone-input-2'
import * as moment from 'moment';

import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)


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

  
class Profile_base extends Component {
    constructor(props) {
        super(props);
        //Initialize the state in the constructor
        this.state = {
            loading:true,
            /*
            data:{
                name:"",
                surname:"",
            },
            */
            newRecordDatesName:[],
            newRecordDates:[],
            customerID:-1,
            //address_reg_line:[],
            address_lines:[],
            suggestions: [],
            zoom:false,
            //suggest:[]
            //data: getDataProfile(),
            //rows:setRows
        }
        this._updateInput = this._updateInput.bind(this);
        this._updateInputName = this._updateInputName.bind(this);
        this._delPhoto = this._delPhoto.bind(this);
        this.zoomPhoto = this.zoomPhoto.bind(this);
        

        this._updateAddress = this._updateAddress.bind(this);
        /*
        this.choiseAddress = this.choiseAddress.bind(this);
        this._addressBlur = this._addressBlur.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        */
        this._updateSelect = this._updateSelect.bind(this);

        this.setTableData = this.setTableData.bind(this);

        this.keyFunction = this.keyFunction.bind(this)
        this._enter = this._enter.bind(this);
        this._esc = this._esc.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        
        
        //this._loadTableData = this._loadTableData.bind(this);
        

    }

    zoomPhoto(flag){
        if(flag){
            if(this.state.newRecord.photo){
                this.setState({zoom:flag})
            }
        }else{
            this.setState({zoom:false})
        }
        
        //console.log(flag)
    }
    options(selector){
        let dictionart_array=[];
        if(sessionStorage.getItem(selector)){
            dictionart_array=JSON.parse(sessionStorage.getItem(selector))
        }
        return dictionart_array
    }
    componentDidUpdate() {
        //console.log(this.props.customerData)
        //console.log(this.state.customerID+"="+this.props.customerData.id)
        if(this.state.customerID!=this.props.customerData.id){
            
            //this.setState({newRecord:this.props.customerData})
            //this.setState({oldRecord:this.props.customerData})
            this.setState({customerID:this.props.customerData.id})
            this.setTableData(this.props.customerData)

        }
        /*
        if (prevProps.customerID !== this.props.customerData.customerID) {
            console.log(this.props.customerData)    
          //this.updateAndNotify();
        }
        */
    }
    componentDidMount() {
        //console.log(this.props.customerData)
        //this.setState({newRecord:this.props.customerData})
        //this.setState({oldRecord:this.props.customerData})
        //this.setState({data:this.props.customerData})
        
        sessionStorage.setItem("key_action", "profile_base")
        document.addEventListener("keydown", this.keyFunction, false);
        this.setState({customerID:this.props.customerData.id})
        this.setTableData(this.props.customerData)
        
        //this.setState({loading:false})

        //this.setState({data:this.props.customerData})
        //this.setState({customerID:this.props.customerData.customerID})
        //this.setState({loading:false})
        /*
        this._loadAsyncData(this.props.customerID);
        sessionStorage.setItem("key_action", "profile_base")
        
        */
    }
    keyFunction(event){
        if(sessionStorage.getItem("key_action")=="profile_base"){
            if(event.keyCode === 27) {  
                this._esc()
            }
            if(event.keyCode === 13) {
                this._enter()
            }
        }
    }
    _esc(){
        if(this.state.zoom){
           this.setState({zoom:false}) 
        }else{   
            const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));
            //console.log(data_changed)
            if(data_changed){//Выход наружу
                //this.props.setAction(1) 
                document.removeEventListener("keydown", this.keyFunction, false); 
                this.props.closeInfo()

            }else{//Отмена изменений
                //let data=this.state.oldRecord
                //this.setState({data:data})
                //console.log(data)
                this.setTableData(this.state.oldRecord)
                if(this.fileInput!=undefined){
                    this.fileInput.value = "";
                    this.setState({filename:""})
                }
                //console.log(this.state)
            }
        }
    }
    _enter(){
        let url_update='';
        let method='';
        
        if(this.props.customerID==undefined){   //Добавить новый
            //url_update='api/'+this.props.url;
            console.log("добавить новый")
            var fetch_url='/api/customers_add'
            
            method="POST";
            var data = new FormData()
        }else{                      //Обновить
            //url_update='api/'+this.props.url+"/"+this.props.rowData.id
            var fetch_url='/api/customers/'+this.state.customerID

            method="POST";
            
            var data = new FormData()
            data.append('_method', 'PUT')
        }
        
        Object.keys(this.state.newRecord).map((item) => {
            if(this.state.newRecord[item]){
                data.append(item, this.state.newRecord[item])
            }
        }
            //console.log(item+"="+this.state.newRecord[item])
            //data.append('file', input.files[0])
            //data.append(item, this.state.newRecord[item])
        );
        
        var input = document.querySelector('input[type="file"]')
        if(input){
            data.append('file', input.files[0])
        }
        console.log("method="+method)
        fetch(fetch_url, {
            method:method,
            body: data
        })
        .then(response => response.json())
            .then((response)=>{
                if(response.success){
                    
                    Object.keys(response["dictionaries"]).map((item) => 
                        sessionStorage.setItem(item, JSON.stringify(response["dictionaries"][item]))
                    );
                    this.setTableData(this.state.newRecord)
                    this.props.updateTable()
                }
            })
        
        /*
        var method="PUT"
        var fetch_url='/api/customers/'+this.state.customerID
        if(!this.state.newRecord.id){
            method="POST"
            fetch_url='/api/customers/'
        }
        fetch(fetch_url, {
                method: method,
                body: JSON.stringify(this.state.newRecord),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((response)=>{
                if(response.success){
                    
                    Object.keys(response["dictionaries"]).map((item) => 
                        sessionStorage.setItem(item, JSON.stringify(response["dictionaries"][item]))
                    );
                    this.setTableData(this.state.newRecord)
                    this.props.updateTable()
                }
            })
        */
    }

    /*
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.customerID !== this.props.customerID) {
            this.setState({loading: true});
            this._loadAsyncData(nextProps.customerID);
        }
    }
    */

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyFunction, false);
        /*
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
        */
    }
    /*
    _loadAsyncData(customerID) {
        //console.log(this.props)
        //console.log(customerID)
        
        fetch('/api/customers/'+customerID)
            .then(response => response.json())
            .then((response)=>{
                this.setState({data:response})
                this.setTableData()
            })    
        
    }
    */
    
    /*-----------------------------------------------------------------------------*/
    declOfNum(number, titles)
    {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    setTableData(data){
        
        //let data=this.state.data
        //console.log(data)

        let newRecordDates=[]
        let newRecordDatesName=[]

        let date_column=["dob","passport_date"];

        var a = moment();        
        for(let i in date_column){
            var column_name=date_column[i]
            if(data[column_name]){
                var date_arr=data[column_name].split("-");
                var date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
            
                var b = moment([date_arr[0], date_arr[1], date_arr[2]]);
                var f_years = a.diff(b, 'year');

                newRecordDates[column_name]=date_value
                newRecordDatesName[column_name]="("+f_years+" "+this.declOfNum(f_years,["год","года","лет"])+")";
            }
        }

        this.setState({oldRecord:data})
        this.setState({newRecord:data})

        this.setState({newRecordDates:newRecordDates})
        this.setState({newRecordDatesName:newRecordDatesName})

        this.setState({loading:false})
    }
    _updateInput(event){
        const target = event.target;
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [target.name]: target.value
            }
        })
    }
    _updateData(name,value){
        //console.log(name+"="+value)

        let date = new Date(value);
        //var date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
        var a = moment();   
        var b = moment(date);
        var b_formatted=b.format("YYYY-MM-DD")
        //console.log(b_formatted)
        var f_years = a.diff(b, 'year');
        //console.log(f_years)

        //let date_str=b.format('DD.MM.YYYY')+" ("+f_years+" "+this.declOfNum(f_years,["год","года","лет"])+")";
        let date_str="("+f_years+" "+this.declOfNum(f_years,["год","года","лет"])+")";

        
        this.setState({
            newRecordDatesName:{
                ...this.state.newRecordDatesName,
                [name]: date_str
            }
        })
        this.setState({
            newRecordDates:{
                ...this.state.newRecordDates,
                [name]: date
            }
        })
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: b_formatted
            }
        })
    }

    _updateInputName(name,value){
        //console.log(name+"="+value)
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: value
            }
        })
    }
    _delPhoto(){
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                photo: null
            }
        })
    }

    _updateAddress(name,item){
        
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: item.value,
                ["index_"+name]: item.data.postal_code?item.data.postal_code:""
                //address_reg:"test",
                //index_address_reg:"test",
                //item.value
            }
        })
    }
   
    _updateSelect(newValue, actionMeta){
        let new_value=null
        let newRecord=this.state.newRecord
        //let errorRecord=this.state.errorRecord
        let select_id=null
        let select_name=null

        switch (actionMeta.action){
            case "select-option":
                select_id=newValue.value
                //newRecord[actionMeta.name+"_id"]=newValue.value
                //newRecord[actionMeta.name+"_name"]=null
                //errorRecord[actionMeta.name]=false
            break;
            case "create-option":
                select_name=newValue.value
                //newRecord[actionMeta.name+"_id"]=null
                //newRecord[actionMeta.name+"_name"]=newValue.value
                //errorRecord[actionMeta.name]=false
            break;
            case "clear":
                //newRecord[actionMeta.name+"_id"]=null
                //newRecord[actionMeta.name+"_name"]=null
            break;
            default:
        }

        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [actionMeta.name+"_id"]:select_id,
                [actionMeta.name+"_name"]:select_name,
            }
        })
        //console.log(this.state.newRecord)
        //this.setState({newRecord})
        //this.setState({errorRecord})
    }
    
    
    /**/
    
/**
 * defaultValue={this.options("martial").find(op => {
                                        console.log(op.value+"="+this.state.newRecord["martial"])
                                        return op.value === this.state.newRecord["martial"]
                                    })}

 */

    handleChangeFile(event){
        var input = document.querySelector('input[type="file"]')
        var tmppath = URL.createObjectURL(event.target.files[0]);
        //newRecord.photo

        //console.log()
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                photo:tmppath,
            }
        })
        console.log(input.files[0].name)
    }

    
    render() { 
        const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));            
        let data_address_lines=[]
        
        //console.log(this.state.address_lines)
        if(this.state.address_lines.key_address){
            data_address_lines[this.state.address_lines.key_address]=this.state.address_lines.data_address.map((item,key)=>
                <div key={key} className="address_hint_line" onClick={()=>this.choiseAddress(key)}>{item.value}</div>
            )
        }
        
        //console.log("ok")
        /*
        if(this.state.customerID!=this.props.customerID){
            //this.setState({customerID:this.props.customerID})
            this._loadTableData(this.props.customerData)
            //console.log(this.props)
            //this._loadAsyncData(this.props.customerID)
            //this.setState({customerID:this.props.customerID})
        }
        */

        //let profile_info=!this.state.loading?

        let profile_info=''
        if(!this.state.loading){
            profile_info=
            <div>    
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Фамилия</div>
                            <input 
                                autoComplete="new-password" 
                                value={this.state.newRecord.surname?this.state.newRecord.surname:""} 
                                name="surname" 
                                onChange={this._updateInput} type="text" className="itm_input"/>
                        </div>
                        
                    </div>

                    <div className="col">
                        
                        <div className={"profilePhoto "+(this.state.zoom?'active':'')} 
onClick={()=>this.zoomPhoto(true)} 
style={{backgroundImage:this.state.newRecord.photo?`url(${this.state.newRecord.photo})`:``}}>                            
                        </div>
                        {this.state.zoom?
                            <div onClick={()=>this.zoomPhoto(false)} className="profilePhoto_close">X</div>
                        :''}
                        <div className="profilePhoto_captions">
<div className="profilePhoto_add">
    <input accept="image/*" className="inputfile" type="file" name="file" id="file" onChange={this.handleChangeFile} ref={ref => this.fileInput = ref}/>
    <label htmlFor="file">{this.state.newRecord.photo?'Изменить фото':'Добавить фото'}</label>

</div>

                            {this.state.newRecord.photo?
                            <div onClick={this._delPhoto} className="profilePhoto_edit">Удалить</div>
                            :''}
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Имя</div>
                            <input 
                                value={this.state.newRecord.name?this.state.newRecord.name:""} 
                                name="name" 
                                onChange={this._updateInput} 
                                type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Отчество</div>
                            <input 
                                value={this.state.newRecord.patronymic?this.state.newRecord.patronymic:""} 
                                name="patronymic" onChange={this._updateInput} type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">ID</div>
                            <input type="text" className="itm_input itm_input_disabled" readOnly value={this.state.newRecord.id}/>
                        </div>
                    </div>
                    <div className="col"></div><div className="col"></div>
                </div>
                
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Мобильный телефон</div>
                            
                            <PhoneInput
                                inputClass="itm_input"
                                country={'ru'}
                                
                                value={this.state.newRecord.mobphone?this.state.newRecord.mobphone:""}
                                onChange={(phone)=>this._updateInputName("mobphone",phone)}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Телефон</div>
                            <PhoneInput
                                inputClass="itm_input"
                                country={'ru'}
                                
                                value={this.state.newRecord.phone?this.state.newRecord.phone:""}
                                onChange={(phone)=>this._updateInputName("phone",phone)}
                            />
                        </div>
                    </div>
                    <div className="col"></div>
                </div>


                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дата рождения</div>
<DatePicker
    locale="ru" dateFormat="dd.MM.yyyy"
    selected={this.state.newRecordDates["dob"]}
    //value={this.state.newRecordDatesName["dob"]}
    name="dob"
    onChange={(value)=>this._updateData("dob",value)}
/>
<div className="year_hint">{this.state.newRecordDatesName["dob"]}</div>

                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Семейное положение</div>
                            <CreatableSelect 
                                name="martial"

                                value={
this.options("martial").find(op => {
    return op.value === this.state.newRecord["martial_id"]
})}
                                /*
                                value={
                                this.options("martial").find(op => {
                                    return op.value === this.state.newRecord["martial_id"]
                                })}
                                */


                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("martial")}
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                isClearable
                                onChange={this._updateSelect}
                                placeholder={" - выберите - "}
                                formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Пол</div>
                            <CreatableSelect 
                                name="gender"

                                value={
                                this.options("gender").find(op => {
                                    return op.value === this.state.newRecord["gender_id"]
                                })}
                                
                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("gender")}
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                isClearable
                                onChange={this._updateSelect}
                                placeholder={" - выберите - "}
                                formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Адрес регистрации</div>
                            <Suggestion_item 
                                value={this.state.newRecord.address_reg?this.state.newRecord.address_reg:""} 
                                onSelect={this._updateAddress} 
                                onChange={this._updateInputName} 
                                name="address_reg" 
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Индекс адреса регистрации</div>
                            <input type="text" className="itm_input" 
                                autoComplete="new-password"
                                value={this.state.newRecord.index_address_reg?this.state.newRecord.index_address_reg:""} 
                                name="index_address_reg" 
                                onChange={this._updateInput} 
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Адрес проживания</div>
                            <Suggestion_item 
                                value={this.state.newRecord.address_res?this.state.newRecord.address_res:""} 
                                onSelect={this._updateAddress} 
                                onChange={this._updateInputName} 
                                name="address_res" 
                            />
                        </div>
                        
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Индекс адреса проживания</div>
                            <input type="text" className="itm_input" 
                                autoComplete="new-password"
                                value={this.state.newRecord.index_address_res?this.state.newRecord.index_address_res:""} 
                                name="index_address_res" 
                                onChange={this._updateInput} 
                            />

                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Серия и номер паспорта</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.passport_number?this.state.newRecord.passport_number:""} 
                                name="passport_number" 
                                onChange={this._updateInput} 
                                //defaultValue={this.state.data.passport_number}
                            />
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Кем выдан</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.passport_issuedby?this.state.newRecord.passport_issuedby:""} 
                                name="passport_issuedby" 
                                onChange={this._updateInput} 
                                //defaultValue={this.state.data.passport_issuedby}
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дата выдачи</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["passport_date"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="passport_date"
                                onChange={(value)=>this._updateData("passport_date",value)}
                            />
                            
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Место рождения</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.bpl?this.state.newRecord.bpl:""} 
                                name="bpl" 
                                onChange={this._updateInput} 
                                //defaultValue={this.state.data.bpl}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">ИНН налогоплательщика</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.inn?this.state.newRecord.inn:""} 
                                name="inn" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.inn}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">№ страхового свидетельства</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.insurance_number?this.state.newRecord.insurance_number:""} 
                                name="insurance_number" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.insurance_number}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">№ медицинского полюса</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.medical_number?this.state.newRecord.medical_number:""} 
                                name="medical_number" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.medical_number}
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Образование</div>
                            <CreatableSelect 
                                name="education"
                                
                                value={this.options("education").find(op => {
                                    //console.log(this.state.newRecord)
                                    return op.value === this.state.newRecord["education_id"]
                                })}
                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("education")}
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                isClearable
                                onChange={this._updateSelect}
                                placeholder={" - выберите - "}
                                formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Название учебного учреждения</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.education_cap?this.state.newRecord.education_cap:""} 
                                name="education_cap" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.education_name}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Специальность</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.education_speciality?this.state.newRecord.education_speciality:""} 
                                name="education_speciality" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.education_speciality}
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Статус</div>
                            <CreatableSelect 
                                name="status"

                                value={
                                this.options("status").find(op => {
                                    return op.value === this.state.newRecord["status_id"]
                                })}

                                
                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("status")}
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                isClearable
                                onChange={this._updateSelect}
                                placeholder={" - выберите - "}
                                formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Номер военного билета</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.military_number?this.state.newRecord.military_number:""} 
                                name="military_number" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.military_number}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Место прохождение службы</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.military_place?this.state.newRecord.military_place:""} 
                                name="military_place" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.military_place}
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Судимость</div>
                            <CreatableSelect 
                                name="criminal"

                                value={
                                this.options("criminal").find(op => {
                                    return op.value === this.state.newRecord["criminal_id"]
                                })}
                                

                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("criminal")}
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                isClearable
                                onChange={this._updateSelect}
                                placeholder={" - выберите - "}
                                formatCreateLabel={userInput => `Создать: "${userInput}"`}                        
                            />
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Статья и срок</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.criminal_desc?this.state.newRecord.criminal_desc:""} 
                                name="criminal_desc" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.criminal_desc}
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col3">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Характеристика</div>
                            <textarea className="itm_textarea" 
                                value={this.state.newRecord.characteristic?this.state.newRecord.characteristic:""} 
                                name="characteristic" 
                                onChange={this._updateInput}
                                //defaultValue={this.state.data.characteristic}
                            ></textarea>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="tab_block_btns">
                <div className="wrap_btns">
                    <div className="btn btn_esc" onClick={this._esc}>
                        {data_changed?'Выход':'Отменить'} (Esc)
                    </div>
                    <div className={"btn btn_enter "+(data_changed?'unactive':'')} onClick={this._enter}>Сохранить (Enter)</div>-
                </div>
            </div>
        </div>
        }
        /*
        let profile_info_=
        
        */

        return (
            <div className="profile_info">
                <Loader loading={this.state.loading} />
                {profile_info}
            </div>
        )
    }
}

export default Profile_base;