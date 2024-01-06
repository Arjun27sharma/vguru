import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';

const colors = [
    { id: 1, name: 'Red', colorCode: '#FF0000' },
    { id: 2, name: 'Blue', colorCode: '#0000FF' },
    { id: 3, name: 'Green', colorCode: '#00FF00' },
    { id: 4, name: 'Yellow', colorCode: '#FFFF00' },
    { id: 5, name: 'Purple', colorCode: '#800080' },
    // Add more colors
];
const ColorGame = () => {
    const [currentColor, setCurrentColor] = useState(colors[0]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [progress, setProgress] = useState(0);
    const [gameOver, setGameOver] = useState(false);


    const getNextColor = (current) => {
        let nextColor;
        do {
            nextColor = colors[Math.floor(Math.random() * colors.length)];
        } while (nextColor.id === current.id);
        return nextColor;
    };

    const handleColorSelect = (colorName) => {
        if (colorName === currentColor.name) {
            setIsCorrect(true);
            const newProgress = progress + 1;
            setProgress(newProgress);
            if (newProgress === colors.length) {
                setGameOver(true);
            }
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        setCurrentColor(getNextColor(currentColor));
        setIsCorrect(null);
    };

    const handleTryAgain = () => {
        setIsCorrect(null);
    };

    const handlePlayAgain = () => {
        setGameOver(false);
        setIsCorrect(null);
        setProgress(0);
        setCurrentColor(colors[0]);
    };

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">What color is this?</h2>
            {!gameOver ? (
                <>
                    <div style={{ width: '200px', height: '200px', backgroundColor: currentColor.colorCode, margin: '0 auto', borderRadius: '20px' }} className="mb-3"></div>

                    <div className="">
                        {colors.map((color) => (
                            <button key={color.id} className="btn btn-primary m-2" onClick={() => handleColorSelect(color.name)}>
                                {color.name}
                            </button>
                        ))}
                    </div>
                    {/* ... button layout */}
                    {isCorrect !== null && (
                        <div className="mt-3">
                            <p className={`text-${isCorrect ? 'success' : 'danger'}`}>
                                {isCorrect ? 'Correct!' : 'Wrong color! Try again!'}
                            </p>
                            {isCorrect ? (
                                <button className="btn btn-success" onClick={handleNext}>Next</button>
                            ) : (
                                <button className="btn btn-warning" onClick={handleTryAgain}>Try Again</button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <button className="btn btn-info" onClick={handlePlayAgain}>Play Again</button>
                </div>
            )}
            <div className="mt-4 w-50 mx-auto">
                <ProgressBar completed={Math.round((progress / colors.length) * 100)} bgColor="#007bff" height="15px" labelSize='10px'/>
            </div>
        </div>
    );
};

export default ColorGame;