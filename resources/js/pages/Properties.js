import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import FlexigridItem from '../components/elements/FlexigridItem'
import Header from '../components/elements/Header';
import Dictionary_martial from '../components/dictionaries/Dictionary_martial';
import Dictionary from '../components/elements/Dictionary';


//import Customers
//import {styles} from "./styles/styles";

/* An example React component */
class Properties extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            stateActive:0,
            products: [],
            dictionaries:[
                {key:"martial",caption:"Семейное положение"},
                {key:"gender",caption:"Пол"},
                {key:"education",caption:"Образование"},
                {key:"status",caption:"Статус"},
                {key:"criminal",caption:"Судимость"},
                {key:"subdivision",caption:"Подразделение"},
                {key:"department",caption:"Отдел"},
                {key:"custstatus",caption:"Статус сотрудника"},
                {key:"typeproperty",caption:"Тип имущества"},
                {key:"typecredit",caption:"Тип кредита"},
                {key:"typevacation",caption:"Тип отпуска"},
                {key:"typelink",caption:"Тип связи"},

            ]
        }
    }
    setInfo(stateActive){
        this.setState({stateActive:stateActive})
    }
    render() {
        //<div onClick={()=>this.setInfo(1)} className="properties_item">Конструктор карточки</div>
        let dictionary_captions=[]
        let dictionary_comp=''
        /*
        this.state.dictionaries.map((item,key)=>{
            dictionary_captions.push(
                <div key={key} onClick={()=>this.setInfo(item.key)} className={"properties_subitem"+(item.key==this.state.stateActive?" active":"")}>{item.caption}</div>
            )
            if(item.key==this.state.stateActive){
                dictionary_comp=<Dictionary caption={item.caption} url={item.key} />
            }

        })

        {dictionary_captions}
        */

        return (
            <div className="wrapper">
                <Header/>
                <div className="wrapper_content">
                    <div className="wrapper_content_info">
                        <div className="properties_left">
                            <div className="properties_info">
                                
                                <div onClick={()=>this.setInfo(2)} className="properties_item">Пользователи</div>
                                <div onClick={()=>this.setInfo(3)} className="properties_item">Роли и доступы</div>
                                <div onClick={()=>this.setInfo(4)} className="properties_item">Общие настройки</div>
                                <div onClick={()=>this.setInfo(5)} className="properties_item _caption" >Настройка справочников</div>
                                {this.state.dictionaries.map((item,key)=>{
                                    return <div key={key} onClick={()=>this.setInfo(item.key)} className={"properties_subitem"+(item.key==this.state.stateActive?" active":"")}>{item.caption}</div>
                                })}
                            </div>
                        </div>
                        <div className="properties_content">
                            <div className="properties_info">
                                {this.state.dictionaries.map((item,key)=>{
                                    return this.state.stateActive==item.key?<Dictionary caption={item.caption} url={item.key}/>:''
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Properties;
