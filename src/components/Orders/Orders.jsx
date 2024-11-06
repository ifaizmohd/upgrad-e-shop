import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Step,
  Stepper,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNotification } from "../../common/Provider/Notification.provider";
import { isInvalidData, validateAddress } from "../../common/lib/validator";
import { AddressApi, OrderApi, ProductsApi } from "../../common/api";
import { AuthContext } from "../../common/Provider/Auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import { checkForSessionErrors } from "../../common/lib/utils";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

const Orders = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState({
    name: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    landmark: "",
    zipcode: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorObj, setErrorObj] = useState({ isPristine: true });
  const { showNotification } = useNotification();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    e.preventDefault();
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    setErrorObj({ isPristine: false });
  };

  const getAddresses = async () => {
    const { data, error } = await AddressApi.getAddress();
    checkForSessionErrors(error, showNotification, navigate, logout);
    setAddresses(data);
  };

  const getProductDetails = async () => {
    const { state } = location;
    const { data } = await ProductsApi.fetchProductDetails(state?.pid);
    if (data) {
      data.quantity = state?.qty;
      setOrderDetails(data);
    }
  };

  useEffect(() => {
    getAddresses();
    getProductDetails();
  }, []);

  const handleNext = () => {
    if (activeStep === 1 && !address) {
      showNotification("Please select address!", "error");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      window?.history?.back();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const { name, contact, street, city, state, zip } = newAddress;
    // if (!name || !contact || !street || !city || !state || !zip) {
    //   //   setShowAlert(true);
    //   return;
    // }
    newAddress.user = user?.id || "";
    const res = await AddressApi.createAddress(newAddress);
    if (res.error) {
      showNotification(`Error occurred while saving the address`, "error");
    } else {
      const formattedAddress = `${name}, ${contact}, ${street}, ${city}, ${state}, ${zip}`;
      setAddresses([...addresses, formattedAddress]);
      setNewAddress({
        name: "",
        contactNumber: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zipcode: "",
      });
    }
    console.log("[ADDRESS] ", res);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (orderDetails?.quantity < 1) {
      showNotification("Product Quantity should be 1 or more", "error");
    } else {
      const payload = {
        quantity: orderDetails?.quantity,
        user: user?.id,
        product: orderDetails?.id,
        address: address?.id,
      };
      const { data, error } = await OrderApi.placeOrder(payload);
      if (!error) {
        showNotification("Order Placed Successfully", "success");
      } else {
        showNotification(
          "Error occurred while placing the order. Please try again",
          "error"
        );
      }
      console.log("[PLACE ORDER] ", data);
    }
  };

  useEffect(() => {
    if (!address) {
      setErrorObj(validateAddress(newAddress));
    }
  }, [newAddress, address]);

  return (
    <ThemeProvider theme={theme}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
        <Step key={0}>
          <StepLabel>Items</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Select Address</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>Confirm Order</StepLabel>
        </Step>
      </Stepper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        {activeStep === 1 && (
          <>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: 2, maxWidth: 600 }}
            >
              <InputLabel htmlFor="address-select">Select Address</InputLabel>
              <Select
                label="Select Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                inputProps={{ id: "address-select" }}
              >
                {addresses.map((addr, index) => (
                  <MenuItem
                    key={index}
                    value={addr}
                  >{`${addr.name}, ${addr.street}, ${addr.city}`}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body1" align="center" sx={{ my: 2 }}>
              - OR -
            </Typography>
            <Typography variant="body1" align="center" sx={{ my: 2 }}>
              Add Address
            </Typography>

            <Box component="form" sx={{ display: "grid", gap: 2, width: 400 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={newAddress.name}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.name?.isValid}
              />
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                required
                name="contactNumber"
                value={newAddress.contact}
                onChange={handleFormChange}
                error={
                  !errorObj.isPristine && !errorObj?.contactNumber?.isValid
                }
              />
              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                required
                name="street"
                value={newAddress.street}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.street?.isValid}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                name="city"
                value={newAddress.city}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.city?.isValid}
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                required
                name="state"
                value={newAddress.state}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.state?.isValid}
              />
              <TextField
                label="Landmark"
                variant="outlined"
                fullWidth
                name="landmark"
                value={newAddress.landmark}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.landmark?.isValid}
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                required
                name="zipcode"
                value={newAddress.zip}
                onChange={handleFormChange}
                error={!errorObj.isPristine && !errorObj?.zipcode?.isValid}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSaveAddress}
                disabled={!!address || !isInvalidData(errorObj)}
              >
                SAVE ADDRESS
              </Button>
            </Box>
          </>
        )}

        {activeStep === 2 && orderDetails && (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                mt: 3,
                textAlign: "left",
                width: "100%",
                maxWidth: 1300,
                p: 2,
                border: "1px solid #ddd",
              }}
            >
              <Box sx={{ width: "48%" }}>
                <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
                  {orderDetails?.name}
                </Typography>
                <Typography variant="body1">
                  Quantity: {orderDetails?.quantity}
                </Typography>
                <Typography variant="body1">
                  Category: {orderDetails?.category}
                </Typography>
                <Typography variant="body1">
                  Description: {orderDetails?.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "red" }}>
                  Total Price: ₹{orderDetails?.quantity * orderDetails?.price}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "4%",
                  borderLeft: "1px solid #ddd",
                  height: "auto",
                  mx: 2,
                }}
              ></Box>

              <Box sx={{ width: "45%", textAlign: "left" }}>
                <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
                  Address Details
                </Typography>
                <Typography variant="body1">
                  {`${address?.city} ${address?.name}`}
                </Typography>
                <Typography variant="body1">
                  Contact Number: {address?.contactNumber}
                </Typography>
                <Typography variant="body1">
                  {`${address?.street}, ${address?.city}`}
                </Typography>
                <Typography variant="body1">State: {address?.state}</Typography>
                <Typography variant="body1">{`${address?.zipcode}`}</Typography>
              </Box>
            </Box>
          </Paper>
        )}

        <Box
          display="flex"
          justifyContent="space-around"
          sx={{ mt: 3, width: activeStep !== 2 ? 200 : 250 }}
        >
          <Button
            variant="text"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            BACK
          </Button>
          {activeStep !== 2 && (
            <Button variant="contained" color="primary" onClick={handleNext}>
              NEXT
            </Button>
          )}
          {activeStep === 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </Button>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Orders;
