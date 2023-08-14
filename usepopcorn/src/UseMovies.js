import { useState, useEffect } from "react";

export function UseMovies() {
    useEffect(
        function () {
            const controller = new AbortController();
            async function Fetchmovies() {
                try {
                    setIsLoding(true);
                    setError("");
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );
                    if (!res.ok) throw new Error("something wrong to fetching movies");

                    const data = await res.json();
                    if (data.Response === "false") throw new Error("Movie not Found");
                    setMovies(data.Search);
                    setError("");
                } catch (err) {
                    console.error(err.message);
                    setError(err.message);
                    if (err.name !== "AbortError") {
                        setError(error.message);
                    }
                } finally {
                    setIsLoding(false);
                }
            }

            if (query.length < 3) {
                setError("");
                setMovies([]);
                return;
            }

            Fetchmovies();
            handleCloseMovie();

            return () => {
                console.log("clean up");
                controller.abort();
            };
        },
        [query]
    );
}