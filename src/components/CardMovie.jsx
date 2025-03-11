import PropTypes from "prop-types";

const CardMovie = (props) => {
    const {title, description, genre, ...otrasProps} = props;    

  return (
    <div className='cardMovie card'>
      <div className='card-body'>
        <h3 className='card-title'>{title}</h3>
        <p className='card-subtitle'>{genre}</p>
        <p className='card-text'>{description}</p>
        {/* <a className='card-link' href="#">Ver</a> */}
      </div>
    </div>
  )
}

CardMovie.displayName = "CardMovie";

CardMovie.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
}

export {CardMovie}
