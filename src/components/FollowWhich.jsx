import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../assets/styles/style-FollowWhich.css';

// Import all images
import apple from '../assets/images/apple.jpg';
import banana from '../assets/images/banana.jpg';
import orange from '../assets/images/orange.jpg';
import mango from '../assets/images/mango.jpg';
import pomegranate from '../assets/images/pomegranate.jpg';
import dragon from '../assets/images/dragon.jpg';
import guava from '../assets/images/guava.jpg';

const fruits = [
    { name: 'apple', color: 'red', image: apple },
    { name: 'banana', color: 'yellow', image: banana },
    { name: 'orange', color: 'orange', image: orange },
    { name: 'mango', color: 'yellow', image: mango },
    { name: 'pomegranate', color: 'red', image: pomegranate },
    { name: 'dragon', color: 'pink', image: dragon },
    { name: 'guava', color: 'green', image: guava },
];

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function FollowWhich() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numCards, setNumCards] = useState(2);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [shuffledFruits, setShuffledFruits] = useState([]);

    useEffect(() => {
        const shuffled = shuffleArray(fruits);
        const uniqueColors = {};
        const uniqueFruits = [];
        for (const fruit of shuffled) {
            if (!uniqueColors[fruit.color]) {
                uniqueColors[fruit.color] = true;
                uniqueFruits.push(fruit);
            }
            if (uniqueFruits.length === numCards) break;
        }
        setShuffledFruits(uniqueFruits);
    }, [questionIndex, numCards]);

    const checkAnswer = (fruitName) => {
        if (fruitName === shuffledFruits[questionIndex].name) {
            setCorrectAnswer(true);
            setScore(score + 5);
            setQuestionIndex(questionIndex + 1);
            setNumCards(numCards + 1);
            setCorrectAnswer(null);
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
        <Container fluid className="mt-3">
            <h3 className="d-flex mb-4">Follows Which Questions <span className='ms-auto'>🪙{score}</span></h3>
            {correctAnswer !== null && (
                <div className="text-center">
                    <p className={`text-${correctAnswer ? 'success' : 'danger'}`}>{correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
                </div>
            )}

            {questionIndex < shuffledFruits.length && (
                <div>
                    <div className='d-flex justify-content-center'>
                        <h3 className="text-center mb-3 border border-success rounded p-3">Which fruit is {shuffledFruits[questionIndex].color}?</h3>
                    </div>
                    <Row className="justify-content-center">
                        {shuffledFruits.map((fruit) => (
                            <Col key={fruit.name} xs={6} md={4} lg={2}>
                                <Card
                                    className={`mb-3 p-3 ${correctAnswer !== null && fruit.name === shuffledFruits[questionIndex].name ? (correctAnswer ? 'border-success border-2' : 'border-danger border-2') : ''}`}
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
                    {questionIndex === shuffledFruits.length - 1 ? (
                        <h4 className="text-center text-success"><span className='text-danger'>Congratulations!</span><br /> You have completed all the questions.<br />Your score is {score}</h4>
                    ) : (
                        <button className="btn btn-primary py-2 px-5" onClick={nextQuestion}>Next</button>
                    )}
                </div>
            )}
        </Container>
    );
}


export default FollowWhich;
