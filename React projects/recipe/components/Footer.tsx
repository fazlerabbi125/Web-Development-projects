import styled from "styled-components";

export default function Footer() {
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
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f8f8f8;

  .sticky-footer__content {
    text-align: center;
    font-weight: 700;
    color: rgba(0,0,0,0.87);
  }
`;