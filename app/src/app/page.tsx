"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowRight,
  MessageSquare,
  Shield,
  Wallet2,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center lg:-m-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <motion.h1
            variants={slideUp}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Welcome to BitBorrowAI
          </motion.h1>
          <motion.p
            variants={slideUp}
            className="max-w-[600px] text-muted-foreground md:text-xl"
          >
            Secure, decentralized financial services powered by cBTC
            infrastructure
          </motion.p>

          <motion.div
            variants={container}
            className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Wallet2,
                title: "Lending & Borrowing",
                description:
                  "Use cBTC as collateral to borrow or earn interest by lending",
                link: "/lending",
                buttonText: "Start Lending",
              },
              {
                icon: ArrowLeftRight,
                title: "Atomic Swaps",
                description:
                  "Instantly swap between Bitcoin and Citrea-native tokens",
                link: "/swaps",
                buttonText: "Trade Now",
              },
              {
                icon: Shield,
                title: "Reputation System",
                description: "View your trust score and network connections",
                link: "/reputation",
                buttonText: "Check Score",
              },
              {
                icon: MessageSquare,
                title: "Chat with Brian",
                description: "Get insights and answers from our AI assistant",
                link: "/chat",
                buttonText: "Start Chat",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={slideUp} className="flex">
                <Card className="w-full transition-transform hover:scale-105">
                  <CardHeader>
                    <item.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={item.link}>
                        {item.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
