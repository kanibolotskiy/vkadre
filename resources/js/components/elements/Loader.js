import React, { Component } from 'react';
export default (props) => {
    console.log(props.loading)
    return (
        <div className={`loader ${ props.loading?'':'_hide' }`}>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}
//"loader {this.props.visible?'':'_hide'}">