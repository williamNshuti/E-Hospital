import React from "react";
import classNames from "classnames";
import { IconMenu2, IconStethoscope } from "@tabler/icons-react";
import { ActionIcon, Group, Image } from "@mantine/core";

const Navbar = (props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <Group position="center">
        <div className="flex flex-row items-center justify-center w-full ">
          <IconStethoscope size="3.125rem" />
        </div>
      </Group>
      <div className="flex-grow"></div>

      <ActionIcon className="md:hidden" onClick={props.onMenuButtonClick}>
        <IconMenu2 size="3.125rem" />
      </ActionIcon>
    </nav>
  );
};

export default Navbar;
