import { Box, Typography, Pagination, useMediaQuery } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
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
        count={metaData?.totalPages}
        page={metaData?.currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
}
