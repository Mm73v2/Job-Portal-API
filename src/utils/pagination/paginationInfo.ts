type PaginationMetadata = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

const paginationInfo = (
  count: number,
  rows: number,
  limit: number
): PaginationMetadata => {
  const totalPages = Math.ceil(count / limit);

  return {
    totalItems: count,
    totalPages,
    currentPage: Math.ceil(rows / limit),
    itemsPerPage: limit,
  };
};

export default paginationInfo;
