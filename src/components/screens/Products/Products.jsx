import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  MenuItem,
  CircularProgress,
  Select,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductsApi } from "../../../common/api";
import ProductCategories from "../../ProductCategories/ProductCategories";
import ProductCard from "../../ProductCard/ProductCard";
import PageLayout from "../../PageLayout/PageLayout";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("Default");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchProducts, setRefetchProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await ProductsApi.fetchProducts();
        if (data) {
          setProducts(data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refetchProducts]);

  const handleCategoryChange = (event, newCategory) => {
    event.preventDefault();
    setSelectedCategory(newCategory);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }, [products, selectedCategory, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts]?.sort((a, b) => {
      switch (sortBy) {
        case "Price: High to Low":
          return b.price - a.price;
        case "Price: Low to High":
          return a.price - b.price;
        case "Newest":
          return b.id - a.id; // Assuming ID is assigned sequentially
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <PageLayout containerSize="xl">
      {error && <Typography color="error">{error}</Typography>}
      <ProductCategories
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <Box
        display="flex"
        sx={{
          position: "relative",
          right: 700,
          width: "600",
          height: "auto",
          padding: "16px",
        }}
      >
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="Default">Sort By</MenuItem>
          <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
          <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
          <MenuItem value="Newest">Newest</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={12}>
        {sortedProducts?.map((product) => (
          <Grid key={product?.id} xs={12} sm={6} md={4}>
            <ProductCard
              product={product}
              refetchProducts={setRefetchProducts}
            />
          </Grid>
        ))}
        {loading ? <CircularProgress /> : null}
      </Grid>
    </PageLayout>
  );
};

export default ProductsPage;
