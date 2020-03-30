import React from 'react';

import { Input, TxtArea } from './styles';

export default function InputComponents({ children, ...props }) {
  return <Input {...props}>{children}</Input>;
}

export function TextArea({ children, ...props }) {
  return <TxtArea {...props}>{children}</TxtArea>;
}
