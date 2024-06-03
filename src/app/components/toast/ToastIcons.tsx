import { Check, CircleAlert, X } from "lucide-react";

export const ErrorIcon = () => (
  <X
    className="text-white rounded-full bg-red-600 p-1 font-bold text-4xl"
    size={26}
  />
);

export const SuccessIcon = () => (
  <Check
    className="text-white rounded-full bg-green-400 p-1 font-bold text-4xl"
    size={26}
  />
);

export const WarningIcon = () => (
  <CircleAlert
    className="text-white rounded-full bg-red-600 p-1 font-bold text-4xl"
    size={26}
  />
);
