type TPaginationParams = {
  limit?: string;
  page?: string;
};

type TPaginationResult = {
  limit: number;
  offset: number;
};

const paginationParams = (query: TPaginationParams): TPaginationResult => {
  const limit = parseInt(query.limit || "10", 10);
  const page = parseInt(query.page || "1", 10);
  const offset = (page - 1) * limit;

  return { limit, offset };
};

export default paginationParams;
