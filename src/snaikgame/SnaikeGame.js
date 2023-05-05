import React, { Component } from 'react';
import Z from './SnakeGame.module.css';

export default class SnaikeGame extends Component {
    constructor(props) {
        super(props);
        this.state = { game: false, window: false };
    }

    gameClick = () => {
        this.setState({ game: true, window: true });
        console.log('клик играть ');
    };

    render() {
        return (
            <div className={Z.image}>
                <div className={`${Z.mainblockgame}  ${this.state.window === true && Z.black}`}>
                    <div onClick={() => this.gameClick()}>
                        {this.state.game !== true && (
                            <div className={Z.knopkaplay}>
                                <h1 className={Z.textPlay}>PLAY</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
