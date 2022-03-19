type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export default SetRequired;
