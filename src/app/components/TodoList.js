import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react"; // Single import for React hooks

const TodoList = ({ data, onDeleteTask, onEditTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [editingValue, setEditingValue] = useState(""); // Track the input value during editing
  const inputRef = useRef(null); // Reference to the input field

  // Automatically focus the input field when editingTaskId changes
  useEffect(() => {
    if (editingTaskId && inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, [editingTaskId]);

  // Start editing a task
  const handleEdit = (task) => {
    setEditingTaskId(task.id); // Set the task being edited
    setEditingValue(task.value); // Pre-fill the input with the task's current value
  };

  // Save the edited task
  const handleSave = (taskId) => {
    if (editingValue.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    onEditTask(taskId, editingValue); // Call parent function to update the task
    setEditingTaskId(null); // Exit editing mode
    setEditingValue(""); // Clear the input value
  };

  // Render the table with tasks
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Task</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {data && data.length > 0 ? (
            data.map((task) => (
              <tr key={task.id}>
                <td className="w-full">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="input input-bordered w-full"
                      ref={inputRef} // Attach ref here
                    />
                  ) : (
                    task.value
                  )}
                </td>
                <td>
                  <div className="flex gap-2 justify-center">
                    {editingTaskId === task.id ? (
                      <>
                        {/* Save button */}
                        <button
                          className="btn text-green-500"
                          onClick={() => handleSave(task.id)}
                        >
                          <HiCheck size={18} />
                        </button>
                        {/* Cancel button */}
                        <button
                          className="btn text-gray-500"
                          onClick={() => setEditingTaskId(null)}
                        >
                          <IoClose size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit button */}
                        <button
                          className="btn text-blue-500"
                          onClick={() => handleEdit(task)}
                        >
                          <FaRegEdit size={18} />
                        </button>
                        {/* Delete button */}
                        <button
                          className="btn text-red-500"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <MdDeleteOutline size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
