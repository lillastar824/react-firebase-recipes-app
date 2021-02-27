type MappedObject = { [key: string]: string }
type MappedRouteObject = { [key: string]: RouteKey | null }

export enum RouteKey {
  INDEX = "INDEX",
  RECIPE = "RECIPE",
  MANAGE_LIST = "MANAGE_LIST",
  MANAGE_CREATE = "MANAGE_CREATE",
  MANAGE_EDIT = "MANAGE_EDIT",
}

export const RoutePath: MappedObject = Object.freeze({
  [RouteKey.INDEX]: "/",
  [RouteKey.RECIPE]: "/:id",
  [RouteKey.MANAGE_LIST]: "/manage",
  [RouteKey.MANAGE_CREATE]: "/manage/create",
  [RouteKey.MANAGE_EDIT]: "/manage/:id",
});

export const RouteTitle: MappedObject = Object.freeze({
  [RouteKey.INDEX]: "Recipes",
  [RouteKey.RECIPE]: "Recipe",
  [RouteKey.MANAGE_LIST]: "Management",
  [RouteKey.MANAGE_CREATE]: "Create recipe",
  [RouteKey.MANAGE_EDIT]: "Edit recipe",
});

export const RouteOnBackRoute: MappedRouteObject = Object.freeze({
  [RouteKey.INDEX]: null,
  [RouteKey.RECIPE]: RouteKey.INDEX,
  [RouteKey.MANAGE_LIST]: RouteKey.INDEX,
  [RouteKey.MANAGE_CREATE]: RouteKey.MANAGE_LIST,
  [RouteKey.MANAGE_EDIT]: RouteKey.MANAGE_LIST
});
