import PropTypes from "prop-types";

const CardUser = (props) => {
    const {name, lastname, role, email, ...otrasProps} = props;    

  return (
    <div className='cardUser card'>
      <div className='card-body'>
        <h3 className='card-title'>{name} {lastname}</h3>
        <p className='card-text'>Role: {role}</p>
        <p className='card-text'>Email: {email}</p>
        {/* <a className='card-link' href="#">Ver</a> */}
      </div>
    </div>
  )
}

CardUser.displayName = "CardUser";

CardUser.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export {CardUser}
