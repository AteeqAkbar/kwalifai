import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen pt-8">
      <SignIn />
    </div>
  );
}
