import './index.css'

const TravelPlace = props => {
  const {eachPlace} = props
  const {imageUrl, name, description} = eachPlace
  return (
    <li>
      <img src={imageUrl} alt={name} className="place-image" />
      <div className="card-container">
        <h1 className="place-name">{name}</h1>
        <p className="desc">{description}</p>
      </div>
    </li>
  )
}

export default TravelPlace
