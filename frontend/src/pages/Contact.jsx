import React from "react";
import Title from "../components/Title";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen border-t border-gray-200">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-2xl md:text-3xl">
            <Title text1={"CONTACT"} text2={"US"} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Contact Card 1 */}
          <div className="border border-gray-300 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-black p-2 md:p-3 rounded-full text-white flex-shrink-0">
                <FiMapPin className="text-lg md:text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-1 md:mb-2">
                  Our Store
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  Mollah Market, 1421 Fatullah
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Narayanganj, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="border border-gray-300 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-black p-2 md:p-3 rounded-full text-white flex-shrink-0">
                <FiPhone className="text-lg md:text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-1 md:mb-2">
                  Phone
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  +880190********
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  +880170********
                </p>
              </div>
            </div>
          </div>

          {/* Contact Card 3 */}
          <div className="border border-gray-300 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-black p-2 md:p-3 rounded-full text-white flex-shrink-0">
                <FiMail className="text-lg md:text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-1 md:mb-2">
                  Email
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  saeedtamim07@gmail.com
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  support@yourbusiness.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Card 4 */}
          <div className="border border-gray-300 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-black p-2 md:p-3 rounded-full text-white flex-shrink-0">
                <FiClock className="text-lg md:text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-1 md:mb-2">
                  Hours
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  Monday - Friday: 9am - 8pm
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Saturday - Sunday: 10am - 6pm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mt-12 md:mt-16">
          {/* Map Section */}
          <div className="lg:w-1/2 w-full">
            <div className="aspect-w-16 aspect-h-9 w-full h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.42055534664368!2d90.47545743007251!3d23.649878442223322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b1b21ef07bf1%3A0x93e4ca4dfc482965!2sMomotazz%20Cloth%20Store!5e0!3m2!1sen!2sbd!4v1743318671703!5m2!1sen!2sbd"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 w-full">
            <div className="border border-gray-300 p-6 md:p-8">
              <div className="text-xl mb-6">
                <Title text1={"SEND US A"} text2={"MESSAGE"} />
              </div>
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <textarea
                    id="Type Here"
                    rows="4"
                    className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center cursor-pointer w-full gap-2 bg-black text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base hover:bg-gray-800 transition-colors duration-200 "
                >
                  <FiSend className="text-base md:text-lg" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
