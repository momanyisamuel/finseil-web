import { FC, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/store/usersSlice";

const ProfileSchema = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  email: z.string().email({ message: "Invalid email" }),
});

type ProfileInput = z.infer<typeof ProfileSchema>;

type ProfileProps = object;

const Profile: FC<ProfileProps> = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [user]);

  const onSubmit = async (data: ProfileInput) => {
    console.log(data);
    console.log(data);
    const input = {
      ...user,
      username: data.username,
      email: data.email,
    }
    const res = dispatch(updateUser({ id: user.id, user: input }));
    console.log(res);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your account settings & preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                {/* all data errors */}
                {Object.values(errors).map((error, index) => (
                  <div key={index} className="text-red-500">
                  {index + 1}. {error.message} {error.type}
                  </div>
                ))}
                </div>
              <div className="flex flex-col gap-4">
                <div className="">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    className="w-full"
                    {...register("username")}
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="">
                  <Label>Password</Label>
                  <Input type="password" name="password" className="w-full" />
                </div>
                <div className="">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="w-full"
                  />
                </div>
                
              </div>
              <div className="mt-4">
                  <Button   className="bg-[#9167C6] hover:bg-purple-700" type="submit">
                    Update Profile
                  </Button>
                </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
