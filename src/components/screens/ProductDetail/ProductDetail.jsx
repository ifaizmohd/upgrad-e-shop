import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsApi } from "../../../common/api";
import PageLayout from "../../PageLayout/PageLayout";
import { Box, CardMedia, Typography } from "@mui/material";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";

const ProductDetailPage = () => {
  const [productInfo, setProductInfo] = useState({});
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToOrdersPage = (e) => {
    e.preventDefault();
    navigate("/orders", { state: { pid: id, qty } });
  };

  useEffect(() => {
    async function getProductDetails() {
      const { data } = await ProductsApi.fetchProductDetails(id);
      setProductInfo(data);
    }
    getProductDetails();
  }, [id]);

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
          sx={{ objectFit: "contain", m: "0 40px 0 40px", width: "450px" }}
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
            <Typography
              variant="h5"
              sx={{ maxWidth: { lg: "240px" } }}
              noWrap={true}
            >
              {productInfo?.name}
            </Typography>
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
          <CustomInput
            label="Enter Quantity"
            required
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            error={qty > productInfo?.availableItems}
          />
          <CustomButton
            variant="contained"
            onClick={navigateToOrdersPage}
            disabled={qty < 1 || qty > productInfo?.availableItems}
          >
            PLACE ORDER
          </CustomButton>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default ProductDetailPage;
