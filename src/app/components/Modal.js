"use client";

import { FaPlus } from "react-icons/fa";
import { useState, useRef } from "react";

const Modal = ({ onTaskAdded }) => {
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskAdded(newTask.newTask); // Notify the parent component of the new task
        setInputValue(""); // Clear input
        modalRef.current.close(); // Close the modal
      } else {
        alert("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred");
    }
  };

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      {/* Open modal button */}
      <button className="btn btn-primary w-full" onClick={openModal}>
        Add new task <FaPlus className="ml-2" size={18} />
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" onClick={closeModal}>
        <form className="modal-box" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add Task</h3>
          <input
            type="text"
            className="input input-bordered w-full mt-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter task"
          />
          <div className="modal-action">
            <button type="submit" className="btn">
              Save
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
