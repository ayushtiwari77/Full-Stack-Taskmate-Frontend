import axios from "axios";
import toast from "react-hot-toast";
import { tempObject } from "../main";

/* eslint-disable react/prop-types */
export const TaskCard = ({ task, refresh, setRefresh }) => {
  const { title, description, _id, isCompleted } = task;

  async function handleDelete() {
    try {
      const items = await axios.delete(`${tempObject.server}/delete/${_id}`, {
        withCredentials: true,
      });
      setRefresh(!refresh);
      toast.success(items.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function handleComplete() {
    try {
      const items = await axios.put(
        `${tempObject.server}/completed/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRefresh(!refresh);
      toast.success(items.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="task-card">
      <div className="right-taskcard">
        <h3>{title}</h3>
        <p id="task-description">{description}</p>
      </div>
      <div className="left-taskcard">
        <input
          type="checkbox"
          name="isCompleted"
          id="completed"
          onChange={handleComplete}
          checked={isCompleted}
        />
        <button id="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
