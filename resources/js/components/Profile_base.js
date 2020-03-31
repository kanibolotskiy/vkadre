import React, { Component } from 'react';
import styles from '../styles/style.css';
import Loader from './elements/Loader.js';
//import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Highlighter from 'react-highlight-words';
import Autosuggest from 'react-autosuggest';
import PhoneInput from 'react-phone-input-2'

import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

// Imagine you have a list of languages that you'd like to autosuggest.
const getSuggestionValue = (suggestion) => suggestion.name
const renderSuggestion = (suggestion) => (<span>{suggestion.name}</span>)
  
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



  const ExampleCustomInput = ({ value, onClick }) => (
    <input  type="text" className="itm_input" onClick={onClick} />

    /*
    defaultValue={this.state.data.patronymic}
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
    */
  );
  
class Profile_base extends Component {
    constructor(props) {
        super(props);
        //Initialize the state in the constructor
        this.state = {
            loading:true,
            data:[],
            customerID:0,
            //address_reg_line:[],
            address_lines:[],
            suggestions: []
            //data: getDataProfile(),
            //rows:setRows
        }
        this._updateInput = this._updateInput.bind(this);
        
        this._updateAddress = this._updateAddress.bind(this);
        /*
        this.choiseAddress = this.choiseAddress.bind(this);
        this._addressBlur = this._addressBlur.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        */
        this._updateSelect = this._updateSelect.bind(this);

        
        
        this._enter = this._enter.bind(this);
        this._esc = this._esc.bind(this);

        /*
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        */

    }

    /*
    onChange (event, { newValue, method }) {
    //onChange = (event, { newValue, method }) => {    
        this.setState({ value: newValue });
    }
      
    onSuggestionsFetchRequested  ({ value }) {
    fetch(`https://swapi.co/api/people/?search=${value}`)
        .then(response => response.json())
        .then(data => this.setState({ suggestions: data.results }))
    }

    onSuggestionsClearRequested ()  {
        this.setState({ suggestions: [] });
    };
    */


    options(selector){
        let dictionart_array=[];
        if(sessionStorage.getItem(selector)){
            dictionart_array=JSON.parse(sessionStorage.getItem(selector))
        }
        return dictionart_array
    }
    componentDidMount() {
        this._loadAsyncData(this.props.customerID);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.customerID !== this.props.customerID) {
            this.setState({loading: true});
            this._loadAsyncData(nextProps.customerID);
        }
    }
    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    _loadAsyncData(customerID) {
        //console.log("fetch")
        fetch('/api/customers/'+customerID)
            .then(response => response.json())
            .then((response)=>{
                
                this.setState({oldRecord:response})
                this.setState({newRecord:response})
                
                this.setState({loading:false})
                //console.log(this.state.newRecord["martial_id"])
            })
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

    _updateAddress(event){
        const target = event.target;

        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [target.name]: target.value,
            }
        })
        /*
        let newRecord=this.state.newRecord
        newRecord[target.name]=target.value
        this.setState({newRecord})
        //console.log(target.name)
    */
        
        fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            body: JSON.stringify({ "query": target.value, "count": 10 }),
            headers: {
                'Authorization': 'Token 3bfe37ae8dd1e98a6ea74382d7b263fca50a58b2', 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then((data)=>{
            let lines_name=target.name+"_line"
            //this.setState({[lines_name]:data.suggestions})

            this.setState({
                address_lines:{
                    ...this.state.address_lines,
                    key_address:lines_name,
                    data_address:data.suggestions,

                    //[lines_name]: data.suggestions,
                }
            })
            //address_lines[]
        })
        //console.log(this.state)
    }
    /*
    choiseAddress(key){
        console.log(key)
        let address_arr=this.state.address_lines.data_address
        let address_itm=address_arr[key]
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                address_reg: address_itm.value,
                index_address_reg:address_itm.data.postal_code!=null?address_itm.data.postal_code:""
            }
        })
    }
    _addressBlur(event){
        
        this.setState({
            address_lines:{
                ...this.state.address_lines,
                key_address:"",
                data_address:[],
            }
        })    
    }
    _handleKeyDown(e){
        let newRecord=this.state.newRecord
        if (e.key === 'Enter') {
            this.setState({
                address_lines:{
                    ...this.state.address_lines,
                    key_address:"",
                    data_address:[],
                }
            })
        }
        if(e.key==='ArrowDown'){

        }
        //console.log(e.key)
        
    }
*/
    _updateSelect(newValue, actionMeta){
        let new_value=null
        let newRecord=this.state.newRecord
        //let errorRecord=this.state.errorRecord
        
        switch (actionMeta.action){
            case "select-option":
                newRecord[actionMeta.name+"_id"]=newValue.value
                newRecord[actionMeta.name+"_name"]=null
                //errorRecord[actionMeta.name]=false
            break;
            case "create-option":
                newRecord[actionMeta.name+"_id"]=null
                newRecord[actionMeta.name+"_name"]=newValue.value
                //errorRecord[actionMeta.name]=false
            break;
            case "clear":
                newRecord[actionMeta.name+"_id"]=null
                newRecord[actionMeta.name+"_name"]=null
            break;
            default:
        }
        
        this.setState({newRecord})
        //this.setState({errorRecord})
    }
    _esc(){
        console.log("esc")
       
        //console.log(data)
        //this.setState({newRecord:data})
        console.log(this.state)
    }
    _enter(){
        //console.log(this.state.data)
        //console.log(this.state.data)
       
        fetch('/api/customers/'+this.props.customerID, {
                method: 'PUT',
                body: JSON.stringify(this.state.newRecord),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((data)=>{
                //console.log(data)
            })
        

    }
    /**/
    
/**
 * defaultValue={this.options("martial").find(op => {
                                        console.log(op.value+"="+this.state.newRecord["martial"])
                                        return op.value === this.state.newRecord["martial"]
                                    })}

 */

    render() { 
            
        let data_address_lines=[]
        
        //console.log(this.state.address_lines)
        if(this.state.address_lines.key_address){
            data_address_lines[this.state.address_lines.key_address]=this.state.address_lines.data_address.map((item,key)=>
                <div key={key} className="address_hint_line" onClick={()=>this.choiseAddress(key)}>{item.value}</div>
            )
        }

        //console.log(data_address_lines)
        /*
        for(address_lines in this.state.data_address_lines){
            console.log(address_lines)
            //data_address_lines[]
        }
        */
/*
        if(this.state.data_address_lines.length){
            for()
        }
*/
        //data_address_lines["address_reg_lines"]

        //console.log()
        //if(this.state.address_reg_line){
        /*
        if(this.state.address_reg_line.length){
            address_reg_lines=this.state.address_reg_line.map((item,key)=>
                <div key={key} className="address_hint_line" onClick={()=>this.choiseAddress(key)}>{item.value}</div>
            )
        }
        */

        //}

        let profile_info=!this.state.loading?
        <div>
           
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Фамилия</div>
                            <input value={this.state.newRecord.surname} name="surname" onChange={this._updateInput} type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="profilePhoto" style={{backgroundImage:"url(../uploads/photo/3/terry-crews-person-of-year-2017-time-magazine-facebook-1.jpg)"}}>
                            
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Имя</div>
                            <input value={this.state.newRecord.name} name="name" onChange={this._updateInput} type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Отчество</div>
                            <input value={this.state.newRecord.patronymic} name="patronymic" onChange={this._updateInput} type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">ID</div>
                            <input type="text" className="itm_input itm_input_disabled" readOnly value={this.props.customerID}/>
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
                                name="mobphone"
                                value={this.state.newRecord.mobphone}
                                onChange={this._updateInput}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Телефон</div>
                            <input type="text" className="itm_input"/>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>


                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дата рождения</div>
<DatePicker
    selected={new Date()}
/>                                
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Семейное положение</div>
                            <CreatableSelect 
                                name="martial"
                                defaultValue={this.options("martial").find(op => {
                                    //console.log(this.state.newRecord)
                                    return op.value === this.state.newRecord["martial_id"]
                                })}
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
                                defaultValue={this.options("gender").find(op => {
                                    //console.log(this.state.newRecord)
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
                            <input 
                                value={this.state.newRecord.address_reg} 
                                onKeyDown={this._handleKeyDown} 
                                onBlur={this._addressBlur} 
                                autoComplete="new-password" 
                                onChange={this._updateAddress} 
                                name="address_reg" 
                                type="text" 
                                className="itm_input" />
                        </div>

                        {data_address_lines["address_reg_line"]?
                            <div className="wrp_address_hint">
                                <div className="address_hint_caption">Выберите вариант или продолжите ввод</div>
                                <div className="address_hint_lines">
                                    {data_address_lines["address_reg_line"]}
                                </div>
                            </div>
                        :''}
                        
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Индекс адреса регистрации</div>
                            <input value={this.state.newRecord.index_address_reg} name="index_address_reg" type="text" onChange={this._updateInput} className="itm_input"/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Адрес проживания</div>
                            <input 
                                value={this.state.newRecord.address_res} 
                                onKeyDown={this._handleKeyDown} 
                                onBlur={this._addressBlur} 
                                autoComplete="new-password" 
                                onChange={this._updateAddress} 
                                name="address_res" 
                                type="text" 
                                className="itm_input"
                            />
                        </div>
                        {data_address_lines["address_res_line"]?
                            <div className="wrp_address_hint">
                                <div className="address_hint_caption">Выберите вариант или продолжите ввод</div>
                                <div className="address_hint_lines">
                                    {data_address_lines["address_res_line"]}
                                </div>
                            </div>
                        :''}
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Индекс адреса проживания</div>
                            <input type="text" className="itm_input"  defaultValue={this.state.data.index_address_res}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Серия и номер паспорта</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.passport_number}/>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Кем выдан</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.passport_issuedby}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дата выдачи</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.passport_date}/>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Место рождения</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.bpl}/>
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
                            <input type="text" className="itm_input" defaultValue={this.state.data.inn}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">№ страхового свидетельства</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.insurance_number}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">№ медицинского полюса</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.medical_number}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Образование</div>
                            <input type="text" className="itm_input" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Название учебного учреждения</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.education_name}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Специальность</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.education_speciality}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Статус</div>
                            <input type="text" className="itm_input" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Номер военного билета</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.military_number}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Место прохождение службы</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.military_place}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Судимость</div>
                            <input type="text" className="itm_input" />
                        </div>
                    </div>
                    <div className="col2">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Статья и срок</div>
                            <input type="text" className="itm_input" defaultValue={this.state.data.criminal_desc}/>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col3">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Характеристика</div>
                            <textarea className="itm_textarea"  defaultValue={this.state.data.characteristic}></textarea>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="tab_block_btns">
                <div className="wrap_btns">
                    <div className="btn btn_esc" onClick={this._esc}>Отменить (Esc)</div>
                    <div className="btn btn_enter" onClick={this._enter}>Сохранить (Enter)</div>
                </div>
            </div>
        </div>
        :''

        return (
            <div className="profile_info">
                <Loader loading={this.state.loading} />
                {profile_info}
                
            </div>
        )
    }
}

export default Profile_base;