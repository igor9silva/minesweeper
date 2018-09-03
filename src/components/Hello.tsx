
import * as React from 'react';
import './Hello.css';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

interface IState {
    currentEnthusiasmLevel: number;
}

export default class Hello extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { currentEnthusiasmLevel: props.enthusiasmLevel || 1 }
    }

    onIncrement = () => this.setCurrentEnthusiasmLevel(this.state.currentEnthusiasmLevel + 1);
    onDecrement = () => this.setCurrentEnthusiasmLevel(this.state.currentEnthusiasmLevel - 1);

    setCurrentEnthusiasmLevel(currentEnthusiasmLevel: number) {
        this.setState({ currentEnthusiasmLevel });
    }

    render() {

        const { name, enthusiasmLevel = 1 } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic.');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + this.exclamationMarks(this.state.currentEnthusiasmLevel)}
                </div>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.onIncrement}>+</button>
            </div>
        );
    }

    // Rendering Helpers

    exclamationMarks(amount: number) {
        return Array(amount + 1).join('!');
    }
}
