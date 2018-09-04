
import * as React from 'react';
import './Cell.css';

export interface IProps {
    pos: number;
    initialState: IState;
    onChange: (pos: number, state: any) => any;
}

export interface IState {
    isMine: boolean;
    isOpen: boolean;
    isFlagged: boolean;
    surroundingQuantity: number;
}

export default class Cell extends React.Component<IProps, IState> {

    static DEFAULT_SIZE = 45; // px

    constructor(props: IProps) {
        super(props);
        this.state = props.initialState;
    }

    componentWillReceiveProps(nextProps: IProps) {
        this.setState(nextProps.initialState);
    }

    setIsMine = () => {
        const isMine = true;
        this.setState({ isMine });
    }

    toggleOpen = () => {
        const isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    toggleFlagged = (event: React.MouseEvent<HTMLDivElement>) => {

        event.preventDefault();

        const isFlagged = !this.state.isFlagged;
        this.setState({ isFlagged });
    }

    render() {

        this.props.onChange(this.props.pos, this.state);

        const size = this.state.isFlagged ? Cell.DEFAULT_SIZE - 2 : Cell.DEFAULT_SIZE;

        const style = {
            width: `${size}px`,
            height: `${size}px`,
            lineHeight: `${size}px`,
        }

        let classes = 'cell';

        if (this.state.isOpen) {
            classes += ' open';
        }

        if (this.state.isMine) {
            classes += ' mine';
        }

        if (this.state.isFlagged) {
            classes += ' flagged';
        }

        if (this.state.surroundingQuantity > 0) {
            classes += ` surrounding-${this.state.surroundingQuantity}`;
        }

        const shouldShowQuantity = (this.state.isOpen && !this.state.isMine && this.state.surroundingQuantity > 0);

        return (
            <div className={classes} style={style} onClick={this.toggleOpen} onContextMenu={this.toggleFlagged}>
                { shouldShowQuantity ? `${this.state.surroundingQuantity}` : '' }
                {/* { this.props.x },{ this.props.y } */}
            </div>
        );
    }
}