import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { List } from "./List";
import { DragDropContext } from "react-beautiful-dnd";

export const Form = () => {
  const [list, setList] = useState(() => {
    const listItems = window.localStorage.getItem("list");
    return listItems ? JSON.parse(listItems) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter an Item", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "Item edited successfully", "success");
    } else {
      showAlert(true, "Item added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "Item Removed", "danger");
  };

  const editItem = (id) => {
    const itemEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(itemEdit.title);
  };

  const clearHandler = () => {
    setList([]);
    showAlert(true, "Empty List", "danger");
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(list);
    const [reorderedListItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedListItem);

    setList(items);
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={submitHandler}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h2>Grocery Buddy</h2>
        <input
          type="text"
          className="grocery-input"
          placeholder="eg. Milk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-button">
          {isEditing ? "edit" : "submit"}
        </button>
      </form>
      {list.length > 0 && (
        <div className="grocery-comtainer">
          {" "}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <List items={list} removeItem={removeItem} editItem={editItem} />
          </DragDropContext>
          <button className="clear-btn" onClick={clearHandler}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
};
