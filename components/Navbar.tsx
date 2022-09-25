import React from "react";

const Navbar = () => {
  return (
    <div className="border-b mb-2 bg-[#ff8ba7] text-[#413639] flex items-center justify-around h-[10vh]">
      <h1 className="text-2xl font-bold">Present</h1>
      <ul className="flex gap-x-2">
        <li className="hover:cursor-pointer hover:underline hover:opacity-70">
          <a href="https://github.com/david-wagih/mlh-teachers-hack-2.git">
            GitHub
          </a>
        </li>
        <li className="hover:cursor-pointer hover:underline hover:opacity-70">
          <a href="https://devpost.com/software/mlh-teachers-hack?ref_content=user-portfolio&ref_feature=in_progress">
            Devpost
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
