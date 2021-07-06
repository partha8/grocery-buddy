import React, { useEffect } from "react";
const Alert = ({ message,type, removeAlert, list }) => {
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     removeAlert();
  //   }, 3000);
  //   return () => clearTimeout(timeout);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [list]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
