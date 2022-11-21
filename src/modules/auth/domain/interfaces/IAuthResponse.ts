export default interface IAuthResponse {
  username: string;
  password?: string; // opcional devido ao uso do delete no controller
  token: string;
}
