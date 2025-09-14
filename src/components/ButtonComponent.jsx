import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ children, onClick, variant = "primary", size = "sm" }) => {
  return (
    <Button variant={variant} size={size} onClick={onClick} className="mx-1">
      {children}
    </Button>
  );
};

export default ButtonComponent;
