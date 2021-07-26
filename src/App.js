import React, { useState } from "react";
import "./App.css";
import Modal from "./Modal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app backgroundClass">
      <h1>React Modal</h1>
      <br />
      <div>
        <button style={{ width: "180px" }} onClick={() => setIsOpen(true)}>
          Click to open the Modal
        </button>
      </div>
      <p style={{ margin: "3rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        non sunt cum mollitia est inventore at, nisi nobis perferendis ratione
        cumque ad unde, maxime suscipit incidunt corporis tempore quaerat.
        Laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis, non sunt cum mollitia est inventore at, nisi nobis
        perferendis ratione cumque ad unde, maxime suscipit incidunt corporis
        tempore quaerat. Laborum.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Perspiciatis, non sunt cum mollitia est inventore at,
        nisi nobis perferendis ratione cumque ad unde, maxime suscipit incidunt
        corporis tempore quaerat. Laborum.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default App;
