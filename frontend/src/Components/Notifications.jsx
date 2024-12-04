import notifications from '../briefs.json'
const Notifications = () => {
  return (
    notifications.map((item, index) => {
      return(
        <>
          <a href="" className="divider-x-2 px-3"><li key={index}>{item.notification}</li></a>
        </>
      )
       
    })
  )
};

export default Notifications;

/*
<nav  ref={nav} className={`nav${menu ? ' responsive' : ''} ${isScrolled ? ' sticky' : ''}`} >
      <div className="nav-main">
        <div className="logo">
          <img src={assets.logo} alt="logo" />
        </div>
        <ul className="menus">
          <div className='menu-toggle' onClick={() => setMenu(!menu)}>
            {
              menu ? <FaTimes /> : null
            }
          </div>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <Dropdown subNav={administration} title="Administration" link="/administration" />
          <Dropdown subNav={admission} title="Admissions" link="/admission" />
          <Dropdown subNav={faculties} title="Faculties" link="/all-faculties" />
          <Dropdown subNav={faculties} title="Library" link="/library" />

        </ul>
        <div>
          <button>Contact Us</button>
        </div>
      </div>
      <article ref={brief} className="briefs ">
           <h5 className='title'> News</h5>
          <ul>
            <Notifications />
          </ul>
        </article>
      <div className='menu-toggle' onClick={() => setMenu(!menu)}>
        {
          menu ? null : <FaBars />
        }
      </div>
*/ 
