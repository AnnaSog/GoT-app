import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

export default class CharDetails extends Component { //блок по отражанию данных конкретного персонажа

    gotService = new GotService();

    state = {
        char: null
    }

    componentDidMount(){   //хук по обращению к серверу и рендеру данных на стр
        this.updateChar();
    }

    componentDidUpdate(prevProps){          //хук обновления
        if(this.props.charId !== prevProps.charId){  //если текущее сос-ние не будет равен предыдущему
            this.updateChar();                  //то только тогда будет обновляться сос-ние
        }
    }

    updateChar() {     //фун-ию по появлению персонажа
        const {charId} = this.props;  //получаем из state characterPage.js

        if(!charId){  //если данных нет, то ничего не будем делать
            return;
        } 


        this.gotService.getCharacter(charId)  //отравляем запрос на сервис для получения id конкретного персонажа
            .then( (char) => {                //получаем промис с объектом (с персонажем) 
                this.setState({char})       // вызываем метод по измененяю сос-ния и записываем туда полученный объект 
            })
        // this.foo.bar = 0; //создано, чтобы настроить ошибку
    }

    render() {

        if(!this.state.char){    //если персонаж не выбран, попросим польз. это сделать
           return <span className = 'select-error'>Please select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
           
        );
    }
}