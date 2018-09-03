
// import * as React from 'react';
// import * as enzyme from 'enzyme';
// import MineSweeper from './MineSweeper';

// it('renders the correct text when no enthusiasm level is given', () => {
//     const hello = enzyme.shallow(<MineSweeper name='MineSweeper' />);
//     expect(hello.find(".greeting").text()).toEqual('Hello MineSweeper!')
// });

// it('renders the correct text with an explicit enthusiasm of 1', () => {
//     const hello = enzyme.shallow(<MineSweeper name='MineSweeper' enthusiasmLevel={1}/>);
//     expect(hello.find(".greeting").text()).toEqual('Hello MineSweeper!')
// });

// it('renders the correct text with an explicit enthusiasm level of 5', () => {
//     const hello = enzyme.shallow(<MineSweeper name='MineSweeper' enthusiasmLevel={5} />);
//     expect(hello.find(".greeting").text()).toEqual('Hello MineSweeper!!!!!');
// });

// it('throws when the enthusiasm level is 0', () => {
//     expect(() => {
//         enzyme.shallow(<MineSweeper name='MineSweeper' enthusiasmLevel={0} />);
//     }).toThrow();
// });

// it('throws when the enthusiasm level is negative', () => {
//     expect(() => {
//         enzyme.shallow(<MineSweeper name='MineSweeper' enthusiasmLevel={-1} />);
//     }).toThrow();
// });