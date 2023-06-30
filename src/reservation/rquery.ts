import { useQuery } from "react-query";
import axios from "axios";
import { MyReservation } from "./schemas.ts";
import { queryClient } from "../rquery/provider.tsx";
import { DateTime } from "luxon";

export const useMyReservations = () =>
  useQuery<MyReservation[]>(`reservations-my`, () =>
    axios.get<MyReservation[]>(`/reservations/my`).then((response) =>
      response.data.sort((a, b) => {
        const endDateTimeComparison =
          DateTime.fromISO(b.endDateTime).toMillis() -
          DateTime.fromISO(a.endDateTime).toMillis();

        if (endDateTimeComparison !== 0) {
          return endDateTimeComparison;
        } else {
          return (
            DateTime.fromISO(b.startDateTime).toMillis() -
            DateTime.fromISO(a.startDateTime).toMillis()
          );
        }
      })
    )
  );

export const invalidateUseMyReservations = () =>
  queryClient.invalidateQueries("reservations-my");
