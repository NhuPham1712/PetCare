export const formatVnd = (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    throw new TypeError('Giá trị tiền tệ phải là một số hợp lệ.');
  }

  return `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(value)} VNĐ`;
};
