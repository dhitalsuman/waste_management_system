import Navbar from "./dashboard/components/Navbar";
import Sidebar from "./dashboard/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex space-x-2">
        <Sidebar />
        <div className="mt-4x`x`chc">{children}</div>
      </div>
    </div>
  );
};

export default layout;
