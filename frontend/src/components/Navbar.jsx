import '../assets/Nav.css'
import Logo  from '../../public/default.svg'

const Navbar = () => {
    return (
        <div className="sidenav">
            <img src={Logo} alt="Logo" className='Logo' />
            <ul>
                <li><a href="/"></a>Home</li>
                <li><a href=""></a>About us</li>
                <li><a href=""></a>Contact us</li>
                <li><a href=""></a></li>
            </ul>
        </div>
    )
}

export default Navbar