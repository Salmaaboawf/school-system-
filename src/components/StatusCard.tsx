import { ReactElement } from "react";

type StatusCardProp = {
  title: string;
  number: string;
  icon: ReactElement;
};

const StatusCard = ({ title, number, icon }: StatusCardProp) => {
  return (
    <div className="flex items-start">
      <div className="pt-1 mr-2">{icon}</div>
      <div>
        <h5 className="text-4xl text-white">{number}</h5>
        <p className="text-sm text-white">{title}</p>
      </div>
    </div>
  );
};

export default StatusCard;
