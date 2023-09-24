import { Box, Typography, Pagination, useMediaQuery } from "@mui/material";
import { MetaData } from "../models/pagination";
import { useState } from "react";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  const [ pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <Box display="flex" justifyContent="space-between" alignItems={"center"}>
      {isMobile ? null : (
        <Typography>
          Displaying {(currentPage - 1) * pageSize + 1}-
          {currentPage * pageSize > totalCount
            ? totalCount
            : currentPage * pageSize}{" "}
          of {totalCount} items
        </Typography>
      )}

      <Pagination
        color="primary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
}
