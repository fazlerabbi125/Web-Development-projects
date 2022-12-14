import Link from "next/link";
import { useRouter } from "next/router";

interface CustomNavLinkProps {
  href: string;
  children: string;
}

function CustomNavLink(props: CustomNavLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === props.href;
  return (
    <Link
      href={props.href}
      className={isActive ? "nav-item__link--active" : "nav-item__link"}
    >
      {props.children}
    </Link>
  );
}

export default CustomNavLink;
