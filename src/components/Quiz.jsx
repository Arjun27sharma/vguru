import React, { useState } from 'react';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

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
                            Submit & Next
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center">
                    <h2>Quiz Finished!</h2>
                    <p className="fw-bold">Your Score: {score} / {questions.length}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
