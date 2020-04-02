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
        }
    }
    setInfo(stateActive){
        this.setState({stateActive:stateActive})
    }
    render() {
        //<div onClick={()=>this.setInfo(1)} className="properties_item">Конструктор карточки</div>
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
                                <div onClick={()=>this.setInfo(6)} className="properties_subitem">Семейное положение</div>
                                <div onClick={()=>this.setInfo(7)} className="properties_subitem">Пол</div>
                                <div onClick={()=>this.setInfo(8)} className="properties_subitem">Образование</div>
                                <div onClick={()=>this.setInfo(9)} className="properties_subitem">Статус</div>
                                <div onClick={()=>this.setInfo(10)} className="properties_subitem">Судимость</div>
                            </div>
                        </div>
                        <div className="properties_content">
                            <div className="properties_info">

                                {this.state.stateActive==6?<Dictionary caption="Семейное положение" url="martial"/>:''}
                                {this.state.stateActive==7?<Dictionary caption="Пол" url="gender"/>:''}
                                {this.state.stateActive==8?<Dictionary caption="Образование" url="education"/>:''}
                                {this.state.stateActive==9?<Dictionary caption="Статус" url="status"/>:''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Properties;
