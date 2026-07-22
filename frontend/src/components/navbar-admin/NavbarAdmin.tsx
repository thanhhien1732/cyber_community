
import { ROUTER_ADMIN } from "@/constant/router.constant";
import { Box, NavLink, ScrollArea, Stack } from "@mantine/core";
import { IconFingerprint, IconGauge, IconLicense } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import UserControl from "../user-control/UserControl";

const navLinks = [
    {
        label: "Dashboard",
        href: ROUTER_ADMIN.DASHBOARD,
        icon: <IconGauge size={16} stroke={1.5} />,
    },
    {
        label: "Role",
        href: ROUTER_ADMIN.ROLE,
        icon: <IconFingerprint size={16} stroke={1.5} />,
    },
    {
        label: "Permission",
        href: ROUTER_ADMIN.PERMISSION,
        icon: <IconLicense size={16} stroke={1.5} />,
    },
];

type TProps = {
    closeMobile: () => void;
};

export default function NavbarAdmin({ closeMobile }: TProps) {
    const { pathname } = useLocation();
    return (
        <Stack h={`100%`}>
            <ScrollArea flex={1}>
                {navLinks.map((link) => {
                    return (
                        <NavLink
                            style={{ borderRadius: `var(--mantine-radius-md)` }}
                            key={link.href}
                            label={link.label}
                            component={Link}
                            to={link.href}
                            active={pathname.includes(link.href)}
                            leftSection={link.icon}
                            onClick={() => {
                                closeMobile();
                            }}
                        >
                            {undefined}
                        </NavLink>
                    );
                })}
            </ScrollArea>

            <Box>
                <UserControl type="admin"/>
            </Box>
        </Stack>
    );
}
