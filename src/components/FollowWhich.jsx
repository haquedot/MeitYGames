import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import apple from '../assets/images/apple.jpg';
import banana from '../assets/images/banana.jpg';
import orange from '../assets/images/orange.jpg';
import mango from '../assets/images/mango.jpg';
import pomegranate from '../assets/images/pomegranate.jpg';
import '../assets/styles/style-FollowWhich.css'

const fruits = [
    { name: 'apple', color: 'red', image: apple },
    { name: 'banana', color: 'yellow', image: banana },
    { name: 'orange', color: 'orange', image: orange },
    { name: 'mango', color: 'yellow', image: mango },
    { name: 'pomegranate', color: 'red', image: pomegranate },
];

function FollowWhich() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numCards, setNumCards] = useState(2);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [score, setScore] = useState(0);

    const checkAnswer = (fruitName) => {
        if (fruitName === fruits[questionIndex].name) {
            setCorrectAnswer(true);
            setScore(score + 5); // Increase score by 5 for correct answer
        } else {
            setCorrectAnswer(false);
        }
    };

    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
        setNumCards(numCards + 1);
        setCorrectAnswer(null);
    };

    return (
        <Container className="mt-5">
            <h5 className="d-flex mb-4">Follows Which Questions <span className='ms-auto'>🪙{score}</span></h5>
            {/* <div className="text-center mb-3">
                <p></p>
            </div> */}
            {correctAnswer !== null && (
                <div className="text-center">
                    {correctAnswer ? (
                        <p className="text-success">Correct!</p>
                    ) : (
                        <p className="text-danger">Incorrect!</p>
                    )}
                </div>
            )}

            {questionIndex < fruits.length && (
                <div>
                    <div className='d-flex justify-content-center'>
                        <h3 className="text-center mb-3  border border-success rounded p-3">Which fruit is {fruits[questionIndex].color}?</h3>
                    </div>
                    <Row className="justify-content-center">
                        {fruits.slice(0, numCards).map((fruit, index) => (
                            <Col key={index} xs={6} md={4} lg={2}>
                                <Card
                                    className={`mb-3 p-3 ${correctAnswer !== null && fruit.name === fruits[questionIndex].name ? (correctAnswer ? 'border-success border-2' : 'border-danger border-2') : ''}`}
                                    onClick={() => correctAnswer === null && checkAnswer(fruit.name)}
                                >
                                    <Card.Img variant="top" src={fruit.image} alt={fruit.name} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            {correctAnswer !== null && (
                <div className="text-center">
                    {questionIndex === fruits.length - 1 ? (
                        <p className="text-center">Congratulations! You have completed all the questions.<br/>Your score is {score}</p>
                    ) : (
                        <button className="btn btn-primary py-2 px-5" onClick={nextQuestion}>Next</button>
                    )}
                </div>
            )}
        </Container>
    );
}

export default FollowWhich;
