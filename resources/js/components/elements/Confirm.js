import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
export default class Confirm extends Component {
    constructor(props) {
        super(props);
          this.state = {
            
          };
          this.pressEnter = this.pressEnter.bind(this);
          this.pressEsc = this.pressEsc.bind(this);
    }
    componentDidMount(){
        
    }
    pressEnter(){
        this.props.setAnswer(true)
    }
    pressEsc(){
        this.props.setAnswer(false)
    }
    
    render() {
        
        return (
            <div className="wrap_modal">
                <div className="modal_overlay"></div>
                <div className="modal">
                    <div className="modal_caption">Подтвердите удаление данных</div>
                    <div className="modal_buttons">
                        <div className="btn _esc" onClick={this.pressEsc}>Отменить (Esc)</div>
                        <div className="btn _enter" onClick={this.pressEnter}>Удалить (Enter)</div>
                    </div>
                </div>
            </div>
        )
      }
}
