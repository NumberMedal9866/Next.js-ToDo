import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const TodoList = ({ data, onDeleteTask, onEditTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // To track the task being edited
  const [editingValue, setEditingValue] = useState(""); // To track the new value during editing

  // Start editing a task
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.value);
  };

  // Save the edited task
  const handleSave = (taskId) => {
    if (editingValue.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    onEditTask(taskId, editingValue); // Call the parent function to update the task
    setEditingTaskId(null); // Exit editing mode
    setEditingValue(""); // Clear the editing value
  };

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
          {data && data.length > 0 ? (data.map((task) => (
              <tr key={task.id}>
                <td className="w-full">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    task.value
                  )}
                </td>
                <td>
                  <div className="flex gap-2 justify-center">
                    {editingTaskId === task.id ? (
                      <>
                        <button
                          className="btn text-green-500"
                          onClick={() => handleSave(task.id)}
                        >
                          <HiCheck size = {18}/>
                        </button>
                        <button
                          className="btn text-grey-500"
                          onClick={() => setEditingTaskId(null)}
                        >
                          <IoClose  size = {18}/>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn text-blue-500"
                          onClick={() => handleEdit(task)}
                        >
                          <FaRegEdit size={18} />
                        </button>
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
