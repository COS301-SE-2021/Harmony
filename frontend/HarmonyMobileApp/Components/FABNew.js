import React from "react";
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
//FAB: Floating action button
export default function FABNew() {
    const navigation = useNavigation();

    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    fabStyle={{
                        backgroundColor: '#3366FF',
                    }}
                    open={open}
                    icon={open ? 'close' : 'plus'}
                    actions={[
                        {
                            icon: props => <FontAwesome5 name="hamburger" size={24} color="white" />,
                            label: 'Request a new item',
                            onPress: () => navigation.navigate("RequestNewItem"),
                            small: false,
                            style: {
                                backgroundColor: '#3366FF',
                            },

                        },
                        {
                            icon: props => <MaterialIcons name="fastfood" size={24} color="white" />,
                            label: 'Create a new pairing',
                            onPress: () => navigation.navigate("NewPairing"),
                            small: false,
                            style: {
                                backgroundColor: '#3366FF',
                            },
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
}


