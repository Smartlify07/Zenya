import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";


export default function VerifyEmailCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Card className="w-full max-w-md border border-black dark:border-white bg-white dark:bg-black">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Please verify your email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            An email has been sent to your address. Please check your inbox and
            follow the link to verify your email.
          </p>
          <div className="flex justify-end">
            <Button
              asChild
              variant="outline"
              className="border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <Link to="/login">Return to Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
