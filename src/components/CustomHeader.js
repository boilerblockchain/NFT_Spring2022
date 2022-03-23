import React from "react"
// TODO: make this not suck
const CustomHeader = ({...props}) => {
  return (
    <p>{props.text}</p>
  )
};

export default CustomHeader;
