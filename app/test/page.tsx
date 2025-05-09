"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import aboutQoute from "../../public/about-qoute.png";
import profile1 from "@/public/profile-1.png"
import profile2 from "@/public/profile-2.png"
import profile3 from "../../public/profile-3.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Reynolds",
    role: "Insurance Broker",
    image:  profile1, // Replace with the actual path to the image

    content:
      "InsurancesAlly has given me an edge in maintaining strong relationships with my clients. Their claim support system ensures that my clients feel taken care of, reducing frustration and improving their overall experience. As a result, I've been able to retain more happy clients, which is crucial in this business!",
  },
  {
    id: 2,
    name: "David Reynolds",
    role: "Insurance Broker",
    image:  profile2,
    content:
      "InsurancesAlly has given me an edge in maintaining strong relationships with my clients. Their claim support system ensures that my clients feel taken care of, reducing frustration and improving their overall experience. As a result, I've been able to retain more happy clients, which is crucial in this business!",
  },
  {
    id: 3,
    name: "David Reynolds",
    role: "Insurance Broker",
    image: profile3,
    content:
      "InsurancesAlly has given me an edge in maintaining strong relationships with my clients. Their claim support system ensures that my clients feel taken care of, reducing frustration and improving their overall experience. As a result, I've been able to retain more happy clients, which is crucial in this business!",
  },
  {
    id: 4,
    name: "David Reynolds",
    role: "Insurance Broker",
    image: profile3,
    content:
      "InsurancesAlly has given me an edge in maintaining strong relationships with my clients. Their claim support system ensures that my clients feel taken care of, reducing frustration and improving their overall experience. As a result, I've been able to retain more happy clients, which is crucial in this business!",
  },
  {
    id: 5,
    name: "David Reynolds",
    role: "Insurance Broker",
    image: profile3,
    content:
      "InsurancesAlly has given me an edge in maintaining strong relationships with my clients. Their claim support system ensures that my clients feel taken care of, reducing frustration and improving their overall experience. As a result, I've been able to retain more happy clients, which is crucial in this business!",
  },
   
];

export default function Testimonials() {
  return (
    <section className="  bg-disabled  relative z-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-500 mb-4">For Insurance Brokers</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            See the Difference We've Made
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active bg-cyan-500",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper pt-9"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden">
              <div className=" absolute  z-50  left-0 top-0">
                  <Image src={aboutQoute} alt="qoute" />
                </div>
                <div className="bg-white p-8 rounded-lg">
                  <div className="mb-6">
                    {" "}
                    {/* <span className="text-cyan-500 text-6xl">"</span> */}
                    <p className="text-gray-600 mt-2">{testimonial.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4  p-7">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// import React from "react";
// import { Card } from "@/components/ui/card";
// import { Facebook, Instagram, Linkedin, Share2, Twitter } from "lucide-react";

// const teamMembers = [
//   {
//     name: "Eleanor Pena",

//     role: "Ceo Founder",

//     image: "/team/Eleanor.jpg",
//   },

//   {
//     name: "Leslie Alexander",

//     role: "Ceo Founder",

//     image: "/team/Leslie.jpg",
//   },

//   {
//     name: "Cameron Williamson",

//     role: "Ceo Founder",

//     image: "/team/Cameron.jpg",
//   },

//   {
//     name: "Guy Hawkins",

//     role: "Ceo Founder",

//     image: "/team/guy.jpg",
//   },
// ];

// export default function Test() {
//   return (
//     <div className="container mx-auto py-16">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {teamMembers.map((member, index) => (
//           <Card key={index} className="group relative overflow-hidden bg-white">
//             <div className="relative">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-[300px] object-cover"
//               />

//               {/* Share icon in corner */}

//               <div className="absolute right-3 top-3">
//                 <button className="bg-white p-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
//                   <Share2 size={20} />
//                 </button>
//               </div>

//               {/* Social icons (hidden initially) */}

//               <div className="absolute left-4 bottom-0 flex flex-col gap-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-[-50%] transition-all duration-500 ease-out">
//                 <button className="bg-white p-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
//                   <Facebook size={20} />
//                 </button>

//                 <button className="bg-white p-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
//                   <Twitter size={20} />
//                 </button>

//                 <button className="bg-white p-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
//                   <Instagram size={20} />
//                 </button>

//                 <button className="bg-white p-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300">
//                   <Linkedin size={20} />
//                 </button>
//               </div>

//               {/* Name and role section */}

//               <div className="absolute -bottom-6 left-0 right-0 bg-blue-600 group-hover:bg-blue-800 p-4 text-white transition-colors duration-300">
//                 <h3 className="text-xl font-semibold">{member.name}</h3>

//                 <p className="text-white/90">{member.role}</p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
