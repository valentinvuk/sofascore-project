import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SvgComponent from "./BellSvg";
import { Toast } from "./Toast";

export function Header() {
  const [visible, setVisible] = useState(false);

  const onButtonClick = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <header>
      <Link className="logo" to="/">
        OFF.SIDE
      </Link>

      <SvgComponent
        onClick={onButtonClick}
        className="trackedbutton"
        height="24"
        fill="white"
      />
      {visible && (
        <Toast>
          <SvgComponent
            onClick={onButtonClick}
            className="portalButton"
            height="24"
            fill="white"
          />
        </Toast>
      )}
    </header>
  );
}
