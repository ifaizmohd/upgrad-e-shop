import React, { useState, useEffect, useMemo } from "react";
import { Typography, MenuItem, CircularProgress, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductsApi } from "../../common/api";
import ProductCategories from "../../common/components/ProductCategories/ProductCategories";
import ProductCard from "../../common/components/ProductCard/ProductCard";
import PageLayout from "../../common/components/PageLayout/PageLayout";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("Default");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductsApi.fetchProducts();
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
  }, []);

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
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }, [products, selectedCategory, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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

  const isAdmin = true; // Replace with actual logic to check if the user is an admin

  return (
    <PageLayout containerSize="xl">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}
          <ProductCategories
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
          </Select>
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </PageLayout>
  );
};

export default ProductsPage;
