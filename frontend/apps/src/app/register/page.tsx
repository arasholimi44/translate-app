"use client";
// import {signUp, confirmSignUp, autoSignIn, SignUpOutput, SignInOutput} from "aws-amplify/auth";
import Link from "next/link";
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


// type ISignUpState = SignUpOutput ["nextStep"];
// type ISignInState = SignInOutput ['nextStep']

// function RegistrationForm({onStepChange,}:
//   {onStepChange: (step:ISignUpState) => void;}){
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [password2, setPassword2] = useState<string>("");

// return(
//   <main className="flex flex-col m-8">
//   <form className="flex flex-col space-y-4" onSubmit={async (event) => {
//     event.preventDefault();
//     try{
//       if (password!==password2){throw new Error("password don't match")}

//      const {nextStep} = await signUp({
//         username:email,
//         password: password,
//         options: {
//           userAttributes:{email},
//           autoSignIn:true
//         }
//       });

//      console.log( nextStep.signUpStep);
//      onStepChange(nextStep);
//     }catch(e){}
//   }}>
  
//     <div>
//       <label htmlFor="email">E-mail:</label>
//       <input 
//       id="email"
//       type="email" 
//       value= {email} 
//       onChange={(e) => setEmail(e.target.value)} />
//     </div>

//      <div>
//       <label htmlFor="password">Password:</label>
//       <input 
//        id="password"
//        type="password" 
//        value= {password} 
//        onChange={(e) => setPassword(e.target.value)} />
//        </div>

//        <div>
//       <label htmlFor="password2">Retype Password:</label>
//       <input 
//        id="password2"
//        type="password2" 
//        value= {password2} 
//        onChange={(e) => setPassword2(e.target.value)} />
//        </div> 

//   <button className="btn bg-blue-500 p-2 mt-2 rounded-xl " type="submit"> 
//     Register</button>

//   </form>
//   <Link className="hover:underline"  href="/user">Login</Link>
//       </main>
// )}

// function ConfirmSignUp({onStepChange,}:
//   {onStepChange: (step:ISignUpState) => void;}){
//   const [verificationCode, setVerificationCode] = useState<string>("");
//   const [email, setEmail] = useState<string>("");

// return(

//   <form className="flex flex-col space-y-4" onSubmit={async (event) => {
//     event.preventDefault();
//     try{
//      const {nextStep} = await confirmSignUp({
//         confirmationCode:verificationCode,
//         username: email
//       });

//      console.log( nextStep.signUpStep);
//      onStepChange(nextStep);
//     }catch(e){}
//   }}>
  
//     <div>
//       <label htmlFor="email">E-mail:</label>
//       <input 
//       id="email"
//       type="email" 
//       value= {email} 
//       onChange={(e) => setEmail(e.target.value)} />
//     </div>

//      <div>
//       <label htmlFor="verificationCode">VerificationCode:</label>
//       <input 
//        id="verificationCode"
//        type="text" 
//        value= {verificationCode} 
//        onChange={(e) => setVerificationCode(e.target.value)} />
//        </div>

//   <button className="btn bg-blue-500 p-2 mt-2 rounded-xl " type="submit"> 
//     Verify</button>
//   </form>
      
// )}

// function AutoSignIn({onStepChange,}:
//   {onStepChange: (step:ISignInState) => void;}) {
//  useEffect (() =>{
//   const asyncSignIn = async() =>{
//   const {nextStep } = await autoSignIn();
//   console.log(nextStep);
//   onStepChange(nextStep);
//  }
//  autoSignIn
// },[]);

//   return<div>signing in...</div>
// }

// export default function Register() {
// const router = useRouter()
// const [step,setStep] = useState<ISignInState | ISignUpState | null>(null);
//   useEffect(() =>{
//   if (!step) return;
//   if ((step as ISignInState).signInStep === "DONE"){
//     router.push ("/")
//   }
//   }, 
//   [step])

 
//  if (step) {
//    if ((step as ISignUpState).signUpStep === "CONFIRM_SIGN_UP"){
//     return <ConfirmSignUp onStepChange={setStep} />
//    }

//    if ((step as ISignUpState).signUpStep === "COMPLETE_AUTO_SIGN_IN"){
//     return <AutoSignIn onStepChange={setStep}/>
//    }

//  }
  


//   return <RegistrationForm onStepChange={setStep}/>;
// }

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1️⃣ Register the user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || 'Registration failed');
      }

      // 2️⃣ Auto‐login and redirect to `/`
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col m-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="p-2 border rounded"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`p-2 mt-2 rounded-xl ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <Link href="/user" className="mt-4 text-blue-500 hover:underline">
        Already have an account? Log in
      </Link>
    </main>
  );
}