import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  href: string;
  text: string;
}

function NavLink(props: NavLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === props.href;
  return (
    <Link href={props.href} className={isActive ? "" : ""}>
      {props.text}
    </Link>
  );
}

export default NavLink;
