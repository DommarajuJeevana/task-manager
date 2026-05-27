import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [editingTask, setEditingTask] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(
          userInfo.token
        );

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        const updatedTask = await updateTask(
          editingTask._id,
          formData,
          userInfo.token
        );

        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id
              ? updatedTask
              : task
          )
        );

        setEditingTask(null);
      } else {
        const newTask = await createTask(
          formData,
          userInfo.token
        );

        setTasks([newTask, ...tasks]);
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, userInfo.token);

      setTasks(
        tasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const updatedTask = await updateTask(
        task._id,
        {
          ...task,
          status:
            task.status === "Pending"
              ? "Completed"
              : "Pending",
        },
        userInfo.token
      );

      setTasks(
        tasks.map((t) =>
          t._id === task._id
            ? updatedTask
            : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Task Manager
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your daily tasks easily
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="p-3 border rounded-xl"
              >
                <option value="Low">
                  Low Priority
                </option>

                <option value="Medium">
                  Medium Priority
                </option>

                <option value="High">
                  High Priority
                </option>
              </select>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="p-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>
          </form>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full p-3 border rounded-xl mb-6 bg-white"
        />

        <div className="grid md:grid-cols-2 gap-5">
          {tasks
            .filter((task) =>
              task.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">
                    {task.title}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.priority ===
                      "High"
                        ? "bg-red-100 text-red-600"
                        : task.priority ===
                          "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  {task.description}
                </p>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <span
                    className={`font-medium ${
                      task.status ===
                      "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span className="text-gray-400">
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => {
                      setEditingTask(task);

                      setFormData({
                        title: task.title,
                        description:
                          task.description,
                        priority:
                          task.priority,
                        dueDate:
                          task.dueDate
                            ? task.dueDate.split(
                                "T"
                              )[0]
                            : "",
                      });
                    }}
                    className="flex-1 py-2 rounded-xl bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task._id)
                    }
                    className="flex-1 py-2 rounded-xl bg-red-500 text-white"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(task)
                    }
                    className="flex-1 py-2 rounded-xl bg-green-500 text-white"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;