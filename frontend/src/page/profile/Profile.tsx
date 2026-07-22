
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useAppSelector } from "@/redux/hooks";
import { Box, Container, Stack } from "@mantine/core";

export function Profile() {
    const info = useAppSelector((state) => state.user.info);

    return (
        <>
            <Box pb={100} pt={50}>
                <Container mt={10}>
                    <Stack>
                        <ProfileInfo info={info} type="my" />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
