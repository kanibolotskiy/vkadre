import React, { Component } from 'react';
import styles from '../styles/style.css';
import Loader from './elements/Loader.js';
import Select from 'react-select';

const options = [
    { value: '1', label: 'мужской' },
    { value: '2', label: 'женский' },
  ];

class Profile_base extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            loading:true,
            data:[],
            customerID:0
            //data: getDataProfile(),
            //rows:setRows
        }
        this._updateInput = this._updateInput.bind(this);
        this._updateSelect = this._updateSelect.bind(this);
        
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
        fetch('/api/customers/'+customerID)
            .then(response => response.json())
            .then((data)=>{
                this.setState({data})
                this.setState({loading:false})
            })
    }
    
    _updateInput(event){
        //event.target.value
        console.log(event)
    }
    _updateSelect(selectedOption){
        //this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    render() { 
        return (
            <div className="profile_info">
                <Loader loading={this.state.loading} />
                <div className="tab_block">
                    <div className="frm_row">
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Фамилия</div>
                                <input onChange={this._updateInput} type="text" className="itm_input" defaultValue={this.state.data.surname}/>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Имя</div>
                                <input type="text" className="itm_input" defaultValue={this.state.data.name} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Отчество</div>
                                <input type="text" className="itm_input" defaultValue={this.state.data.patronymic} />
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
                                <div className="itm_caption">Дата рождения</div>
                                <input type="text" className="itm_input"  defaultValue={this.state.data.dob}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Семейное положение</div>
                                <input type="text" className="itm_input" />
                                <Select options={options} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Пол</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Адрес регистрации</div>
                                <input type="text" className="itm_input" defaultValue={this.state.data.address_reg}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Индекс адреса регистрации</div>
                                <input type="text" className="itm_input" defaultValue={this.state.data.index_address_reg}/>
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Адрес проживания</div>
                                <input type="text" className="itm_input" defaultValue={this.state.data.address_res}/>
                            </div>
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
            </div>
        )
    }
}

export default Profile_base;