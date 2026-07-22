
import { useDetailUser } from "@/api/tantask/user.tanstack";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Box, Container, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const detailUser = useDetailUser(id || "");

    return (
        <>
            <Box pb={100} pt={50}>
                <Container mt={10}>
                    <Stack>
                        {detailUser.data && <ProfileInfo info={detailUser.data} type="other" />}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
