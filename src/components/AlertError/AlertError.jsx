import Alert from 'react-bootstrap/Alert';

export function AlertDismissibleExample({ handleCloseAlert, error }) {

   return (
      <Alert
         className='w-50 position-absolute top-20 start-50 translate-middle'
         variant="danger"
         onClose={handleCloseAlert}
         dismissible>
         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
         {error}
      </Alert>
   );
}