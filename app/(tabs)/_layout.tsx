import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";
import { Feather } from "@expo/vector-icons";
import SideBar from "@/components/SideBar";

const TabLayout = ({ navigation }: any) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const handleOutsidePress = () => {
        if (isSidebarVisible) {
            setSidebarVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={styles.contentContainer}>
                    {isSidebarVisible && <SideBar navigation={navigation} />}
                    <Tabs
                        tabBar={(props) => <TabBar {...props} />}
                        screenOptions={{
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={toggleSidebar}
                                    style={{ marginLeft: 20 }}
                                >
                                    <Feather
                                        name="menu"
                                        size={24}
                                        color="#F5C722"
                                    />
                                </TouchableOpacity>
                            ),
                            headerTitleAlign: "center",
                            headerRight: () => (
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: "#F5C722", // Customize the circle color
                                        marginRight: 20, // Adjust spacing from the right
                                    }}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: "#8A252C", // Set the header background color
                                zIndex: 2000,
                            },
                            headerTintColor: "#F5C722",
                        }}
                    >
                        <Tabs.Screen name="home" options={{ title: "Home" }} />
                        <Tabs.Screen name="room" options={{ title: "Room" }} />
                        <Tabs.Screen
                            name="report"
                            options={{ title: "Report" }}
                        />
                        <Tabs.Screen
                            name="schedule"
                            options={{ title: "Schedule" }}
                        />
                    </Tabs>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative", // Ensure the container is the positioning context
    },
    contentContainer: {
        flex: 1,
    },
});

export default TabLayout;
