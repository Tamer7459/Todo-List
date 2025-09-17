import * as React from 'react'

const ToastContext = React.createContext({
    showToast: () => {},
    closeToast: () => {},
    open: false,
    message: '',
    severity: 'info'
})

export function ToastProvider({ children }) {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [severity, setSeverity] = React.useState('info')

    const showToast = React.useCallback((msg, options = {}) => {
        const { severity: sev = 'info' } = options
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }, [])

    const closeToast = React.useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <ToastContext.Provider
            value={{ showToast, closeToast, open, message, severity }}
        >
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    return React.useContext(ToastContext)
}
