const TravelPlace = props => {
  const {eachPlace} = props
  const {imageUrl, name, description} = eachPlace
  return (
    <li>
      <img src={imageUrl} />
      <div className="card-container">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </li>
  )
}

export default TravelPlace
