"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowRight, MessageSquare, Shield, Wallet2 } from "lucide-react";
import type { NextPage } from "next";

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

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center lg:-m-16">
      <motion.div initial="hidden" animate="visible" variants={container} className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <motion.h1
            variants={slideUp}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Welcome to BitBorrowAI
          </motion.h1>
          <motion.p variants={slideUp} className="max-w-[600px] text-muted-foreground md:text-xl">
            Secure, decentralized financial services powered by cBTC infrastructure
          </motion.p>

          <motion.div variants={container} className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={slideUp} className="flex">
              <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105 w-full">
                <div className="card-body">
                  <Wallet2 className="h-8 w-8 text-primary" />
                  <h2 className="card-title">Lending & Borrowing</h2>
                  <p className="text-base-content/60">Use cBTC as collateral to borrow or earn interest by lending</p>
                  <div className="card-actions justify-end mt-auto">
                    <Link href="/lending" className="btn btn-primary w-full">
                      Start Lending
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideUp} className="flex">
              <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105 w-full">
                <div className="card-body">
                  <ArrowLeftRight className="h-8 w-8 text-primary" />
                  <h2 className="card-title">Atomic Swaps</h2>
                  <p className="text-base-content/60">Instantly swap between Bitcoin and Citrea-native tokens</p>
                  <div className="card-actions justify-end mt-auto">
                    <Link href="/swaps" className="btn btn-primary w-full">
                      Trade Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideUp} className="flex">
              <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105 w-full">
                <div className="card-body">
                  <Shield className="h-8 w-8 text-primary" />
                  <h2 className="card-title">Reputation System</h2>
                  <p className="text-base-content/60">View your trust score and network connections</p>
                  <div className="card-actions justify-end mt-auto">
                    <Link href="/reputation" className="btn btn-primary w-full">
                      Check Score
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideUp} className="flex">
              <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105 w-full">
                <div className="card-body">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <h2 className="card-title">Chat with Brian</h2>
                  <p className="text-base-content/60">Get insights and answers from our AI assistant</p>
                  <div className="card-actions justify-end mt-auto">
                    <Link href="/chat" className="btn btn-primary w-full">
                      Start Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
