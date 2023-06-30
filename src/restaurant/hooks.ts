import { useUserContext } from "../user/provider.tsx";

export const useCanEditRestaurant = (id: string | number) => {
  const { user } = useUserContext();

  return (
    user?.userType === "RESTAURANT" && id.toString() === user?.id.toString()
  );
};
