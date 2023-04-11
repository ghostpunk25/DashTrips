import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { BsPersonFillLock } from "react-icons/bs";

const positions = ['Passenger', 'Driver', 'Dispatcher']

export const Admin = ({ database, handlePsition }) => {
   let count = 1

   return (
      <section className='py-5'>
         <h1 className="text-white bg-danger py-2 mb-5 text-center d-flex align-items-center justify-content-center gap-3"><BsPersonFillLock />Users</h1>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Email/Phone Number</th>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Id</th>
               </tr>
            </thead>
            <tbody>
               {database.map(user => (
                  <tr key={user.user.uid}>
                     <td>{count++}</td>
                     <td>{user.user.email ? user.user.email : user.user.number}</td>
                     <td>
                        <Form.Select
                           aria-label={user.user.position}
                           onChange={(e) => handlePsition({ position: e.target.value, uid: user.user.uid })}
                        >
                           {positions.map(item => (
                              <option key={item} value={item}>{item}</option>
                           ))}
                        </Form.Select>
                     </td>
                     <td>{user.user.name}</td>
                     <td>{user.user.uid}</td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </section>
   );
}