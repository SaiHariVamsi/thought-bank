import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Todo from "./pages/ToDo";
import Venture from "./pages/Venture"; 
import Random from "./pages/Random";
import TodoList from "./pages/ToDoList";
import RandomList from "./pages/RandomList";
import VentureList from "./pages/VentureList";

function App() {
  return (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/venture" element={<Venture />} />
            <Route path="/random" element={<Random />} />
            <Route path="/tasks" element={<TodoList/>}/>
            <Route path="/thoughts" element={<RandomList/>}/>
            <Route path="/ideas" element={<VentureList/>}/>
            <Route path="/" element={<Home />} />
          </Routes>
  );
}

export default App;
