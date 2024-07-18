import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Text:', text);
    console.log('File:', file);
  };

 return (
  <>
  <h1>Let's check about yourself</h1>
   <div className="App">
    <form onSubmit={handleSubmit}>
     <h4>In text</h4>
     <textarea name="textInput" placeholder="Explain about your feeling" value={text} onChange={handleTextChange} /><br />
     <input type="submit" value="Analysis" />
     <input type="reset" onClick={() => setText('')} />

     <h4>In Image</h4>
     <img id="uploadedImage" src={file || "th.jpeg"} height="200px" width="200px"/><br/>
     <label htmlFor="imageInput">Upload image</label>
     <input type="file" id="imageInput" onChange={handleFileChange} accept="image/jpeg, image/png, image/jpg" />
     <button type="submit">Submit</button>

     </form>
     </div>
    </>
  );
}

export default App;
