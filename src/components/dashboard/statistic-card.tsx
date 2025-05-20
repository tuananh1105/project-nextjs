import { ReactNode } from "react";

type StatisticCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  gradient?: string;
  iconBg?: string;
  iconColor?: string;
  textColor?: string;
};

const StatisticCard = ({
  title,
  value,
  icon,
  gradient = "from-blue-100 to-blue-300",
  iconBg = "bg-white/50",
  iconColor = "text-blue-600",
  textColor = "text-blue-900",
}: StatisticCardProps) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} rounded-xl p-4 flex items-center shadow-sm`}
    >
      <div className={`${iconBg} rounded-full p-3 mr-4`}>
        <span className={`${iconColor} text-2xl`}>{icon}</span>
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className={`text-xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
