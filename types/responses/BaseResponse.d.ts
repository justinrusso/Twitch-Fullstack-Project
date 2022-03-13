type BaseReponse<
  Data extends unknown[] | Record<string, unknown>,
  Errors extends Record<string, unknown>
> = {
  data?: Data;
  errors?: Errors;
};

export default BaseReponse;
