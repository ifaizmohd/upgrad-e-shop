import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Auth.context";
import { ProductsApi } from "../../api";
import { checkForSessionErrors } from "../../lib/utils";
import { useNotification } from "../../Provider/Notification.provider";
import CustomDialog from "../CustomDialog/CustomDialog";

const ProductCard = ({ product, refetchProducts }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isAdmin, logout } = useContext(AuthContext);
  const { name, price, imageUrl, description, id } = product;

  const navigateToPdp = (e) => {
    e.preventDefault();
    const url = `/products/${id}`;
    navigate(url);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const { data, error } = await ProductsApi.deleteProduct(id);
    checkForSessionErrors(error, showNotification, navigate, logout);
    if (data === 200) {
      showNotification("Product Deleted Successfully", "success");
      refetchProducts(true);
    }
    setOpenDialog(false);
  };

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 445 }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={imageUrl}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ maxWidth: { lg: "240px" } }}
            noWrap={true}
          >
            {name}
          </Typography>
          <Typography variant="h6">₹{price}</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#3f51b5" }}
          onClick={navigateToPdp}
        >
          Buy
        </Button>
        {isAdmin ? (
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : null}
        <CustomDialog
          isOpen={openDialog}
          title="Confirm Deletion of product!"
          dialogMessage="Are you sure you want to delete the product?"
          closeDialog={setOpenDialog}
          dialogAction={handleDelete}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
