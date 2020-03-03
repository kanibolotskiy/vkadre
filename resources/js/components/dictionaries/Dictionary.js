import React, { Component } from 'react';

class Dictionary extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            //url_index:'/api/property_'+this.props.url,
            changed:false,
            dictionary: [],
            dictionary_old: [],
            dictionary_items:"test"
        }
        this.handleChange = this.handleChange.bind(this);
        this.escMethod = this.escMethod.bind(this);
        this.enterMethod = this.enterMethod.bind(this);
        this.renderDictionary = this.renderDictionary.bind(this)
    }

    handleSubmit(){

    }
    enterMethod(){
        console.log(this.state.dictionary)
    }
    escMethod(event){
        //console.log("esc");
        //dictionary=dictionary_old
        this.setState({dictionary:this.state.dictionary_old})
        //console.log(this.state.dictionary)
        this.renderDictionary();
    }
    handleChange(event,key){
        let data=this.state.dictionary
        if(key>=0){
            data[key].name=event.target.value
        }else{
            data[key]={id:0,name:event.target.value}
        }
        console.log(event.target.value+"="+key)
        //console.log(event.target.value)
        this.setState({dictionary:data})
        this.setState({changed:true})
        
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        /* fetch API in action */
        let url_index='/api/property_'+this.props.url
        fetch(url_index)
            .then(response => {
                
                return response.json();
            })
            .then(dictionary => {
                //Fetched product is stored in the state
                for(let itm in dictionary){
                    console.log(itm)
                }
                this.setState({ dictionary });
                this.setState({ dictionary_old:dictionary });
                this.renderDictionary()
            });
    } 
    renderDictionary() {
        let dictionary_items=this.state.dictionary.map((dictionary,key) => {
            return (
                <div className="property_item_row" key={dictionary.id}>
                    <input type="text" key={dictionary.id} className="property_item" onChange={this.handleChange} defaultValue={dictionary.name} />
                    <div className="del_dictionary_itm">
                        <span className="del_dictionary_itm_val">Удалить</span>
                    </div>
                </div>
            );
        })
        this.setState({dictionary_items})
    }
    escFunction(event){
        if(event.keyCode === 27) {
            //Do whatever when esc is pressed
            console.log("Esc pressed")
            this.escMethod()
        }
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() { 
        return (
            <div className="profile_info">
                <div className="dictonary_caption">Настройки справочника "{this.props.caption}"</div>
                <div className="dictonary_outer">
                    <div className="profile_info_wrapper">
                        {this.state.dictionary_items}
                        <div className="property_item_row" key={0} >
                            <input type="text" className="property_item" onChange={(event)=>this.handleChange(event,-1)} placeholder="Добавить значение" />
                            <div className="del_dictionary_itm">
                                <span className="del_dictionary_itm_val">Удалить</span>
                            </div>
                        </div>
                    </div>
                    <div className="dictonary_buttons">
                        {this.state.changed?
                            <div className="dictonary_buttons_info">
                                <div className="dictonary_button button button1" onClick={()=>this.escMethod()}>Отменить (Esc)</div>
                                <div className="dictonary_button button button2 _ok" onClick={()=>this.enterMethod()}>Сохранить (Enter)</div>
                            </div>
                            :''}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dictionary;