declare module 'react-otp-input' {
  import type { ComponentPropsWithoutRef, ReactElement } from 'react';

  type OtpInputProps = {
    value?: string;
    onChange: (value: string) => void;
    numInputs?: number;
    renderInput: (props: ComponentPropsWithoutRef<'input'>) => ReactElement;
  };

  export default function OtpInput(props: OtpInputProps): ReactElement;
}
