import React, { Component } from 'react';
import styles from '../styles/style.css';
import * as moment from 'moment';
import Loader from './elements/Loader';
import CurrencyInput from 'react-currency-input';
import CreatableSelect from 'react-select/creatable';
import Highlighter from 'react-highlight-words';

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
class Organization_base extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            loading:true,
            data:[],
            newRecordDatesName:[],
            newRecordDates:[],
        }
        this._updateInput = this._updateInput.bind(this);
        this._updateInputName = this._updateInputName.bind(this);
        this._updateData = this._updateData.bind(this);
        this._updateSelect = this._updateSelect.bind(this);
        

        this._loadAsyncData = this._loadAsyncData.bind(this);
        this.keyFunction = this.keyFunction.bind(this);
        this.setTableData = this.setTableData.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChangePercent = this.handleChangePercent.bind(this)

        this._esc = this._esc.bind(this)
        

    }
    options(selector){
        let dictionart_array=[];
        if(sessionStorage.getItem(selector)){
            dictionart_array=JSON.parse(sessionStorage.getItem(selector))
        }
        return dictionart_array
    }
    _updateSelect(newValue, actionMeta){
        let new_value=null
        let newRecord=this.state.newRecord
        console.log(newRecord)
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
    _updateInput(event){
        const target = event.target;
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [target.name]: target.value
            }
        })
    }
    handleChangeCurrency(name, value){
        this.setState({
            newRecord:{
                ...this.state.newRecord,
                [name]: value
            }
        })
    }

    handleChangePercent(name, value){
        let new_itm_value_str=value+""
        let new_itm_value=new_itm_value_str.replace(/[^+\d]/g, '')*1
        
        var salary_str=this.state.newRecord.salary+""
        var salary=salary_str.replace(/[^+\d]/g, '')*1
        if(name=="salary_add"){
            var salary_summ=salary+salary*(new_itm_value/100)
            this.setState({
                newRecord:{
                    ...this.state.newRecord,
                    "salary_add":new_itm_value,
                    "salary_summ": salary_summ
                }
            })
        }
        if(name=="prize_perc"){
            var salary_summ=salary*(new_itm_value/100)
            this.setState({
                newRecord:{
                    ...this.state.newRecord,
                    "prize_perc":new_itm_value,
                    "prize": salary_summ
                }
            })
        }
    }

    handleKeyPress(e,name){//38,40
        let itm_value=e.target.value
        if(e.keyCode==38||e.keyCode==40){
            if(e.keyCode==38){
                var new_itm_value=itm_value.replace(/[^+\d]/g, '')*1+1;
            }
            if(e.keyCode==40){
                var new_itm_value=itm_value.replace(/[^+\d]/g, '')*1-1;
            }
            this.handleChangePercent(name,new_itm_value)
        }
        //console.log(e.keyCode)
        //console.log(name)
    }
    _updateData(name,value){
        let date = new Date(value);
        var a = moment();   
        var b = moment(date);
        var b_formatted=b.format("YYYY-MM-DD")
        var f_years = a.diff(b, 'year');
        
        var months = a.diff(b, 'months');
        var months_least=months-f_years*12

        var years_str=f_years+" "+this.declOfNum(f_years,["год","года","лет"])
        var month_str=months_least+" "+this.declOfNum(months_least,["месяц","месяца","месяцев"])

        let date_str="("+years_str+", "+month_str+")";

        
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
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.customerID !== this.props.customerID) {
            this.setState({loading: true});
            this._loadAsyncData(nextProps.customerID);
        }
    }
    componentDidMount() {
        this._loadAsyncData(this.props.customerID);
        sessionStorage.setItem("key_action", "organization_base")
        document.addEventListener("keydown", this.keyFunction, false);

    }
    keyFunction(event){
        if(sessionStorage.getItem("key_action")=="organization_base"){
            if(event.keyCode === 27) {  
                this._esc()
            }
            if(event.keyCode === 13) {
                //console.log(event)
                //this.addRecord()
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyFunction, false);
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    _esc(){  
        const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));
        if(data_changed){//Выход наружу
            //this.props.setAction(1)  
            this.props.closeInfo()

        }else{//Отмена изменений
            let data=this.state.oldRecord
            this.setState({data:data})
            //console.log(data)
            this.setTableData()
            //console.log(this.state)
        }
    }

    _loadAsyncData(customerID) {
        fetch('/api/customers/'+customerID)
            .then(response => response.json())
            .then((response)=>{
                this.setState({data:response})
                this.setTableData()
            })    
    }
    declOfNum(number, titles)
    {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    setTableData(){
        

        let data=this.state.data
        

        let newRecordDates=[]
        let newRecordDatesName=[]

        let date_column=["empl_date","unempl_date","exp1","exp2","exp3"];

        var a = moment();        
        for(let i in date_column){
            var column_name=date_column[i]
            if(data[column_name]){
                var date_arr=data[column_name].split("-");
                var date_value=new Date(date_arr[0],(date_arr[1]*1-1),date_arr[2])
            
                var b = moment([date_arr[0], date_arr[1], date_arr[2]]);
                var f_years = a.diff(b, 'year');
                var months = a.diff(b, 'months');
                var months_least=months-f_years*12
        
                var years_str=f_years+" "+this.declOfNum(f_years,["год","года","лет"])
                var month_str=months_least+" "+this.declOfNum(months_least,["месяц","месяца","месяцев"])
        
                let date_str="("+years_str+", "+month_str+")";

                newRecordDates[column_name]=date_value
                newRecordDatesName[column_name]=date_str
            }
        }
        this.setState({oldRecord:data})
        this.setState({newRecord:data})

        this.setState({newRecordDates:newRecordDates})
        this.setState({newRecordDatesName:newRecordDatesName})
        
        this.setState({loading:false})
        console.log(this.state.newRecord)

    }
   
    render() { 
        const data_changed=(JSON.stringify(this.state.newRecord)===JSON.stringify(this.state.oldRecord));            
        let data_address_lines=[]
        
        //console.log(this.state.address_lines)
        /*
        if(this.state.address_lines.key_address){
            data_address_lines[this.state.address_lines.key_address]=this.state.address_lines.data_address.map((item,key)=>
                <div key={key} className="address_hint_line" onClick={()=>this.choiseAddress(key)}>{item.value}</div>
            )
        }*/
        
        let profile_info=!this.state.loading?
        <div>
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Подразделение</div>
                            <CreatableSelect 
                                    name="subdivision"
                                    value={this.state.newRecord["subdivision_id"]?
                                    this.options("subdivision").find(op => {
                                        return op.value === this.state.newRecord["subdivision_id"]
                                    }):null}

                                    className="itm_selector"
                                    cacheOptions
                                    defaultOptions
                                    options={this.options("subdivision")}
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
                            <div className="itm_caption">Отдел</div>
                            <CreatableSelect 
                                name="department"
                                value={this.state.newRecord["department_id"]?
                                this.options("department").find(op => {
                                    return op.value === this.state.newRecord["department_id"]
                                }):null}

                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("department")}
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
                            <div className="itm_caption">Должность</div>
                            <input type="text" className="itm_input" 
                                autoComplete="new-password"
                                value={this.state.newRecord.position} 
                                name="position" 
                                onChange={this._updateInput} 
                            />
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Статус сотрудника</div>
                            <CreatableSelect 
                                name="custstatus"
                                value={this.state.newRecord["custstatus_id"]?
                                this.options("custstatus").find(op => {
                                    return op.value === this.state.newRecord["custstatus_id"]
                                }):null}

                                className="itm_selector"
                                cacheOptions
                                defaultOptions
                                options={this.options("custstatus")}
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
                            <div className="itm_caption">Дата приема на работу</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["empl_date"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="empl_date"
                                onChange={(value)=>this._updateData("empl_date",value)}
                            />
                            <div className="year_hint_mini">{this.state.newRecordDatesName["empl_date"]}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дата увольнения</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["unempl_date"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="unempl_date"
                                onChange={(value)=>this._updateData("unempl_date",value)}
                            />
                            <div className="year_hint_mini">{this.state.newRecordDatesName["unempl_date"]}</div>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Общий стаж работы</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["exp1"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="exp1"
                                onChange={(value)=>this._updateData("exp1",value)}
                            />
                            <div className="year_hint_mini">{this.state.newRecordDatesName["exp1"]}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Непрерывный стаж</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["exp2"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="exp2"
                                onChange={(value)=>this._updateData("exp2",value)}
                            />
                            <div className="year_hint_mini">{this.state.newRecordDatesName["exp2"]}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Стаж работы в компании</div>
                            <DatePicker
                                locale="ru" dateFormat="dd.MM.yyyy"
                                selected={this.state.newRecordDates["exp3"]}
                                //value={this.state.newRecordDatesName["dob"]}
                                name="exp3"
                                onChange={(value)=>this._updateData("exp3",value)}
                            />
                            <div className="year_hint_mini">{this.state.newRecordDatesName["exp3"]}</div>
                        </div>
                    </div>
                </div>
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Куратор сотрудника</div>
                            <input type="text" className="itm_input" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Оклад</div>
                            <CurrencyInput 
                                value={this.state.newRecord.salary} name="salary" className="itm_input"
                                precision={0} thousandSeparator={' '} allowEmpty={true} suffix={' Р'} 
                                onChange={(value)=>this.handleChangeCurrency("salary",value)}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Надбавка в %</div>
                            <CurrencyInput 
                                value={this.state.newRecord.salary_add} name="salary_add" className="itm_input"
                                precision={0} thousandSeparator={''} allowEmpty={true} suffix={'%'} 
                                onChange={(value)=>this.handleChangePercent("salary_add",value)}
                                onKeyDown={(event)=>this.handleKeyPress(event,"salary_add")}
                                //onKeyDown={this.add}

                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Оклад с надбавкой</div>
                            <CurrencyInput 
                                value={this.state.newRecord.salary_summ} name="salary_summ" className="itm_input"
                                precision={0} thousandSeparator={' '} allowEmpty={true} suffix={' Р'} 
                                onChange={(value)=>this.handleChangeCurrency("salary_summ",value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Премия в %</div>
                            <CurrencyInput 
                                value={this.state.newRecord.prize_perc} name="prize_perc" className="itm_input"
                                precision={0} thousandSeparator={''} allowEmpty={true} suffix={'%'} 
                                onChange={(value)=>this.handleChangePercent("prize_perc",value)}
                                onKeyDown={(event)=>this.handleKeyPress(event,"prize_perc")}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Премия</div>
                            <CurrencyInput 
                                value={this.state.newRecord.prize} name="prize" className="itm_input"
                                precision={0} thousandSeparator={' '} allowEmpty={true} suffix={' Р'} 
                                onChange={(value)=>this.handleChangeCurrency("prize",value)}
                            />
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
            <div className="tab_block">
                <div className="frm_row">
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Основной отпуск</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.vacation_base} 
                                name="vacation_base" 
                                onChange={this._updateInput}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="wrp_itm_input">
                            <div className="itm_caption">Дополнительный отпуск</div>
                            <input type="text" className="itm_input" 
                                value={this.state.newRecord.vacation_add} 
                                name="vacation_add" 
                                onChange={this._updateInput}
                            />
                        </div>
                    </div>
                    <div className="col"></div>
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
        :''
        return (
            <div className="profile_info">
                <Loader loading={this.state.loading} />
                {profile_info}
            </div>
        )
    }
}

export default Organization_base;