'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoIcon, DollarSign, FileText } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter text-gray-800 sm:text-5xl xl:text-6xl/none">
                    Revolutionize Your Health with Shared Medical Appointments
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Connect with board-certified Lifestyle Medicine doctors to reverse chronic conditions like diabetes, hypertension, and obesity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 bg-[#3b82f6] text-white px-8">Book Appointment</Button>
                  <Button className="h-10 border border-gray-300 text-gray-800 px-8">Learn More</Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-5xl">
                  Seamless Integrations
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform supports telehealth video conferencing, payment processing, and electronic health records.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <VideoIcon className="h-12 w-12 text-blue-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Telehealth Conferencing</h3>
                  <p className="text-gray-600">
                    Connect with doctors from the comfort of your home via secure video calls.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <DollarSign className="h-12 w-12 text-green-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Payment Processing</h3>
                  <p className="text-gray-600">
                    Effortlessly manage all transactions with our integrated payment solutions.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <FileText className="h-12 w-12 text-purple-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Electronic Health Records</h3>
                  <p className="text-gray-600">
                    Access and update your medical records securely and easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-5xl">
                  Track Your Health Progress
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Use personalized dashboards to monitor your health journey and set goals.
                </p>
              </div>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mx-auto">
              <Card className="flex flex-col items-start space-y-4 p-6">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/picsum/200/300" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-bold">Anna Doe</CardTitle>
                  <CardDescription className="text-gray-600">
                    "Thanks to the shared medical appointments, I have reversed my diabetes and feel healthier than ever."
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="User" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-bold">John Smith</CardTitle>
                  <CardDescription className="text-gray-600">
                    "The personalized health dashboard keeps me motivated and on track with my fitness goals."
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/picsum/200/300" alt="User" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-bold">Michael Doe</CardTitle>
                  <CardDescription className="text-gray-600">
                    "I appreciate the secure access to my medical records and the ability to communicate with my doctors."
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-5xl">
                  Pricing Plans
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select a plan that suits your healthcare needs and budget.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mx-auto">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Basic</CardTitle>
                    <CardDescription className="text-gray-500">
                      $10<span className="text-xl font-medium">/mo</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>Access to shared appointments</li>
                      <li>Basic telehealth support</li>
                      <li>Health progress tracking</li>
                    </ul>
                  </CardContent>
                  <Button className="w-full bg-[#3b82f6] text-white">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Standard</CardTitle>
                    <CardDescription className="text-gray-500">
                      $25<span className="text-xl font-medium">/mo</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>Everything in Basic</li>
                      <li>Advanced telehealth support</li>
                      <li>Priority customer support</li>
                    </ul>
                  </CardContent>
                  <Button className="w-full bg-[#3b82f6] text-white">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                    <CardDescription className="text-gray-500">
                      $50<span className="text-xl font-medium">/mo</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>Everything in Standard</li>
                      <li>Unlimited appointments</li>
                      <li>Dedicated health coach</li>
                    </ul>
                  </CardContent>
                  <Button className="w-full bg-[#3b82f6] text-white">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-1 gap-8 text-sm text-white md:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Careers</a>
            <a href="#" className="hover:text-gray-400">Blog</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#" className="hover:text-gray-400">Help Center</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Community</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Follow Us</h3>
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
            <a href="#" className="hover:text-gray-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;