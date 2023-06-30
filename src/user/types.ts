export type User = {
  id: number;
  email: string;
  userType: UserType;
};

export type UserType = "CUSTOMER" | "RESTAURANT";
