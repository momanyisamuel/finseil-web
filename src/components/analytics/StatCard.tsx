import { ChartLine } from "lucide-react";
import { FC } from "react";

interface StatCardProps {
  title: string;
  metric: string;
  value: string;
}

const StatCard: FC<StatCardProps> = ({ metric, title, value }) => {
  return (
    <div className="w-full h-full p-4 bg-white border rounded-none dark:border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="">
            <span className="pr-1 text-xl font-normal text-primary">{value}</span>
            <span className="text-sm text-muted-foreground">{metric}</span>
          </h3>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
        <div>
            <ChartLine size={24} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
