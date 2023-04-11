import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const ModalAuthPhone = ({
   requestOTP,
   visibleForm,
   handlePhoneNumber,
   phoneNumber,
   verifyOTP,
   OTP,
   handleClose,
   show
}) => {

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Enter by phone number</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={requestOTP}>
               <Form.Group className='mb-4'>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                     type="text"
                     pattern="[0-9+]*"
                     required
                     name="phone"
                     value={phoneNumber}
                     onChange={(e) => handlePhoneNumber(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                     The phone number format must be: +38 (000) 00 00 000
                  </Form.Text>
               </Form.Group>
               {visibleForm
                  ? <Form.Group>
                     <Form.Label>OTP number</Form.Label>
                     <Form.Control
                        type="number"
                        name="number"
                        value={OTP}
                        onChange={verifyOTP}
                     />
                     <Form.Text className="text-muted">
                        OTP code must be: 000000
                     </Form.Text>
                  </Form.Group>
                  : <Button type='submit'>Get OTPCode</Button>}
               <div id='sign-in-button'></div>
            </Form>
         </Modal.Body>
      </Modal>
   );
}