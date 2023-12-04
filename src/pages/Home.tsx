import {Button, Slider} from "@mui/material";
import useCounter from "~/stores/counter.ts";

export default function home() {
    const {count, inc, dec} = useCounter()

    return (
        <main className="h-96 min-h-full md:min-h-full">
            <p className="underline">Hello world</p>
            <Slider
                value={count}
                classes={{active: 'shadow-none'}}
                slotProps={{thumb: {className: 'hover:shadow-none'}}}
            />

            <div className="flex flex-1">
                <p className="text-blue-300">{count}</p>
                <Button onClick={dec}>-</Button>
                <Button onClick={inc}>+</Button>
            </div>
        </main>
    )
}
