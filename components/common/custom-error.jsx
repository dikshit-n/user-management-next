import { useEffect, useState } from "react";

export const CustomErrorComponent = ({ statusCode }) => {
  const [opacity, setOpacity] = useState(0);
  // to avoid the glitch, reduce the opacity for a second
  useEffect(() => {
    setTimeout(() => setOpacity(1), 1000);
  }, []);
  return (
    <div style={{ opacity }}>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <a href="/">Home</a>
    </div>
  );
};
