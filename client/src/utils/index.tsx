export const parseAddress = (address: string) => {
  return address.toLowerCase();
};

export const isDefaultAddress = (address: string) => {
  return (address || '').toLowerCase() === '0x0000000000000000000000000000000000000000';
};
