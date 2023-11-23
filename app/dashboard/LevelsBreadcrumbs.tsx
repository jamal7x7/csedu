import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function LevelsBreadcrumbs() {
  return (
    <div>
      hello
    <Breadcrumbs variant={"solid"} >
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Music</BreadcrumbItem>
      <BreadcrumbItem>Artist</BreadcrumbItem>
      <BreadcrumbItem>Album</BreadcrumbItem>
      <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>

    </div>
  );
}