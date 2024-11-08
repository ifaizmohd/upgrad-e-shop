import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ProductsApi } from "../../common/api";
import { useStore } from "../Providers/Store.provider";

const ProductCategories = ({ selectedCategory, handleCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const { setValue } = useStore();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await ProductsApi.fetchCategories();
      if (data) {
        setCategories(data);
        setValue("categories", data);
      }
    };
    fetchCategories();
  }, [setValue]);

  return (
    <ToggleButtonGroup
      sx={{ margin: "20px 0" }}
      value={selectedCategory}
      onChange={handleCategoryChange}
      exclusive
    >
      <ToggleButton value="ALL">ALL</ToggleButton>
      {categories?.map((category) => (
        <ToggleButton key={category} value={category}>
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ProductCategories;
