import "./App.css";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import { TodoContext } from "./contexts/TodoContext";
import { createTheme,ThemeProvider } from "@mui/material/styles";



const initialTodos = [
  { id: 1, title: 'Learn React js', details: 'Study the basics of React', isCompleted: false },
  { id: 2, title: 'Build a Todo App', details: 'Create a simple todo application', isCompleted: false },
  { id: 3, title: 'Read a Book', details: 'Finish reading a book on JavaScript', isCompleted: false },
];

const theme = createTheme({
  palette: {
    primary: {
      main:"#dd2c00"
    },
    secondary: {
      main:"#004d40"
    },
  }
});


export default function App() {
  const [todosList, setTodosList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }, [todosList]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TodoContext.Provider value={{ todosList, setTodosList }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}






