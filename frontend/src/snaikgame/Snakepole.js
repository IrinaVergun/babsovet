import React from 'react';
import './SnakePole.css';
import Z from './SnakeGame.module.css';

const BOARD_SIZE = 10;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
const AVATBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
const SPEED = 600;
const WIN_RESULT = `25`;
const checkAvaitableSlot = (position) => {
    switch (true) {
        case position >= BOARD_SIZE:
            return 0;
        case position < 0:
            return BOARD_SIZE - 1;
        default:
            return position;
    }
};
const Snakepole = ({ onGameEnd }) => {
    // змейку, еду, направление
    const [snake, setSnake] = React.useState([[1, 1]]);
    const [food, setFood] = React.useState([0, 0]);
    const [direction, setDirection] = React.useState(AVATBLE_MOVES[0]);
    const handleKeyDown = (event) => {
        const index = AVATBLE_MOVES.indexOf(event.key);
        if (index > -1) {
            setDirection(AVATBLE_MOVES[index]);
        }
    };
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    });
    React.useEffect(() => {
        const interval = gameLoop();
        return () => clearInterval(interval);
    }, [snake]);
    const generateFood = () => {
        let newFood;
        do {
            newFood = [
                Math.floor(Math.random() * BOARD_SIZE),
                Math.floor(Math.random() * BOARD_SIZE),
            ];
        } while (snake.some((elem) => [0] === newFood[0] && elem[1] === newFood[1]));
        setFood(newFood);
    };
    const gameLoop = () => {
        const timerId = setTimeout(() => {
            let newSnake = snake;
            let move = [];
            switch (direction) {
                case AVATBLE_MOVES[0]:
                    move = [1, 0];
                    break;
                case AVATBLE_MOVES[1]:
                    move = [-1, 0];
                    break;
                case AVATBLE_MOVES[2]:
                    move = [0, 1];
                    break;
                case AVATBLE_MOVES[3]:
                    move = [0, -1];
                    break;
            }

            const nextRow = checkAvaitableSlot(newSnake[newSnake.length - 1][0] + move[0]);
            const nextCell = checkAvaitableSlot(newSnake[newSnake.length - 1][1] + move[1]);

            const head = [nextRow, nextCell];
            newSnake.push(head);
            let spliceIndex = 1;

            // если змея съела еду
            if (head[0] === food[0] && head[1] === food[1]) {
                if (newSnake.length - 1 === WIN_RESULT) {
                    alert('Победа!');
                    return onGameEnd();
                }
                spliceIndex = 0;
                generateFood();
            }

            newSnake = newSnake.slice(spliceIndex);

            // если змея съела саму себя
            for (let i = 0; i < newSnake.length - 1; i++) {
                const cell = newSnake[i];
                if (head[0] === cell[0] && head[1] === cell[1]) {
                    alert(`Игра проиграна! Очки: ${newSnake.length - 1}`);
                    return onGameEnd();
                }
            }

            setSnake(newSnake);
        }, SPEED);
        return timerId;
    };

    return (
        <div className='zmeikaIres'>
            {' '}
            <div className={Z.onlypole}>
                {DEFAULT_CELLS_VALUE.map((row, indexR) => (
                    <div key={indexR} className='myrow'>
                        {row.map((cell, indexC) => {
                            let type =
                                snake.some((elem) => elem[0] === indexR && elem[1] === indexC) &&
                                'snake';

                            const head = snake[snake.length - 1];
                            if (type === 'snake' && indexR === head[0] && indexC === head[1]) {
                                type = 'head';
                            } else if (type !== 'snake') {
                                type = food[0] === indexR && food[1] === indexC && 'food';
                            }

                            return <Cell key={indexC} type={type} />;
                        })}
                    </div>
                ))}
                <div className={Z.krest}>
                    <div className={Z.stroka1}>
                        <div
                            className={Z.dvijok1}
                            onClick={() => setDirection(AVATBLE_MOVES[1])}
                        ></div>
                    </div>

                    <div className={Z.stroka2}>
                        <div
                            className={Z.dvijok2}
                            onClick={() => setDirection(AVATBLE_MOVES[3])}
                        ></div>
                        <div
                            className={Z.dvijok3}
                            onClick={() => setDirection(AVATBLE_MOVES[2])}
                        ></div>
                    </div>
                    <div className={Z.stroka3}>
                        <div
                            className={Z.dvijok4}
                            onClick={() => setDirection(AVATBLE_MOVES[0])}
                        ></div>
                    </div>
                </div>
            </div>
            <div className='blockres'>
                <h1>Результат:{snake.length - 1}</h1>
            </div>
        </div>
    );
};

const Cell = ({ type }) => {
    return <div className={`cell ${type}`} />;
};
export default Snakepole;
