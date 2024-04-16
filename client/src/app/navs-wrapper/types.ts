export type NavbarProps = {
  data: NavBarLinkType[];
};

export type NavBarLinkType = {
  id: number;
  parent_id: number;
  name: string;
  link: string;
};