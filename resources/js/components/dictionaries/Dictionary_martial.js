import React, { Component } from 'react';

class Dictionary_martial extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            changed:false,
            dictionary: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        //console.log(event.target.value)
        this.setState({changed:true})
    }
    componentDidMount() {
        /* fetch API in action */
        fetch('/api/property_martial')
            .then(response => {
                
                return response.json();
            })
            .then(dictionary => {
                //Fetched product is stored in the state
                this.setState({ dictionary });
            });
    } 
    renderDictionary() {
        return this.state.dictionary.map(dictionary => {
            return (
                <div className="property_item_row" key={dictionary.id} >
                    <input type="text" className="property_item" onChange={this.handleChange} defaultValue={dictionary.name} />
                    <div className="del_dictionary_itm">
                        <span className="del_dictionary_itm_val">Удалить</span>
                    </div>
                </div>
            );
        })
    }

    render() { 
        return (
            <div className="profile_info">
                <div className="dictonary_caption">Настройки справочника "Семейное положение"</div>
                <div className="dictonary_outer">
                    <div className="profile_info_wrapper">
                        {this.renderDictionary()}
                        <div className="property_item_row" key={0} >
                            <input type="text" className="property_item" onChange={this.handleChange} placeholder="Добавить значение" />
                            <div className="del_dictionary_itm">
                                <span className="del_dictionary_itm_val">Удалить</span>
                            </div>
                        </div>
                    </div>
                    <div className="dictonary_buttons">
                        {this.state.changed?
                            <div className="dictonary_buttons_info">
                                <div className="dictonary_button button button1">Отменить (Esc)</div>
                                <div className="dictonary_button button button2 _ok">Сохранить (Enter)</div>
                            </div>
                            :''}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dictionary_martial;