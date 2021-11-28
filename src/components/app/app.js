import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage'
import ErrorMessage from '../errorMessage';

import './app.css';


export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar 
            }
        });
    }


    render(){

        if (this.state.error) {
            return <ErrorMessage/>
        }
       
        const char = this.state.showRandomChar ? <RandomChar/> : null; //RandomChar будет показан только при этих условиях, а не по умолчанию

        return (
            <> 
                <Container>
                    <Row>
                        <Col md='6'>
                            {char}  
                            <button className='random' onClick = {this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};

