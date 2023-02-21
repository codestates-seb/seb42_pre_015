import styled from 'styled-components';

const ProductsNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 150%;
  left: -80%;
  width: 210.656px;
  z-index: 2001;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;
const ProductsLi = styled.li`
  margin: 6px;
  padding: 6px;
  text-align: left;
  border-radius: 3px;
  display: block;
  &:hover {
    background-color: #d6d9dc;
  }
`;
const ProductsTitle = styled.span`
  max-width: 100%;
  display: block;
  font-size: 13px;
  color: black;
`;
const ProductsDes = styled.span`
  max-width: 100%;
  display: inline-block;
  font-size: 12px;
  color: rgb(106, 115, 124);
  white-space: normal;
`;

export default function ProductsNav() {
  return (
    <ProductsNavigation>
      <ol>
        <ProductsLi>
          <ProductsTitle>Stack Overflow</ProductsTitle>
          <ProductsDes>Public questions & answers</ProductsDes>
        </ProductsLi>
        <ProductsLi>
          <ProductsTitle>Stack Overflow for Teams</ProductsTitle>
          <ProductsDes>
            where developers & technologists share private Knowledge with
            coworkers
          </ProductsDes>
        </ProductsLi>
        <ProductsLi>
          <ProductsTitle>Talent</ProductsTitle>
          <ProductsDes>Build your employer brand</ProductsDes>
        </ProductsLi>
        <ProductsLi>
          <ProductsTitle>Advertising</ProductsTitle>
          <ProductsDes>Reach developers & technologists worldwide</ProductsDes>
        </ProductsLi>
      </ol>
    </ProductsNavigation>
  );
}
