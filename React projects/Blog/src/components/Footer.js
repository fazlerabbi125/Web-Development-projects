import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="sticky-footer__content">
        Fazle Rabbi Faiyaz. All rights reserved &#169;
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: sticky;
  top: 100%;
  width: 100%;
  padding-bottom: 20px;

  .sticky-footer__content {
    text-align: center;
    font-weight: 700;
    color: grey;
  }
`;

export default Footer;
