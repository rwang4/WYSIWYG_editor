import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CopyBlock, dracula } from 'react-code-blocks';
/**
 * code dialog that displays Custom App's source code
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

function createCustomHtml(codeBlock) {
  return String.raw`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Custom Application</title>
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    ${codeBlock}
  </body>
</html>`;
}

export default function CodeDialog({ open, handleClose }) {
  const [codeBlock, setCodeBlock] = useState('');
  const eventHandler = (e) => {
    setCodeBlock(e.data);
  };
  useEffect(() => {
    window.addEventListener('message', eventHandler, false);
    return () => {
      window.removeEventListener('message', eventHandler);
    };
  });
  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Custom Application Source Code
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CopyBlock
            text={createCustomHtml(codeBlock)}
            language={'html'}
            theme={dracula}
            wrapLines
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
