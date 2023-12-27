"use client";

import {Button} from "antd";
import {useRouter} from "@/lib/navigation";
import {useScrollPosition} from "@/app/hooks/useScrollPosition";

export const NavBar = () => {
    const scrollPosition = useScrollPosition();
    const router = useRouter();

    const clickHandler = () => {
        router.push("/");
    };

    return (
        <div className={`navbar bg-base-100 sticky top-0 z-10 transition-all ease-in-out duration-300 ${scrollPosition > 0 ? "drop-shadow" : ""}`}>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-primary" onClick={clickHandler}>Life Property</a>
            </div>
            <div className="flex gap-2">
                <Button size={"large"} type="primary">Add Line</Button>
                <Button size={"large"} type="default">Email</Button>
            </div>
        </div>
    );
};


