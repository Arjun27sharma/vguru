import React, { useState } from 'react';
import axios from 'axios';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    const handleAnswerSubmit = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
        } else {
            setQuizFinished(true);
        }
    };

    const handleSubmit = async () => {
        let test = {
            marks: score,
            testType: 'Quiz',
        };

        try {
            const res = await axios.post(`${API_URL}/api/test/add`, test, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res);
            window.location = '/dashboard';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Quiz - {questions.length} Questions</h1>
            {!quizFinished ? (
                <div>
                    <h2 className="mb-4">{questions[currentQuestion].question}</h2>
                    <form>
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <div key={index} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="quizOption"
                                    id={`answer-${index}`}
                                    value={answer}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                    checked={selectedAnswer === answer}
                                />
                                <label className="form-check-label" htmlFor={`answer-${index}`}>
                                    {answer}
                                </label>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleAnswerSubmit}>
                            Save & Next
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center">
                    <h2>Quiz Finished!</h2>
                    <button className='btn btn-primary' onClick={handleSubmit}>Submit text</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
