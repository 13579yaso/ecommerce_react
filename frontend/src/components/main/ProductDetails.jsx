import React from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
const ProductDetails = ({ clickedProduct }) => {
  const [selectedImg, setselectedImg] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          width={360}
          src={
            clickedProduct?.productimg?.[0]
      ? `http://localhost:1337${clickedProduct.productimg[selectedImg].url}`
      : "https://via.placeholder.com/360x400?text=No+Image"
          }
          alt=""
        />
      </Box>

      <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5">
          {clickedProduct.productTitle || "No Title"}
        </Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          {clickedProduct.productPrice || "No price"}
        </Typography>
        <Typography variant="body1">
          {clickedProduct.productDescription || "No Description"}
        </Typography>

        <Stack
          sx={{ justifyContent: { xs: "center", sm: "left" } }}
          direction={"row"}
          gap={1}
          my={2}
        >
          {clickedProduct?.productimg?.map((item,index) => (
            <img
            onClick={() => {
                      setselectedImg(index);
                    }}
              key={item.id}
              src={`http://localhost:1337${item.url}`}
              style={{ borderRadius: 3 }}
              width={90}
              height={100}
              alt={item.name || "product image"}
            />
          ))}
        </Stack>
        <Button
          sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
          variant="contained"
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy now
        </Button>
      </Box>
    </Box>
  );
};
export default ProductDetails;
