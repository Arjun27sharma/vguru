import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

const shapes = [
    { id: 1, name: 'Circle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/1200px-Circle_-_black_simple.svg.png' },
    { id: 2, name: 'Square', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png' },
    { id: 3, name: 'Triangle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/800px-Regular_triangle.svg.png' },
    { id: 4, name: 'Hexagon', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Regular_hexagon.svg/1200px-Regular_hexagon.svg.png' },
    { id: 5, name: 'Rectangle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Rectangle_%28plain%29.svg' },
    // Add more shapes
];


const ShapeGame = () => {
    const [currentShape, setCurrentShape] = useState(shapes[0]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [progress, setProgress] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // useEffect(() => {
    //     if (gameOver) {
    //         alert("Game Over! You've completed the Shape Game.");
    //     }
    // }, [gameOver]);

    const getNextShape = (current) => {
        let nextShape;
        do {
            nextShape = shapes[Math.floor(Math.random() * shapes.length)];
        } while (nextShape.id === current.id);
        return nextShape;
    };

    const handleShapeSelect = (shapeName) => {
        if (shapeName === currentShape.name) {
            const newProgress = progress + 1;
            setIsCorrect(true);
            setProgress(newProgress);
            if (newProgress === shapes.length) {
                setGameOver(true);
            }
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        setCurrentShape(getNextShape(currentShape));
        setIsCorrect(null);
    };

    const handleTryAgain = () => {
        setIsCorrect(null);
    };

    const handlePlayAgain = () => {
        setGameOver(false);
        setIsCorrect(null);
        setProgress(0);
        setCurrentShape(shapes[0]);
    };

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">{!gameOver ? 'What shape is this?' : 'Game Over'}</h2>
            {!gameOver ? (
                <>
                    <img src={currentShape.imageUrl} alt={currentShape.name} className="img-fluid mb-3" width={250} />

                    <div>
                    <div className=" " style={{ display: 'flex', justifyContent: 'center', maxWidth: '1100px', flexWrap: 'wrap', alignItems: 'center',  margin: '0 auto'}}>
                        {shapes.map((shape) => (
                            <button key={shape.id} className="btn btn-primary m-2" onClick={() => handleShapeSelect(shape.name)}>
                                {shape.name}
                            </button>
                        ))}
                    </div>
</div>

{
    gameOver && (
        <p>finish</p>
    )
}
                    {/* ... button layout */}
                    {isCorrect !== null && (
                        <div className="mt-3">
                            <p className={`text-${isCorrect ? 'success' : 'danger'}`}>
                                {isCorrect ? 'Correct!' : 'Wrong shape! Try again!'}
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
                <ProgressBar completed={Math.round((progress / shapes.length) * 100)} bgColor="#007bff" height="15px" labelSize='10px'/>
            </div>
        </div>
    );
};

export default ShapeGame;