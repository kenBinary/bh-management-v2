import { useEffect, useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useInitialLoadEffect(cb: () => any, dependencies: Array<any>) {
    const [loaded, setLoaded] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<Array<any>>([]);

    useEffect(() => {
        if (!loaded) {
            const callbackData = cb();
            if (!(callbackData === undefined)) {
                callbackData.then((response: []) => {
                    setData(response);
                });
            }
        }
        setLoaded(true);
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const x: [boolean, Array<any>] = [loaded, data];
    return x;
    // return [loaded, data];
}