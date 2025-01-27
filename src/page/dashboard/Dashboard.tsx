import ActivityCard from "@/components/analytics/ActivityCard";
import StatCard from "@/components/analytics/StatCard";
import { useAppSelector } from "@/store/hooks";
import { FC, useEffect, useState } from "react";

const Dashboard: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
 const [hasActions, setHasActions] = useState(false);
  
  useEffect(() => {
    if (user && user.actions) {
      setHasActions(true);
    }
  }, [user]);
  
  console.log(user, hasActions);
  
  return (
    <div className="flex flex-col h-[600px] gap-4 py-6 mx-4">
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-1/2 gap-4">
          <h4 className="flex mb-4 text-lg font-semibold text-muted-foreground">
            Usage
          </h4>
          <div className="flex flex-col w-full gap-2">
            <StatCard title="Total Leads created" metric="leads" value={user?.lead_count?.toString()} />
            {user && user.role === "MANAGER" || user.role ===  "ADMIN" ? (<StatCard title="Total Agents approved" metric="agents" value={user?.agent_count?.toString()} />) : ""}
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <h4 className="mb-4 text-lg font-semibold text-muted-foreground">
            Activity
          </h4>
          <div className="flex flex-col gap-2">
            {hasActions ? (
              user.actions.map((action, index) => (
                <ActivityCard
                  key={index}
                  username={user.username}
                  activity={action.action}
                  time={action.timestamp}
                  action={action.action}
                  location="Nairobi, Kenya"
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-24 border">
                <h4 className="text-lg font-semibold text-muted-foreground">
                  No activity yet
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full gap-4"></div>
    </div>
  );
};

export default Dashboard;
