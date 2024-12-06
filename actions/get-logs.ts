'use server'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getLogs() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const logs = await prisma.log.findMany()

    revalidatePath('/dashboard');
    return { status: "success", logs:logs };
  
    
}