import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import { CornerDownRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createLead, createZohoLead, fetchLead, updateLead } from "@/store/leadsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers } from "@/store/usersSlice";
import { getAccessToken } from "@/lib/utils";

const NewLeadSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().min(2, "Middle name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  idNumber: z.string().min(6, "ID number is required"),
  kraPin: z.string().min(6, "KRA PIN is required"),
  loanAmount: z.string().min(2, "Loan amount is required"),
  applicationDate: z.string().min(2, "Application date is required"),
  status: z.string().min(2, "Status is required"),
});

type NewLeadInput = z.infer<typeof NewLeadSchema>;

type NewLeadProps = object;

const NewLead: FC<NewLeadProps> = () => {
  const agent = useAppSelector((state) => state.auth.user);
  const lead = useAppSelector((state) => state.leads.lead);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const isEditMode = !!id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<NewLeadInput>({
    resolver: zodResolver(NewLeadSchema),
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchLead(id));
    }
  }, [dispatch, isEditMode, id]);

  useEffect(() => {
    if (isEditMode) {
      setValue("firstName", lead.first_name);
      setValue("middleName", lead.middle_name);
      setValue("lastName", lead.last_name);
      setValue("phoneNumber", lead.phone_number);
      setValue("idNumber", lead.identification_number);
      setValue("kraPin", lead.KRA_PIN);
      setValue("email", lead.email);
      setValue("loanAmount", lead.requested_loan_amount?.toString());
      setValue("applicationDate", lead.application_date);
      setValue("status", lead.status);
    }
  }, [lead, setValue, isEditMode]);
  

  const handleCreate = async (data: NewLeadInput) => {
    const input = {
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      email: data.email,
      identification_number: data.idNumber,
      KRA_PIN: data.kraPin,
      requested_loan_amount: parseInt(data.loanAmount),
      application_date: data.applicationDate,
      status: data.status,
      agent: agent.id,
    };
    
    dispatch(createLead(input)).unwrap();
    //get access token
    const token_response = await getAccessToken();
    console.log(token_response?.data.access_tokens.access_token)
    //create lead using zoho api and access token
    const lead_input = {
        ...input,
        access_token: token_response?.data.access_tokens.access_token
    }
    dispatch(createZohoLead(lead_input)).unwrap();
    navigate("/leads");
  };

  const handleEdit = (data: NewLeadInput) => {
    console.log(data);
    const input = {
      id: id as string,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      email: data.email,
      identification_number: data.idNumber,
      KRA_PIN: data.kraPin,
      requested_loan_amount: parseInt(data.loanAmount),
      application_date: data.applicationDate,
      status: data.status,
      agent: agent.id,
    };

    dispatch(updateLead(input)).unwrap();
    navigate("/leads");
  }
    

  const onSubmit = (data: NewLeadInput) => {
    if (isEditMode) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="mx-4 mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-8">
          <div className="w-[15%]">
            <h1 className="text-xl font-medium text-gray-700">
              Create New Lead
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
                <a href="#lead-information">Lead Information</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="w-full rounded-none bg-[#9167C6] hover:bg-purple-700" type="submit">
                {isEditMode ? "Update Lead" : "Create New Lead"}
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
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Middle Name</Label>
                  <Input
                    placeholder="Middle Name"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("middleName")}
                  />
                  {errors.middleName && (
                    <p className="text-xs text-red-500">
                      {errors.middleName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
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
                  <Label>Email</Label>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500">
                      {errors.phoneNumber.message}
                    </p>
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
                    placeholder="Id No"
                    type="number"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("idNumber")}
                  />
                  {errors.idNumber && (
                    <p className="text-xs text-red-500">
                      {errors.idNumber.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-[350px]">
                  <Label>KRA PIN</Label>
                  <Input
                    placeholder="KRA PIN"
                    type="text"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("kraPin")}
                  />
                  {errors.kraPin && (
                    <p className="text-xs text-red-500">
                      {errors.kraPin.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div id="lead-information" className="mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-medium">4. Lead Information</h1>
                <p className="text-xs text-gray-500">
                  All fields are required unless marked optional
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                <div className="mb-4 ">
                  <Label>Requested Loan Amount</Label>
                  <Input
                    placeholder="Loan Amount"
                    type="number"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("loanAmount")}
                  />
                  {errors.loanAmount && (
                    <p className="text-xs text-red-500">
                      {errors.loanAmount.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 ">
                  <Label>Application Date</Label>
                  <Input
                    placeholder="Application Date"
                    type="date"
                    className="bg-white border-b-2 rounded-none border-b-gray-300"
                    {...register("applicationDate")}
                  />
                  {errors.applicationDate && (
                    <p className="text-xs text-red-500">
                      {errors.applicationDate.message}
                    </p>
                  )}
                </div>
                
                <div className="mb-4 ">
                  <Label>Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="bg-white rounded-none">
                          <SelectValue placeholder="Select ..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="received">Received</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="client_denied">
                            Client Denied
                          </SelectItem>
                          <SelectItem value="contract_concluded">
                            Contract Concluded
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-xs text-red-500">
                      {errors.status.message}
                    </p>
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

export default NewLead;
