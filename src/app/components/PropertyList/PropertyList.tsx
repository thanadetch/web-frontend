import {PropertyCard} from "@/app/components/PropertyCard/PropertyCard";
import React, {useEffect, useState} from "react";
import {IPagination} from "@/app/types/pagination";
import {Datum} from "@/app/types/strapi";
import {Property} from "@/app/types/property";
import {getProperties} from "@/app/services/property";
import {Pagination} from "antd";
import {ListingType} from "@/app/types/listingType";

interface PropertyListProps {
    codeId?: string,
    listingType: ListingType,
    local: string,
}

export const PropertyList = ({codeId, listingType}: PropertyListProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 12
    });
    const [properties, setProperties] = useState<Datum<Property>[]>([]);
    const [total, setTotal] = useState<number>();

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const res = await getProperties({codeId: codeId?.toUpperCase(), listingType}, pagination);
            setProperties(prvState => res.data?.data);
            setTotal(res.data?.meta?.pagination?.total);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [codeId, listingType, pagination]);

    const fetchMoreData = async () => {
        setPagination(prevState => ({...prevState, page: prevState.page + 1}));
    };

    return (
        <div className={"container mx-auto md:p-0 flex justify-center"}>
            <div className={"w-full py-8 px-4 flex flex-col gap-4"}>
                <div className={"grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                    {loading ? new Array(12).fill('').map((_, index) =>
                        <PropertyCard key={index} loading />
                    ): properties.map((property, index) =>
                        <PropertyCard key={index} id={property.id} item={property.attributes} listingType={listingType}/>
                    )}
                </div>
                <Pagination defaultCurrent={1}
                            className={"self-end"}
                            current={pagination.page}
                            pageSize={pagination.pageSize}
                            onChange={(page, pageSize) => setPagination({page, pageSize})}
                            showSizeChanger={false}
                            total={total}/>
            </div>
        </div>
    );
};
