import {Slider} from "@mui/material";

export default function home() {

    return (
        <main className="h-96 min-h-full md:min-h-full">
            <p className="underline">Hello world</p>
            <Slider
                defaultValue={33}
                classes={{ active: 'shadow-none' }}
                slotProps={{ thumb: { className: 'hover:shadow-none' } }}
            />
        </main>
    )
}
