import { Typography } from "@mui/material";
import PageLayout from "../../PageLayout/PageLayout";
import Form from "../../Form/Form";
import { useContext, useEffect, useState } from "react";
import { ProductsApi } from "../../../common/api";
import { useNotification } from "../../Providers/Notification.provider";
import { checkForSessionErrors } from "../../../common/lib/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Auth.context";
import { useStore } from "../../Providers/Store.provider";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    manufacturer: "",
    imageUrl: "",
    availableItems: 0,
  });

  const [categories, setCategories] = useState();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { getValue } = useStore();

  const fields = [
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "select",
      label: "Category",
      name: "category",
      options: categories,
    },
    {
      type: "number",
      label: "Price",
      name: "price",
    },
    {
      type: "text",
      label: "Description",
      name: "description",
    },
    {
      type: "text",
      label: "Manufacturer",
      name: "manufacturer",
    },
    {
      type: "text",
      label: "Image URL",
      name: "imageUrl",
    },
    {
      type: "number",
      label: "Available Items",
      name: "availableItems",
    },
  ];

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategory = (e, val) => {
    e.preventDefault();
    setFormData({ ...formData, category: val });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await ProductsApi.createProduct(formData);
      checkForSessionErrors(error, showNotification, navigate, logout);
      if (data === 200) {
        showNotification("Product added successfully", "success");
        navigate("/products"); // if product is created successfully then navigating the user to products page
      }
    } catch (error) {
      showNotification("Please provide all valid details of product", "error");
    }
  };

  useEffect(() => {
    setCategories(getValue("categories"));
  }, [getValue]);

  return (
    <PageLayout containerSize="sm" topMargin="4em">
      <Typography>Add Product</Typography>
      <Form
        fields={fields}
        buttonCta="SAVE PRODUCT"
        formData={formData}
        formHandler={handleFormChange}
        handleSubmit={handleFormSubmit}
        customHandler={handleCategory}
      />
    </PageLayout>
  );
};

export default AddProduct;
