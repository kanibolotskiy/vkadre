import React, { Component } from 'react';
import styles from '../styles/style.css';

class Organization_base extends Component {
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
                {this.props.customerID}
                <div className="tab_block">
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Подразделение</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Отдел</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Должность</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Статус сотрудника</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Дата приема на работу</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Дата увольнения</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Общий стаж работы</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Непрерывный стаж</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Стаж работы в компании</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Надбавка в %</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Оклад с надбавкой</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab_block">
                    <div className="frm_row">
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Премия в %</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Премия</div>
                                <input type="text" className="itm_input" />
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
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="wrp_itm_input">
                                <div className="itm_caption">Дополнительный отпуск</div>
                                <input type="text" className="itm_input" />
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Organization_base;