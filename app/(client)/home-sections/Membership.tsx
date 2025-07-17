import React from "react";
import Image from "next/image";
import memberImg from "@/public/home-membership.png";
import { Button } from "@/components/ui/button";
import MessageIcon from "@/public/membershipIcons/MessageIcon";
import ProfileIcon from "@/public/membershipIcons/ProfileIcon";
import PricingIcon from "@/public/membershipIcons/PricingIcon";
import FaqIcon from "@/public/membershipIcons/FaqIcon";
import Link from "next/link";

export default function Membership() {
  const items = [
    {
      icon: <MessageIcon />,
      title: "Convenience at Your Fingertips",
      details: "Personalized support and tools to make your claims effortless",
    },
    {
      icon: <PricingIcon />,
      title: "Transparent Pricing",
      details: "Affordable plans with no hidden fees.",
    },
    {
      icon: <ProfileIcon />,
      title: "Join Today",
      details: "Personalized support and tools to make your claims effortless",
    },
    {
      icon: <FaqIcon />,
      title: "FAQs",
      details: "Answers to all your questions about membership and our offerings.",
    },
  ];

  return (
    <section className="container mx-auto py-24 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <div className="flex justify-center">
          <Image
            src={memberImg}
            alt="membership-img"
            className="max-w-11/12 h-11/12"
          />
        </div>
        <div className=" ">
          {/* section header */}
          <div className="mb-8 text-center lg:text-left">
            <p className="text-primary-color text-base">Membership Plans</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal">
              Exclusive Access to Stress-Free <br className="hidden sm:block" /> Claims
            </h2>
          </div>

          {/* membership items */}
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-disabled my-2 p-5 rounded-lg flex items-start gap-4"
              >
                <div className="bg-primary-color inline-block p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-isecondary text-xl sm:text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-base font-normal text-text-light">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* button */}
          <div className="mt-10 text-center lg:text-left">
            <Link
            href="/contact"
              className="bg-[var(--primary-color)] py-4 px-8 sm:px-10"
            >
              Discover More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



