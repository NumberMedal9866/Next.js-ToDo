"use client";

import { useState, useRef } from "react";

const Modal = ({ onTaskAdded }) => {
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);

  // Clear any invalid selection to avoid `getRangeAt` errors
  const clearSelection = () => {
    try {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        selection.removeAllRanges();
        console.log("Selection cleared");
      }
    } catch (error) {
      console.warn("Error clearing selection:", error);
    }
  };

  // Open the modal
  const openModal = () => {
    console.log("Opening modal...");
    clearSelection();
    if (modalRef.current) {
      modalRef.current.showModal(); // For `<dialog>` element
      const input = modalRef.current.querySelector("input");
      if (input) input.focus(); // Set focus to input inside the modal
    }
  };

  // Close the modal
  const closeModal = (e) => {
    if (e?.target === modalRef.current) {
      modalRef.current.close();
    }
  };

  // Handle form submission and save the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      // Save the task to the backend
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
      });

      const responseText = await response.text(); // Read the response body
      console.log("Response status:", response.status);
      console.log("Response body:", responseText);

      if (response.ok) {
        const newTask = JSON.parse(responseText);
        onTaskAdded(newTask.newTask); // Notify parent component of the new task
        setInputValue(""); // Clear the input field
        modalRef.current.close(); // Close the modal
      } else {
        setInputValue("");
        modalRef.current.close();
        alert("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred");
    }
  };

  return (
    <div>
      {/* Open modal button */}
      <button className="btn btn-primary w-full" onClick={openModal}>
        Add new task
      </button>

      {/* Dialog-based modal */}
      <dialog
        ref={modalRef}
        className="modal"
        onClick={closeModal} // Close modal on backdrop click
      >
        <form className="modal-box" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add Task</h3>
          <input
            type="text"
            className="input input-bordered w-full mt-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your task"
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
