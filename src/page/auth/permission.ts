export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    ADMIN: [
        "view:leads",
        "edit:leads",
        "delete:leads",
        "view:users",
        "edit:users",
        "delete:users",
        "create:users",
        "view:agents",
        "edit:agents",
        "delete:agents",
        "create:agents",
        "view:settings",
        "edit:settings",
        "delete:settings",
        "create:settings",
    ],
    AGENT: [
        "view:leads",
        "create:leads",
        "edit:leads",
        "view:settings",
        "edit:settings",
    ],
    MANAGER: [
        "view:leads",
        "edit:leads",
        "delete:leads",
        "create:agents",
        "edit:agents",
        "delete:agents",
        "view:agents",
        "view:settings",
        "edit:settings",
    ],
} as const;

export function hasPermission(
    user: { id: string, role: Role },
    permission: Permission
): boolean {
    if (user && permission && ROLES[user.role]) {
        return (ROLES[user.role] as readonly Permission[]).includes(permission);
    }
    return false;
}