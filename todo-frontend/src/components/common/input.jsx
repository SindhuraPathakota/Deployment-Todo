import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group" style={{ background: "transparent",
      border: "`none",width : "550px"}}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
