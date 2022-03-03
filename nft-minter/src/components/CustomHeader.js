import React from "react"

const CustomHeader = ({customHeader, ... props}) => {
  return (
    <p>{props.text}</p>
  )
}

export default CustomHeader
