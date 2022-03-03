import React from "react";

const TextField = ({update, ...props}) => {
  return (
    <input
    onChange={update}
    placeholder={props.text}
    />

  )

};

export default TextField;
