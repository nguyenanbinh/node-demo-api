// utils/pagination.js
const paginate = async (model, page = 1, limit = 10, filters = {}, options = {}) => {
    const skip = (page - 1) * limit;
  
    const [total, items] = await Promise.all([
      model.count({ where: filters }),
      model.findMany({
        where: filters,
        skip,
        take: limit,
        ...options
      }),
    ]);
  
    const totalPages = Math.ceil(total / limit);
  
    return {
      page,
      limit,
      totalPages,
      total,
      items,
    };
  };
  
  module.exports = paginate;
  