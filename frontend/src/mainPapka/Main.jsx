import React from 'react';
import C from './Content.module.css';
import SnaikeGame from '../snaikgame/SnaikeGame';
import MyCalendar from '../Calendar';

const menu = [
    {
        name: 'Главная',
        value: 'glavnaya',
        Component: SnaikeGame,
    },
    {
        name: 'Юлии',
        value: 'julia',
        Component: MyCalendar,
    },
    {
        name: 'Ирины',
        value: 'irina',
        Component: MyCalendar,
    },
    {
        name: 'Анастейши',
        value: 'anasteisha',
        Component: MyCalendar,
    },
    {
        name: 'Общий',
        value: 'forall',
        Component: MyCalendar,
    },
];

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'glavnaya',
        };
        console.log(this.props.userId);
    }
    onMenuClick = (value) => {
        this.setState({ selected: value });
        console.log(`клик на ${value}`);
    };
    render() {
        return (
            <div className={C.main}>
                <div className={C.header}>
                    {menu.map((punkt) => {
                        return (
                            <div
                                key={punkt.value}
                                onClick={() => this.onMenuClick(punkt.value)}
                                className={`${C[punkt.value]} ${
                                    this.state.selected === punkt.value && C.active
                                }`}
                            >
                                {punkt.name}
                            </div>
                        );
                    })}
                </div>
                {menu.map((punkt) => {
                    if (this.state.selected === punkt.value) {
                        const Component = punkt.Component;
                        return (
                            <Component
                                key={punkt.value}
                                userId={this.props.userId}
                                name={punkt.value}
                            />
                        );
                    }
                })}
            </div>
        );
    }
}

export default Main;
