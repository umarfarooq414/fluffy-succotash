import React from "react";
import { CircularProgress } from "@mui/material";
import "./styles.scss";

export const GenericButton = ({
  loading,
  onPress,
  buttonText,
  disable,
  grayButton,
  id,
  customStyle,
  end,
}) => {
  return (
    <>
      <div
        className={` ${
          end ? "endOfButton" : ""
        } generic-btn-container endOfButton`}
        id={id}
      >
        <button
          type="button"
          disabled={loading || disable}
          className={
            loading || disable || grayButton
              ? `disable-generic-btn ${customStyle}`
              : ` ${customStyle}`
          }
          onClick={onPress}
        >
          {loading ? (
            <div
              className={
                "d-flex justify-content-center align-items-center m-5 muiLoader"
              }
              style={{ textAlign: "center", color: "red" }}
            >
              <CircularProgress />
            </div>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </>
  );
};
