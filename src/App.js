import './App.css';
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState();
  const [sentiment, setSentiment] = useState({});

  const emojiObj = {
    neutral: (
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Slightly%20Smiling%20Face.png"
        alt="Slightly Smiling Face"
        width="40"
        height="40"
      />
    ),
    positive: (
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Smiling%20Eyes.png"
        alt="Grinning Face with Smiling Eyes"
        width="40"
        height="40"
      />
    ),
    negative: (
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Diagonal%20Mouth.png" alt="Face with Diagonal Mouth" width="40" height="40" />
    ),
  };
  
  const getEmoji = (score) => {
    if (score > 40) {
      return emojiObj["positive"];
    } else if (score > 20 && score <= 40) {
      return emojiObj["neutral"];
    } else {
      return emojiObj["negative"];
    }
  };

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
  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     // mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };
  const handleSentimentalAnalysis = async (e) => {
    const reqBody = {
      lang: "en",
      phrase: text,
    };
    try {
      const response = await postData("http://localhost:5002/api/sentiment", reqBody);
      response.emoji = getEmoji(response.score);
      console.log(response)
     setSentiment(response);
    } catch (error) {}
  };
 return (
  <>
  <h1>Let's check about yourself</h1>
   <div className="App">
    <form onSubmit={handleSubmit}>
     <h4>In text</h4>
     <textarea name="textInput" placeholder="Explain about your feeling" value={text} onChange={handleTextChange} /><br />
     <input type="submit" value="Analysis" onClick={handleSentimentalAnalysis} />
     <input type="reset" onClick={() => setText('')} />
     {!!sentiment.emoji ? <div style={{color: "#9f9c9c", display: "flex", alignItems: "center", fontSize: "1rem", justifyContent: "flex-start"}}>Overall sentiment of the content: {sentiment.emoji} </div> : <span></span> }
     <h4>In Image</h4>
     <img alt="emotion" id="uploadedImage" src={file || "th.jpeg"} height="200px" width="200px"/><br/>
     <label htmlFor="imageInput">Upload image</label>
     <input type="file" id="imageInput" onChange={handleFileChange} accept="image/jpeg, image/png, image/jpg" />
     <button type="submit">Submit</button>

     </form>
     </div>
    </>
  );
}

export default App;
