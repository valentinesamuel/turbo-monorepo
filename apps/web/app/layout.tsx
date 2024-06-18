import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Person } from "@repo/types/app";
import { Animal } from "@repo/types/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const person: Person = {
    name: "John Doe",
    age: 25,
  };

  const animal: Animal = {};

  console.log(person);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
