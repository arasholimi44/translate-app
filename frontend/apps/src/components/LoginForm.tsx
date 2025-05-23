"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {  ILoginFormData } from "@/lib";
import {useUSer} from "@/hooks/useUser"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


export const LoginForm = ({ onSignedIn }: { onSignedIn?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  
  const {login, busy} = useUSer();

  const onSubmit: SubmitHandler<ILoginFormData> = async (data, event) => {
    event?.preventDefault();
    login(data).then(() =>{ // 👈 custom hook
    onSignedIn && onSignedIn();      // 👈 now only called on successful login
    })
  };

  return (
    <form className="flex flex-col gap-4 max-w-md mx-auto p-2" onSubmit={handleSubmit(onSubmit)}>


      <div >
        <Label htmlFor="email">Email:</Label>
        <Input
          disabled ={busy}
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
         
        />
        {errors.email && <span className="text-red-600">field is required</span>}
      </div>

      <div >
        <Label htmlFor="password">Password:</Label>
        <Input
          disabled ={busy}
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          
        />
        {errors.password && <span className="text-red-600">field is required</span>}
      </div>

    

      <Button
          type="submit"
          disabled={busy}
        >
          {busy ? 'Logging in...' : 'Login'}
        </Button>
        
    </form>
  )
};
