export const debug = (msg: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(msg, data);
  }
};
