import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Address from '../../models/Address';
import PaymentDetail from '../../models/PaymentDetail';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const products: Product[] = [
];
let address = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: ""
};
let paymentDetail = [
  { name: 'Card type', detail: '' },
  { name: 'Card holder', detail: '' },
  { name: 'Card number', detail: '' },
  { name: 'Expiry date', detail: '' },
];


export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updateAddress = (newAddress: Address) => {
    address = newAddress
  }

  const updatePayment = (newPaymentDetail: PaymentDetail[]) => {
    paymentDetail = newPaymentDetail
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} updateAddress={updateAddress} />;
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} updatePayment={updatePayment} />;
      case 2:
        return <Review handleNext={handleNext} handleBack={handleBack} payments={paymentDetail} address={address} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <AppBar
        position="absolute"
        color='secondary'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap onClick={() => navigate('/')}>
            Revature Swag Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
}