export type TSendRegUserData = {
  email: string;
  password: string;
  displayName: string;
};

export type TSendLoginUserData = {
  email: string;
  password: string;
};

export type TUserData = {
  uid: string;
  displayName: string | null;
};

export type TEditProfileData = {
  displayName: string;
};
