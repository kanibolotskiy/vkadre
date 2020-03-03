import React, { Component } from 'react';
import styles from '../styles/style.css';

class Profile_base extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
        }
    }
    render() { 
        return (
            <div className="profile_info">
                <div className="tab_block">
                    <div className="frm_row">
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Фамилия</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Имя</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Отчество</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">ID</div>
                                <input type="text" className="itm_input" readOnly value={this.props.customerID}/>
                            </div>
                        </div>
                        <div className="col"></div><div className="col"></div>
                    </div>

                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Дата рождения</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Семейное положение</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Индекс адреса регистрации</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Адрес проживания</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Индекс адреса проживания</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Серия и номер паспорта</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Кем выдан</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Дата выдачи</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col2">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Место рождения</div>
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
                                <div className="itm_caption">ИНН налогоплательщика</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">№ страхового свидетельства</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">№ медицинского полюса</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Специальность</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Место прохождение службы</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col3">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Характеристика</div>
                                <textarea className="itm_textarea"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile_base;