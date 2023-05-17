import Link from "next/link";
import { ReactNode, useState } from "react";
import styles from "./carbonLink.module.scss";

interface Props {
  href?: string;
  children: ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
}

function CarbonLink({ href, children, className, target, onClick }: Props) {
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
}

export default CarbonLink;
