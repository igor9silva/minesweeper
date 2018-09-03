
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
    cells: CellState[][];
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

        const cells = new Array<CellState[]>(props.width);

        for (let x = 0; x < props.width; x++) {

            cells[x] = new Array<CellState>(props.height);

            for (let y = 0; y < props.height; y++) {

                cells[x][y] = { 
                    isMine: false,
                    isOpen: true,
                    isFlagged: false,
                    surroundingQuantity: 0, 
                }
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

        minePositions.forEach(pos => {

            const width = this.props.width;
            const x = Math.floor(pos % width);
            const y = Math.floor(pos / width);

            cells[x][y].isMine = true;
        });

        // 3. Calculate surrounding quantities

        const increaseSurroundingQuantity = (x: number, y: number) => {
            if (x >= 0 && y >= 0 && x < this.props.width && y < this.props.height) {
                cells[x][y].surroundingQuantity += 1;
            }
        }

        minePositions.forEach(pos => {

            const width = this.props.width;
            const x = Math.floor(pos % width);
            const y = Math.floor(pos / width);

            increaseSurroundingQuantity(x - 1, y    ); // left
            increaseSurroundingQuantity(x - 1, y - 1); // left top
            increaseSurroundingQuantity(x    , y - 1); // top
            increaseSurroundingQuantity(x + 1, y - 1); // right top
            increaseSurroundingQuantity(x + 1, y    ); // right
            increaseSurroundingQuantity(x + 1, y + 1); // right bottom
            increaseSurroundingQuantity(x    , y + 1); // bottom
            increaseSurroundingQuantity(x - 1, y + 1); // left bottom
        });

        this.state = { cells };
    }

    get allCells(): CellState[] {
        return this.state.cells.reduce((all, cur) => all.concat(cur))
    }

    cellStateChanged = (x: number, y: number, state: any) => {
        this.state.cells[x][y] = state;
        this.checkIfEnded();
    }

    checkIfEnded = () => {

        // const openMines = this.allCells.filter(cell => cell.isOpen && cell.isMine);

        // if (openMines.length > 0) {
        //     // alert("CABOU!");
        // }
    }

    render() {

        const style = {
            width: `${(Cell.DEFAULT_SIZE + 2) * this.props.width}px`,
        };

        const cells = [];

        for (let y = 0; y < this.props.height; y++) {
            for (let x = 0; x < this.props.width; x++) {
                cells.push(<Cell key={`${x}-${y}`} x={x} y={y} initialState={this.state.cells[x][y]} onChange={this.cellStateChanged} />)
            }
        }

        return (
            <div className="map" style={style}>
                {cells}
            </div>
        );
    }
}
