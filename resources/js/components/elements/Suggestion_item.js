import React, { Component } from 'react';
import Autocomplete  from 'react-autocomplete';
  
  export default class Suggestion_item extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        suggest:[],
        value:this.props.value
      };    
      this.onChange = this.onChange.bind(this);
      //this.onSelect = this.onSelect.bind(this);
      
    }
  
    
    onChange(e){
        let value=e.target.value
        fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            body: JSON.stringify({ "query":value, "count": 10 }),
            headers: {
                'Authorization': 'Token 3bfe37ae8dd1e98a6ea74382d7b263fca50a58b2', 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response=>response.json())
        .then((response)=>{
            this.setState({suggest:response.suggestions})
        })
        //this.setState({value:value})
        this.props.onChange(this.props.name,value)
        
    }
    
    onSelect(value,item){
        this.props.onSelect(this.props.name,item)
    }
    
    render() {
    
  
    return (
        <div className="wrapper_autocomplete">
            <form autoComplete = "off" onSubmit={e => { e.preventDefault(); }}>
            <Autocomplete
                wrapperStyle={{ position: 'relative', display: 'block' }}
                className="itm_input"
                getItemValue={(item) => item.value}
                items={this.state.suggest}
                //renderItem={(item)=>item.value}
                renderItem={(item, isHighlighted) =>
                    <div key={item.data.fias_code} className="address_hint_line" style={{ background: isHighlighted ? '#d9ebf5' : 'white' }}>
                    {item.value}
                    </div>
                }
                renderMenu={children => (
                    <div className="suggestion_results">
                    {children}
                    </div>
                )}
                //wrapperStyle={{ position: 'absolute',zIndex:200, display: 'inline-block' }}
                value={this.props.value}
                onChange={this.onChange}
                onSelect={(value,item)=>this.onSelect(value,item)}
                />
            </form>
        </div>
      );
    }
  }
  
  