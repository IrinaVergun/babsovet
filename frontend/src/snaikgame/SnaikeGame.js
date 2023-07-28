import React, { Component } from 'react';
import Z from './SnakeGame.module.css';
import Snakepole from './Snakepole.js';

export default class SnaikeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: false,
            window: false,
            kybikPosition: {
                top: 0,
                left: 0,
            },
        };
    }

    gameClick = () => {
        this.setState({ game: true, window: true });
    };

    onGameEnd = () => {
        this.setState({ game: false, window: false });
    };

    render() {
        return (
            <div className={Z.image}>
                <div className={`${Z.mainblockgame}  ${this.state.window === true && Z.black}`}>
                    {this.state.game && <Snakepole onGameEnd={this.onGameEnd} />}

                    <div onClick={() => this.gameClick()}>
                        {this.state.game !== true && (
                            <div className={Z.knopkaplay}>
                                <h1 className={Z.textPlay}>PLAY</h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className={Z.update}>
                    Version 1.4 обновлено:змея двигаеться на телефоне и это не галюны!
                </div>
            </div>
        );
    }
}
