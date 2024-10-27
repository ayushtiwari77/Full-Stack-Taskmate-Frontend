import { useContext, useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import toast from "react-hot-toast";
import axios from "axios";
import { tempObject } from "../main";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { setIsAuthenticated } = useContext(tempObject.Context);

  async function createProject(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const item = await axios.post(
        `${tempObject.server}/create`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(item.data.message);
      setLoading(false);
      setRefresh(!refresh);
      setDescription("");
      setTitle("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      const response = await axios.get(`${tempObject.server}/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const items = await axios.get(`${tempObject.server}/all`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTasks(items.data.tasks);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchTasks();
  }, [refresh]);

  return (
    <main>
      <div className="upper-div">
        <button onClick={logout} disabled={loading}>
          Logout
        </button>
      </div>
      <div className="lower-div">
        <form onSubmit={createProject}>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title Of Task"
            required
            value={title}
          />
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            required
            value={description}
          />
          <button type="submit" disabled={loading}>
            Create Task
          </button>
        </form>
      </div>

      <div className="task-div">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task._id}
              task={task}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
