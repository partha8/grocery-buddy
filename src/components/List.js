import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      <Droppable droppableId="list-item">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => {
                const { id, title } = item;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => {
                      return (
                        <article
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="grocery-item"
                        >
                          <p className="title">{title}</p>
                          <div className="button-container">
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() => editItem(id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="trash-button"
                              type="button"
                              onClick={() => removeItem(id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </article>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};