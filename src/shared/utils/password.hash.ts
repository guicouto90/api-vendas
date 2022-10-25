import crypto from 'crypto';

export const cryptograph = (password: string): string => {
  const result = crypto.createHash('md5').update(password).digest('hex');
  return result;
};
