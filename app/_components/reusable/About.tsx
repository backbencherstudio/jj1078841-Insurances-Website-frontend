
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import aboutImg from "@/public/about-main.png";

export default function About() {
  return (
    <section className="container  py-0  lg:py-24 mx-auto">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16 p-7">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/3">
          <div className="p-1">
            <Image
              src={aboutImg}
              alt="Team member"
              width={418}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="absolute left-2 sm:-left-6 lg:-left-11 bottom-0 bg-[var(--primary-color)] text-white px-4 py-8 sm:px-6 sm:py-12 shadow-lg">
            <span className="text-4xl sm:text-5xl font-bold block">20+</span>
            <span className="text-base sm:text-lg font-medium">Years Experience</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-2/3">
          <p className="text-[var(--primary-color)] text-sm sm:text-base font-medium mb-1">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--gray-black-500)] leading-snug lg:leading-normal mt-3 mb-6">
            Who We Are and Why We’re <br className="hidden sm:block" /> Here to Help
          </h2>
          <p className="text-[var(--gray-black-400)] text-base sm:text-lg font-normal mb-10">
            We’re a team of experts dedicated to simplifying the claims process and putting homeowners first. With deep industry knowledge and a passion for fairness, we make sure you're never alone when it matters most.
          </p>

          <Tabs defaultValue="mission" className="mb-10">
            <TabsList className="grid   grid-cols-3 bg-muted p-1 rounded-md text-[var] text-base font-medium">
              <TabsTrigger value="mission" className="w-full">Our Mission</TabsTrigger>
              <TabsTrigger value="team" className="w-full">Our Team</TabsTrigger>
              <TabsTrigger value="story" className="w-full">Our Story</TabsTrigger>
            </TabsList>
            <TabsContent value="mission">
              <p className="text-muted-foreground mt-4">
                Simplifying insurance claims and empowering homeowners to get the settlements they deserve.
              </p>
            </TabsContent>
            <TabsContent value="team">
              <p className="text-muted-foreground mt-4">
                Our team consists of seasoned professionals with years of experience in insurance claims, customer service, and legal support.
              </p>
            </TabsContent>
            <TabsContent value="story">
              <p className="text-muted-foreground mt-4">
                Founded with the goal of transparency and fairness, our story is one of perseverance and dedication to our clients.
              </p>
            </TabsContent>
          </Tabs>

          <Button size="lg" className="bg-[var(--primary-color)] py-4 px-8 sm:px-10">
            Discover More &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}


 