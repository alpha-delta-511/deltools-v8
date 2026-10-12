import { useEffect } from "react";

export interface PageTitleProps {
  children: string;
}
export default function PageTitle(props: PageTitleProps) {
  useEffect(() => {
    document.title = props.children + " | DelTools V8";
  });

  return <></>;
}
