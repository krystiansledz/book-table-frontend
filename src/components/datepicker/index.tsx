import React, { useRef } from "react";
import { Input, InputProps } from "@chakra-ui/react";
import { DateTime } from "luxon";

type Props = Omit<InputProps, "onChange"> & {
  onChange: (date: Date) => void;
  selectedDate: Date;
};

const DatePicker: React.FC<Props> = ({ selectedDate, onChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      {...props}
      autoComplete="off"
      ref={inputRef}
      width="fit-content"
      placeholder="Select Date"
      type="date"
      value={DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd")}
      onChange={(event) => onChange(new Date(event.target.value))}
      onClick={() => inputRef.current?.showPicker()}
      onKeyDown={(e) => e.preventDefault()}
    />
  );
};

export default DatePicker;
