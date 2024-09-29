import { ReactNode } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: { children: ReactNode }) => {
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;
  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
