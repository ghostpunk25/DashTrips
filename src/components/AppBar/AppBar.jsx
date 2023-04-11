import { Link, } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import cat from "../../img/cat.jpg"
import Button from 'react-bootstrap/Button';
import { BsFillBusFrontFill, BsFillClipboardDataFill, BsFillChatHeartFill, BsPersonFillLock } from "react-icons/bs";

const navItems = [
   { href: 'trips', text: 'Trips', icon: <BsFillBusFrontFill /> },
   { href: 'statistics', text: 'Statistics', icon: <BsFillClipboardDataFill /> },
   { href: 'feedback', text: 'Feedback', icon: <BsFillChatHeartFill /> },
   { href: 'admin', text: 'Admin', icon: <BsPersonFillLock /> },
]

export const AppBar = ({ handleLogOut, user, admin }) => {
   let visiblenavItems

   if (admin.includes(user.email)) {
      visiblenavItems = navItems
   } else {
      visiblenavItems = navItems.filter(contact =>
         !contact.text.toLowerCase().includes('admin'));
   }

   return (
      <aside className='d-flex flex-column appbar-container py-5 px-3 border-end border-dark bg-light'>
         <div className='d-flex justify-content-center mb-4'><img src={cat} alt="avatar" /></div>
         <p className='text-center fw-bold'>{user.email ? user.email : user.phoneNumber}</p>
         <Nav as='nav' variant="pills" defaultActiveKey={navItems[0].href} className='d-flex flex-column gap-3 mb-3'>
            {visiblenavItems.map(({ text, href, icon }) => (
               <Nav.Item key={href}>
                  <Nav.Link as='div' eventKey={href}>
                     <Link className='d-flex text-dark text-decoration-none fw-bold text-dark d-flex align-items-center gap-3' to={href}>{icon}{text}</Link>
                  </Nav.Link>
               </Nav.Item>
            ))}
         </Nav>
         <Button onClick={handleLogOut} variant='danger' className='mt-auto'>Exit</Button>
      </aside>
   )
}