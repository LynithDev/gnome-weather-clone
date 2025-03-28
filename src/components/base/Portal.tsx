import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, mount = window.document.body }: { mount?: HTMLElement | null } & PropsWithChildren) => {
    return mount && createPortal(children, mount)
}

export default Portal;