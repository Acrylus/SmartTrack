import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";

const TabLayout = () => {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />}>
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="room" options={{ title: "Room" }} />
            <Tabs.Screen name="report" options={{ title: "Report" }} />
            <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
        </Tabs>
    );
};

export default TabLayout;
