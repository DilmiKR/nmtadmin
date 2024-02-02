import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
    _id,
    nelundeniyaCode,
    ItemName,
    itemCode,
    sellingPrice,
    purchasedPrice,
    quantity,
    categoryId,
    companyOrderId,
    itemDescription,
    brand,
    rating
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {itemCode}
        </Typography>
        <Typography variant="h5" component="div">
          {ItemName}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Rs.{Number(sellingPrice).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{itemDescription}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="All products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
                _id,
                nelundeniyaCode,
                ItemName,
                itemCode,
                sellingPrice,
                purchasedPrice,
                quantity,
                categoryId,
                companyOrderId,
                itemDescription,
                brand,
            }) => (
              <Product

              _id={_id}
              nelundeniyaCode={nelundeniyaCode}
              ItemName={ItemName}
              itemCode={itemCode}
              sellingPrice={sellingPrice}
              purchasedPrice={purchasedPrice}
              quantity={quantity}
              categoryId={categoryId}
              companyOrderId={companyOrderId}
              itemDescription={itemDescription}
              brand={ brand}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
