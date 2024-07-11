import styled from 'styled-components';

const List = styled.div`
`

const Element = styled.div`
  margin: .8rem 0;
  border-bottom: 1px solid var(--bs-border-color-translucent);

  &::last-child{
    border-bottom: none;
  }
`

const Text = styled.p`
  font-size: small;
  bottom-padding: .5rem;
`

export function Container({children}){
  return <div className="row">{children}</div>
}

export function Card({ img, text, title, links }) {
  return <>
    <div className="col col--4" style={{display: "flex"}}>
      <div className="card">
        <div className="card__image">
          <img src={img} alt="Learn" />
        </div>
        <div className="card__body">
          <h3>{title}</h3>
          <Text>{text}</Text>
          <List>
            {Object.keys(links).map(
              label => <Element><a href={links[label]}>{label}</a></Element>
            )}
          </List>
        </div>
      </div>
    </div>
  </>
}

export default { Card };