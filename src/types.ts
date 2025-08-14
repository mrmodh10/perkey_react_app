export type SupabaseAuthResponse = {
  ok: boolean;
  message?: string;
  // include anything your function returns:
  access_token?: string;
  user_id?: string;
  username?: string;
  // add fields as needed
};