import React, { Component } from 'react';
import Autocomplete  from 'react-autocomplete';
  
  export default class Suggestion_item extends React.Component {
    constructor() {
      super();
  
      this.state = {
        suggest:this.getSuggest()
      };    
      this.onChange = this.onChange.bind(this);
    }
  
     getSuggest(){
        return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            body: JSON.stringify({ "query":this.state.value, "count": 10 }),
            headers: {
                'Authorization': 'Token 3bfe37ae8dd1e98a6ea74382d7b263fca50a58b2', 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        /*
        return [
          { label: 'test1' },
          { label: 'test22' },
          { label: 'test41' }
          ]
        */
      
    }  
    onChange(e){
        this.setState({value:e.target.value})
    }
    onSelect(e){
        console.log(e)
    }

    
    render() {
    
  
      return (
        <Autocomplete
            inputProps={{ id: 'states-autocomplete',name:"test",autocomplete:"no" }}
            
            getItemValue={(item) => item.label}
            items={this.state.suggest}
            renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
                </div>
            }
            wrapperStyle={{ position: 'absolute',zIndex:200, display: 'inline-block' }}
            value={this.state.value}
            onChange={this.onChange}
            onSelect={this.onSelect}
            />
      );
    }
  }
  
  