import { Alert , Snackbar } from '@mui/material'
import React from 'react'

const CustomSnackBar = ({autoHideDuration=3000,handleClose=()=>{},open=false, severity="success", message=""}) => {
    return (
    <Snackbar open={open} anchorOrigin={{vertical:"top", horizontal:"right"}} autoHideDuration={autoHideDuration} onClose={handleClose}>
    <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
     {message}
    </Alert>
  </Snackbar>
  )
}

export default CustomSnackBar