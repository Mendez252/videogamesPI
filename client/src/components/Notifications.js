import React, { useState, useEffect } from "react";
import "./styles/Notification.css";

const Notification = ({ errors }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [errors]);

  const renderNotify = () => {
    return (
      <>
        {errors && (
          <p className="notificationError__container">
            There are errors on the form or is incomplete.
          </p>
        )}
        {!errors && (
          <p className="notification__container">
            Videogame sucessfully added !
          </p>
        )}
      </>
    );
  };

  return <>{visible && renderNotify()}</>;
};

export default Notification;
