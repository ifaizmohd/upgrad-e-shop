import React from "react";
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

const ProductCard = ({ product, isAdmin }) => {
  const { name, price, imageUrl, description } = product;
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
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
