import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsApi } from "../../common/api";
import PageLayout from "../../common/components/PageLayout/PageLayout";
import { Box, CardMedia, Typography } from "@mui/material";
import CustomInput from "../../common/components/CustomInput/CustomInput";
import CustomButton from "../../common/components/CustomButton/CustomButton";

const ProductDetailPage = () => {
  const [productInfo, setProductInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToOrdersPage = (e) => {
    e.preventDefault();
    navigate("/orders");
  };

  useEffect(() => {
    async function getProductDetails() {
      const res = await ProductsApi.fetchProductDetails(id);
      setProductInfo(res);
    }
    getProductDetails();
  }, []);
  return (
    <PageLayout containerSize="xl" topMargin="4em">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          src={productInfo?.imageUrl}
          alt={productInfo?.name}
          sx={{ objectFit: "contain", m: "0 40px 0 40px" }}
          height="450"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            rowGap: 2,
            maxWidth: "450px",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h5">{productInfo?.name}</Typography>
            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                display: "flex",
                borderRadius: "25px",
                p: "5px 10px 5px 10px",
                fontWeight: 500,
              }}
            >
              Available Items: {productInfo?.availableItems}
            </Typography>
          </Box>
          <Typography component="span">
            Category:{" "}
            <Typography component="span" sx={{ fontWeight: 700 }}>
              {productInfo?.category}
            </Typography>
          </Typography>
          <Typography sx={{ fontStyle: "italic" }}>
            {productInfo?.description}
          </Typography>
          <Typography color="red">₹{productInfo?.price}</Typography>
          <CustomInput label="Enter Quantity" required type="number" />
          <CustomButton variant="contained" onClick={navigateToOrdersPage}>
            PLACE ORDER
          </CustomButton>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default ProductDetailPage;
