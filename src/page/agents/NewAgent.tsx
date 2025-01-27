import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownRight } from "lucide-react";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser, fetchUser, updateUser } from "@/store/usersSlice";
import {  useNavigate, useParams} from "react-router-dom";


const AgentSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required" }),
  middle_name: z.string().min(2, { message: "Middle name is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
  phone_number: z.string().min(10, { message: "Phone number is required" }),
  id_card_number: z.string().min(8, { message: "ID number is required" }),
  mpesa_number: z.string().min(10, { message: "MPESA number is required" }),
  username: z.string().min(2, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role_id: z.string().min(1, { message: "Role is required" }),
  password: z.string().min(6, { message: "Password is required" }),
  is_active: z.boolean().default(false),
  registration_date: z
    .string()
    .min(2, { message: "Registration date is required" }),
});

type AgentInput = z.infer<typeof AgentSchema>;

type NewAgentProps = object;

const NewAgent: FC<NewAgentProps> = () => {
  const dispatch = useAppDispatch();
  const user  = useAppSelector((state) => state.users.user);
  
  const {id} = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<AgentInput>({
    resolver: zodResolver(AgentSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      // fetch agent by id
      dispatch(fetchUser(id)).unwrap();
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("middle_name", user.middle_name);
      setValue("last_name", user.last_name);
      setValue("phone_number", user.phone_number);
      setValue("id_card_number", user.identification_number);
      setValue("mpesa_number", user.MPESA_NUMBER);
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("role_id", user.role);
      setValue("password", user.password);
      setValue("is_active", user.is_active);
      setValue("registration_date", user.registration_date);
    }
  }, [user]);

  const handleUpdate = (data: AgentInput) => {
    console.log(data);
    const input = {
      ...data,
      id: id as string,
      role: data.role_id,
      identification_number: data.id_card_number,
      MPESA_NUMBER: data.mpesa_number,
    };
    dispatch(updateUser({id: id as string, user: input})).unwrap().then(() => {
      navigate("/agents");
    });
  };

  const handleCreate = (data: AgentInput) => {
    console.log(data);
    const input = {
      ...data,
      role: data.role_id,
      identification_number: data.id_card_number,
      MPESA_NUMBER: data.mpesa_number,
    };
    dispatch(createUser(input)).unwrap().then(() => {
      navigate("/agents");
    });
  }


  const onSubmit = (data: AgentInput) => {
    if (isEditMode) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="mx-4 mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-8">
          <div className="w-[15%]">
            <h1 className="text-xl font-medium text-gray-700 ">
              {
              isEditMode ? "Edit Agent" : "New Agent"
              }
            </h1>
            <p className="mt-4 text-xs text-gray-500">Jump to</p>
            <div className="flex flex-col gap-4 my-4 text-sm font-medium">
              <div className="flex gap-2">
                <span>
                  <CornerDownRight className="w-4 h-4" strokeWidth={0.75} />
                </span>
                <a href="#basic-information">Basic Information</a>
              </div>
              <div className="flex gap-2">
                <span>
                  <CornerDownRight className="w-4 h-4" strokeWidth={0.75} />
                </span>
                <a href="#contact-information">Contact Information</a>
              </div>
              <div className="flex gap-2">
                <span>
                  <CornerDownRight className="w-4 h-4" strokeWidth={0.75} />
                </span>
                <a href="#identity-information">Identity Information</a>
              </div>
              <div className="flex gap-2">
                <span>
                  <CornerDownRight className="w-4 h-4" strokeWidth={0.75} />
                </span>
                <a href="#lead-information">Agent Information</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="w-full rounded-none bg-[#9167C6] hover:bg-purple-700" type="submit">
                {
                  isEditMode ? "Update Agent" : "Create Agent"
                }
              </Button>
              <Button
                className="w-full border-2 rounded-none"
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
          <ScrollArea className="w-[50%] flex flex-col h-[672px]">
            <div id="basic-information" className="mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-medium">1. Basic Information</h1>
                <p className="text-xs text-gray-500">
                  All fields are required unless marked optional
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                <div className="mb-4 w-[350px]">
                  <Label>First Name</Label>
                  <Input
                    placeholder="First Name"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <span className="text-xs text-red-500">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Middle Name</Label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("middle_name")}
                  />
                  {errors.middle_name && (
                    <span className="text-xs text-red-500">
                      {errors.middle_name.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <span className="text-xs text-red-500">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div id="contact-information" className="mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-medium">2. Contact Information</h1>
                <p className="text-xs text-gray-500">
                  All fields are required unless marked optional
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                <div className="mb-4 w-[350px]">
                  <Label>MPESA Number</Label>
                  <Input
                    placeholder="MPESA Number"
                    type="tel"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("mpesa_number")}
                  />
                  {errors.mpesa_number && (
                    <span className="text-xs text-red-500">
                      {errors.mpesa_number.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <span className="text-xs text-red-500">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Email</Label>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div id="identity-information" className="mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-medium">3. Identity Information</h1>
                <p className="text-xs text-gray-500">
                  All fields are required unless marked optional
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                <div className="mb-4 w-[350px]">
                  <Label>Identification Number</Label>
                  <Input
                    placeholder="National Identification No"
                    type="number"
                    min={8}
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("id_card_number")}
                  />
                  {errors.id_card_number && (
                    <span className="text-xs text-red-500">
                      {errors.id_card_number.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div id="lead-information" className="mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-medium">4. Agent Information</h1>
                <p className="text-xs text-gray-500">
                  All fields are required unless marked optional
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                <div className="mb-4 ">
                  <Label>Role</Label>
                  <Controller
                    name="role_id"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="bg-white rounded-none">
                          <SelectValue placeholder="Select ..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="AGENT">AGENT</SelectItem>
                          <SelectItem value="MANAGER">MANAGER</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role_id && (
                    <span className="text-xs text-red-500">
                      {errors.role_id.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 ">
                  <Label>Registration Date</Label>
                  <Input
                    placeholder="Registration Date"
                    type="date"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("registration_date")}
                  />
                  {errors.registration_date && (
                    <span className="text-xs text-red-500">
                      {errors.registration_date.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 ">
                  <Label>Username</Label>
                  <Input
                    placeholder="Username"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("username")}
                  />
                  {errors.username && (
                    <span className="text-xs text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 ">
                  <Label>Password</Label>
                  <Input
                    placeholder="Password"
                    type="password"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-start gap-2 mt-6 mb-4">
                  <Label className="pr-4 text-base">Is Active</Label>
                  <input
                    placeholder="Status"
                    type="checkbox"
                    className="w-6 h-6 pr-4 bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("is_active")}
                  />
                  {errors.is_active && (
                    <span className="text-xs text-red-500">
                      {errors.is_active.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="w-[35%]"></div>
        </div>
      </form>
    </div>
  );
};

export default NewAgent;
