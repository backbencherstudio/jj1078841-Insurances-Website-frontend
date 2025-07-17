// components/CustomCard.tsx
import React from "react";

interface CustomCardProps {
  title: string;
  description: string;
  bgColor?: string; // Tailwind background color class
  textColor: String;
  bgColor2:String;
  children?: React.ReactNode;
  Component: React.ComponentType<any>; // The component to render
  componentProps?: Record<string, any>; // Optional props for that component
}

export default function CustomCard({
  title,
  description,
  bgColor = "bg-white",
  textColor = "text-white",
  bgColor2,
  children,
  Component,
  componentProps = {},
}: CustomCardProps) {
  return (
    <div
      className={`max-w-[400px] rounded-2xl shadow-md p-6 ${bgColor} ${textColor} rounded-[8px]  p-5 min-h-[240px] select-none`}
    >
      <div className={`${bgColor2}  inline-block p-3 rounded-lg`}>
        <Component {...componentProps} />
      </div>
      <h4 className="text-base font-semibold mt-6 mb-3">{title}</h4>
      <p className="text-base">{description}</p>
      {children}
    </div>
  );
}
