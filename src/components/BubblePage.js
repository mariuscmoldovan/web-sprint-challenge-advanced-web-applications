import React, { useEffect, useState } from "react";
import {axiosWithAuth} from "../helpers/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService().then((res) => {
    setColors(res)
    })
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
      axiosWithAuth()
        .put(`/colors/${editColor.id}`, editColor)
            .then((res) => {
                console.log(res)
             setColors([
                  ...colors
                ])
            })
            .catch((err) => {
                console.log(err)
            })
    }
  
  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
        .then((res) => {
          setColors(colors.filter(color => color.id !== colorToDelete.id))
        })
        .catch((err) => {
          console.log(err)
        })
  };



  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;