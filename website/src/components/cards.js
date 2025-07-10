import clsx from 'clsx';
import styled from 'styled-components';

const List = styled.div``;

const Element = styled.div`
  margin: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.175);

  &::last-child {
    border-bottom: none;
  }
`;

const Text = styled.p`
  font-size: 0.87rem;
  margin-bottom: 0.75rem;
`;

export function Container({ children }) {
  return <div className="row card-row">{children}</div>;
}

export function Card({ img, text, title, links }) {
  // Extract the base name and create both light and dark versions
  const svgStyle = {
    mask: `url(${img}) round`,
    background: 'var(--icon-svg-color)',
    maskSize: 'contain',
  }

  return (
    <>
      <div className="col col--4" style={{ display: 'flex' }}>
        <div className="card card--icon">
          <div className="card__icon">
            <span className={"card__icon-svg"} style={svgStyle} />
          </div>
          <div className="card__body">
            <h3>{title}</h3>
            <Text className="card__description">{text}</Text>
            <List className="card__links">
              {Object.keys(links).map((label, index) => (
                <Element key={index}>
                  <a href={links[label]}>{label}</a>
                </Element>
              ))}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}

export default { Card };
