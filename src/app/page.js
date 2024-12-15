"use client";

import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/getData");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", response.status);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  

  // Add a new task (called by Modal)
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Edit a task
  const editTask = (taskId, updatedValue) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, value: updatedValue } : task
      )
    );
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">To-do List</h1>
        <Modal onTaskAdded={addTask} />
      </div>
      <TodoList data={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
    </main>
  );
}
