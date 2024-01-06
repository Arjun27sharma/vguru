import React, { useState, useEffect } from 'react';
import { initialWords} from './data'

const WordMatchGame = () => {


    const [words, setWords] = useState(initialWords);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [progress, setProgress] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        shuffleWords();
    }, [currentWordIndex]); // Shuffle words when currentWordIndex changes

    const shuffleWords = () => {
        let shuffledWords = [...initialWords];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        setWords(shuffledWords);
    };

    const checkAnswer = (wordId) => {
        if (wordId === words[currentWordIndex].id) {
            setIsCorrect(true);
            setProgress(progress + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setIsCorrect(null);
        } else {
            // Logic for ending the game
            // console.log('Game over!');
            setGameOver(true);
        }
    };

    const handleTryAgain = () => {
        setIsCorrect(null);
    };

    return (
        <div className='container mt-5'>
        <h1>Word Match Game</h1>
        <div>
            { !gameOver ?
        <div className="word-match-game d-flex flex-column align-items-center justify-content-start mt-5" style={{ minHeight: '100vh' }}>
            <h3 className="mb-4">Find the Picture: {words[currentWordIndex].name}</h3>
            <div className="  justify-content-center mb-3" style={{ maxWidth: '1100px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {words.map(word => (
                    <div key={word.id} className="">
                        <img 
                            src={word.imageUrl} 
                            alt={word.name} 
                            onClick={() => checkAnswer(word.id)}
                            style={{ 
                                border: isCorrect != null ? (word.id === words[currentWordIndex].id ? '4px solid green' : '4px solid red') : 'none', 
                                borderRadius: '10px' // Added border-radius
                            }}
                            width={150}
                            height={150}
                            className='object-fit-cover'
                        />
                    </div>
                ))}
            </div>
            <div className="action-buttons mb-3">
                {isCorrect === false && (
                    <button onClick={handleTryAgain} className="btn btn-warning">Try Again</button>
                )}
                {isCorrect === true && (
                    <button onClick={handleNext} className="btn btn-success">Next</button>
                )}
            </div>
            <p className="progress-text">Progress: {progress} / {words.length}</p>
        </div>

        : <div className="word-match-game d-flex flex-column align-items-center justify-content-start mt-5" style={{ minHeight: '100vh' }}>
            <h3 className="mb-4">Game Over!</h3>
            <p className="mb-4">Your score: {progress} / {words.length}</p>
            <button onClick={() => {window.location.reload()}} className="btn btn-primary">Play Again</button>
        </div>
}
        </div>
        </div>
    );
};

export default WordMatchGame;
