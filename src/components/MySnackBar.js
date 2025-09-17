import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useToast } from '../contexts/ToastContext'

export default function MySnackBar() {
    const { open, message, severity, closeToast } = useToast()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        closeToast()
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
