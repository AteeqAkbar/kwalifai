import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <SignUp afterSignUpUrl="/dashboard/profile" />
    </div>
  );
}
