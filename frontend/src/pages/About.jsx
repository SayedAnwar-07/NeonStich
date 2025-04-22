import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="pt-10 border-t border-gray-200">
      <div className="text-3xl text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-16 mt-10">
        <img src={assets.about_img} alt="" className="h-[600px]" />
        <div className="text-start">
          <p>
            We're committed to bringing you carefully curated collections that
            combine comfort, style, and sustainability. Each piece in our store
            is selected with attention to quality materials, ethical
            manufacturing, and versatile designs that transcend seasonal
            trends.We prioritize fabrics that are soft, durable, and sustainably
            sourced, such as organic cotton, bamboo, recycled fibers, and
            ethically tanned leather.We partner with artisans and responsible
            manufacturers who uphold fair wages, safe working conditions, and
            eco-friendly production practices.Our collections are designed to
            transcend seasonal trends, offering wardrobe staples that you can
            wear year after year.By choosing [Your Brand Name], you’re making a
            conscious decision to support a more sustainable and ethical fashion
            industry—without compromising on style or comfort.. Our collection
            is carefully curated to offer trendy yet timeless pieces that fit
            seamlessly into your wardrobe. With a commitment to quality and
            eco-friendly practices, we strive to create fashion that looks good
            and feels even better. Whether you're looking for elegant dresses,
            casual essentials, or statement pieces, we've got something for
            everyone. Join us on our journey to redefine fashion with comfort
            and
          </p>
          <p className="mt-3">
            We believe that fashion is more than just clothing; it is a way of
            expressing individuality, personality, and confidence. At [Your
            Brand Name], we strive to create dresses that cater to different
            styles, occasions, and personalities. Whether you're looking for
            elegant evening wear, casual everyday dresses, or statement pieces
            for special events, we have something for every fashion-forward
            individual. Beyond aesthetics, our brand embraces sustainability. We
            are committed to using eco-friendly fabrics, ethical sourcing, and
            responsible manufacturing to reduce our environmental impact. Our
            philosophy is simple: great fashion should be accessible,
            high-quality, and kind to the planet.
          </p>
          <p className="mt-3">
            Fashion is for everyone, and we take pride in celebrating diversity.
            Our collections are designed to cater to different body types,
            preferences, and cultural inspirations. We believe that beauty comes
            in all shapes, sizes, and backgrounds, which is why we offer a wide
            range of sizes and styles to suit every individual.At [Your Brand
            Name], we also value representation and inclusivity in our
            campaigns. We collaborate with models, influencers, and creators
            from diverse backgrounds to showcase real beauty in all its forms.
            We want our customers to see themselves reflected in our brand and
            feel empowered by their uniqueness.
          </p>
        </div>
      </div>

      <div className="my-10">
        <div className="text-xl">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
          <div className="p-6 border border-gray-300">
            <h4 className="text-black font-medium">
              Sustainability Commitment
            </h4>
            <p className="mt-3 text-gray-600 text-sm">
              As a brand dedicated to sustainability, we take conscious steps to
              ensure that every dress we create aligns with our ethical values.
              We carefully select eco-friendly materials such as organic cotton,
              bamboo fibers.
            </p>
          </div>
          <div className="p-6 border border-gray-300">
            <h4 className="text-black font-medium">
              Craftsmanship and Quality
            </h4>
            <p className="mt-3 text-gray-600 text-sm">
              Quality is at the heart of everything we do. Our team of skilled
              designers, tailors, and artisans work diligently to craft dresses
              that not only look beautiful but also feel luxurious and durable.
            </p>
          </div>
          <div className="p-6 border border-gray-300">
            <h4 className="text-black font-medium">
              Customer-Centric Approach
            </h4>
            <p className="mt-3 text-gray-600 text-sm">
              Our customers are at the core of everything we do. We are
              committed to providing an exceptional shopping experience, from
              easy navigation on our website to seamless order processing and
              delivery.
            </p>
          </div>
          <div className="p-6 border border-gray-300">
            <h4 className="text-black font-medium">
              Ethical Sourcing and Fair Trade
            </h4>
            <p className="mt-3 text-gray-600 text-sm">
              We believe that the people behind our dresses matter just as much
              as the customers who wear them. We ensure that every person
              involved in our production process is treated with respect and
              dignity.
            </p>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
