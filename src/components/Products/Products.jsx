import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { ProductsApi } from "../../common/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await ProductsApi.fetchCategories();
        if (data) {
          setCategories(data);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (event, newCategory) => {
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
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="product categories"
          >
            <ToggleButton value="ALL">ALL</ToggleButton>
            {categories.map((category) => (
              <ToggleButton key={category} value={category}>
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
          </Select>
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl} // Replace with actual image URLs
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                    <Typography variant="h6">₹{product.price}</Typography>
                    <Button variant="contained" color="primary">
                      BUY
                    </Button>
                    {isAdmin && (
                      <div>
                        <Button variant="contained" color="secondary">
                          Edit
                        </Button>
                        <Button variant="contained" color="error">
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
