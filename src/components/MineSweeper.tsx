
import * as React from 'react';
import './MineSweeper.css';

import Cell from './Cell';
import { IState as CellState } from './Cell';

// Beginner = 8x8 | 10
// Intermidiate = 16x16 | 40
// Expert = 16x30 | 99

export interface IProps {
    height: number;
    width: number;
    mines: number;
}

interface IState {
    cells: CellState[];
    hasEnded: boolean;
}

export default class MineSweeper extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // TODO: check height, width and mines quantities

        this.initializeCells(props);
    }

    random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    initializeCells = (props: IProps) => {
        
        // 1. Initialize all cell states as blank

        const total = props.width * props.height;
        const cells = new Array<CellState>(total);

        for (let i = 0; i < total; i++) {
            cells[i] = { 
                isMine: false,
                isOpen: false,
                isFlagged: false,
                surroundingQuantity: 0, 
            }
        }

        // 2. Raffle all mine positions and update cell states

        const minePositions = new Array<number>();

        while (minePositions.length < props.mines) {

            const randomPosition = this.random(0, (props.width * props.height) - 1);

            if (minePositions.indexOf(randomPosition) === -1) {
                minePositions.push(randomPosition);
            }
        }

        minePositions.forEach(pos => cells[pos].isMine = true);

        // 3. Calculate surrounding quantities

        const increaseSurroundingQuantity = (pos: number) => {
            if (pos >= 0 && pos < (this.props.width * this.props.height)) {
                cells[pos].surroundingQuantity += 1;
            }
        }

        minePositions.forEach(pos => this.surroundingPositionsFor(pos).forEach(p => increaseSurroundingQuantity(p)));

        this.state = { cells, hasEnded: false };
    }

    surroundingPositionsFor(pos: number): number[] {

        const W = this.props.width;

        const positions = [];

        if ((pos + 1) % this.props.width !== 0) {
            positions.push(
                pos + 1,        // right
                pos - W + 1,    // right top
                pos + W + 1,    // right bottom
            );
        }

        if (pos % this.props.width !== 0) {
            positions.push(
                pos - 1,        // left
                pos - W - 1,    // left top
                pos + W - 1,    // left bottom
            );
        }

        return positions.concat([
            pos - W,        // top
            pos + W,        // bottom
        ]);
    }

    cellStateChanged = (pos: number, state: CellState) => {
        this.state.cells[pos] = state;
        this.checkIfEnded();
    }

    checkIfEnded = () => {

        if (this.state.hasEnded) { return }

        const openMines = this.state.cells.filter(cell => cell.isOpen && cell.isMine);

        if (openMines.length > 0) {

            const cells = this.state.cells.map(cell => {
                cell.isMine = true;
                cell.isOpen = true;
                return cell;
            });

            this.setState({ cells, hasEnded: true });

            alert("PERDEU!");
        }
    }

    render() {

        const style = {
            width: `${(Cell.DEFAULT_SIZE + 2) * this.props.width}px`,
        };

        return (
            <div className="map" style={style}>
                { this.state.cells.map((state, pos) => <Cell key={pos} pos={pos} initialState={state} onChange={this.cellStateChanged} />) }
            </div>
        );
    }
}
