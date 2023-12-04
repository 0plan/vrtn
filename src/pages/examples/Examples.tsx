import {Outlet} from "react-router-dom";
import ExampleList from "@components/ExampleList.tsx";

export default function Examples() {

    return (
        <main className={'flex'}>
            <ExampleList />
            <Outlet/>
        </main>
    )
}
