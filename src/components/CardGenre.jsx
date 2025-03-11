import PropTypes from "prop-types";

const CardGenre = (props) => {
    const {title, description, ...otrasProps} = props;    

  return (
    <div className='cardGenre card'>
      <div className='card-body'>
        <h3 className='card-title'>{title}</h3>
        <p className='card-text'>{description}</p>
        {/* <a className='card-link' href="#">Ver</a> */}
      </div>
    </div>
  )
}

CardGenre.displayName = "CardGenre";

CardGenre.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export {CardGenre}
