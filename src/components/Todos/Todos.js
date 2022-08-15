import React, { useState, useEffect } from "react";
import "./_todos.scss";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import docPicture from "../../assets/unnamed.png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import toast from "react-hot-toast";

function Todos() {
  const [animationParent] = useAutoAnimate();
  const [totalSelectedCheckboxes, setTotalSelectedCheckboxes] = useState(0);
  const [val, setVal] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    let storedList = JSON.parse(localStorage.getItem("localTasks"));
    if (storedList) {
      setTodos(storedList);
    } else {
      setTodos([]);
    }
  }, []);
  useEffect(() => {
    setTotalSelectedCheckboxes(
      document.querySelectorAll("input[type=radio]:checked").length
    );
  }, [todos]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val) {
      let newTask = {
        todoText: val,
        isChecked: false,
        id: Date.now(),
      };
      setTodos([newTask, ...todos]);
      localStorage.setItem("localTasks", JSON.stringify([newTask, ...todos]));
      toast.success("Tapşırıq əlavə edildi!!!", {
        duration: 1500,
        position: "bottom-right",
        style: {},
      });
    } else {
      toast("Tapşırıq boş buraxıla bilməz!!!", {
        icon: "❌",
        duration: 1500,
        position: "top-right",
        style: {},
      });
    }
    setVal("");
  };
  const deleteAllItems = () => {
    setTodos([]);
    localStorage.removeItem("localTasks");
    toast.success("Tapşırıqlar silindi!!!", {
      duration: 1500,
      position: "top-left",
      style: {},
    });
  };
  const deleteItem = (uniqueDel) => {
    setTodos(todos.filter((todo) => todo.id !== uniqueDel));
    localStorage.setItem(
      "localTasks",
      JSON.stringify(todos.filter((todo) => todo.id !== uniqueDel))
    );
    toast.success("Tapşırıq silindi!!!", {
      duration: 1500,
      position: "bottom-left",
      style: {},
    });
  };
  const changeIsChecked = (unique) => {
    setTotalSelectedCheckboxes(
      document.querySelectorAll("input[type=radio]:checked").length
    );
    todos.forEach((todo) => {
      if (todo.id === unique) {
        todo.isChecked = true;
        localStorage.setItem(
          "localTasks",
          JSON.stringify([...todos], (todo.isChecked = true))
        );
      }
    });
  };
  return (
    <div className="TodoParent">
      <div className="inputTodo">
        <h1>TODO</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="text"
            placeholder="Tapşırığı həll edin..."
            type="text"
          />
          <button type="submit">
            <BsFillPlusSquareFill className="addIcon" />
          </button>
        </form>
      </div>
      <div className="todoList">
        <ul className="todos" ref={animationParent}>
          {todos.length === 0 ? (
            <div className="emptyUl">
              <img src={docPicture} alt="pic" />
              <p className="emptyTodo">Heç bir tapşırıq yoxdur...</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <li key={todo.id} className="last">
                {todo.isChecked ? (
                  <input
                    onChange={() => changeIsChecked(todo.id)}
                    className="radio"
                    type="radio"
                    checked
                  />
                ) : (
                  <input
                    onChange={() => changeIsChecked(todo.id)}
                    className="radio"
                    type="radio"
                  />
                )}
                <label>
                  {todo.isChecked ? (
                    <span className="lineThrought">{todo.todoText}</span>
                  ) : (
                    <span className="normal">{todo.todoText}</span>
                  )}
                  <RiDeleteBin6Line
                    onClick={() => deleteItem(todo.id)}
                    className="deleteIcon"
                  />
                </label>
              </li>
            ))
          )}
        </ul>
        <p className="fixedView">
          <span>Ümumi: {todos.length} tapşırıq</span>
          <span>Hazır: {totalSelectedCheckboxes} tapşırıq</span>
          <span onClick={deleteAllItems}>Hamısını sil</span>
        </p>
      </div>
    </div>
  );
}

export default Todos;
