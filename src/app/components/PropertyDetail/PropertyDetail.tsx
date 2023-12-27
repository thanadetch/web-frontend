"use client";
import {Flex} from "antd";
import {FaBath, FaBed, FaHouse} from "react-icons/fa6";
import React from "react";
import {IoLocationOutline} from "react-icons/io5";
import ImageGallery from "react-image-gallery";
import {ContactForm} from "@/app/components/ContactForm/ContactForm";
import {Property} from "@/app/types/Property";

interface PropertyDetailProps {
    property: Property;
}

export const PropertyDetail = ({property}: PropertyDetailProps) => {
    const images = property.images.data.map((image) => ({
        original: image.attributes.url,
        thumbnail: image.attributes.formats.thumbnail.url,
    }));

    return (
        <div className={'flex flex-col lg:flex-row gap-8'}>
            <div className={"flex flex-col gap-8"}>
                <div>
                    <ImageGallery items={images} showBullets showPlayButton={false}/>
                </div>
                <div className={"flex flex-row justify-between relative gap-4"}>
                    <div className={"flex flex-col gap-8 flex-1"}>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"text-4xl font-semibold"}>
                                {property?.name}
                            </div>
                            <div className={"flex flex-row items-center gap-2 text-xl"}>
                                <IoLocationOutline/>
                                {property?.subCode.data.attributes.name}
                            </div>
                            <div className={"text-2xl font-semibold"}>
                                ฿ {property?.price?.toLocaleString("en")}/month
                            </div>
                            <div className={"flex flex-row gap-x-4 gap-y-2 flex-wrap"}>
                                <div className={"badge badge-outline p-4 flex flex-row items-center gap-2"}>
                                    <FaBed/>
                                    {property?.bed} Bedroom
                                </div>
                                <div className={"badge badge-outline p-4 flex flex-row items-center gap-2"}>
                                    <FaBath/>
                                    {property?.bath} Bathroom
                                </div>
                                <div className={"badge badge-outline p-4  flex flex-row items-center gap-2"}>
                                    <FaHouse/>
                                    {property?.sqm} sq.m
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-3xl font-semibold"}>
                                Property information
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur excepturi harum
                                hic,
                                libero nobis quam quidem sunt. Adipisci autem beatae consequuntur cupiditate eius,
                                itaque
                                labore laboriosam perspiciatis placeat quaerat tenetur.
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className={"flex-[0_1_440px] sticky top-[104px] self-auto md:self-center lg:self-start"}>
                <ContactForm/>
            </div>
        </div>


    );
};
