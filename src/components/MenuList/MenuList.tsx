import { IconButton, SvgIconProps } from "@mui/material";
import React, { memo } from "react";

type MuiIcon = React.ComponentType<SvgIconProps>;
type MenuListType = {
  currentSelected?: string;
  onClickCurrentSelected: (prop: string) => void;
  menuTitle: string;
  icon: MuiIcon;
};

const MenuList = ({
  currentSelected,
  onClickCurrentSelected,
  menuTitle,
  icon,
}: MenuListType) => {
  const handleClickCurrentSelected = () => {
    onClickCurrentSelected?.(menuTitle);
  };
  return (
    <div onClick={handleClickCurrentSelected}>
      <div
        className={`${
          currentSelected === menuTitle &&
          "bg-blue-300 text-blue-600 hover:bg-blue-400"
        } m-4 p-2 rounded-md text-[13px] hover:bg-gray-200 cursor-pointer select-none`}
      >
        <IconButton
          color={currentSelected === menuTitle ? "primary" : "default"}
        >
          {React.createElement(icon)}
        </IconButton>
        {menuTitle}
      </div>
    </div>
  );
};

export default memo(MenuList);
