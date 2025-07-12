import React, { useState } from "react";
import SliderComponent from "./SliderComponent";
import "./swipe.css";

export default function CardComponent({
    title = "",
    tag = "",
    address,
    data,
    darkTag = false,
    loading = false,
    error = null,
}) {
    const [theme, setTheme] = useState(darkTag);
    const hasData = Array.isArray(data) && data.length > 0;

    return (
        <section className="w-full h-auto py-10 px-5 lg:p-12 bg-blue-100">
            <article>
                <span
                    className={
                        theme
                            ? "bg-amber-950 min-w-20 p-2 justify-items-center"
                            : "bg-slate-300 min-w-20 p-2 justify-items-center"
                    }
                >
                    <i
                        className={
                            theme
                                ? "bx bx-buildings mr-1 text-xl text-amber-500"
                                : "bx bx-buildings mr-1 text-xl text-blue-800"
                        }
                    ></i>
                    <span
                        className={
                            theme
                                ? "text-xl font-semibold text-amber-500"
                                : "text-xl font-semibold text-blue-800"
                        }
                    >
                        {tag}
                    </span>
                </span>

                <h2 className="text-xl lg:text-3xl my-3 font-bold">{title}</h2>
            </article>

            <div className="mt-8">
                <SliderComponent
                    address={address}
                    data={data}
                    loading={loading}
                    error={error}
                />
            </div>
        </section>
    );
}
