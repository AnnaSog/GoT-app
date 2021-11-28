import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new GotService();

    componentDidMount(){  //появляется на стр
        this.updateChar();  //когда на стр появится компонент RandomChar, то будет вызвана эта фун-ию с данными персонажа
        this.timerId = setInterval(this.updateChar, 4000)
    }

    componentWillUnmount(){ //удаляется со стр
        clearInterval(this.timerId)
    }

    state = {
        char: {},   //заполнятся данными, ктр придут из сервера
        loading: true,
        error: false
    }

    onCharLoaded =(char) => {
        this.setState({
            char,        //изменные данные приходят из gotService и метода getCharacter(id)
            loading: false //после загр. персонажа, спиннер перестает работать
        })  
    }

    onError = (err) => {  //если прописывать через стрелочную фун-ию, то через bind не нужно привязывать к this 
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => { //обновляет персонажей на стр
        const id = Math.floor(Math.random() * 140 +25); //floor -округляет, 140 +25 - рандомно персонажи от 25 до 140
        this.gotService.getCharacter(id) //gotService- в нем ссылка на сервис, getCharacter(id) - этот метод должен получить персожана с определенным Id и возращает его уже в транформированном виде
            .then(this.onCharLoaded)    //вернется промис с данными персонажа, ктр указали, изменяют state и уже изменный отражается в render()
            .catch(this.onError)
    }

    render() {
        const {char, loading, error}= this.state;

        const errorMessage = error ? <ErrorMessage/> : null; //если error true, то выходит сообщение об ошибке
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char = {char}/> : null; //если нет загрузки или ошибки, то отраж. инфо о персонаже

        return (  
            <div className="random-block rounded"> 
                {errorMessage}
                {spinner}
                {content}
            </div>              
        );
    }
}

//настроиваем, чтобы спиннер отражался в блоке, а не отдельно
const View = ({char}) =>{
    const {name, gender, born, died, culture} = char;

    return(
        <>
            <h4>Random Character: <br></br> {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}