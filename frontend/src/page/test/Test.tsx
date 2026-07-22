import GetDemo from "@/components/test/get-demo/GetDemo";
import ToggleTheme from "@/components/test/ToggleTheme";
import { Stack } from "@mantine/core";

export default function Test() {
   return (
      <Stack py={100}>
         <GetDemo />
         <ToggleTheme />
      </Stack>
   );
}
