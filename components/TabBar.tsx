import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const icon: Record<string, (props: any) => JSX.Element> = {
        home: (props: any) => <Feather name="home" size={24} {...props} />,
        room: (props: any) => <Feather name="box" size={24} {...props} />,
        report: (props: any) => (
            <Feather name="activity" size={24} {...props} />
        ),
        schedule: (props: any) => (
            <Feather name="calendar" size={24} {...props} />
        ),
    };

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const label =
                    typeof options.tabBarLabel === "function"
                        ? options.tabBarLabel({
                              focused: state.index === index,
                              color: isFocused ? "#673ab7" : "#222",
                              position: "beside-icon",
                              children: route.name,
                          })
                        : options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItems}
                    >
                        <View
                            style={[
                                styles.outerIconWrapper,
                                isFocused && styles.focusedOuterIconWrapper,
                            ]}
                        >
                            <View
                                style={[
                                    styles.innerIconWrapper,
                                    isFocused && styles.focusedInnerIconWrapper,
                                ]}
                            >
                                {icon[route.name]({
                                    color: isFocused ? "black" : "white",
                                })}
                            </View>
                        </View>

                        <Text
                            style={{
                                position: "absolute",
                                bottom: -60,
                                color: isFocused ? "#000" : "transparent",
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        height: 80,
        bottom: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8A252C",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabbarItems: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    outerIconWrapper: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 50,
        width: 80,
        height: 80,
    },
    focusedOuterIconWrapper: {
        backgroundColor: "#f2f2f2ff",
        transform: [{ translateY: -40 }],
    },
    innerIconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    focusedInnerIconWrapper: {
        backgroundColor: "#F5C722",
    },
});
