export const MENU_SIDEBAR_ROL = [
  {
    id: "ADMIN",
    name: "menu.admin",
    url: "/admin",
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
