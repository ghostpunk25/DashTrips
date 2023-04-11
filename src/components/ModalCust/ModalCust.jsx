import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { nanoid } from 'nanoid';
import uaCitys from '../../uaCitys.json';

const passengers = [0, 1, 2, 3, 4, 5, 6]

export const ModalCust = ({ handleAddTrip, handleClose, show }) => {
   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [number, setNumber] = useState('')
   const [passengerN, setPassengerN] = useState(passengers[0])
   const [date, setDate] = useState('')


   const handleInputChange = event => {
      switch (event.target.name) {
         case 'from':
            setFrom(event.target.value);
            break;
         case 'to':
            setTo(event.target.value);
            break;
         case 'number':
            setNumber(event.target.value);
            break;
         case 'passengerN':
            setPassengerN(event.target.value);
            break;
         case 'date':
            setDate(event.target.value);
            break;
         default: return;
      };
   };

   const onSearchFrom = (city) => {
      setFrom(city)
   }

   const onSearchTo = (city) => {
      setTo(city)
   }

   const handleSubmit = event => {

      event.preventDefault();

      if (from !== '' && to !== '' && number !== '' && date !== '') {
         handleAddTrip({ id: nanoid(10), from, to, number, passengerN, date });
         handleClose()
      }

      setFrom('');
      setTo('');
      setNumber('');
      setPassengerN(passengers[0]);
      setDate('');
   };

   return (
      <>
         <Modal show={show} onHide={handleClose}>
            {!(from && to && number && date) && <div className="alert alert-info" role="alert">
               All fields must be filled!
            </div>}
            <Modal.Header closeButton className='py-3'>
               <Modal.Title>New trip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form className=" px-5 py-3 d-flex flex-column gap-4" noValidate onSubmit={handleSubmit}>
                  <Form.Group md="4" >
                     <Form.Label>From:</Form.Label>
                     <Form.Control
                        type="text"
                        name="from"
                        value={from}
                        onChange={handleInputChange}
                     />
                     <div className='d-flex flex-column bg-white border position-absolute w-50'>
                        {uaCitys.filter(city => {
                           const normalize = from.toLowerCase()
                           const fullName = city.city.toLowerCase()
                           return normalize && fullName.startsWith(normalize) && fullName !== normalize
                        })
                           .map(city => <div key={nanoid(10)} onClick={() => onSearchFrom(city.city)} className='my-1 mx-2 cursor'>{city.city}</div>)
                           .slice(0, 10)}
                     </div>
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>To:</Form.Label>
                     <Form.Control
                        type="text"
                        name="to"
                        value={to}
                        onChange={handleInputChange}
                     />
                     <div className='d-flex flex-column bg-white border position-absolute w-50'>
                        {uaCitys.filter(city => {
                           const normalize = to.toLowerCase()
                           const fullName = city.city.toLowerCase()
                           return normalize && fullName.startsWith(normalize) && fullName !== normalize
                        })
                           .map(city => <div key={nanoid(10)} onClick={() => onSearchTo(city.city)} className='my-1 mx-2 cursor'>{city.city}</div>)
                           .slice(0, 10)}
                     </div>
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Number car:</Form.Label>
                     <Form.Control
                        type="text"
                        name="number"
                        value={number}
                        onChange={handleInputChange}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Number of passengers</Form.Label>
                     <Form.Select onChange={handleInputChange} name="passengerN" aria-label="Number of passengers">
                        {passengers.map(passenger => (
                           <option key={passenger} value={passenger}>{passenger}</option>
                        ))}
                     </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="validationFormik05">
                     <Form.Label className='d-block'>Date</Form.Label>
                     <input className='border rounded p-1 fs-5 w-100' onChange={handleInputChange} required name='date' value={date} type="datetime-local" />
                  </Form.Group>
                  <Button onClick={handleSubmit} type="submit">Add trip</Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   )
};