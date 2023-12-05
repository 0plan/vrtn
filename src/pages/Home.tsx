import {Button, Slider} from "@mui/material";
import useCounter from "~/stores/counter.ts";

export default function home() {
    const {count, inc, dec} = useCounter()

    return (
        <main className={'h-fit'}>
            <p className={'text-3xl'}>Main</p>
        </main>
    )
}
