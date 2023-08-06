import React, { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import "../createNews.css";
import { getNewsContent } from "../../../js/services/user.js";
import { json } from "react-router-dom";

const TextEditor = ({ setContent, initialValue }) => {

  useEffect(() => {
   if(initialValue!=""){

     let a = getNewsContent(initialValue)
     .then((response) => {
       // Aquí puedes trabajar con la respuesta (response) obtenida de la función
       setValue({ ops: response });
      })
      .catch((error) => {
        // Manejo de errores si ocurre algún problema en la función o en la promesa
        console.error("Error:", error);
      });
      
    }
    
    return () => {
      console.log('El componente se desmontó.');// Realizar aquí las operaciones de limpieza necesarias, si las hay.
    };
  }, []); 
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"], // Add "video" to enable adding videos via link
      ["clean"],
      [{ font: [] }], // Add font options to the toolbar
      [{ color: [] }], // Add text color options to the toolbar
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video", // Add "video" to support videos
    "font", // Add font formats to support changing text fonts
    "color", // Add color formats to support changing text color
  ];
  const [value, setValue] = useState();

 

  function submit(e) {
    e.preventDefault();

    const deltaJson = JSON.stringify(value.ops);
    // console.log(deltaJson + "deltaJson");
  }

  function handleChange(content, delta, source, editor) {
    setValue(editor.getContents());
    console.log(editor.getContents());
    setContent(JSON.stringify(editor.getContents().ops));
  }

  return (
    <>
      <ReactQuill
        className="r-quill"
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
      <p>{JSON.stringify(value)}</p>
    </>
  );
};

export default TextEditor;
