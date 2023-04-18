import Link from "next/link";
import { ReactNode, useState } from "react";
import styles from "./carbonLink.module.scss";

interface props {
  href?: string;
  children: ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
}

const CarbonLink = ({ href, children, className, target, onClick }: props) => {
  const [classNameStyle, setClassNameStyle] = useState(styles.default);

  return (
    <Link
      href={href || ""}
      target={target || ""}
      className={`${classNameStyle} ${className || ""}`}
      onMouseEnter={() => setClassNameStyle(styles.onFocus)}
      onMouseDown={() => setClassNameStyle(styles.onClick)}
      onMouseUp={() => setClassNameStyle(styles.onFocus)}
      onMouseLeave={() => setClassNameStyle(styles.default)}
      onClick={() => onClick?.()}
    >
      {children}
    </Link>
  );
};

export default CarbonLink;
