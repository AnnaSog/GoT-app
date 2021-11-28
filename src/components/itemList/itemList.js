import React, {Component} from 'react';
import './itemList.css';

import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {

    gotService = new GotService();

    state = {         //состояние где будут отражаться персонажи
        charList: null,
        error: false
    }

    componentDidMount(){  //создается комп. ктр будет отражаться на стр
        this.gotService.getAllCharacters() //отправляем запрос к сервису(API) к методу, где отр.все герои
            .then( (charList) => {      //получаем промис с измененным сос-нием с пустого на список персонажей
                this.setState({
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }
    onError(status){   //Как только компонент критически ломается, onError - это функционал, который обрабатывает эту ошибку.
        this.setState({
            charList: null,
            error: true
        })
    }

    renderItems(arr) {    //arr - из сервиса придет массив данных
        return arr.map( (item, i) => {   //полученный [] переберем (с созданием нового) на item - каждый эл. и порядковый номер c 0 до 9
            const { itemCount } = this.props;
            return(                     //вернется имя персонажа и его номер
                <li 
                    key={i}           //при создании нового элемента в реакте обязательно должен быть ключ
                    className="list-group-item"
                    onClick = { () => this.props.onCharSelected(itemCount + i)} //при клике на имя высветится карточка этого персонажа с данными, 41 - 5 стр + ост порядковые номера с 0 до 9
                    > 
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList} = this.state;  //render получает данные к состоянию, ктр будет меняться(при запросе будут приходить данные персонажей)

        if(!charList){                  //если данных пока нет, то будет спиннер
            return <Spinner/>
        }

        const items = this.renderItems(charList); //карточки с именами персонажей

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}