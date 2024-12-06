import { SignInForm } from "@/components/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; 
import { authOptions } from "@/lib/auth";
export default async function SignInPage() {

  const session = await getServerSession(authOptions);

  if (session) {
      redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className=" light-overlay -z-20 "/>
      <Card className="w-[400px] rounded-lg">
        <CardHeader>
          <h1 className="text-4xl pt-6 text-center">🍯</h1>
          <h1 className="text-2xl   text-center">WinnieSpot</h1> 
          <p className="text-center text-muted-foreground text-lg">Coucou Winnie, <span className="italic">euh c&apos;est vraiment toi ?</span></p>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}