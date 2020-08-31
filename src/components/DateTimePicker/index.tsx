import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { DateTimeCustomInput } from './styles';

const DateTimeInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  return <DateTimeCustomInput {...props} ref={ref} />;
});

const DateTimePicker: React.FC<ReactDatePickerProps> = props => (
  <ReactDatePicker customInput={<DateTimeInput />} {...props} />
);

export default DateTimePicker;
