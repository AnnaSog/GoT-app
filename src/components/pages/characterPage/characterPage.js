import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../../itemList';
import CharDetails from '../../charDetails';
import ErrorMessage from '../../errorMessage';

export default class CharacterPage extends Component {

    state = {
        selectedChar: null,  //выбранный персонаж
        error: false
    }

    onCharSelected = (id) => {     //при клике на персонажа его карточка будет отражаться в текущем сос-ии
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return(
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected = {this.onCharSelected}
                    itemCount={41}/>
                </Col>
                <Col md='6'>
                    <CharDetails 
                        charId = {this.state.selectedChar}
                        />
                </Col>
            </Row>
        )
    }
}