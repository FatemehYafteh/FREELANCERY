import { Outlet } from "react-router-dom";
import Sidbar from "./Sidbar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[15rem_1fr]">
      <Header />
      <Sidbar />
      <div className="bg-secondary-100 p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-md flex flex-col gap-y-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
