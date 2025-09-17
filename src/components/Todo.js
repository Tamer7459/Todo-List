import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useContext, useState } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useToast } from '../contexts/ToastContext'

export default function Todo({ todo }) {
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateInput, setUpdateInput] = useState(todo.title)
    const [updateDetails, setUpdateDetails] = useState(todo.details)

    const { todosList, setTodosList } = useContext(TodoContext)
    const { showToast } = useToast()

    // ✅ toggle completed
    function handleCheckClicks() {
        const updatedTodos = todosList.map(t =>
            t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
        )
        setTodosList(updatedTodos)
        showToast('The task has been updated ', { severity: 'success' })
    }

    // ✅ delete
    function handleDeleteConfirm() {
        const updatedTodos = todosList.filter(t => t.id !== todo.id)
        setTodosList(updatedTodos)
        setOpen(false)
        showToast('The task has been deleted ', { severity: 'error' })
    }

    // ✅ update
    function handleUpdateConfirm() {
        const updatedTodos = todosList.map(t =>
            t.id === todo.id
                ? { ...t, title: updateInput, details: updateDetails }
                : t
        )
        setTodosList(updatedTodos)
        setUpdate(false)
        showToast('The task has been modified', { severity: 'info' })
    }

    return (
        <>
            {/* Delete Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ color: 'black' }}>
                    Are you sure you want to delete the task?
                </DialogTitle>
                <DialogContent>
                    <Typography color="black">
                        You cannot undo a deletion after it has been completed.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleDeleteConfirm}
                        autoFocus
                    >
                        Yes, delete it
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Update Dialog */}
            <Dialog open={update} onClose={() => setUpdate(false)}>
                <DialogTitle style={{ color: 'black' }}>
                    Update Task
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Task title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateInput}
                        onChange={e => setUpdateInput(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Details"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateDetails}
                        onChange={e => setUpdateDetails(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setUpdate(false)}>
                        Cancel
                    </Button>
                    <Button color="secondary" onClick={handleUpdateConfirm}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Todo Card */}
            <Card
                className="todoCard"
                sx={{
                    minWidth: 275,
                    backgroundColor: '#0016c0ff',
                    color: 'white',
                    marginTop: 5
                }}
            >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                sx={{
                                    textAlign: 'left',
                                    textDecoration: todo.isCompleted
                                        ? 'line-through'
                                        : 'none'
                                }}
                            >
                                {todo.title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    textAlign: 'left',
                                    textDecoration: todo.isCompleted
                                        ? 'line-through'
                                        : 'none'
                                }}
                            >
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid
                            size={4}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {/* ✅ Check */}
                            <IconButton
                                aria-label="check"
                                style={{
                                    color: todo.isCompleted
                                        ? 'white'
                                        : '#8bc34a',
                                    background: todo.isCompleted
                                        ? '#8bc34a'
                                        : 'white',
                                    border: 'solid 3px #8bc34a',
                                    borderRadius: '30px'
                                }}
                                onClick={handleCheckClicks}
                            >
                                <CheckIcon />
                            </IconButton>

                            {/* ✅ Edit */}
                            <IconButton
                                aria-label="edit"
                                style={{
                                    color: '#1769aa',
                                    background: 'white',
                                    border: 'solid 3px #1769aa',
                                    borderRadius: '30px'
                                }}
                                onClick={() => setUpdate(true)}
                            >
                                <AddToPhotosOutlinedIcon />
                            </IconButton>

                            {/* ✅ Delete */}
                            <IconButton
                                aria-label="delete"
                                style={{
                                    color: 'red',
                                    background: 'white',
                                    border: 'solid 3px red',
                                    borderRadius: '30px'
                                }}
                                onClick={() => setOpen(true)}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
