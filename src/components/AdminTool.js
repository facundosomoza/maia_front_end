import React from "react";

import Button from "react-bootstrap/Button";

export default function AdminTool({ handleNew }) {
  return (
    <div>
      <Button onClick={handleNew}>New</Button>
    </div>
  );
}
