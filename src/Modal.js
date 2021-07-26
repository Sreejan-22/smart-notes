import "./Modal.css";

const Modal = ({ setIsOpen }) => {
  return (
    <div
      className="modal-wrapper"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Welcome to the Modal</h1>
        <h3>This is Model created using pure css</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          laboriosam consectetur culpa placeat ea eum id. Accusantium omnis
          illum quis, illo nobis excepturi maiores. Ullam unde provident neque
          minima deserunt.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
