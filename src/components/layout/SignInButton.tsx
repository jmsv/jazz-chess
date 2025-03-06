import { useClerk } from "@clerk/clerk-react";
import { Button } from "../ui/button";

interface SignInButtonProps {
  text?: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ text }) => {
  const clerk = useClerk();

  return (
    <Button size="lg" onClick={() => clerk.redirectToSignIn()}>
      {text ?? "Sign in"}
    </Button>
  );
};
