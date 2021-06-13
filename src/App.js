import "./App.css";
import React from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "./useImage";

const url1 =
  "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcmlzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const url2 =
  "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80";

function getImg(url) {
  let img = document.createElement("img");
  img.src = url;
  return img;
}

function App() {
  const [image, setImage] = useImage(url1);

  return (
    <div className="container">
      <h1>Image using Konva</h1>
      {/* <img src={url1} alt="" className="img-class" /> */}
      <button onClick={() => setImage({ image: getImg(url2) })}>
        Toggle Image
      </button>
      <Stage width={500} height={500}>
        <Layer>
          <Image image={image} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
