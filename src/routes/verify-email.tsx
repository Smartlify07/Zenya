import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import VerifyEmailCard from "@/components/cards/verify-email-card";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmail,
});

function VerifyEmail() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
    } else if (!user.confirmed_at) {
      // Do nothing, allow to verify
    } else {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate, loading]);

  if (loading) {
    return (
      <div className="min-h-[80vw] flex flex-col justify-center align-center">
        <Spinner className="size-10" />
      </div>
    );
  }
  return <VerifyEmailCard />;
}

export default VerifyEmail;
