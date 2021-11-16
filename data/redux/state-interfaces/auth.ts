export interface AUTH_STATE_DATA {
  token: string | undefined | null | false;
  type: string | null | undefined | false;
}

export interface AUTH_STATE {
  data: AUTH_STATE_DATA;
  loading: boolean;
  error: string | null | undefined;
}
