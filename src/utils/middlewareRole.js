export const MENU_SIDEBAR_ROL = [
  {
    id: "ADM",
    name: "menu.admin",
    url: "/admin",
  },
  {
    id: "SADM",
    name: "menu.super",
    url: "/super",
  },
  {
    id: "COB",
    name: "menu.collector",
    url: "/cobrador",
  },
  {
    id: "CAJ",
    name: "menu.cashier",
    url: "/cajero",
  },
  {
    id: "AFL",
    name: "menu.affiliate",
    url: "/afiliado",
  },
  {
    id: "DIR",
    name: "menu.boardMember",
    url: "/director",
  },
  {
    id: "GES",
    name: "menu.listManagement",
    url: "/gestor-listas",
  },
  {
    id: "SSP",
    name: "menu.adminSubSociety",
    url: "/admin-sub-sociedad",
  },
];

export const role = {
  getTypeMenu: (userTypeId) => {
    const menuSelected = MENU_SIDEBAR_ROL.find((e) => e.id === userTypeId);
    return menuSelected?.name ?? "";
  },
  getUrl: (userTypeId) => {
    const menuSelected = MENU_SIDEBAR_ROL.find((e) => e.id === userTypeId);
    return menuSelected?.url ?? "";
  },
};
