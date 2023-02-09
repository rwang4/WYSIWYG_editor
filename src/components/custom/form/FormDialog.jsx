import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { btnDef } from '../../../data/ComponentData';

export default function FormDialog({ open, comp, setComp, closeHandler }) {
  const [text, setText] = useState(btnDef.text);
  const [width, setWidth] = useState(btnDef.width);
  const [height, setHeight] = useState(btnDef.height);
  const [color, setColor] = useState(btnDef.color);
  const [bgcolor, setbgColor] = useState(btnDef.bgColor);
  const [border, setBorder] = useState(btnDef.border);
  const [paddingV, setPaddingV] = useState(parseInt(btnDef.padding.slice(0, 2)));
  const [paddingH, setPaddingH] = useState(parseInt(btnDef.padding.slice(5, 7)));
  const reset = () => {
    setText(comp.text);
    setWidth(comp.width);
    setHeight(comp.height);
    setColor(comp.style.color);
    setbgColor(comp.style.backgroundColor);
    setBorder(comp.style.border);
    setPaddingV(parseInt(comp.style.padding.slice(0, 2)));
    setPaddingH(parseInt(comp.style.padding.slice(5, 7)));
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);
  return (
    <div>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>Edit Selected Button CSS</DialogTitle>
        <DialogContent>
          <TextField
            id="text"
            label="Text"
            defaultValue={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            sx={{ m: 1, width: '15ch' }}
            variant="outlined"
            size="small"
          />
          <TextField
            id="width"
            label="Width"
            defaultValue={width}
            onChange={(e) => {
              const value = Math.max(0, Math.min(300, Number(e.target.value)));
              setWidth(value);
            }}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 300 } }}
            sx={{ m: 1, width: '15ch' }}
            variant="outlined"
            size="small"
          />
          <TextField
            id="height"
            label="Height"
            defaultValue={height}
            onChange={(e) => {
              const value = Math.max(0, Math.min(150, Number(e.target.value)));
              setHeight(value);
            }}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 150 } }}
            sx={{ m: 1, width: '15ch' }}
            variant="outlined"
            size="small"
          />
          <FormControl sx={{ m: 1, width: '15ch' }} size="small">
            <FormHelperText>Text Color</FormHelperText>
            <Select
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={'black'}>Black</MenuItem>
              <MenuItem value={'white'}>White</MenuItem>
              <MenuItem value={'green'}>Green</MenuItem>
              <MenuItem value={'blue'}>Blue</MenuItem>
              <MenuItem value={'red'}>Red</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '15ch' }} size="small">
            <FormHelperText>Background Color</FormHelperText>
            <Select
              value={bgcolor}
              onChange={(e) => {
                setbgColor(e.target.value);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={'lightGrey'}>LightGrey</MenuItem>
              <MenuItem value={'black'}>Black</MenuItem>
              <MenuItem value={'green'}>Green</MenuItem>
              <MenuItem value={'blue'}>Blue</MenuItem>
              <MenuItem value={'red'}>Red</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '15ch' }} size="small">
            <FormHelperText>Border</FormHelperText>
            <Select
              value={border}
              onChange={(e) => {
                setBorder(e.target.value);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={'none'}>None</MenuItem>
              <MenuItem value={'solid'}>Solid</MenuItem>
              <MenuItem value={'dot'}>Dot</MenuItem>
              <MenuItem value={'dash'}>Dash</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="paddingV"
            label="Padding Vertical"
            defaultValue={paddingV}
            onChange={(e) => {
              const value = Math.max(0, Math.min(100, Number(e.target.value)));
              setPaddingV(value);
            }}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            sx={{ m: 1, width: '15ch' }}
            variant="outlined"
            size="small"
          />
          <TextField
            id="paddingH"
            label="Padding Horizontal"
            defaultValue={paddingH}
            onChange={(e) => {
              const value = Math.max(0, Math.min(200, Number(e.target.value)));
              setPaddingH(value);
            }}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 200 } }}
            sx={{ m: 1, width: '15ch' }}
            variant="outlined"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              closeHandler();
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setComp({
                ...comp,
                text: text,
                width: width,
                height: height,
                style: {
                  ...comp.style,
                  color: color,
                  border: border,
                  backgroundColor: bgcolor,
                  margin: btnDef.margin,
                  padding: `${paddingV}px ${paddingH}px`,
                  height: height,
                  width: width,
                  overflow: 'hidden'
                }
              });
              closeHandler();
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
