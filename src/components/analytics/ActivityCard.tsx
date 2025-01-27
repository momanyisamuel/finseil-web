import { UserCircleIcon } from "lucide-react";
import { FC } from "react";

interface ActivityCardProps {
  username: string;
  activity: string;
  time: string;
  action: string;
  location: string;
}

const ActivityCard: FC<ActivityCardProps> = ({
  username,
  activity,
  time,
  action,
  location,
}) => {
  return (
    <>
    <div className="flex gap-4 p-2 border items-top">
      <div>
        <UserCircleIcon size={24} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm">{username}</h4>
          <div className="text-sm">-</div>
          <h4 className="text-sm">{action}</h4>
        </div>
        <div>
          <h4 className="text-base font-normal">{activity}</h4>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm">{location}</h4>
          <div className="text-sm">|</div>
          <h4 className="text-sm">{time}</h4>
        </div>
      </div>
    </div>
    </>
  );
};

export default ActivityCard;
