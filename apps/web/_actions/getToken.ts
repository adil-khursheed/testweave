"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getToken = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    console.log({ token });
    if (!token) {
      redirect("/login");
    }

    return token;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }
};
