import Link from "next/link";
import { useRouter } from "next/router";
import styled from '@emotion/styled'

interface CustomNavLinkProps {
  href: string;
  children: string;
}

function CustomNavLink(props: CustomNavLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href} passHref legacyBehavior>
      <NavLink isActive>{props.children}</NavLink>
    </Link>
  );
}

const NavLink = styled.a<{ isActive: boolean }>`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`
export default CustomNavLink;
