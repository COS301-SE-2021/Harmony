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
    // onPress={() => navigation.navigate("NewPairing")}

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    fabStyle={{
                        backgroundColor: '#03A9F4',
                    }}
                    open={open}
                    icon={open ? 'close' : 'plus'}
                    actions={[
                        {
                            icon: props => <FontAwesome5 name="hamburger" size={24} color="gray" />,
                            label: 'Request new item',
                            onPress: () => console.log('Pressed notifications'),
                            small: false,
                        },
                        {
                            icon: props => <MaterialIcons name="fastfood" size={24} color="gray" />,
                            label: 'Create new pairing',
                            onPress: () => console.log('Pressed notifications'),
                            small: false,
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


