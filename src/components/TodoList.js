import CssBaseline from '@mui/material/CssBaseline'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Todo from './Todo'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState, useContext, useMemo } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import Box from '@mui/material/Box'

export default function TodoList() {
    const { todosList, setTodosList } = useContext(TodoContext)
    const [titleInput, setTitleInput] = useState('')
    const [detailsInput, setDetailsInput] = useState('')
    const [filter, setFilter] = useState('all') // 🔹 جديد

    const filteredTodos = useMemo(() => {
        return todosList.filter(t => {
            if (filter === 'completed') return t.isCompleted
            if (filter === 'notCompleted') return !t.isCompleted
            else return true
        })
    }, [todosList, filter])

    const todosJsx = filteredTodos.map(t => <Todo key={t.id} todo={t} />)

    function handleAddClick() {
        if (titleInput.trim() === '' || detailsInput.trim() === '') {
            return
        }

        const newTodo = {
            id: Date.now(),
            title: titleInput,
            details: detailsInput,
            isCompleted: false
        }

        setTodosList([...todosList, newTodo])
        setTitleInput('')
        setDetailsInput('')
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        transition: 'all 0.3s ease-in-out'
                    }}
                >
                    <Card
                        sx={{ minWidth: 275 }}
                        style={{
                            maxHeight: '95vh',
                            overflowY: 'auto',
                            width: '100%'
                        }}
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h2">
                                MY TODO LIST
                            </Typography>
                            <Divider />
                            <ToggleButtonGroup
                                color="primary"
                                aria-label="Platform"
                                exclusive
                                value={filter}
                                onChange={(e, newFilter) => {
                                    if (newFilter !== null) setFilter(newFilter)
                                }}
                                style={{ marginTop: '30px' }}
                            >
                                <ToggleButton value="all">All</ToggleButton>
                                <ToggleButton value="completed">
                                    Completed
                                </ToggleButton>
                                <ToggleButton value="notCompleted">
                                    Not Completed
                                </ToggleButton>
                            </ToggleButtonGroup>
                            {todosJsx}
                            <Grid
                                container
                                spacing={2}
                                style={{ marginTop: '15px' }}
                            >
                                <Grid
                                    size={6}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <TextField
                                        value={titleInput}
                                        id="task-title"
                                        label="Task title "
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={e => {
                                            setTitleInput(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    size={6}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <TextField
                                        value={detailsInput}
                                        id="task-details"
                                        label="Task details "
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        onChange={e => {
                                            setDetailsInput(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    size={12}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            padding: '20px'
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            handleAddClick()
                                        }}
                                        disabled={
                                            titleInput.trim() === '' ||
                                            detailsInput.trim() === ''
                                        }
                                    >
                                        Add Todo
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}
