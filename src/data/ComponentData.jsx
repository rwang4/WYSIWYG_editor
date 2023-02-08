export const txtDef = {
  name: 'Text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  color: 'black',
  width: 400,
  height: 220,
  fontSize: 16,
  border: 'solid',
  textAlign: 'center',
  letterSpacing: 0.5,
  margin: '4px 2px'
};

export const btnDef = {
  name: 'Button',
  text: 'Click Me',
  width: 130,
  height: 50,
  color: 'black',
  border: 'none',
  bgColor: 'lightGrey',
  margin: '4px 2px',
  padding: '15px 32px'
};

export default [
  {
    id: 1,
    name: 'Text',
    text: 'Text',
    color: 'black',
    fontSize: 16
  },
  {
    id: 2,
    name: 'Button',
    text: 'Click Me',
    color: 'black',
    border: 'none',
    bgColor: 'lightGrey',
    margin: (4, 2),
    padding: (15, 32)
  }
];
