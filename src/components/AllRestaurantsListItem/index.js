import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const ListItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="list-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />

        <div className="restaurant-details">
          <h1 className="name">{name}</h1>
          <p className="cuisine">{cuisine}</p>

          <div className="rating-container">
            <FaStar size="13px" color="#FFCC00" />
            <span className="rating">{rating}</span>
            <span className="review">({totalReviews} ratings)</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
