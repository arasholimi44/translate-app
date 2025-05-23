"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterFormData } from "@/lib";
import { useUSer } from "@/hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function RegisterPage() {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<IRegisterFormData>();
    
   const {register: registerUser, busy} = useUSer();
    const onSubmit: SubmitHandler<IRegisterFormData> = async (data,event) => {
      event?.preventDefault();
        await registerUser(data);
    };
  
  
    return (
      <main className="flex flex-col m-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
  
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-1">Email:</Label>
            <Input
             disabled={busy}
              id="email"
              type="email"
              {...register('email', { required: true })}
             
            />
            {errors.email && <span className="text-red-500 text-sm">field is required</span>}
          </div>
  
          <div className="flex flex-col">
            <Label htmlFor="password" className="mb-1">Password:</Label>
            <Input
            disabled={busy}
              id="password"
              type="password"
              {...register('password', {
                required: true,
                minLength: { value: 6, message: 'Min 6 characters' },
              })}
             
            />
            {errors.password && <span className="text-red-500 text-sm">field is required</span>}
          </div>
  
          <div className="flex flex-col">
            <Label htmlFor="password2" className="mb-1">Retype Password:</Label>
            <Input
             disabled={busy}
             id="password2" 
              type="password"
              {...register('password2', {
                required: true,
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              
              
            />
        {errors.password && <span className="text-red-500 text-sm">field is required</span>}
          </div>
  
          <Button 
          type="submit" 
          disabled={busy}
        >
          {busy ? 'Registering...' : 'Register'}
        </Button>

        </form>
  
        <Link href="/?login=true" className="mt-4 text-gray-500 hover:underline">
     Already have an account? Log in
      </Link>
      
      </main>
    );
  }