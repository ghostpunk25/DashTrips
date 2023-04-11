import { useEffect, useState } from "react"
import { ModalCust } from "../../components/ModalCust/ModalCust"
import Table from 'react-bootstrap/Table';
import { ref, set, onValue, remove } from "firebase/database";
import { db } from '../../firebase'
import { Button } from "react-bootstrap";
import { BsFillBusFrontFill } from "react-icons/bs";

export const Trips = ({ user }) => {
   const [show, setShow] = useState(false);
   const [trips, setTrips] = useState([])
   const [dbTrips, setDbTrips] = useState([])

   let count = 1
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   const handleAddTrip = (trip) => {
      writeUserData(trip)
   }

   //DELETE
   const handleDeleteTrip = (id) => {
      remove(ref(db, `users/${user.uid}/trips/${id}`))
      setDbTrips(prevState => prevState.filter(item => item.id !== id))
   }

   useEffect(() => {
      //READ
      onValue(ref(db, `users/${user.uid}/trips/`), (snapshot) => {
         const data = snapshot.val();
         if (data !== null) {
            setDbTrips(Object.values(data))
         }
      });
   }, [trips, user.uid]);

   //POST
   function writeUserData(trip) {
      set(ref(db, `users/${user.uid}/trips/${trip.id}`), {
         date: trip.date,
         from: trip.from,
         to: trip.to,
         number: trip.number,
         passengers: trip.passengerN,
         id: trip.id,
      });
      setTrips(prevState => [...prevState, trip])
   }

   return (
      <section className='py-5'>
         <h1 className='text-white bg-danger py-2 text-center mb-4 d-flex align-items-center justify-content-center gap-3'><BsFillBusFrontFill />Trips</h1>
         <Button variant="primary" onClick={handleShow} className='mb-5'>
            +Add trip
         </Button>
         <ModalCust
            handleAddTrip={handleAddTrip}
            handleShow={handleShow}
            handleClose={handleClose}
            show={show} />
         {dbTrips.length !== 0 ? <Table striped bordered hover>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Number car</th>
                  <th>Number of passengers</th>
                  <th>Id</th>
               </tr>
            </thead>
            <tbody>
               {dbTrips.map(({ date, from, to, number, passengers, id }) => (
                  <tr key={id}>
                     <td>{count++}</td>
                     <td>{date}</td>
                     <td>{from}</td>
                     <td>{to}</td>
                     <td>{number}</td>
                     <td>{passengers}</td>
                     <td>{id}</td>
                     <td><Button className="btn-danger" onClick={() => handleDeleteTrip(id)}>Delete trip</Button></td>
                  </tr>
               ))}
            </tbody>
         </Table>
            : <p className="fs-1 text-secondary text-center py-5">There is no information</p>}
      </section>
   )
}